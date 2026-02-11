import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";
import { renderStatsSection } from "../../components/stats";
import { renderCTASection } from "../../components/cta";

export function renderManageAccountPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Manage Account (Google MA)", "Connect to HBDR's parent MCM account in Google Ad Manager 360 and unlock premium AdX demand — while keeping full control of your own GAM and ad operations.")}

  <section class="py-24 lg:py-32" data-testid="account-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-account-overview">
          <div class="glass-tag mb-6">Google MA &middot; MCM Connection</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What Is HBDR Manage Account?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Account (MA) is a <strong class="text-white/70">Multiple Customer Management (MCM)</strong> relationship inside <strong class="text-white/70">Google Ad Manager 360</strong>. When you connect to HBDR's parent MCM account, your Google Ad Manager network is linked to our parent network as a child publisher. This connection grants your site access to <strong class="text-white/70">Google Ad Exchange (AdX)</strong> premium programmatic demand through HBDR — demand that is otherwise unavailable to publishers who don't meet Google's direct AdX eligibility requirements.
          </p>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            The key advantage of a Google MA arrangement is that <strong class="text-white/70">you continue to operate inside your own GAM</strong>. You keep your existing ad units, line items, reporting, and trafficking workflows exactly as they are. HBDR's parent MCM simply extends AdX eligibility to your account so high-value exchange demand can compete in your unified auction alongside your other demand partners.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Whether you call it a Google MA, an HBDR MA, or an MCM Manage Account connection — the result is the same: more competition for every impression, higher CPMs, and significantly more revenue, all without giving up control of your ad operations.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mcm-structure-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">How It Works</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">The MCM Parent-Child Structure</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">A transparent relationship where HBDR provides the AdX connection and you stay in the driver's seat.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1 text-center" data-testid="card-mcm-step-1">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">1</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">MCM Invitation</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            HBDR sends an MCM invitation from our Google Ad Manager 360 parent account to your GAM network. You accept the invitation directly inside your own GAM — a simple, one-click approval.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2 text-center" data-testid="card-mcm-step-2">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">2</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">AdX Demand Flows In</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Once the MCM link is active, Google Ad Exchange demand from HBDR's parent account is made available to compete in your ad auctions. AdX line items appear inside your GAM, competing alongside your existing header bidding, direct deals, and other programmatic partners.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-3 text-center" data-testid="card-mcm-step-3">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">3</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">You Stay in Control</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            You continue to manage your own GAM — your ad units, line item priorities, targeting, reporting, and yield strategy remain entirely under your control. HBDR provides the AdX connection; you run the show.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ma-benefits-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Benefits</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Why Publishers Choose HBDR MA</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Access premium Google AdX demand without changing how you run your ads.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Premium AdX Access", description: "Gain access to Google Ad Exchange's premium programmatic demand pool through HBDR's parent MCM account. AdX buyers compete directly in your GAM auction, driving up CPMs across all your inventory." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Keep Your Own GAM", description: "Unlike other MCM arrangements, a Manage Account connection means you remain the operator of your Google Ad Manager. Your ad stack, your rules, your reporting — nothing changes except more demand." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>', title: "Instant Revenue Lift", description: "Publishers typically see a 20-40% revenue increase within the first 30 days of activating HBDR MA. AdX fills impressions that your existing partners miss and raises the floor for every auction." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Unified Reporting", description: "See all AdX revenue alongside your other demand sources inside your own GAM reports. Full transparency into what HBDR MA is earning you — broken down by ad unit, geography, device, and more." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "No Technical Overhead", description: "There's no SDK to install, no code to add to your site, and no tags to change. The MCM connection is established entirely within Google Ad Manager — HBDR handles the setup and you approve it." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Dedicated Support", description: "Every HBDR MA publisher gets a dedicated account manager who monitors AdX performance, handles policy compliance, manages ads.txt and sellers.json updates, and provides monthly performance reviews." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="account-service-card-${i}">
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

  <section class="py-24 lg:py-32" data-testid="ma-who-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-ma-who">
          <div class="glass-tag mb-6">Ideal For</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Who Is Google MA Right For?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Account is built for publishers who already have an ad ops team (or handle their own ad operations) and simply need access to premium AdX demand. If you're comfortable managing your own Google Ad Manager but don't qualify for a direct Google Ad Exchange relationship — or if your current AdX partner isn't delivering the results you expect — HBDR MA is the solution.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mt-8">
            ${[
              "Publishers with their own GAM who need AdX access",
              "Sites with 1M+ monthly pageviews seeking higher CPMs",
              "Ad ops teams who want to keep control of their stack",
              "Publishers switching from underperforming MCM partners",
              "Multi-site networks looking for a single AdX connection",
              "Content creators ready to monetize with premium demand",
            ].map(item => `
            <div class="flex items-start gap-3">
              <span class="text-[var(--accent)] mt-1 flex-shrink-0">&#10003;</span>
              <span class="text-white/50 text-[0.9375rem]">${item}</span>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ma-faq-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">FAQ</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Common Questions About Google MA</h2>
      </div>

      <div class="max-w-3xl mx-auto space-y-6">
        ${[
          { q: "What does 'Manage Account' mean in Google Ad Manager?", a: "In Google Ad Manager's MCM (Multiple Customer Management) program, 'Manage Account' means the parent network (HBDR) provides demand — specifically Google AdX — to the child publisher, but the publisher continues to operate in their own GAM. The publisher manages their own ad units, line items, and yield strategy independently." },
          { q: "Will HBDR have access to my GAM?", a: "No. In a Manage Account arrangement, HBDR does not log into or manage your Google Ad Manager. The MCM link simply enables AdX demand to flow from our parent account into your auction. You maintain full administrative control of your own GAM network." },
          { q: "How is Google MA different from Manage Inventory?", a: "With Manage Account, you run your own ad operations and HBDR provides AdX access. With Manage Inventory, HBDR takes over the operational management of your ad stack entirely — setting up ad units, optimizing yield, and managing your GAM on your behalf. MA is hands-off for HBDR; MI is full-service from HBDR." },
          { q: "How quickly can I get started with HBDR MA?", a: "Once your site is approved, the MCM invitation is typically sent within 24-48 hours. After you accept the invitation in your GAM, AdX demand usually begins flowing within a few days once Google completes the policy review." },
          { q: "What are the revenue share terms?", a: "HBDR operates on a transparent revenue share model. Contact us for specific terms based on your traffic volume and inventory profile. There are no setup fees, no minimums, and no long-term contracts required." },
        ].map((faq, i) => `
        <div class="glass-card p-6 animate-on-scroll" data-testid="ma-faq-${i}">
          <h3 class="text-lg font-semibold text-white mb-3">${faq.q}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${faq.a}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to unlock AdX with HBDR Manage Account?", "Get Your MA Connection")}`;

  return renderLayout({
    title: "Manage Account (Google MA) - MCM Connection for AdX Access | HBDR",
    description: "HBDR Manage Account connects your Google Ad Manager to our parent MCM account in GAM 360, giving you premium AdX demand while you keep full control of your own GAM and ad operations. Learn about Google MA and HBDR MA.",
    ogTitle: "Google MA & HBDR MA - Manage Account MCM Connection | HBDR",
    ogDescription: "Connect to HBDR's parent MCM account in Google Ad Manager 360. Access premium AdX demand while running your own GAM. No code changes, no loss of control.",
    canonicalPath: "/solutions/manage-account",
    bodyContent: content,
  });
}

