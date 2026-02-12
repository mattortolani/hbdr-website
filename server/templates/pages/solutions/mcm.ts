import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderMcmPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Multiple Customer Management", "Scale your publishing network with Google's MCM program. HBDR manages the complexity of multi-publisher operations so you can focus on growing your partner portfolio.")}

  <section class="py-24 lg:py-32" data-testid="mcm-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mcm-overview">
          <div class="glass-tag mb-6">Google MCM</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What is Google MCM?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Multiple Customer Management (MCM) is Google's program that allows ad management companies to represent and manage Google Ad Manager accounts on behalf of multiple publishers. As a certified MCM partner, HBDR provides publishers access to premium Google Ad Exchange demand, advanced yield optimization, and enterprise-level support — even if they don't meet Google's individual eligibility thresholds.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Through our MCM relationship, publishers benefit from HBDR's negotiated pricing tiers, priority support channels, and access to exclusive demand that would otherwise be unavailable. We handle all the technical complexity of account provisioning, policy compliance, and revenue reconciliation.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mcm-benefits-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Benefits</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Why Publishers Choose MCM</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Unlock premium demand, simplified operations, and accelerated revenue growth through our MCM partnership.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Google AdX Access", description: "Gain access to Google Ad Exchange premium demand without meeting individual eligibility requirements. Our MCM status opens the door to the world's largest programmatic exchange." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Higher Revenue Share", description: "Benefit from HBDR's negotiated revenue share tiers that improve as your network grows. Our scale allows us to pass through better economics than publishers could achieve independently." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Policy Compliance", description: "We handle all Google Ad Manager policy enforcement, ads.txt management, and compliance monitoring so publishers can focus on creating content." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Network Management", description: "Centralized dashboard to manage all publisher accounts, monitor performance across the network, and identify optimization opportunities at scale." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>', title: "Dedicated Support", description: "Priority access to HBDR's ad operations team and escalation paths to Google for account reviews, policy questions, and technical troubleshooting." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Transparent Reporting", description: "Real-time revenue reporting with full breakdowns by publisher, ad unit, geography, and demand source. No hidden fees or opaque revenue calculations." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="mcm-benefit-card-${i}">
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

  <section class="py-24 lg:py-32" data-testid="mcm-process-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mcm-process">
          <div class="glass-tag mb-6">Onboarding</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Seamless MCM Onboarding</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Getting started with HBDR's MCM program is straightforward. We handle the Google approval process, configure your Ad Manager account, set up demand partnerships, and begin optimization — typically within 5-7 business days. Publishers retain full ownership of their accounts and data throughout the relationship.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our MCM agreement is transparent with no lock-in periods. Publishers can review performance monthly and our team provides regular optimization recommendations to continuously improve yield across all demand channels.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to join our MCM network?", "Apply for MCM")}`;

  return renderLayout({
    title: "Multiple Customer Management (MCM) - HBDR",
    description: "Join HBDR's Google MCM program. Access Google Ad Exchange, premium demand, and expert ad operations management for your publishing network.",
    canonicalPath: "/solutions/mcm",
    bodyContent: content,
  });
}

