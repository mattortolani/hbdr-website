import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderStatsSection } from "../components/stats";
import { renderCTASection } from "../components/cta";

export function renderAboutPage(): string {
  const content = `
  ${renderPageHero("About Us", "About HBDR", "We are a global leader in ad monetization and header bidding solutions, helping publishers maximize their revenue since 2015.")}

  <!-- Mission -->
  <section class="py-24 lg:py-32" data-testid="about-mission-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mission">
          <div class="glass-tag mb-6">Our Mission</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Maximizing Publisher Revenue</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            At HBDR, our mission is to empower digital publishers with enterprise-grade ad monetization technology. We believe every publisher deserves access to the most advanced header bidding solutions, transparent analytics, and dedicated support to unlock their full revenue potential.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            We combine cutting-edge technology with deep industry expertise to deliver solutions that consistently outperform traditional ad networks, helping our partners achieve an average revenue increase of over 50%.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Story / Timeline -->
  <section class="py-24 lg:py-32" data-testid="about-story-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Journey</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Our Story</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Key milestones that shaped who we are today.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 relative">
        <div class="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        ${[
          { step: "2015", title: "Founded", description: "HBDR was founded with a vision to revolutionize ad monetization for digital publishers through advanced header bidding technology." },
          { step: "2020", title: "1B Daily Impressions", description: "Reached the milestone of processing over 1 billion daily ad impressions across our global network of publishers." },
          { step: "2025", title: "500+ Publishers Globally", description: "Expanded to serve over 500 publishers worldwide, processing more than 1 trillion ads served across all platforms." },
        ].map((item, i) => `
        <div class="glass-card p-8 text-center relative animate-on-scroll stagger-${i + 1}" data-testid="timeline-card-${i}">
          <div class="step-number mx-auto mb-6">${item.step}</div>
          <h3 class="text-xl font-semibold text-white mb-4">${item.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${item.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Values -->
  <section class="py-24 lg:py-32" data-testid="about-values-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">What We Stand For</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Our Values</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">The principles that guide everything we do.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>', title: "Innovation", description: "Constantly pushing boundaries with cutting-edge ad tech solutions and AI-powered optimization." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>', title: "Transparency", description: "Full visibility into performance data, auction mechanics, and revenue attribution for every publisher." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>', title: "Partnership", description: "We succeed when our publishers succeed. Every relationship is built on mutual growth and trust." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Performance", description: "Relentless focus on delivering measurable results and maximizing revenue for every partner." },
        ].map((v, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${i + 1}" data-testid="value-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${v.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${v.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${v.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Stats -->
  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- CTA -->
  ${renderCTASection("Ready to partner with us?", "Get In Touch")}`;

  return renderLayout({
    title: "About Us - HBDR",
    description: "Learn about HBDR's mission to maximize publisher revenue through advanced header bidding and ad monetization solutions.",
    canonicalPath: "/about",
    bodyContent: content,
  });
}

