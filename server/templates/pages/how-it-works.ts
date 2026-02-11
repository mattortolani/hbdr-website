import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";

export function renderHowItWorksPage(): string {
  const content = `
  ${renderPageHero("Our Process", "How It Works", "Our streamlined onboarding process gets you from discovery to revenue growth in weeks, not months.")}

  <!-- 3-Step Process -->
  <section class="py-24 lg:py-32" data-testid="hiw-steps-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Getting Started</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Three Simple Steps</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Getting started with HBDR is simple. Our streamlined process gets you monetizing faster.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 relative">
        <div class="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        ${[
          { step: "01", title: "Discovery Call", description: "We start with a comprehensive analysis of your current ad setup. Our team reviews your traffic patterns, existing demand partners, ad placement strategy, and revenue performance to identify optimization opportunities and set clear goals.", details: ["Deep dive into your current ad stack", "Traffic and audience analysis", "Revenue goal setting", "Competitive landscape review"] },
          { step: "02", title: "Customized Proposal", description: "Based on our discovery findings, we create a tailored monetization strategy with detailed revenue forecasts, recommended ad configurations, and a clear implementation roadmap designed specifically for your properties.", details: ["Detailed revenue projections", "Custom ad placement strategy", "Demand partner recommendations", "Implementation timeline and milestones"] },
          { step: "03", title: "Technical Implementation", description: "Our expert engineering team handles the complete integration. We configure your accounts, implement header bidding wrappers, set up analytics dashboards, and run thorough testing to ensure everything performs optimally from day one.", details: ["Header bidding code implementation", "Platform and account configuration", "Analytics dashboard setup", "Performance testing and QA"] },
        ].map((step, i) => `
        <div class="glass-card p-8 text-center relative animate-on-scroll stagger-${i + 1}" data-testid="hiw-step-card-${i}">
          <div class="step-number mx-auto mb-6">${step.step}</div>
          <h3 class="text-xl font-semibold text-white mb-4">${step.title}</h3>
          <p class="text-white/40 mb-6 leading-relaxed text-[0.9375rem]">${step.description}</p>
          <ul class="space-y-3">
            ${step.details.map((d) => `
            <li class="flex items-center gap-3 text-sm text-white/50">
              <div class="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <div class="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
              </div>
              ${d}
            </li>`).join("")}
          </ul>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- What Happens Next -->
  <section class="py-24 lg:py-32" data-testid="hiw-next-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">After Launch</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">What Happens Next</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Our partnership doesn't end at implementation. Here's how we continue to drive results.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>', title: "Ongoing Optimization", description: "Our algorithms continuously analyze auction data and adjust configurations to maximize your yield. We A/B test ad placements, floor prices, and demand partner configurations to ensure peak performance." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>', title: "Dedicated Support", description: "Every publisher gets a dedicated account manager who monitors your performance daily, provides strategic recommendations, and is available whenever you need assistance with your ad operations." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Revenue Growth", description: "Through continuous optimization, new demand partner integrations, and advanced bidding strategies, we consistently drive quarter-over-quarter revenue growth for our publisher partners." },
        ].map((item, i) => `
        <div class="glass-card p-8 group animate-on-scroll stagger-${i + 1}" data-testid="hiw-next-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${item.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${item.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${item.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- FAQ -->
  <section class="py-24 lg:py-32" data-testid="hiw-faq-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">FAQ</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Frequently Asked Questions</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Common questions about working with HBDR.</p>
      </div>

      <div class="space-y-4" x-data="{ openFaq: null }">
        ${[
          { q: "How long does integration take?", a: "Most integrations are completed within 2-4 weeks, depending on the complexity of your existing ad stack. Our engineering team handles the heavy lifting, and we work closely with your technical team to ensure a smooth transition with zero downtime." },
          { q: "Do I need to change my existing ad stack?", a: "No. HBDR works alongside your existing setup. We integrate with your current ad server and add our header bidding layer on top, complementing your existing demand sources while adding new premium demand partners to increase competition and revenue." },
          { q: "What's the minimum traffic requirement?", a: "We work with publishers starting at 10M monthly impressions. This threshold ensures that our optimization algorithms have sufficient data to deliver meaningful revenue improvements. If you're below this threshold, reach out and we'll discuss options." },
          { q: "How is HBDR different from other solutions?", a: "Unlike traditional ad networks, HBDR uses real-time header bidding technology that creates true competition for every impression. Combined with our proprietary AI-powered bid optimization, managed Prebid server, and dedicated account management, we consistently deliver 30-50% higher revenue than alternatives." },
          { q: "What kind of support do you provide?", a: "Every publisher gets a dedicated account manager who serves as your primary point of contact. You also have access to our 24/7 technical support team, detailed analytics dashboards, and regular performance review meetings to ensure your revenue goals are being met." },
        ].map((faq, i) => `
        <div class="glass-card animate-on-scroll stagger-${i + 1}" data-testid="faq-card-${i}">
          <button @click="openFaq === ${i} ? openFaq = null : openFaq = ${i}" class="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer" data-testid="faq-toggle-${i}">
            <span class="font-semibold text-white text-lg">${faq.q}</span>
            <svg :class="openFaq === ${i} ? 'rotate-180' : ''" class="w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div x-show="openFaq === ${i}" x-cloak x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" class="px-6 pb-6">
            <p class="text-white/40 leading-relaxed">${faq.a}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to get started?", "Contact Us")}`;

  return renderLayout({
    title: "How It Works - HBDR",
    description: "Learn how HBDR's simple 3-step process helps publishers maximize ad revenue through header bidding and advanced monetization.",
    canonicalPath: "/how-it-works",
    bodyContent: content,
  });
}

