import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";

export function renderPartnersPage(): string {
  const sspPartners = [
    { name: "Google Ad Exchange (AdX)", desc: "Premium programmatic demand from Google's marketplace" },
    { name: "Amazon TAM/UAM", desc: "Amazon's Transparent Ad Marketplace and Unified Ad Marketplace" },
    { name: "Magnite (formerly Rubicon Project)", desc: "Leading independent sell-side platform" },
    { name: "PubMatic", desc: "Cloud infrastructure platform for digital advertising" },
    { name: "Index Exchange", desc: "Transparent, real-time programmatic marketplace" },
    { name: "OpenX", desc: "Technology-forward SSP with quality-focused marketplace" },
    { name: "Xandr (Microsoft)", desc: "Microsoft's advertising platform and exchange" },
    { name: "Sovrn", desc: "Publisher-focused monetization and data platform" },
    { name: "TripleLift", desc: "Native, video, and display programmatic advertising" },
    { name: "GumGum", desc: "Contextual intelligence and advertising platform" },
    { name: "33Across", desc: "Attention-based programmatic marketplace" },
    { name: "Sharethrough", desc: "Enhanced supply-side platform for human-centric advertising" },
    { name: "Sonobi", desc: "Technology platform connecting premium publishers to demand" },
    { name: "EMX Digital", desc: "Full-service programmatic exchange" },
    { name: "Criteo", desc: "Commerce media and performance advertising" },
    { name: "Kargo", desc: "Premium digital advertising for mobile and web" },
  ];

  const dspPartners = [
    { name: "Google DV360 (Display & Video 360)", desc: "Google's enterprise demand-side platform" },
    { name: "The Trade Desk", desc: "Independent DSP for omnichannel advertising" },
    { name: "Amazon DSP", desc: "Amazon's demand-side platform for programmatic buying" },
    { name: "MediaMath", desc: "Enterprise DSP for omnichannel campaigns" },
    { name: "Xandr Invest", desc: "Microsoft's programmatic buying platform" },
    { name: "Yahoo DSP", desc: "Unified demand-side buying platform" },
    { name: "Basis Technologies (Centro)", desc: "Comprehensive media automation platform" },
    { name: "StackAdapt", desc: "Multi-channel programmatic advertising platform" },
  ];

  const identityPartners = [
    { name: "Unified ID 2.0 (UID2)", desc: "Open-source identity framework for the cookieless future" },
    { name: "LiveRamp ATS (Authenticated Traffic Solution)", desc: "People-based identity resolution" },
    { name: "ID5", desc: "Universal, privacy-compliant identity infrastructure" },
    { name: "SharedID (Prebid)", desc: "First-party cookie-based identity from Prebid" },
    { name: "Google PPID (Publisher Provided Identifiers)", desc: "First-party audience signals to Google" },
    { name: "Lotame Panorama ID", desc: "People-based, privacy-compliant identity solution" },
  ];

  const compliancePartners = [
    { name: "TAG (Trustworthy Accountability Group)", desc: "Anti-fraud certification and brand safety" },
    { name: "IAB Tech Lab", desc: "ads.txt, sellers.json, app-ads.txt implementation" },
    { name: "Google CMP (Consent Management)", desc: "GDPR and CCPA consent collection" },
    { name: "Integral Ad Science (IAS)", desc: "Ad verification, viewability, and brand safety" },
    { name: "DoubleVerify", desc: "Media quality and performance authentication" },
    { name: "MOAT (Oracle)", desc: "Attention analytics and ad measurement" },
    { name: "Pixalate", desc: "Ad fraud detection and compliance analytics" },
  ];

  const techPartners = [
    { name: "Google Ad Manager (GAM)", desc: "Full ad serving and yield management integration" },
    { name: "Prebid.js", desc: "Open-source header bidding wrapper" },
    { name: "Amazon APS (A9)", desc: "Amazon Publisher Services server-to-server integration" },
    { name: "Google Open Bidding", desc: "Server-side exchange bidding through GAM" },
    { name: "Confiant", desc: "Real-time creative quality and security scanning" },
    { name: "AdLightning", desc: "Malvertising protection and creative blocking" },
    { name: "CMP Integration (OneTrust, Cookiebot, etc.)", desc: "Consent management platform integration" },
    { name: "Google Analytics & GA4", desc: "Revenue attribution and performance analytics" },
  ];

  const content = `
  ${renderPageHero("Partners", "Partners & Integrations", "Discover HBDR's extensive ecosystem of demand partners, technology integrations, and data solutions powering premium ad monetization worldwide.")}

  <section class="py-24 lg:py-32" data-testid="partners-demand-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">World-Class Demand Ecosystem</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">HBDR connects publishers to the world's largest demand sources, ensuring maximum competition for every impression and the highest possible CPMs.</p>
      </div>

      <div class="mb-16 animate-on-scroll">
        <h3 class="text-2xl font-display text-white mb-8 tracking-tight">SSP & Exchange Partners</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${sspPartners.map((p, i) => `
          <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="partner-ssp-${i}">
            <h4 class="text-lg font-semibold text-white mb-2">${p.name}</h4>
            <p class="text-white/40 text-sm leading-relaxed">${p.desc}</p>
          </div>`).join("")}
        </div>
      </div>

      <div class="animate-on-scroll">
        <h3 class="text-2xl font-display text-white mb-8 tracking-tight">DSP Partners</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${dspPartners.map((p, i) => `
          <div class="glass-card p-6 animate-on-scroll stagger-${(i % 4) + 1}" data-testid="partner-dsp-${i}">
            <h4 class="text-lg font-semibold text-white mb-2">${p.name}</h4>
            <p class="text-white/40 text-sm leading-relaxed">${p.desc}</p>
          </div>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="partners-identity-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Identity & Data Integrations</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Privacy-first identity solutions that help publishers maintain addressability and maximize revenue in a cookieless world.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${identityPartners.map((p, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="partner-identity-${i}">
          <h4 class="text-lg font-semibold text-white mb-2">${p.name}</h4>
          <p class="text-white/40 text-sm leading-relaxed">${p.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="partners-compliance-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Compliance & Verification Partners</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${compliancePartners.map((p, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 6) + 1}" data-testid="partner-compliance-${i}">
          <h4 class="text-lg font-semibold text-white mb-2">${p.name}</h4>
          <p class="text-white/40 text-sm leading-relaxed">${p.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="partners-tech-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Technology Integrations</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${techPartners.map((p, i) => `
        <div class="glass-card p-6 animate-on-scroll stagger-${(i % 4) + 1}" data-testid="partner-tech-${i}">
          <h4 class="text-lg font-semibold text-white mb-2">${p.name}</h4>
          <p class="text-white/40 text-sm leading-relaxed">${p.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to access our demand ecosystem?", "Become a Partner")}`;

  return renderLayout({
    title: "Partners & Integrations - HBDR",
    description: "Explore HBDR's extensive network of demand partners, SSPs, DSPs, and technology integrations powering premium ad monetization.",
    canonicalPath: "/partners",
    bodyContent: content,
  });
}

