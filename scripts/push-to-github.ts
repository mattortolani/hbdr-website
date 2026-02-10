import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

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
  if (!xReplitToken) throw new Error('X_REPLIT_TOKEN not found');
  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    { headers: { 'Accept': 'application/json', 'X_REPLIT_TOKEN': xReplitToken } }
  ).then(res => res.json()).then(data => data.items?.[0]);
  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;
  if (!connectionSettings || !accessToken) throw new Error('GitHub not connected');
  return accessToken;
}

const IGNORE_PATTERNS = [
  'node_modules', '.git', 'dist', '.wrangler', '.cache', '.config',
  '.replit', 'replit.nix', '.dev.vars', 'vite.config.ts.timestamp',
  'scripts', 'script',
  'client/src', 'client/index.html', 'client/public',
  'server/vite.ts', 'server/static.ts',
  'vite.config.ts', 'drizzle.config.ts',
  'tailwind.config.ts', 'postcss.config.js', 'theme.json',
  '.tar.gz', 'attached_assets', 'generated-icon.png',
  '.local', 'tmp', '.upm',
  'components.json', 'package-lock.json'
];

function shouldInclude(filePath: string): boolean {
  for (const pattern of IGNORE_PATTERNS) {
    if (filePath === pattern || filePath.startsWith(pattern + '/')) return false;
  }
  return true;
}

function getAllFiles(dir: string, base = ''): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = base ? `${base}/${entry.name}` : entry.name;
    if (!shouldInclude(relativePath)) continue;
    if (entry.isDirectory()) {
      results.push(...getAllFiles(path.join(dir, entry.name), relativePath));
    } else if (entry.isFile()) {
      results.push(relativePath);
    }
  }
  return results;
}

async function getExistingSha(octokit: Octokit, owner: string, repo: string, filePath: string): Promise<string | undefined> {
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: filePath });
    if (!Array.isArray(data) && 'sha' in data) return data.sha;
  } catch {}
  return undefined;
}

async function main() {
  const owner = 'mattortolani';
  const repo = 'hbdr-website';
  const commitMessage = process.argv[2] || 'Update from Replit';

  console.log('Connecting to GitHub...');
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });

  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}\n`);

  const projectDir = process.cwd();
  const files = getAllFiles(projectDir);
  console.log(`Found ${files.length} files to push\n`);

  let pushed = 0;
  let skipped = 0;

  for (const file of files) {
    const fullPath = path.join(projectDir, file);
    const content = fs.readFileSync(fullPath);
    const base64Content = content.toString('base64');

    const existingSha = await getExistingSha(octokit, owner, repo, file);

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner, repo,
        path: file,
        message: `${commitMessage} - ${file}`,
        content: base64Content,
        sha: existingSha,
      });
      pushed++;
      console.log(`  [${pushed}/${files.length}] ${file}`);
    } catch (e: any) {
      if (e.status === 422 && e.message?.includes('sha')) {
        skipped++;
        console.log(`  [skip] ${file} (unchanged)`);
      } else {
        console.error(`  [error] ${file}: ${e.message}`);
      }
    }
  }

  console.log(`\nDone! Pushed ${pushed} files, skipped ${skipped} unchanged`);
  console.log(`https://github.com/${owner}/${repo}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
