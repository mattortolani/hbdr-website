import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;
  if (!xReplitToken) throw new Error('X_REPLIT_TOKEN not found');
  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    { headers: { 'Accept': 'application/json', 'X_REPLIT_TOKEN': xReplitToken } }
  ).then(res => res.json()).then(data => data.items?.[0]);
  return connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
}

function isBinaryFile(filePath: string): boolean {
  const binaryExtensions = ['.jpeg', '.jpg', '.png', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot'];
  return binaryExtensions.some(ext => filePath.toLowerCase().endsWith(ext));
}

async function main() {
  const owner = 'mattortolani';
  const repo = 'hbdr-website';
  const token = await getAccessToken();
  const octokit = new Octokit({ auth: token });

  const filesToPush = [
    'package.json',
    'server/storage.ts',
  ];

  for (const filePath of filesToPush) {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping ${filePath} - not found`);
      continue;
    }

    const isBinary = isBinaryFile(filePath);
    const content = isBinary
      ? fs.readFileSync(fullPath).toString('base64')
      : Buffer.from(fs.readFileSync(fullPath, 'utf-8')).toString('base64');

    let existingSha: string | undefined;
    try {
      const { data } = await octokit.repos.getContent({ owner, repo, path: filePath });
      if (!Array.isArray(data) && 'sha' in data) {
        existingSha = data.sha;
      }
    } catch {}

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner, repo,
        path: filePath,
        message: `Update ${filePath}`,
        content,
        sha: existingSha,
      });
      console.log(`Pushed: ${filePath}`);
    } catch (e: any) {
      console.log(`Error pushing ${filePath}:`, e.message);
    }
  }

  console.log('\nDone! Files pushed to GitHub.');
}

main().catch(err => { console.error(err.message); process.exit(1); });
