import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";

export function renderTrustCompliancePage(): string {
  const supplyChainCards = [
    { title: "ads.txt Management", desc: "Every publisher in our network maintains an up-to-date ads.txt file listing HBDR as an authorized seller. We proactively monitor and manage ads.txt entries to prevent unauthorized inventory reselling and ensure buyers always know they're purchasing legitimate inventory." },
    { title: "sellers.json Compliance", desc: "HBDR maintains a complete and transparent sellers.json file, providing buyers with full visibility into who is selling inventory on our platform. Every publisher relationship is documented and verifiable." },
    { title: "app-ads.txt for Mobile", desc: "For our in-app publishers, we implement and maintain app-ads.txt to authorize legitimate ad sources and prevent mobile ad fraud across our app inventory." },
    { title: "SupplyChain Object (schain)", desc: "We pass complete supply chain objects in every bid request, giving DSPs and advertisers full transparency into every node in the supply path from publisher to buyer." },
  ];

  const antiFraudCards = [
    { title: "Invalid Traffic (IVT) Detection", desc: "We use multiple layers of fraud detection including pre-bid filtering, real-time monitoring, and post-bid analysis to identify and block bot traffic, click fraud, and other forms of invalid traffic." },
    { title: "Confiant Integration", desc: "Real-time creative security scanning that detects and blocks malicious ads, forced redirects, and cryptomining scripts before they reach users." },
    { title: "AdLightning Protection", desc: "Automated malvertising protection that scans every creative for quality, security, and compliance violations in real time." },
    { title: "TAG Anti-Fraud Certification", desc: "HBDR adheres to TAG's anti-fraud guidelines and participates in industry-wide efforts to combat ad fraud and protect advertiser spend." },
    { title: "Traffic Quality Monitoring", desc: "Continuous monitoring of traffic patterns across all publisher properties to identify anomalies, suspicious spikes, and potential fraud indicators." },
  ];

  const privacyCards = [
    { title: "GDPR Compliance", desc: "Full compliance with the EU General Data Protection Regulation. We implement proper consent collection, data processing agreements, and user rights management across all European traffic." },
    { title: "CCPA / CPRA Compliance", desc: "Compliance with California Consumer Privacy Act and California Privacy Rights Act, including support for the US Privacy String and Global Privacy Control signals." },
    { title: "TCF 2.0 Integration", desc: "Integration with IAB Europe's Transparency and Consent Framework, ensuring proper consent signals are passed through the programmatic supply chain." },
    { title: "CMP Integration", desc: "We work with leading Consent Management Platforms (OneTrust, Cookiebot, Didomi, etc.) to ensure publishers collect and manage user consent properly." },
    { title: "GPP Support", desc: "Support for IAB Tech Lab's Global Privacy Platform, a unified framework for handling privacy signals across multiple jurisdictions." },
    { title: "Data Minimization", desc: "We follow data minimization principles — we only collect and process data that is necessary for ad delivery and do not build user profiles or sell personal data." },
  ];

  const certifications = [
    { title: "TAG Certified", desc: "Trustworthy Accountability Group certification across anti-fraud, brand safety, and anti-piracy programs" },
    { title: "IAB Member", desc: "Active member of the Interactive Advertising Bureau, participating in industry standards development" },
    { title: "IAB Tech Lab", desc: "Compliance with IAB Tech Lab specifications including OpenRTB, ads.txt, sellers.json, and prebid standards" },
    { title: "Google Certified Publishing Partner (GCPP)", desc: "Certified by Google as a trusted partner for publisher monetization through Google Ad Manager and AdX" },
    { title: "Prebid Member", desc: "Active participant in the Prebid.org community, contributing to open-source header bidding standards" },
    { title: "Coalition for Better Ads", desc: "Adherence to the Coalition for Better Ads standards, ensuring ad formats meet user experience guidelines" },
  ];

  const capabilities = [
    { title: "Header Bidding", desc: "Client-side and server-side header bidding setup, optimization, and management using Prebid.js and server-to-server integrations" },
    { title: "Google Ad Manager (GAM)", desc: "Complete GAM account setup, configuration, yield management, and ongoing ad operations" },
    { title: "Programmatic Monetization", desc: "Open exchange, PMP, PG, and Preferred Deal management across all major SSPs and exchanges" },
    { title: "Video Advertising", desc: "Instream, outstream, and OTT/CTV video monetization with our custom-built high-performance video player" },
    { title: "Display & Native", desc: "Standard display, rich media, and native ad format optimization for maximum RPMs" },
    { title: "In-App Monetization", desc: "Mobile app ad monetization across banner, interstitial, rewarded video, and native formats" },
    { title: "Identity Solutions", desc: "Implementation of UID2, LiveRamp, ID5, and other identity solutions for the cookieless future" },
    { title: "Ad Quality & Safety", desc: "Malvertising protection, creative scanning, and brand safety controls across all inventory" },
    { title: "Consent Management", desc: "GDPR/CCPA/GPP compliant consent collection and signal propagation" },
    { title: "Analytics & Reporting", desc: "Real-time revenue dashboard with granular breakdowns by every dimension" },
    { title: "Ad Layout Optimization", desc: "Data-driven ad placement and layout testing to maximize revenue without hurting UX" },
    { title: "Floor Price Management", desc: "Dynamic and rule-based floor pricing strategies to capture maximum value from every impression" },
  ];

  const publishersWeServe = [
    "News & Media companies",
    "Entertainment & Lifestyle sites",
    "Sports publishers",
    "Technology & SaaS blogs",
    "Finance & Investing platforms",
    "Gaming & Esports sites",
    "Education & Reference portals",
    "Health & Wellness publishers",
    "E-commerce & Shopping sites",
    "Independent bloggers & content creators",
    "Mobile app developers",
    "CTV & OTT content providers",
  ];

  const advertisersWeServe = [
    "Brand advertisers seeking premium placements",
    "Performance marketers driving conversions",
    "Agencies managing multi-brand campaigns",
    "Direct-to-consumer (DTC) brands",
    "Enterprise B2B companies",
    "Regional and local businesses seeking targeted reach",
  ];

  const content = `
  ${renderPageHero("Trust & Compliance", "Trust & Compliance", "At HBDR, trust isn't just a value — it's the foundation of everything we build. We maintain the highest standards of transparency, compliance, and security across all our operations.")}

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-commitment-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Built on Trust</h2>
        <p class="text-lg text-white/40 max-w-3xl mx-auto leading-relaxed">HBDR operates in one of the most complex ecosystems in digital advertising. With billions of ad transactions happening daily, trust and compliance aren't optional — they're essential. HBDR is committed to maintaining the highest standards across every aspect of our operations, from how we manage publisher inventory to how we handle user data.</p>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-supply-chain-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Supply Chain Transparency</h2>
      </div>
      <div class="grid sm:grid-cols-2 gap-6">
        ${supplyChainCards.map((c, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${i + 1}" data-testid="trust-supply-${i}">
          <h3 class="text-xl font-semibold text-white mb-3">${c.title}</h3>
          <p class="text-white/40 leading-relaxed">${c.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-anti-fraud-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Anti-Fraud & Traffic Quality</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${antiFraudCards.map((c, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="trust-fraud-${i}">
          <h3 class="text-lg font-semibold text-white mb-3">${c.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed">${c.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-privacy-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Privacy & Data Protection</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${privacyCards.map((c, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="trust-privacy-${i}">
          <h3 class="text-lg font-semibold text-white mb-3">${c.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed">${c.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-certifications-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Industry Partnerships & Certifications</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${certifications.map((c, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="trust-cert-${i}">
          <div class="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">${c.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed">${c.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-capabilities-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">What HBDR Does</h2>
        <p class="text-lg text-white/40 max-w-3xl mx-auto leading-relaxed">HBDR is a full-service ad technology and ad operations company serving publishers and advertisers across every channel, format, and device.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${capabilities.map((c, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="trust-capability-${i}">
          <h3 class="text-lg font-semibold text-white mb-2">${c.title}</h3>
          <p class="text-white/40 text-sm leading-relaxed">${c.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="trust-who-we-serve-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Serving Every Type of Publisher & Advertiser</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="trust-publishers-served">
          <h3 class="text-xl font-semibold text-white mb-6">Publishers We Serve</h3>
          <ul class="space-y-3">
            ${publishersWeServe.map(item => `
            <li class="flex items-start gap-3 text-white/40 leading-relaxed">
              <svg class="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              ${item}
            </li>`).join("")}
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="trust-advertisers-served">
          <h3 class="text-xl font-semibold text-white mb-6">Advertisers We Serve</h3>
          <ul class="space-y-3">
            ${advertisersWeServe.map(item => `
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

  ${renderCTASection("Ready to work with a trusted partner?", "Get In Touch")}`;

  return renderLayout({
    title: "Trust & Compliance - HBDR",
    description: "HBDR's commitment to transparency, compliance, and trust in ad technology. Learn about our certifications, policies, and industry partnerships.",
    canonicalPath: "/trust",
    bodyContent: content,
  });
}

