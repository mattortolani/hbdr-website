import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderVideoPlayerPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Video Player", "HBDR's custom-built, high-performance video player engineered for maximum ad revenue and seamless user experience across all devices.")}

  <section class="py-24 lg:py-32" data-testid="video-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-video-overview">
          <div class="glass-tag mb-6">Custom-Built Player</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Built for Revenue, Designed for Users</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR's video player is fully custom-built from the ground up — not a white-labeled third-party solution. Every line of code is optimized for both desktop and mobile, supporting instream and outstream video formats for all OLV (Online Video) purposes.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            The player generates massive RPMs and yield for publishers by delivering high-quality video ads on websites and in apps. With intelligent ad scheduling, viewability optimization, and multi-source header bidding built in, our player turns every video impression into maximum revenue.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="video-formats-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Format Support</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Every Video Format, One Player</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">From instream to outstream, our player handles every video ad format with ease.</p>
      </div>

      <div class="grid sm:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-instream">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Instream Video</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Pre-roll, mid-roll, and post-roll ads delivered within content video. Maximize engagement with ads that play alongside premium publisher content for the highest completion rates and CPMs.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Pre-roll, mid-roll, post-roll support</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad pod scheduling for multi-ad breaks</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Companion banner support</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-outstream">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Outstream Video</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            In-article, in-feed, and in-banner video that plays without requiring content video. Unlock video ad revenue on any page, even without native video content.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> In-article and in-feed placements</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> No content video required</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Viewability-triggered playback</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-sticky-player">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Floating / Sticky Player</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            The player follows users as they scroll, maintaining viewability and engagement throughout the entire session. Maximize ad completion rates with a player that stays in view.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Scroll-triggered sticky behavior</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> User-dismissible controls</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Configurable position and size</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-mobile-optimized">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Mobile-Optimized</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            A responsive player that adapts seamlessly to any screen size with touch-optimized controls. Deliver a native-like video experience on every mobile device.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Touch-friendly controls</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Adaptive aspect ratios</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Bandwidth-aware loading</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="video-revenue-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-video-revenue">
          <div class="glass-tag mb-6">Revenue Engine</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Maximizing Video RPMs</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Every aspect of the HBDR video player is engineered for the highest possible RPMs. From intelligent ad pod scheduling that sequences ads for maximum yield, to viewability optimization that keeps the player in view, our technology ensures no revenue is left on the table.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mt-8">
            ${[
              "Intelligent ad pod scheduling",
              "Viewability optimization",
              "Multi-demand-source video header bidding",
              "Lazy loading for performance",
              "Adaptive bitrate for quality across connections",
              "VAST/VPAID/VMAP compliance",
            ].map(f => `
            <div class="flex items-start gap-3">
              <span class="text-[var(--accent)] mt-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </span>
              <span class="text-white/50 text-[0.9375rem]">${f}</span>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="video-technical-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Technical Excellence</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Built to Perform, Built to Scale</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Enterprise-grade video technology that meets the highest standards.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>', title: "Lightweight & Fast", description: "Minimal page load impact with optimized code that keeps Core Web Vitals in check." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>', title: "Cross-Browser", description: "Full compatibility across Chrome, Safari, Firefox, Edge, and all major browsers." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>', title: "AMP Compatible", description: "Full support for Accelerated Mobile Pages to reach the mobile-first audience." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>', title: "Custom Branding", description: "Fully customizable player skin and branding to match your site's design." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Privacy Compliant", description: "GDPR/CCPA compliant consent integration built directly into the player." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Video Analytics", description: "Detailed video-specific analytics and reporting for every impression and engagement." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "A/B Testing", description: "Test different ad configurations to find the optimal setup for your audience." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"/>', title: "Anti-Fraud & IVT", description: "Built-in protection against invalid traffic and ad fraud to safeguard your revenue." },
        ].map((f, i) => `
        <div class="glass-card p-6 group animate-on-scroll stagger-${(i % 4) + 1}" data-testid="video-tech-card-${i}">
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

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to monetize with video?", "Get Started")}`;

  return renderLayout({
    title: "Video Player - HBDR",
    description: "HBDR's custom-built video player optimized for maximum ad revenue. Supports instream, outstream, floating player, and mobile-optimized formats.",
    canonicalPath: "/solutions/video-player",
    bodyContent: content,
  });
}

