import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderInAppAdsPage(): string {
  const content = `
  ${renderPageHero("Solutions", "In-App Advertising", "Monetize your mobile app with SDK-less integration, rewarded video, interstitials, and native ad formats that drive revenue without compromising user retention.")}

  <section class="py-24 lg:py-32" data-testid="inapp-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-inapp-overview">
          <div class="glass-tag mb-6">Mobile Monetization</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Revenue Without Friction</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            In-app advertising is the primary revenue driver for the vast majority of free-to-play mobile applications. HBDR's in-app solution offers lightweight, SDK-less integration via server-side APIs, eliminating the bloat and complexity of traditional SDK stacks while connecting your app to the full breadth of programmatic demand.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our platform supports all major in-app ad formats — including rewarded video, interstitials, banners, and native ads — with intelligent mediation that maximizes eCPM across every user session. Advanced frequency capping and placement optimization ensure ads enhance rather than interrupt the user experience.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="inapp-formats-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Ad Formats</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Formats That Perform</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every format optimized for engagement, revenue, and user retention.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Rewarded Video", description: "Users opt-in to watch 15-30 second video ads in exchange for in-app rewards. Highest eCPMs with 90%+ completion rates and positive user sentiment." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>', title: "Interstitials", description: "Full-screen ads displayed at natural transition points. Smart frequency capping and contextual triggers ensure maximum impact without disrupting app flow." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>', title: "Native Ads", description: "Seamlessly integrated ads that match your app's look and feel. Custom templates ensure native placements feel organic while delivering strong eCPMs." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z"/>', title: "Banner Ads", description: "Standard and adaptive banner placements optimized for mobile viewports. Smart refresh cycles maximize revenue per session while maintaining quality." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="inapp-format-card-${i}">
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

  <section class="py-24 lg:py-32" data-testid="inapp-integration-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-inapp-integration">
          <div class="glass-tag mb-6">Integration</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">SDK-Less Architecture</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Unlike traditional mediation platforms that require heavy SDK integrations, HBDR's server-side approach connects your app to our auction engine via lightweight API calls. This means smaller app binary sizes, fewer crashes, faster app review cycles, and the ability to update demand configurations without app store submissions.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our solution supports both iOS and Android with native-quality rendering, GDPR/CCPA-compliant consent management, and SKAdNetwork/Privacy Sandbox compatibility for post-IDFA attribution.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to monetize your app?", "Start Integration")}`;

  return renderLayout({
    title: "In-App Advertising Solutions - HBDR",
    description: "Monetize mobile apps with rewarded video, interstitials, native ads, and SDK-less integration. Maximize eCPMs while protecting user experience.",
    canonicalPath: "/solutions/in-app-ads",
    bodyContent: content,
  });
}

