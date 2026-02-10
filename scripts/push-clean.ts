import { Octokit } from '@octokit/rest';
import * as fs from 'fs';

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY ? 'repl ' + process.env.REPL_IDENTITY : process.env.WEB_REPL_RENEWAL ? 'depl ' + process.env.WEB_REPL_RENEWAL : null;
  if (!xReplitToken) throw new Error('no token');
  const data = await fetch('https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github', { headers: { 'Accept': 'application/json', 'X_REPLIT_TOKEN': xReplitToken } }).then(r => r.json());
  const conn = data.items?.[0];
  return conn?.settings?.access_token || conn.settings?.oauth?.credentials?.access_token;
}

const cfPackageJson = JSON.stringify({
  name: 'hbdr-website',
  version: '1.0.0',
  type: 'module',
  private: true,
  scripts: {
    deploy: 'wrangler deploy'
  },
  dependencies: {
    hono: '^4.11.9',
    zod: '^3.24.2',
    'zod-validation-error': '^3.4.0',
    'drizzle-orm': '^0.39.3',
    'drizzle-zod': '^0.7.0'
  },
  devDependencies: {
    '@cloudflare/workers-types': '^4.20260207.0',
    wrangler: '^4.63.0',
    typescript: '5.6.3'
  }
}, null, 2);

const deployYml = `name: Deploy to Cloudflare Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install deps
        run: npm i

      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
`;

async function pushFile(octokit: Octokit, owner: string, repo: string, filePath: string, content: string, message: string, binary = false) {
  let existingSha: string | undefined;
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: filePath });
    if (!Array.isArray(data) && 'sha' in data) existingSha = data.sha;
  } catch {}

  const base64Content = binary ? content : Buffer.from(content).toString('base64');

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner, repo,
      path: filePath,
      message,
      content: base64Content,
      sha: existingSha,
    });
    return 'pushed';
  } catch (e: any) {
    if (e.status === 422 && e.message?.includes('sha')) return 'unchanged';
    return `error:${e.status}`;
  }
}

async function main() {
  const owner = 'mattortolani';
  const repo = 'hbdr-website';
  const token = await getAccessToken();
  const octokit = new Octokit({ auth: token });

  const { data: user } = await octokit.users.getAuthenticated();
  console.log('Authenticated as:', user.login);

  const results: string[] = [];

  const textFiles: Array<{path: string, content: string}> = [
    { path: 'package.json', content: cfPackageJson },
    { path: 'server/template.ts', content: fs.readFileSync('server/template.ts', 'utf-8') },
    { path: 'server/routes.ts', content: fs.readFileSync('server/routes.ts', 'utf-8') },
    { path: 'server/storage.ts', content: fs.readFileSync('server/storage.ts', 'utf-8') },
    { path: 'server/index.ts', content: fs.readFileSync('server/index.ts', 'utf-8') },
    { path: 'shared/schema.ts', content: fs.readFileSync('shared/schema.ts', 'utf-8') },
    { path: 'worker.ts', content: fs.readFileSync('worker.ts', 'utf-8') },
    { path: 'wrangler.toml', content: fs.readFileSync('wrangler.toml', 'utf-8') },
    { path: 'tsconfig.json', content: fs.readFileSync('tsconfig.json', 'utf-8') },
    { path: 'tsconfig.worker.json', content: fs.readFileSync('tsconfig.worker.json', 'utf-8') },
    { path: '.gitignore', content: fs.readFileSync('.gitignore', 'utf-8') },
    { path: 'README.md', content: fs.readFileSync('README.md', 'utf-8') },
  ];

  console.log('\nPushing text files...');
  for (const f of textFiles) {
    const result = await pushFile(octokit, owner, repo, f.path, f.content, 'Update ' + f.path);
    console.log(`  [${result}] ${f.path}`);
    results.push(result);
  }

  console.log('\nPushing binary files...');
  const binaryFiles = fs.readdirSync('public/assets').filter(f => f.endsWith('.png') || f.endsWith('.ico') || f.endsWith('.jpeg'));
  for (const f of binaryFiles) {
    const content = fs.readFileSync('public/assets/' + f).toString('base64');
    const result = await pushFile(octokit, owner, repo, 'public/assets/' + f, content, 'Update public/assets/' + f, true);
    console.log(`  [${result}] public/assets/${f}`);
    results.push(result);
  }

  console.log('\nPushing deploy workflow...');
  const wfResult = await pushFile(octokit, owner, repo, '.github/workflows/deploy.yml', deployYml, 'Fix deploy workflow');
  console.log(`  [${wfResult}] .github/workflows/deploy.yml`);

  console.log('\nRemoving package-lock.json if present...');
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path: 'package-lock.json' });
    if (!Array.isArray(data) && 'sha' in data) {
      await octokit.repos.deleteFile({
        owner, repo,
        path: 'package-lock.json',
        message: 'Remove lock file',
        sha: data.sha,
      });
      console.log('  Deleted package-lock.json');
    }
  } catch {
    console.log('  No package-lock.json found');
  }

  const pushed = results.filter(r => r === 'pushed').length;
  const unchanged = results.filter(r => r === 'unchanged').length;
  const errored = results.filter(r => r.startsWith('error')).length;
  console.log(`\nDone! Pushed: ${pushed}, Unchanged: ${unchanged}, Errors: ${errored}`);
  console.log(`https://github.com/${owner}/${repo}`);
}

main().catch(e => console.error(e.message));
