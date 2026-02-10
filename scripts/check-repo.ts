import { Octokit } from '@octokit/rest';

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

async function main() {
  const token = await getAccessToken();
  const octokit = new Octokit({ auth: token });
  const owner = 'mattortolani';
  const repo = 'hbdr-website';

  const { data: user } = await octokit.users.getAuthenticated();
  console.log('Authenticated as:', user.login);

  try {
    const { data: workflows } = await octokit.repos.getContent({ owner, repo, path: '.github/workflows' });
    console.log('\nWorkflow files:', (workflows as any[]).map((f: any) => f.name).join(', '));

    const { data: deployFile } = await octokit.repos.getContent({ owner, repo, path: '.github/workflows/deploy.yml' });
    if (!Array.isArray(deployFile) && 'content' in deployFile) {
      console.log('\nCurrent deploy.yml:');
      console.log(Buffer.from(deployFile.content, 'base64').toString('utf-8'));
    }
  } catch(e: any) {
    console.log('No workflow files found:', e.status);
  }

  try {
    const { data: runs } = await octokit.actions.listWorkflowRunsForRepo({ owner, repo, per_page: 5 });
    console.log('\nRecent workflow runs:');
    for (const run of runs.workflow_runs) {
      console.log('  -', run.name, '|', run.status, '|', run.conclusion, '|', run.created_at);
    }
    if (runs.workflow_runs.length === 0) console.log('  (none)');
  } catch(e: any) {
    console.log('Could not list workflow runs:', e.status, e.message);
  }

  try {
    const { data: secrets } = await octokit.actions.listRepoSecrets({ owner, repo });
    console.log('\nGitHub Actions secrets:', secrets.secrets.map(s => s.name).join(', ') || '(none)');
  } catch(e: any) {
    console.log('Could not list secrets:', e.status);
  }
}

main().catch(err => { console.error(err.message); process.exit(1); });
