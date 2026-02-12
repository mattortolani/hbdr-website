import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderCTASection } from "../../components/cta";

export function renderAdvertisersPage(): string {
  const dealTypes = [
    {
      title: "Private Marketplace Deals (PMPs)",
      what: "Invitation-only auctions where select advertisers bid on premium inventory before it hits the open exchange",
      benefits: [
        "Access to premium, brand-safe inventory at priority pricing",
        "Curated publisher packages by vertical (news, entertainment, sports, tech, finance, etc.)",
        "Custom audience targeting using first-party publisher data",
        "Full transparency on where your ads run",
        "Higher viewability and engagement vs. open exchange",
      ],
      how: "Work with our team to define your targeting criteria, budget, and preferred publishers. We build a custom PMP deal ID that you activate in your DSP of choice.",
    },
    {
      title: "Programmatic Guaranteed (PG)",
      what: "Fixed-price, guaranteed impressions bought programmatically — combining the efficiency of programmatic with the certainty of a direct deal",
      benefits: [
        "Guaranteed impression volume at a fixed CPM",
        "Premium placements (homepage takeovers, high-impact units, etc.)",
        "No auction competition — your creative runs guaranteed",
        "Programmatic efficiency with direct-deal certainty",
        "First-look access before PMP and open auction",
      ],
      how: "Agree on CPM, volume, targeting, and flight dates with our team. We set up the PG deal in Google Ad Manager, and you activate it in your DSP. Delivery is guaranteed.",
    },
    {
      title: "Direct Sales & Direct Placements",
      what: "Traditional direct-sold campaigns placed directly into our publishers' Google Ad Manager (GAM) accounts — no DSP required",
      benefits: [
        "Run campaigns directly in publisher GAM accounts for maximum control",
        "Custom ad formats (skins, interstitials, native, rich media, video)",
        "Sponsorship and takeover opportunities",
        "Direct relationship — no intermediary fees",
        "Custom reporting and optimization by our ad ops team",
      ],
      how: "Share your campaign brief, creative assets, and targeting requirements. Our ad operations team traffics the campaign directly into the publisher's GAM, manages delivery, provides reporting, and optimizes throughout the flight.",
    },
  ];

  const inventoryStats = [
    "Billions of monthly impressions across our publisher network",
    "Display, Video, Native, and Rich Media formats available",
    "Desktop, Mobile, Tablet, CTV, and In-App inventory",
    "Premium verticals: News, Entertainment, Sports, Technology, Finance, Lifestyle, Gaming, Health",
    "Global reach with strong US, UK, EU, LATAM, and APAC coverage",
    "All inventory is ads.txt authorized and sellers.json verified",
  ];

  const brandSafetyFeatures = [
    "All publishers vetted and approved by HBDR's quality team",
    "TAG (Trustworthy Accountability Group) certified",
    "IAS and DoubleVerify integration for viewability and brand safety",
    "Full ads.txt and sellers.json compliance across all publishers",
    "Content category and keyword-level blocking available",
    "GDPR and CCPA compliant with consent management in place",
    "Transparent reporting with placement-level data",
  ];

  const steps = [
    { num: "1", title: "Share Your Brief", desc: "Tell us about your campaign goals, target audience, budget, and preferred formats" },
    { num: "2", title: "Receive a Proposal", desc: "We'll put together a custom media plan with recommended publishers, deal types, and pricing" },
    { num: "3", title: "Activate Your Campaign", desc: "We set up deal IDs or traffic your creative directly — your campaign is live within days" },
    { num: "4", title: "Optimize & Report", desc: "Our team monitors performance, provides regular reports, and optimizes for your KPIs" },
  ];

  const content = `
  ${renderPageHero("For Advertisers", "Advertiser Solutions", "Access premium, brand-safe publisher inventory through Private Marketplace deals, Programmatic Guaranteed campaigns, and direct placements across HBDR's publisher network.")}

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="advertisers-intro-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Premium Access to Quality Inventory</h2>
        <p class="text-lg text-white/40 max-w-3xl mx-auto leading-relaxed">HBDR manages monetization for thousands of premium publisher sites across verticals. Advertisers can access this inventory through several buying methods — each designed to deliver performance, transparency, and brand safety.</p>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="advertisers-deal-types-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Flexible Deal Structures</h2>
      </div>
      <div class="space-y-8">
        ${dealTypes.map((deal, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${i + 1}" data-testid="advertiser-deal-${i}">
          <h3 class="text-2xl font-bold text-white mb-4">${deal.title}</h3>
          <div class="mb-6">
            <span class="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">What it is</span>
            <p class="text-white/40 leading-relaxed mt-2">${deal.what}</p>
          </div>
          <div class="mb-6">
            <span class="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">Benefits</span>
            <ul class="mt-3 space-y-2">
              ${deal.benefits.map(b => `
              <li class="flex items-start gap-3 text-white/40 leading-relaxed">
                <svg class="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                ${b}
              </li>`).join("")}
            </ul>
          </div>
          <div>
            <span class="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">How it works</span>
            <p class="text-white/40 leading-relaxed mt-2">${deal.how}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="advertisers-inventory-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Our Inventory at a Glance</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${inventoryStats.map((stat, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="advertiser-inventory-${i}">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <p class="text-white/60 leading-relaxed">${stat}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="advertisers-brand-safety-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Brand Safety First</h2>
        <p class="text-lg text-white/40 max-w-3xl mx-auto leading-relaxed">Every layer of our platform is built with brand safety and transparency at its core.</p>
      </div>
      <div class="glass-card p-8 animate-on-scroll" data-testid="advertisers-brand-safety-card">
        <ul class="space-y-4">
          ${brandSafetyFeatures.map(f => `
          <li class="flex items-start gap-3 text-white/40 leading-relaxed">
            <svg class="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            ${f}
          </li>`).join("")}
        </ul>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="advertisers-getting-started-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">How to Get Started</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${steps.map((s, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${i + 1}" data-testid="advertiser-step-${i}">
          <div class="step-number mb-4">${s.num}</div>
          <h3 class="text-lg font-semibold text-white mb-2">${s.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed">${s.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to reach premium audiences?", "Contact Our Sales Team")}`;

  return renderLayout({
    title: "For Advertisers - HBDR",
    description: "Access premium publisher inventory through HBDR. Run PMPs, Programmatic Guaranteed deals, and direct campaigns across our network.",
    canonicalPath: "/advertisers",
    bodyContent: content,
  });
}

