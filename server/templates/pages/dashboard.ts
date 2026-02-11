import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";

export function renderDashboardPage(): string {
  const content = `
  ${renderPageHero("Dashboard", "Analytics Dashboard", "Powerful real-time analytics and reporting tools that give publishers complete visibility into every dimension of their ad performance.")}

  <section class="py-24 lg:py-32" data-testid="dashboard-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-dashboard-overview">
          <div class="glass-tag mb-6">Analytics Suite</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Your Revenue Command Center</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR's proprietary analytics dashboard is a comprehensive data suite that gives publishers complete visibility into their ad performance. From real-time revenue tracking to granular breakdowns by geography, device, and demand source, every metric you need is at your fingertips.
          </p>
          <p class="text-lg text-white/50 leading-relaxed mb-8">
            The dashboard is fully web-based, updates in real time, and is accessible from anywhere. Whether you manage a single site or a portfolio of properties, our command center consolidates all your data into one powerful interface.
          </p>
          <a href="https://dashboard.hbdr.com" target="_blank" rel="noopener noreferrer" class="glass-btn inline-flex items-center gap-2" data-testid="link-dashboard-external">
            Access Dashboard
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="dashboard-dimensions-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Data Dimensions</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Slice Your Data Any Way You Need</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Drill down into performance across every dimension that matters to your business.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>', title: "By Ad Unit", description: "Break down performance by individual ad units to identify top performers and underperformers across your inventory." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>', title: "By Geography", description: "See revenue, CPMs, and fill rates broken down by country, region, and city to optimize your geo-targeting strategy." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0"/>', title: "By Carrier", description: "Mobile carrier-level analytics showing performance across different network providers for granular mobile insights." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>', title: "By App Name & App ID", description: "For in-app publishers, drill down into individual app-level performance metrics with full app name and ID visibility." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>', title: "By Device Type", description: "Desktop, mobile, and tablet breakdowns with device-specific optimization insights to tailor your ad strategy." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "By Demand Source", description: "See which SSPs and demand partners are driving the most value, compare bid rates, and optimize your partner mix." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="dashboard-dimension-card-${i}">
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

  <section class="py-24 lg:py-32" data-testid="dashboard-revenue-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Revenue Views</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Complete Revenue Visibility</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Understand exactly where your revenue comes from with dedicated views for every monetization channel.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-adx-revenue">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">AdX Revenue & Performance</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Google Ad Exchange metrics including CPMs, fill rates, revenue, and impression-level data. Track your AdX performance in real time with full transparency into auction dynamics.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-adserver-revenue">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Ad Server Revenue & Performance</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Overall ad server (GAM) metrics and delivery data. Monitor line item pacing, total impressions served, and overall ad server revenue across all demand channels.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-3" data-testid="card-ssp-revenue">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">SSP Performance</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Individual SSP and demand partner performance comparison. Evaluate bid rates, win rates, CPMs, and revenue contribution from each partner to optimize your demand stack.
          </p>
        </div>
      </div>

      <div class="text-center mt-12 animate-on-scroll">
        <a href="https://dashboard.hbdr.com" target="_blank" rel="noopener noreferrer" class="glass-btn inline-flex items-center gap-2" data-testid="link-dashboard-external-2">
          Access Dashboard
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="dashboard-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Platform Features</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Everything You Need in One Dashboard</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Built for publishers who demand speed, accuracy, and actionable insights.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Real-Time Data", description: "Updates every few minutes so you always have the latest performance metrics." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>', title: "Custom Date Ranges", description: "Select any date range to analyze trends, compare periods, and track growth." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>', title: "Exportable Reports", description: "Download your data in CSV or PDF format for offline analysis and stakeholder sharing." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>', title: "Automated Email Reports", description: "Schedule daily or weekly reports delivered straight to your inbox." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Revenue Forecasting", description: "Predictive analytics that help you plan ahead with revenue projections." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>', title: "Anomaly Detection", description: "Automatic alerts when revenue, fill rates, or CPMs deviate from expected patterns." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>', title: "Multi-Site Management", description: "A single view across all your properties for consolidated performance monitoring." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>', title: "Access Controls", description: "User-level permissions so your team sees exactly what they need." },
        ].map((f, i) => `
        <div class="glass-card p-6 group animate-on-scroll stagger-${(i % 4) + 1}" data-testid="dashboard-feature-card-${i}">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-sm">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to see your data?", "Access Dashboard")}`;

  return renderLayout({
    title: "Analytics Dashboard - HBDR",
    description: "HBDR's proprietary analytics dashboard gives publishers complete visibility into ad performance with real-time data, revenue breakdowns, and actionable insights.",
    canonicalPath: "/dashboard",
    bodyContent: content,
  });
}

