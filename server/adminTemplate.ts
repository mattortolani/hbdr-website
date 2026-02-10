interface LeadData {
  id: string;
  name: string;
  email: string;
  company: string;
  impressions: string;
  message: string | null;
  ip: string | null;
  source: string | null;
  status: string | null;
  createdAt: Date | null;
}

function renderAdminLayout(title: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - HBDR Admin</title>
  <meta name="robots" content="noindex, nofollow" />
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.14/dist/full.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Figtree', 'system-ui', 'sans-serif'],
          },
        },
      },
    }
  </script>
  <style>
    body { background: #0a0a0c; font-family: 'Figtree', sans-serif; }
    .glass-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; backdrop-filter: blur(40px) saturate(180%); }
    .glass-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; color: white; outline: none; transition: all 0.2s; }
    .glass-input:focus { border-color: #2BDE73; box-shadow: 0 0 0 3px rgba(43,222,115,0.1); }
    .glass-btn { background: linear-gradient(135deg, #2BDE73, #1AAF5C); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.2s; }
    .glass-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(43,222,115,0.3); }
    .status-badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
    .status-new { background: rgba(59,130,246,0.15); color: #60a5fa; }
    .status-contacted { background: rgba(245,158,11,0.15); color: #fbbf24; }
    .status-qualified { background: rgba(43,222,115,0.15); color: #2BDE73; }
    .status-converted { background: rgba(139,92,246,0.15); color: #a78bfa; }
    .status-archived { background: rgba(107,114,128,0.15); color: #9ca3af; }
  </style>
</head>
<body class="min-h-screen text-white antialiased">
${bodyContent}
</body>
</html>`;
}

export function renderAdminLoginPage(error?: string): string {
  const isSuccess = error === "success";
  const bodyContent = `
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2BDE73]/20 to-[#2BDE73]/5 mb-4">
          <svg class="w-8 h-8 text-[#2BDE73]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">HBDR Admin</h1>
        <p class="text-white/40">Sign in to manage your leads and content</p>
      </div>

      <div class="glass-card p-8">
        ${error && !isSuccess ? `
        <div class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          ${error}
        </div>` : ''}

        <form method="POST" action="/admin/login" class="space-y-6" data-testid="admin-login-form">
          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Username</label>
            <input type="text" name="username" required autocomplete="username" class="glass-input w-full px-4 py-3" placeholder="admin" data-testid="input-admin-username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Password</label>
            <input type="password" name="password" required autocomplete="current-password" class="glass-input w-full px-4 py-3" placeholder="Enter password" data-testid="input-admin-password" />
          </div>
          <button type="submit" class="glass-btn w-full py-3 text-center" data-testid="button-admin-login">
            Sign In
          </button>
        </form>
      </div>

      <p class="text-center text-white/20 text-sm mt-6">
        <a href="/" class="hover:text-white/40 transition-colors">Back to HBDR.com</a>
      </p>
    </div>
  </div>`;

  return renderAdminLayout("Login", bodyContent);
}

export function renderAdminLeadsPage(leads: LeadData[]): string {
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "new" || !l.status).length;
  const contactedLeads = leads.filter(l => l.status === "contacted").length;
  const qualifiedLeads = leads.filter(l => l.status === "qualified").length;
  const convertedLeads = leads.filter(l => l.status === "converted").length;

  const impressionLabels: Record<string, string> = {
    "under-10m": "Under 10M",
    "10m-50m": "10M - 50M",
    "50m-100m": "50M - 100M",
    "100m-500m": "100M - 500M",
    "500m-1b": "500M - 1B",
    "over-1b": "Over 1B",
  };

  const leadRows = leads.map(lead => {
    const date = lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "N/A";
    const status = lead.status || "new";
    const impressions = impressionLabels[lead.impressions] || lead.impressions;
    const source = lead.source || "contact";

    return `
    <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors" data-testid="lead-row-${lead.id}">
      <td class="py-4 px-4">
        <div class="font-medium text-white">${lead.name}</div>
        <div class="text-sm text-white/40">${lead.email}</div>
      </td>
      <td class="py-4 px-4 text-white/60">${lead.company}</td>
      <td class="py-4 px-4 text-white/60 text-sm">${impressions}</td>
      <td class="py-4 px-4">
        <span class="text-xs px-2 py-1 rounded-full ${source === 'support' ? 'bg-purple-500/15 text-purple-400' : 'bg-blue-500/15 text-blue-400'}">${source}</span>
      </td>
      <td class="py-4 px-4">
        <div x-data="{ status: '${status}', updating: false }" class="relative">
          <select
            x-model="status"
            @change="
              updating = true;
              fetch('/api/leads/${lead.id}/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: status })
              }).then(() => updating = false).catch(() => updating = false);
            "
            :disabled="updating"
            class="status-badge status-${status} cursor-pointer border-0 appearance-none pr-6 bg-no-repeat"
            style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.4)%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>'); background-position: right 4px center;"
            data-testid="select-status-${lead.id}"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </td>
      <td class="py-4 px-4 text-white/40 text-sm">${date}</td>
      <td class="py-4 px-4">
        ${lead.message ? `
        <button
          @click="$dispatch('show-message', { name: '${lead.name.replace(/'/g, "\\'")}', message: '${(lead.message || '').replace(/'/g, "\\'").replace(/\n/g, "\\n")}' })"
          class="text-[#2BDE73] hover:text-[#1AAF5C] text-sm transition-colors"
          data-testid="button-view-message-${lead.id}"
        >
          View
        </button>` : '<span class="text-white/20 text-sm">-</span>'}
      </td>
    </tr>`;
  }).join("");

  const bodyContent = `
  <div class="min-h-screen" x-data="{ 
    filterStatus: '', 
    filterSource: '',
    searchQuery: '',
    showMessageModal: false,
    modalName: '',
    modalMessage: ''
  }" @show-message.window="showMessageModal = true; modalName = $event.detail.name; modalMessage = $event.detail.message">

    <nav class="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-6">
            <a href="/" class="text-xl font-bold text-white" data-testid="link-admin-home">HBDR</a>
            <span class="text-white/20">|</span>
            <span class="text-white/60 font-medium">Admin Panel</span>
          </div>
          <div class="flex items-center gap-4">
            <a href="/admin/leads" class="text-sm text-[#2BDE73] font-medium" data-testid="link-admin-leads">Leads</a>
            <a href="/admin/blog" class="text-sm text-white/50 hover:text-white transition-colors" data-testid="link-admin-blog">Blog</a>
            <span class="text-white/10">|</span>
            <a href="/admin/logout" class="text-sm text-white/40 hover:text-red-400 transition-colors" data-testid="link-admin-logout">Logout</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white" data-testid="heading-leads">Contact Leads</h1>
          <p class="text-white/40 mt-1">${totalLeads} total leads</p>
        </div>
        <a href="/admin/leads/export" class="inline-flex items-center gap-2 glass-btn px-5 py-2.5 text-sm" data-testid="button-export-csv">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Export CSV
        </a>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div class="glass-card p-4 text-center" data-testid="stat-total">
          <div class="text-2xl font-bold text-white">${totalLeads}</div>
          <div class="text-xs text-white/40 mt-1">Total</div>
        </div>
        <div class="glass-card p-4 text-center" data-testid="stat-new">
          <div class="text-2xl font-bold text-blue-400">${newLeads}</div>
          <div class="text-xs text-white/40 mt-1">New</div>
        </div>
        <div class="glass-card p-4 text-center" data-testid="stat-contacted">
          <div class="text-2xl font-bold text-yellow-400">${contactedLeads}</div>
          <div class="text-xs text-white/40 mt-1">Contacted</div>
        </div>
        <div class="glass-card p-4 text-center" data-testid="stat-qualified">
          <div class="text-2xl font-bold text-[#2BDE73]">${qualifiedLeads}</div>
          <div class="text-xs text-white/40 mt-1">Qualified</div>
        </div>
        <div class="glass-card p-4 text-center" data-testid="stat-converted">
          <div class="text-2xl font-bold text-purple-400">${convertedLeads}</div>
          <div class="text-xs text-white/40 mt-1">Converted</div>
        </div>
      </div>

      <div class="glass-card overflow-hidden">
        <div class="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            x-model="searchQuery"
            placeholder="Search leads..."
            class="glass-input px-4 py-2 text-sm flex-1"
            data-testid="input-search-leads"
          />
          <select x-model="filterStatus" class="glass-input px-3 py-2 text-sm" data-testid="select-filter-status">
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
          <select x-model="filterSource" class="glass-input px-3 py-2 text-sm" data-testid="select-filter-source">
            <option value="">All Sources</option>
            <option value="contact">Contact Form</option>
            <option value="support">Support Form</option>
          </select>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left" data-testid="table-leads">
            <thead>
              <tr class="border-b border-white/5 text-white/40 text-xs uppercase tracking-wider">
                <th class="py-3 px-4 font-medium">Contact</th>
                <th class="py-3 px-4 font-medium">Company</th>
                <th class="py-3 px-4 font-medium">Volume</th>
                <th class="py-3 px-4 font-medium">Source</th>
                <th class="py-3 px-4 font-medium">Status</th>
                <th class="py-3 px-4 font-medium">Date</th>
                <th class="py-3 px-4 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              ${leadRows || '<tr><td colspan="7" class="py-12 text-center text-white/30">No leads yet. They will appear here when someone fills out a contact form.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div x-show="showMessageModal" x-cloak @click.self="showMessageModal = false"
         class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0">
      <div class="glass-card p-8 max-w-lg w-full" @click.stop data-testid="modal-message">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-white" x-text="'Message from ' + modalName"></h3>
          <button @click="showMessageModal = false" class="text-white/40 hover:text-white transition-colors" data-testid="button-close-modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="text-white/60 leading-relaxed whitespace-pre-wrap" x-text="modalMessage"></div>
      </div>
    </div>
  </div>`;

  return renderAdminLayout("Leads", bodyContent);
}
