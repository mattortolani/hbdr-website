import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderOpenBiddingPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Open Bidding", "Leverage Google Open Bidding (formerly EBDA) for server-to-server real-time auctions that bring additional demand into your Google Ad Manager stack without client-side overhead.")}

  <section class="py-24 lg:py-32" data-testid="ob-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-ob-overview">
          <div class="glass-tag mb-6">Server-to-Server Bidding</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What is Open Bidding?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Google Open Bidding (formerly Exchange Bidding Dynamic Allocation, or EBDA) is Google's server-side bidding solution that allows third-party exchanges and SSPs to compete in a unified auction alongside Google Ad Exchange demand — all within Google Ad Manager. Unlike client-side header bidding, Open Bidding happens server-to-server, eliminating page latency while maintaining competitive auction dynamics.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            HBDR configures and manages your Open Bidding setup to complement your existing header bidding stack, creating a multi-layered auction strategy that maximizes competition and revenue. Our hybrid approach ensures you capture demand from partners that perform better in server-side environments while maintaining the transparency benefits of client-side Prebid.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ob-advantages-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Advantages</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Why Open Bidding Matters</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Combine the best of server-side speed with the scale of Google's ecosystem.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { title: "Zero Latency Impact", desc: "All auction processing happens server-to-server within Google's infrastructure. No JavaScript, no browser processing, no impact on page load speed or Core Web Vitals scores.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
          { title: "Unified Auction", desc: "Open Bidding participants compete directly against AdX demand in the same auction, ensuring the highest bid always wins. No more waterfall inefficiencies or last-look advantages.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>' },
          { title: "Simplified Billing", desc: "Revenue from all Open Bidding partners is consolidated in your Google Ad Manager payment, reducing reconciliation complexity and providing a single, reliable payment stream.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>' },
        ].map((f, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${i + 1}" data-testid="ob-advantage-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ob-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">HBDR Advantage</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Our Open Bidding Expertise</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">We maximize Open Bidding performance through strategic partner selection and ongoing optimization.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>', title: "Partner Selection", description: "We analyze your traffic profile to identify the ideal Open Bidding yield partners that complement your existing demand stack." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>', title: "Hybrid Strategy", description: "We configure Open Bidding to work seamlessly alongside Prebid.js, ensuring no demand cannibalization and optimal auction pressure." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Revenue Tracking", description: "Detailed reporting on Open Bidding contribution with win rate, CPM trends, and incremental revenue attribution versus other demand channels." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "Ongoing Tuning", description: "Continuous optimization of yield partner configurations, timeout settings, and floor prices specific to the Open Bidding auction environment." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="ob-feature-card-${i}">
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

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to activate Open Bidding?", "Get Started Today")}`;

  return renderLayout({
    title: "Open Bidding Solutions - HBDR",
    description: "Maximize revenue with Google Open Bidding. Server-to-server real-time auctions with zero latency impact and unified auction dynamics in Google Ad Manager.",
    canonicalPath: "/solutions/open-bidding",
    bodyContent: content,
  });
}

