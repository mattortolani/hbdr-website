import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderCtvOttPage(): string {
  const content = `
  ${renderPageHero("Solutions", "CTV & OTT Advertising", "Tap into the fastest-growing segment of programmatic advertising. Deliver premium video ads across connected TV and streaming platforms with SSAI and server-side ad insertion.")}

  <section class="py-24 lg:py-32" data-testid="ctv-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-ctv-overview">
          <div class="glass-tag mb-6">Premium Video</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">The Future of TV Advertising</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Connected TV and OTT platforms represent the most lucrative opportunity in programmatic advertising. With CPMs 5-10x higher than standard display, CTV offers publishers an unparalleled revenue channel. HBDR's CTV solution connects your streaming inventory to premium video demand from leading DSPs, agencies, and brand-direct buyers.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our server-side ad insertion (SSAI) technology ensures seamless, broadcast-quality ad experiences that match the production value of the surrounding content. No buffering, no latency, no ad blockers — just premium ads delivered to engaged, lean-back audiences on the biggest screen in the house.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ctv-capabilities-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Capabilities</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">End-to-End CTV Monetization</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">From ad pod management to audience targeting, everything you need to monetize streaming content.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-ssai">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Server-Side Ad Insertion (SSAI)</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Ads are stitched directly into the content stream at the manifest level, delivering a seamless viewing experience identical to linear TV. SSAI eliminates buffering between content and ads, prevents ad blocking, and supports all major streaming protocols including HLS and DASH.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Broadcast-quality ad transitions</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad-block resistant delivery</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> HLS, DASH, and CMAF support</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-ad-pods">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Ad Pod Management</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Intelligent ad pod construction with competitive separation, frequency capping, and optimal pod length configuration. Our system dynamically adjusts pre-roll, mid-roll, and post-roll positions based on content duration, viewer engagement, and revenue optimization models.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Dynamic pod length optimization</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Competitive separation rules</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Viewer-centric frequency capping</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ctv-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Platform Features</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Built for Streaming Scale</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Enterprise features that power the biggest names in streaming.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Audience Targeting", description: "Leverage first-party data, ACR signals, and contextual metadata to deliver highly targeted ads across CTV environments." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Unified Reporting", description: "Cross-platform analytics that unify CTV, OTT, and web video performance into a single dashboard with real-time metrics." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Premium Demand", description: "Direct connections to top-tier video DSPs including The Trade Desk, DV360, Amazon, and brand-direct programmatic guaranteed deals." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${i + 1}" data-testid="ctv-feature-card-${i}">
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

  ${renderCTASection("Ready to monetize your streaming content?", "Launch CTV Ads")}`;

  return renderLayout({
    title: "CTV & OTT Advertising - HBDR",
    description: "Monetize connected TV and streaming content with SSAI, premium video demand, and ad pod management. Reach engaged audiences on the biggest screen.",
    canonicalPath: "/solutions/ctv-ott",
    bodyContent: content,
  });
}

