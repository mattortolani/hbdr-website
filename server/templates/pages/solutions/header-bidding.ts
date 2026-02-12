import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderHeaderBiddingPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Header Bidding", "Maximize every impression with unified auctions powered by Prebid.js and server-side bidding. Our header bidding stack drives fierce competition among demand partners to unlock your true revenue potential.")}

  <section class="py-24 lg:py-32" data-testid="hb-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-hb-overview">
          <div class="glass-tag mb-6">Unified Auctions</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">How Header Bidding Works</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Header bidding revolutionizes programmatic advertising by allowing multiple demand sources to bid on your inventory simultaneously, rather than sequentially through a traditional waterfall. HBDR's implementation leverages Prebid.js — the industry-standard open-source framework — combined with our proprietary server-side bidding infrastructure to ensure every impression is sold at the highest possible price.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our unified auction engine processes bids from 50+ demand partners in under 100 milliseconds, eliminating latency concerns while creating genuine competition for every ad slot. Publishers using HBDR's header bidding solution see an average CPM uplift of 40-60% compared to traditional waterfall setups.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="hb-approach-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Approach</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Client-Side & Server-Side Bidding</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">We deploy a hybrid architecture that combines the transparency of client-side auctions with the speed and scale of server-to-server connections.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-client-side">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Client-Side (Prebid.js)</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Our optimized Prebid.js wrapper runs directly in the browser, enabling full auction transparency. We configure bid adapters for each demand partner, implement smart timeout management, and utilize price granularity settings tailored to your inventory.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Full bid-level reporting and transparency</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Cookie-based audience targeting support</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Real-time bid debugging and analytics</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-server-side">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Server-Side (Prebid Server)</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Our Prebid Server infrastructure handles high-volume server-to-server connections, dramatically reducing page latency. This enables more demand partners to participate without impacting user experience or Core Web Vitals scores.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Sub-100ms auction completion times</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Unlimited demand partner connections</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Zero impact on page load performance</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="hb-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Key Features</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Enterprise-Grade Header Bidding</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every feature designed to maximize yield and simplify operations.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Dynamic Floor Pricing", description: "AI-driven floor prices that adapt in real time to market conditions, bid density, and historical performance to maximize CPMs." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>', title: "Auto-Refresh Optimization", description: "Intelligent ad refresh cycles that maximize viewable impressions without sacrificing user experience or violating demand partner policies." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Granular Analytics", description: "Bid-level reporting across every demand partner, ad unit, device, and geography with real-time dashboards and automated alerting." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "A/B Testing Engine", description: "Run controlled experiments on bidder configurations, timeout settings, and floor prices with statistical significance tracking." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Brand Safety Controls", description: "Comprehensive blocklists, category filters, and ads.txt/sellers.json management to ensure only quality demand reaches your inventory." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>', title: "Global Demand Network", description: "Access 50+ premium SSPs and exchanges including Google AdX, Amazon TAM, Index Exchange, OpenX, and PubMatic from a single integration." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="hb-feature-card-${i}">
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

  ${renderCTASection("Ready to supercharge your header bidding?", "Start Your Free Audit")}`;

  return renderLayout({
    title: "Header Bidding Solutions - HBDR",
    description: "Maximize ad revenue with HBDR's enterprise header bidding solutions. Prebid.js, server-side bidding, unified auctions, and 50+ demand partners.",
    canonicalPath: "/solutions/header-bidding",
    bodyContent: content,
  });
}

