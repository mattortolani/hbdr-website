// GitHub integration using Replit connector
import { Octokit } from '@octokit/rest';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  const repoName = 'hbdr-website';
  const owner = 'mattortolani';

  console.log('Getting GitHub client...');
  const octokit = await getUncachableGitHubClient();

  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  let repoExists = false;
  try {
    await octokit.repos.get({ owner, repo: repoName });
    repoExists = true;
    console.log(`Repository ${owner}/${repoName} already exists.`);
  } catch (e: any) {
    if (e.status === 404) {
      console.log(`Repository not found. Creating ${owner}/${repoName}...`);
    } else {
      throw e;
    }
  }

  if (!repoExists) {
    if (user.login === owner) {
      await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: 'HBDR - Header Bidding & Ad Monetization Solutions Website',
        private: false,
        auto_init: false,
      });
    } else {
      await octokit.repos.createInOrg({
        org: owner,
        name: repoName,
        description: 'HBDR - Header Bidding & Ad Monetization Solutions Website',
        private: false,
        auto_init: false,
      });
    }
    console.log(`Repository created: ${owner}/${repoName}`);
  }

  const token = await getAccessToken();
  const remoteUrl = `https://x-access-token:${token}@github.com/${owner}/${repoName}.git`;

  const { execSync } = await import('child_process');

  try {
    execSync('git remote remove origin', { stdio: 'pipe' });
  } catch {}

  execSync(`git remote add origin ${remoteUrl}`, { stdio: 'pipe' });
  console.log('Remote origin set.');

  try {
    execSync('git add -A', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit: HBDR website with full blog CMS, 9 solution pages, and Cloudflare Workers support" --allow-empty', { stdio: 'inherit' });
  } catch {}

  try {
    execSync('git branch -M main', { stdio: 'inherit' });
    execSync('git push -u origin main --force', { stdio: 'inherit' });
    console.log(`\nSuccessfully pushed to https://github.com/${owner}/${repoName}`);
  } catch (e: any) {
    console.error('Push failed:', e.message);
    process.exit(1);
  }
}

main().catch(console.error);
