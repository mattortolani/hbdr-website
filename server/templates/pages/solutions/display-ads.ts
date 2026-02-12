import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderDisplayAdsPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Display Ads", "High-impact display advertising optimized for viewability, engagement, and revenue. From standard IAB units to rich media formats, we maximize every pixel.")}

  <section class="py-24 lg:py-32" data-testid="display-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-display-overview">
          <div class="glass-tag mb-6">Display Monetization</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Beyond the Banner</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Display advertising remains the backbone of digital monetization, but the landscape has evolved far beyond simple banners. HBDR's display solution optimizes across all IAB standard formats — from leaderboards and skyscrapers to high-impact adhesion units and responsive multi-size placements — ensuring maximum fill rates and CPMs across every device.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our proprietary viewability engine ensures ads are only served when they have the highest probability of being seen, improving advertiser satisfaction and commanding premium pricing. Combined with lazy loading, smart refresh, and responsive ad unit management, publishers achieve 30-50% higher display revenue.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="display-formats-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Ad Formats</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Premium Display Formats</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Optimized ad units that balance user experience with maximum revenue potential.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { title: "Responsive Multi-Size", desc: "Dynamic ad units that request multiple sizes (e.g., 300x250, 336x280, 300x600) and serve the highest-paying creative that fits the available space. Responsive containers ensure clean layouts across all viewports.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>' },
          { title: "Sticky & Adhesion Units", desc: "Bottom and side adhesion placements that maintain visibility as users scroll, delivering consistently high viewability rates above 85%. Smart dismissal and frequency controls protect user experience.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>' },
          { title: "Rich Media & Interstitials", desc: "High-impact interstitial and expandable formats for premium campaigns. Web interstitials fire between page navigations with compliant close controls and frequency capping per IAB and Google standards.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>' },
        ].map((f, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${i + 1}" data-testid="display-format-card-${i}">
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

  <section class="py-24 lg:py-32" data-testid="display-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Key Capabilities</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Intelligent Display Optimization</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every tool you need to maximize display revenue while protecting user experience.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>', title: "Viewability Optimization", description: "Lazy loading and viewport detection ensure ads load only when visible, boosting viewability rates above 70%." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>', title: "Mobile-First Design", description: "Responsive ad containers that adapt to any screen size with mobile-specific formats and touch-friendly interactions." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Brand Safety", description: "Comprehensive category blocking, advertiser exclusions, and malvertising protection to maintain site integrity." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>', title: "Core Web Vitals", description: "Optimized ad delivery that protects CLS, LCP, and FID scores, preserving SEO rankings and user experience." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="display-feature-card-${i}">
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

  ${renderCTASection("Ready to optimize your display revenue?", "Get Your Free Analysis")}`;

  return renderLayout({
    title: "Display Ads Solutions - HBDR",
    description: "Maximize display ad revenue with responsive formats, viewability optimization, and brand safety controls. Premium IAB formats and intelligent refresh.",
    canonicalPath: "/solutions/display-ads",
    bodyContent: content,
  });
}

