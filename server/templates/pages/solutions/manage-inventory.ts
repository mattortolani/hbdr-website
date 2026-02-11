import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderManageInventoryPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Manage Inventory", "Full-stack ad operations by HBDR. Connect to our parent MCM account and let our team manage your entire ad inventory — yield optimization, demand management, and everything in between.")}

  <section class="py-24 lg:py-32" data-testid="inventory-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-inventory-overview">
          <div class="glass-tag mb-6">Full-Stack Ad Operations</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What Is HBDR Manage Inventory?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Inventory is a <strong class="text-white/70">full-service ad operations engagement</strong> built on top of Google's <strong class="text-white/70">Multiple Customer Management (MCM)</strong> program. Unlike our <a href="/solutions/manage-account" class="text-[var(--accent)] hover:underline">Manage Account</a> offering — where you run your own GAM and we simply provide AdX access — Manage Inventory means <strong class="text-white/70">HBDR takes over the complete management of your ad inventory</strong> inside your Google Ad Manager.
          </p>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            When you connect to HBDR's parent MCM account under a Manage Inventory arrangement, you're granting our team the access needed to operate your ad stack on your behalf. We handle everything: ad unit creation and configuration, header bidding setup, demand partner management, floor pricing, yield optimization, reporting, policy compliance, and ongoing performance tuning. You focus on creating content and growing your audience; we focus on maximizing every dollar your traffic earns.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            This is the engagement model for publishers who want to completely hand off ad monetization to a dedicated team with the tools, technology, and expertise to get the best possible results.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-how-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">How It Works</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">The MCM Manage Inventory Connection</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">You grant HBDR access to manage your GAM inventory, and our team takes it from there.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1 text-center" data-testid="card-mi-step-1">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">1</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">MCM Inventory Link</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            HBDR sends an MCM invitation from our parent Google Ad Manager 360 account. You accept the invitation inside your GAM, granting HBDR the permissions to manage your ad inventory directly.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2 text-center" data-testid="card-mi-step-2">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">2</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">HBDR Takes Over</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Our ad ops team audits your current setup, then builds and optimizes your entire ad stack from scratch — ad units, Prebid configuration, Google AdX, Open Bidding, demand partners, floor pricing, and more.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-3 text-center" data-testid="card-mi-step-3">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">3</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Continuous Optimization</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            HBDR's team continuously monitors and optimizes your yield using our proprietary tools and real-time data. You receive transparent reporting and a dedicated account manager for ongoing communication.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-services-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">What HBDR Manages</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Complete Yield Management</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every layer of your ad monetization stack, handled by our expert team using industry-leading tools.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-gam-management">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">GAM Setup & Configuration</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            HBDR builds your Google Ad Manager configuration from the ground up. We create optimized ad units, set up line item structures, configure key-value targeting, and implement the ad tags on your site. If you already have a GAM setup, we audit and restructure it for maximum performance.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad unit creation and placement strategy</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Line item architecture and priority management</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Key-value targeting and audience segmentation</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-demand-management">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Demand Partner Stack</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            We select, integrate, and manage a curated stack of demand partners tailored to your traffic profile. This includes Prebid.js header bidding, Google AdX through our MCM parent account, Open Bidding partners, and direct SSP relationships — all continuously optimized for your specific audience and content verticals.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Prebid.js configuration and bidder management</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Google AdX access through HBDR parent MCM</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> 50+ SSP and exchange integrations</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-yield-optimization">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Yield Optimization</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            HBDR's yield management team uses our proprietary optimization tools to squeeze maximum revenue from every impression. We run continuous A/B tests on floor prices, bidder configurations, ad layouts, refresh strategies, and timeout settings — making data-driven decisions that compound into significant revenue growth over time.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Dynamic floor pricing powered by ML</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Automated A/B testing across ad configurations</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad refresh and lazy-load optimization</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-reporting-compliance">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Reporting & Compliance</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Full transparency into your ad performance with custom dashboards, monthly strategy reviews, and proactive policy compliance monitoring. HBDR manages your ads.txt, sellers.json, privacy consent (CMP), and all Google policy requirements so you never have to worry about account flags or violations.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Custom revenue dashboards and reports</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> ads.txt and sellers.json management</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> CMP/consent and privacy compliance</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-ma-comparison-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mi-vs-ma">
          <div class="glass-tag mb-6">MA vs. MI</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Manage Account vs. Manage Inventory</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-8">
            Both options connect your GAM to HBDR's parent MCM account, but the level of service is completely different. Here's how to decide which is right for you:
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-[0.9375rem]">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="py-4 pr-4 text-white/70 font-semibold"></th>
                  <th class="py-4 px-4 text-white/70 font-semibold">Manage Account (MA)</th>
                  <th class="py-4 pl-4 text-white/70 font-semibold">Manage Inventory (MI)</th>
                </tr>
              </thead>
              <tbody class="text-white/40">
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Who runs GAM?</td>
                  <td class="py-3 px-4">You (the publisher)</td>
                  <td class="py-3 pl-4">HBDR</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">AdX Access</td>
                  <td class="py-3 px-4">Yes, via HBDR MCM</td>
                  <td class="py-3 pl-4">Yes, via HBDR MCM</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Ad unit setup</td>
                  <td class="py-3 px-4">You handle it</td>
                  <td class="py-3 pl-4">HBDR handles it</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Header bidding</td>
                  <td class="py-3 px-4">You configure Prebid</td>
                  <td class="py-3 pl-4">HBDR configures Prebid</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Yield optimization</td>
                  <td class="py-3 px-4">You optimize</td>
                  <td class="py-3 pl-4">HBDR optimizes</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Floor pricing</td>
                  <td class="py-3 px-4">You set floors</td>
                  <td class="py-3 pl-4">HBDR sets floors (ML-powered)</td>
                </tr>
                <tr>
                  <td class="py-3 pr-4 text-white/60 font-medium">Best for</td>
                  <td class="py-3 px-4">Publishers with ad ops teams</td>
                  <td class="py-3 pl-4">Publishers who want hands-off monetization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-tools-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">HBDR Advantage</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Our Tools & Team</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Proprietary technology and seasoned ad ops professionals working together to maximize your revenue.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Real-Time Analytics Platform", description: "HBDR's proprietary analytics dashboard gives our team (and you) real-time visibility into revenue, CPMs, fill rates, and bidder performance across every ad unit, geo, and device." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "ML-Powered Floor Engine", description: "Our machine learning floor pricing engine analyzes billions of bid signals to set optimal floors per impression, adjusting dynamically for time of day, seasonality, user value, and market conditions." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>', title: "24/7 Monitoring & Alerts", description: "Automated systems monitor your revenue around the clock. Our team gets instant alerts for fill rate drops, traffic anomalies, demand partner issues, and policy flags — so problems are fixed before you even notice." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "Automated A/B Testing", description: "HBDR runs continuous multivariate tests on bidder configurations, timeout settings, ad layouts, and refresh strategies — compounding incremental gains into significant long-term revenue growth." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Dedicated Account Manager", description: "Your dedicated HBDR account manager provides monthly performance reviews, strategic recommendations, and direct communication for any questions or requests. Real people, real responsiveness." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>', title: "Transparent Reporting", description: "No black boxes. You get full access to your revenue data, see exactly how every demand source performs, and receive clear explanations for every optimization decision HBDR makes on your behalf." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="inventory-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-who-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mi-who">
          <div class="glass-tag mb-6">Ideal For</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Who Should Choose Manage Inventory?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Inventory is the right choice for publishers who want to completely outsource their ad monetization. If you don't have an in-house ad ops team — or simply don't want to spend time managing demand partners, floor prices, and GAM configurations — this is the engagement model for you.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mt-8">
            ${[
              "Publishers without an in-house ad ops team",
              "Content creators who want to focus on content, not ads",
              "Sites looking for fully outsourced monetization",
              "Publishers frustrated with underperforming ad partners",
              "Growing sites that need expert yield management from day one",
              "Multi-site operators who need a single partner for all properties",
            ].map(item => `
            <div class="flex items-start gap-3">
              <span class="text-[var(--accent)] mt-1 flex-shrink-0">&#10003;</span>
              <span class="text-white/50 text-[0.9375rem]">${item}</span>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready for full-stack ad operations by HBDR?", "Let HBDR Manage Your Inventory")}`;

  return renderLayout({
    title: "Manage Inventory - Full-Stack Ad Operations by HBDR | MCM",
    description: "HBDR Manage Inventory is a full-service MCM engagement where HBDR manages your entire ad stack — yield optimization, header bidding, demand partners, floor pricing, and GAM operations. Let our team and tools maximize your revenue.",
    ogTitle: "HBDR Manage Inventory - Full-Stack Ad Operations & Yield Management",
    ogDescription: "Hand off your ad monetization to HBDR. We manage your GAM inventory, demand partners, yield optimization, and everything else through our MCM parent account.",
    canonicalPath: "/solutions/manage-inventory",
    bodyContent: content,
  });
}

