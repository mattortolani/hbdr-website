import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderPublishersPage(): string {
  const valueProps = [
    { title: "No Upfront Costs", desc: "Zero setup fees, no minimums. We invest in your success from day one." },
    { title: "Revenue Guarantee", desc: "We don't get paid unless your revenue increases. Our success is tied to yours." },
    { title: "Full Transparency", desc: "Real-time dashboard, detailed reporting, and complete visibility into every impression." },
    { title: "Dedicated Support", desc: "Your own account manager who understands your business and goals." },
    { title: "No Lock-In Contracts", desc: "Month-to-month agreements. Stay because of results, not because of contracts." },
    { title: "Enterprise Technology", desc: "The same ad stack used by the largest publishers in the world, available to everyone." },
  ];

  const onboardingSteps = [
    { num: "1", title: "Discovery Call", subtitle: "15-30 min", bullets: [
      "We learn about your site(s), traffic, current monetization setup, and goals",
      "No obligation, no pressure \u2014 just a conversation",
      "We'll give you an honest assessment of your revenue potential",
    ]},
    { num: "2", title: "Site Audit & Revenue Analysis", subtitle: "", bullets: [
      "Our team analyzes your current ad setup, page speed, and revenue data",
      "We identify optimization opportunities and projected revenue uplift",
      "You receive a detailed proposal with expected results",
    ]},
    { num: "3", title: "Technical Integration", subtitle: "", bullets: [
      "We handle all the technical work \u2014 you don't need developers",
      "We add our optimized ad tags to your Google Ad Manager (GAM) account",
      "If you don't have GAM, we set one up for you at no cost",
      "Average integration time: 2-3 business days",
    ]},
    { num: "4", title: "Testing & Optimization", subtitle: "", bullets: [
      "We run A/B tests to find the optimal ad configuration for your site",
      "Header bidding connections are activated and tuned",
      "We monitor performance closely during the first 2-4 weeks",
    ]},
    { num: "5", title: "Go Live & Ongoing Optimization", subtitle: "", bullets: [
      "Your optimized setup goes fully live",
      "Revenue dashboard access is activated with real-time data",
      "Continuous optimization \u2014 we never stop improving your performance",
      "Regular check-ins with your dedicated account manager",
    ]},
  ];

  const hbdrManages = [
    "Header bidding setup & optimization",
    "Demand partner management",
    "Ad layout & placement optimization",
    "Floor price optimization",
    "Page speed monitoring",
    "Ad quality & brand safety",
    "Revenue reporting & analytics",
    "GAM account management",
    "Consent management integration",
    "Ads.txt & sellers.json management",
  ];

  const youDo = [
    "Continue creating great content",
    "Approve ad placements on your site",
    "Review your revenue dashboard",
    "That's it \u2014 we handle everything else",
  ];

  const requirements = [
    { title: "Quality Content", desc: "Original, regularly updated content that provides value to readers" },
    { title: "Minimum Traffic", desc: "Generally 100,000+ monthly page views (we make exceptions for high-quality niche sites)" },
    { title: "Clean Traffic", desc: "Legitimate, organic traffic without bots or invalid activity" },
    { title: "Google Compliance", desc: "Site must comply with Google Ad Manager and AdSense policies" },
    { title: "User Experience", desc: "Willingness to maintain a good user experience alongside monetization" },
  ];

  const pubFaqs = [
    { q: "How much does it cost to work with HBDR?", a: "Nothing upfront. HBDR operates on a revenue-share model. We take a percentage of the incremental revenue we generate \u2014 meaning we only make money when you make more money. There are no setup fees, no monthly minimums, and no hidden charges." },
    { q: "Will HBDR's ads slow down my site?", a: "No. We prioritize page speed and use lazy loading, asynchronous ad loading, and optimized code to minimize any impact. Most publishers see no change in Core Web Vitals after integration." },
    { q: "Do I need a Google Ad Manager (GAM) account?", a: "Not necessarily. If you already have one, we integrate directly into it. If you don't, we can set one up for you at no cost as part of our onboarding process." },
    { q: "Can I keep my existing ad partners?", a: "Absolutely. We work alongside your existing setup and add our demand on top. We never ask you to remove existing revenue sources unless they're actively hurting performance." },
    { q: "What if I'm not happy with the results?", a: "We operate on month-to-month agreements with no lock-in contracts. If you're not seeing the results you want, you can part ways at any time. That said, our publisher retention rate is over 95% because we deliver." },
    { q: "How quickly will I see revenue improvements?", a: "Most publishers see measurable improvements within the first 2-4 weeks. Full optimization typically takes 30-60 days as we run tests and tune the setup for your specific audience and content." },
    { q: "What kind of reporting do I get?", a: "You get access to our real-time analytics dashboard with breakdowns by ad unit, geography, device, demand source, and more. We also provide weekly and monthly summary reports." },
    { q: "Do you work with sites outside the US?", a: "Yes. We work with publishers globally and have demand partners that cover traffic from virtually every country." },
  ];

  const content = `
  ${renderPageHero("For Publishers", "Publisher Solutions", "From day one to full optimization, HBDR makes ad monetization effortless. Here's everything you need to know about working with us.")}

  <section class="py-24 lg:py-32" data-testid="publishers-why-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Why Publishers Choose HBDR</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${valueProps.map((v, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="publisher-value-${i}">
          <h3 class="text-xl font-semibold text-white mb-3">${v.title}</h3>
          <p class="text-white/40 leading-relaxed">${v.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="publishers-onboarding-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Getting Started Is Simple</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Our onboarding process is designed to be fast and hassle-free. Most publishers are live within 5-7 business days.</p>
      </div>
      <div class="max-w-3xl mx-auto space-y-6">
        ${onboardingSteps.map((step, i) => `
        <div class="relative flex gap-6 animate-on-scroll stagger-${(i % 5) + 1}" data-testid="onboarding-step-${i}">
          ${i < onboardingSteps.length - 1 ? `<div class="absolute left-7 top-[72px] bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/30 to-transparent"></div>` : ""}
          <div class="flex-shrink-0">
            <div class="step-number">${step.num}</div>
          </div>
          <div class="glass-card p-6 flex-1">
            <h3 class="text-xl font-semibold text-white mb-1">${step.title}</h3>
            ${step.subtitle ? `<span class="text-[var(--accent)] text-sm font-medium">${step.subtitle}</span>` : ""}
            <ul class="mt-3 space-y-2">
              ${step.bullets.map(b => `<li class="flex items-start gap-2 text-white/40 text-sm leading-relaxed">
                <svg class="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                ${b}
              </li>`).join("")}
            </ul>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="publishers-handle-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">We Do the Heavy Lifting</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="publishers-hbdr-manages">
          <h3 class="text-xl font-semibold text-white mb-6">What HBDR Manages</h3>
          <ul class="space-y-3">
            ${hbdrManages.map(item => `
            <li class="flex items-start gap-3 text-white/40 leading-relaxed">
              <svg class="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              ${item}
            </li>`).join("")}
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="publishers-you-do">
          <h3 class="text-xl font-semibold text-white mb-6">What You Do</h3>
          <ul class="space-y-3">
            ${youDo.map(item => `
            <li class="flex items-start gap-3 text-white/40 leading-relaxed">
              <svg class="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              ${item}
            </li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="publishers-requirements-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Who We Work With</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">HBDR works with publishers of all sizes, from independent blogs to enterprise media companies. Here's what we look for:</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${requirements.map((r, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 5) + 1}" data-testid="publisher-req-${i}">
          <h3 class="text-lg font-semibold text-white mb-2">${r.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed">${r.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="publishers-faq-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Common Publisher Questions</h2>
      </div>
      <div class="space-y-3" x-data="{ openFaq: null }">
        ${pubFaqs.map((faq, i) => {
          const faqId = `pub-faq-${i}`;
          return `
        <div class="glass-card overflow-hidden animate-on-scroll stagger-${(i % 4) + 1}" data-testid="${faqId}">
          <button
            @click="openFaq = openFaq === '${faqId}' ? null : '${faqId}'"
            class="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
            data-testid="button-${faqId}"
          >
            <span class="font-semibold text-white/90">${faq.q}</span>
            <svg class="w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300" :class="openFaq === '${faqId}' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div x-show="openFaq === '${faqId}'" x-cloak x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-1" x-transition:enter-end="opacity-100 translate-y-0" x-transition:leave="transition ease-in duration-150" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">
            <div class="px-6 pb-6 text-white/40 leading-relaxed border-t border-white/5 pt-4">${faq.a}</div>
          </div>
        </div>`;
        }).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to grow your ad revenue?", "Get Started")}`;

  return renderLayout({
    title: "For Publishers - HBDR",
    description: "Everything publishers need to know about partnering with HBDR. From onboarding to optimization, we make ad monetization simple.",
    canonicalPath: "/publishers",
    bodyContent: content,
  });
}

