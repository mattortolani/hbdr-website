import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderAdExchangePage(): string {
  const content = `
  ${renderPageHero("Solutions", "Google Ad Exchange (AdX)", "Access the world's largest programmatic exchange with premium demand, real-time auctions, and CPMs that outperform standard AdSense by 2-3x. HBDR is your gateway to Google AdX.")}

  <section class="py-24 lg:py-32" data-testid="adx-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-adx-overview">
          <div class="glass-tag mb-6">Premium Exchange</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What is Google Ad Exchange?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Google Ad Exchange (AdX) is a premium programmatic marketplace that connects publishers with the world's largest pool of brand advertisers and agency demand. Unlike Google AdSense, which serves as an ad network with fixed pricing, AdX operates as a real-time auction exchange where thousands of buyers compete for every impression — resulting in significantly higher CPMs and fill rates.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Access to Google AdX requires either direct qualification through Google or partnership with a certified Google MCM or reseller partner like HBDR. Through our partnership, publishers of all sizes gain access to AdX's premium demand, advanced reporting, and granular controls that are otherwise only available to the largest media companies.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="adx-comparison-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">AdX vs AdSense</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Why AdX Outperforms AdSense</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">The key differences that drive 2-3x higher revenue for publishers.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-adx-benefits">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Google Ad Exchange Advantages</h3>
          <ul class="space-y-3 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Real-time auction with thousands of competing buyers</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Access to premium brand and agency demand</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Granular floor pricing and blocking controls</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Private marketplace (PMP) deal support</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Preferred deal and programmatic guaranteed capabilities</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Advanced reporting with buyer-level insights</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-adsense-comparison">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 12H6"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white/60 mb-3">Google AdSense Limitations</h3>
          <ul class="space-y-3 text-white/30 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Fixed pricing with limited competition</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Smaller pool of advertisers</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Limited pricing and blocking controls</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> No private marketplace support</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> No programmatic deal capabilities</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Basic reporting with limited transparency</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="adx-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">HBDR + AdX</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Maximize Your AdX Revenue</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Our expertise turns AdX access into maximum revenue.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "Optimized Configuration", description: "Expert setup of AdX line items, pricing rules, and creative controls tailored to your specific inventory and traffic patterns for maximum yield." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>', title: "Header Bidding + AdX", description: "Our hybrid setup ensures AdX competes against Prebid demand in a true unified auction, driving the highest possible clearing prices for every impression." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Policy & Compliance", description: "Full ads.txt and sellers.json management, content policy monitoring, and proactive compliance reviews to protect your AdX account standing." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Deal Management", description: "Set up and manage private marketplace deals, preferred deals, and programmatic guaranteed campaigns to capture premium direct-sold revenue through AdX." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Revenue Analytics", description: "Comprehensive AdX performance dashboards with buyer-level insights, price floor analysis, and competitive intelligence to inform optimization strategy." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>', title: "Dedicated Support", description: "Priority escalation to Google for account reviews, policy questions, and feature access. Our direct relationship with Google ensures faster resolution times." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="adx-feature-card-${i}">
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

  ${renderCTASection("Ready to access Google Ad Exchange?", "Get AdX Access")}`;

  return renderLayout({
    title: "Google Ad Exchange (AdX) - HBDR",
    description: "Access Google Ad Exchange premium demand through HBDR. Real-time auctions, 2-3x higher CPMs than AdSense, and expert AdX management for publishers.",
    canonicalPath: "/solutions/ad-exchange-adx",
    bodyContent: content,
  });
}

