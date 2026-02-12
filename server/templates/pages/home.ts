import { renderLayout } from "../layout";
import { renderContactFormSection } from "../components/contact-form";

export function renderPage(): string {
  const homepageContent = `

  <!-- ========== HERO ========== -->
  <section class="relative min-h-screen flex items-center overflow-hidden liquid-gradient" data-testid="hero-section">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="text-center lg:text-left">
          <div class="glass-tag mb-8" style="animation: fadeInUp 0.6s ease forwards">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            25+ Years of Ad Tech Expertise
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.15] tracking-tight mb-6" style="animation: fadeInUp 0.7s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both">
            <span class="text-gradient font-bold">Maximize Your</span><br/>
            <span class="text-gradient-accent font-display text-5xl sm:text-6xl lg:text-[4rem] xl:text-7xl italic">Ad Revenue</span><br/>
            <span class="text-gradient font-bold">with Header Bidding</span>
          </h1>

          <p class="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0" style="animation: fadeInUp 0.6s 0.2s ease both">
            HBDR delivers enterprise-grade ad monetization solutions that help publishers increase revenue by up to 50%.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style="animation: fadeInUp 0.6s 0.3s ease both">
            <a href="/contact" class="glass-btn text-base px-8 py-3.5 text-center" data-testid="button-hero-get-started">
              Get Started Free
              <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="/how-it-works" class="glass-btn-outline text-base px-8 py-3.5 text-center" data-testid="button-hero-learn">
              Learn More
            </a>
          </div>

          <div class="grid grid-cols-3 gap-6 mt-14" style="animation: fadeInUp 0.6s 0.5s ease both">
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-white" data-testid="text-stat-revenue">50%+</div>
              <div class="text-xs sm:text-sm text-white/40 mt-1">Revenue Increase</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-white" data-testid="text-stat-publishers">500+</div>
              <div class="text-xs sm:text-sm text-white/40 mt-1">Publishers</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-white" data-testid="text-stat-impressions">1B+</div>
              <div class="text-xs sm:text-sm text-white/40 mt-1">Daily Impressions</div>
            </div>
          </div>
        </div>

        <div class="hidden lg:block" style="animation: slideInRight 0.8s 0.3s ease both">
          <div class="glass-card p-8">
            <div class="flex items-center justify-between mb-6">
              <span class="text-white/50 text-sm font-medium">Revenue Dashboard</span>
              <span class="flex items-center gap-2 text-sm">
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span class="text-green-400 font-medium">Live</span>
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">Today's Revenue</div>
                <div class="text-xl font-bold text-white">$12,847</div>
                <div class="text-green-400 text-xs mt-1">+23%</div>
              </div>
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">Fill Rate</div>
                <div class="text-xl font-bold text-white">94.2%</div>
                <div class="text-green-400 text-xs mt-1">+5.1%</div>
              </div>
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">eCPM</div>
                <div class="text-xl font-bold text-white">$4.82</div>
                <div class="text-green-400 text-xs mt-1">+18%</div>
              </div>
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">Impressions</div>
                <div class="text-xl font-bold text-white">2.7M</div>
                <div class="text-green-400 text-xs mt-1">+31%</div>
              </div>
            </div>

            <div class="bar-chart" x-data x-init="$nextTick(() => { $el.querySelectorAll('div').forEach((b, i) => { b.style.height = b.dataset.h }) })">
              <div data-h="40%" style="height: 0%"></div>
              <div data-h="65%" style="height: 0%"></div>
              <div data-h="45%" style="height: 0%"></div>
              <div data-h="80%" style="height: 0%"></div>
              <div data-h="55%" style="height: 0%"></div>
              <div data-h="90%" style="height: 0%"></div>
              <div data-h="70%" style="height: 0%"></div>
              <div data-h="85%" style="height: 0%"></div>
              <div data-h="60%" style="height: 0%"></div>
              <div data-h="95%" style="height: 0%"></div>
              <div data-h="75%" style="height: 0%"></div>
              <div data-h="88%" style="height: 0%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface)] to-transparent"></div>
  </section>


  <!-- ========== LOGO CAROUSEL ========== -->
  <section class="py-16 overflow-hidden" data-testid="logo-carousel">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <p class="text-center text-white/30 text-sm font-medium uppercase tracking-widest animate-on-scroll">
        Trusted by Leading Advertisers Worldwide
      </p>
    </div>
    <div class="space-y-4">
      ${(() => {
        const row1 = [
          { name: "Verve", domain: "verve.com", color: "#6C5CE7" },
          { name: "AppLovin", domain: "applovin.com", color: "#1A73E8" },
          { name: "Sovrn", domain: "sovrn.com", color: "#00C9A7" },
          { name: "Xandr", domain: "xandr.com", color: "#E94E77" },
          { name: "OpenX", domain: "openx.com", color: "#39B54A" },
          { name: "Index Exchange", domain: "indexexchange.com", color: "#4A90D9" },
          { name: "Magnite", domain: "magnite.com", color: "#8B5CF6" },
          { name: "Google AdX", domain: "google.com", color: "#FBBC04" },
          { name: "TripleLift", domain: "triplelift.com", color: "#00BCD4" },
          { name: "ShareThrough", domain: "sharethrough.com", color: "#FF6B6B" },
          { name: "Equativ", domain: "equativ.com", color: "#2ECC71" },
        ];
        const row2 = [
          { name: "BidSwitch", domain: "bidswitch.com", color: "#3498DB" },
          { name: "InMobi", domain: "inmobi.com", color: "#1ABC9C" },
          { name: "Amazon Publisher Services", domain: "amazon.com", color: "#FF9900" },
          { name: "Taboola", domain: "taboola.com", color: "#0066FF" },
          { name: "Dianomi", domain: "dianomi.com", color: "#E74C3C" },
          { name: "Criteo", domain: "criteo.com", color: "#F47521" },
          { name: "PubMatic", domain: "pubmatic.com", color: "#00B8D9" },
          { name: "MGID", domain: "mgid.com", color: "#9B59B6" },
          { name: "Digital Turbine", domain: "digitalturbine.com", color: "#2980B9" },
          { name: "Liftoff", domain: "liftoff.io", color: "#E91E63" },
          { name: "Bidmachine", domain: "bidmachine.io", color: "#27AE60" },
        ];
        const row3 = [
          { name: "Affinity Global", domain: "affinityglobal.com", color: "#F39C12" },
          { name: "Pubpower", domain: "pubpower.io", color: "#00ACC1" },
          { name: "AdMile", domain: "admile.com", color: "#E67E22" },
          { name: "Mobilefuse", domain: "mobilefuse.com", color: "#3498DB" },
          { name: "Bigo Ads", domain: "bigo.tv", color: "#2ECC71" },
          { name: "Nexxen", domain: "nexxen.com", color: "#9B59B6" },
          { name: "Freewheel", domain: "freewheel.com", color: "#1ABC9C" },
          { name: "Beachfront", domain: "beachfront.com", color: "#E74C3C" },
          { name: "Playbuzz", domain: "ex.co", color: "#F1C40F" },
          { name: "Amagi", domain: "amagi.com", color: "#00BCD4" },
          { name: "MediaFuse", domain: "mediafuse.com", color: "#FF6B6B" },
        ];
        const row4 = [
          { name: "Mintegral", domain: "mintegral.com", color: "#6C5CE7" },
          { name: "Improve Digital", domain: "improvedigital.com", color: "#27AE60" },
          { name: "Algorix", domain: "algorix.co", color: "#3F51B5" },
          { name: "Edge226", domain: "edge226.com", color: "#FF5722" },
          { name: "SportX", domain: "sportxmedia.com", color: "#009688" },
          { name: "Unity Technology", domain: "unity.com", color: "#E91E63" },
          { name: "Perion", domain: "perion.com", color: "#FF9800" },
          { name: "Optima", domain: "optimadigital.com", color: "#00ACC1" },
          { name: "Seedtag", domain: "seedtag.com", color: "#4CAF50" },
          { name: "Sun Media", domain: "sunmedia.tv", color: "#FFC107" },
          { name: "TaurusX", domain: "taurusx.com", color: "#7C4DFF" },
        ];
        const row5 = [
          { name: "SilverMob", domain: "silvermob.com", color: "#607D8B" },
          { name: "CPMStar", domain: "cpmstar.com", color: "#FF4081" },
          { name: "LoopMe", domain: "loopme.com", color: "#00E676" },
          { name: "TopOn", domain: "topon.com", color: "#536DFE" },
          { name: "Actirise", domain: "actirise.com", color: "#FF6D00" },
          { name: "Gadsme", domain: "gadsme.com", color: "#76FF03" },
          { name: "Nimbus Ads", domain: "adsbynimbus.com", color: "#448AFF" },
          { name: "Pixalate", domain: "pixalate.com", color: "#D500F9" },
          { name: "Media.net", domain: "media.net", color: "#00B0FF" },
          { name: "AdYouLike", domain: "adyoulike.com", color: "#FF3D00" },
          { name: "33Across", domain: "33across.com", color: "#1DE9B6" },
        ];
        const row6 = [
          { name: "Gannett", domain: "gannett.com", color: "#2979FF" },
          { name: "Teads.tv", domain: "teads.com", color: "#651FFF" },
          { name: "ConnectAd", domain: "connectad.io", color: "#F50057" },
          { name: "Vistar Media", domain: "vistarmedia.com", color: "#00C853" },
          { name: "GumGum", domain: "gumgum.com", color: "#AA00FF" },
          { name: "Nativo Edge", domain: "nativo.com", color: "#0091EA" },
          { name: "E-Planning", domain: "e-planning.net", color: "#DD2C00" },
          { name: "AdMob", domain: "admob.google.com", color: "#FFD600" },
          { name: "AdColony", domain: "adcolony.com", color: "#304FFE" },
          { name: "Adform", domain: "adform.com", color: "#C51162" },
          { name: "Kevel", domain: "kevel.com", color: "#00BFA5" },
          { name: "Underdog Media", domain: "underdogmedia.com", color: "#6200EA" },
        ];

        const renderPartnerCard = (p: {name: string; domain: string; color: string}) => `
          <div class="flex-shrink-0 mx-3">
            <div class="glass-card px-4 py-3 flex items-center gap-3" style="border-radius: 12px;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden relative" style="background: ${p.color}10;">
                <img src="https://logo.clearbit.com/${p.domain}" alt="${p.name}" class="w-7 h-7 object-contain" style="filter: brightness(1.1);" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
                <div class="w-8 h-8 rounded-lg items-center justify-center text-xs font-bold absolute inset-0" style="background: ${p.color}20; color: ${p.color}; display: none;">${p.name.substring(0, 2).toUpperCase()}</div>
              </div>
              <span class="text-sm font-semibold text-white/60 whitespace-nowrap">${p.name}</span>
            </div>
          </div>`;

        const renderRow = (partners: typeof row1, scrollClass: string) => `
          <div class="relative overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--surface)] to-transparent z-10"></div>
            <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--surface)] to-transparent z-10"></div>
            <div class="flex ${scrollClass}" style="width: max-content;">
              ${[...partners, ...partners].map(renderPartnerCard).join("")}
            </div>
          </div>`;

        return renderRow(row1, "logo-scroll") +
               renderRow(row2, "logo-scroll-reverse") +
               renderRow(row3, "logo-scroll") +
               renderRow(row4, "logo-scroll-reverse") +
               renderRow(row5, "logo-scroll") +
               renderRow(row6, "logo-scroll-reverse");
      })()}
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== SOLUTIONS ========== -->
  <section id="solutions" class="py-24 lg:py-32" data-testid="services-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Solutions</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
          <span class="text-gradient font-bold">Complete Ad Monetization</span><br/>
          <span class="text-gradient-accent font-display italic">Platform</span>
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          From header bidding to CTV, we provide end-to-end solutions to maximize your advertising revenue.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>',
            title: "Header Bidding",
            description: "Advanced header bidding that creates open auctions, allowing multiple advertisers to bid simultaneously on your inventory.",
            features: ["Real-time bidding", "Premium demand", "Higher CPMs"],
            gradient: "from-emerald-500/20 to-emerald-500/5",
            href: "/solutions/header-bidding",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>',
            title: "Display Advertising",
            description: "Website display ad monetization with smart layouts that maximize revenue while preserving user experience.",
            features: ["Smart layouts", "Viewability optimization", "Brand safety"],
            gradient: "from-purple-500/20 to-purple-500/5",
            href: "/solutions/display-ads",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
            title: "In-App Monetization",
            description: "Mobile app advertising solutions including banner, native, video, and app open ads with Google AdX integration.",
            features: ["Native formats", "Rewarded video", "Open bidding"],
            gradient: "from-green-500/20 to-green-500/5",
            href: "/solutions/in-app-ads",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
            title: "CTV Monetization",
            description: "Connected-TV advertising solutions to capture the growing streaming audience with premium video inventory.",
            features: ["SSAI support", "Premium buyers", "Cross-platform"],
            gradient: "from-amber-500/20 to-amber-500/5",
            href: "/solutions/ctv-ott",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
            title: "Video Ad Solutions",
            description: "Comprehensive video ad solutions including instream, outstream, and interactive formats for maximum engagement.",
            features: ["VAST/VPAID", "High viewability", "Engagement metrics"],
            gradient: "from-rose-500/20 to-rose-500/5",
            href: "/solutions/video-player",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
            title: "Advanced Analytics",
            description: "Detailed metrics on partner-level performance, auction data, and A/B testing capabilities for optimization.",
            features: ["Real-time data", "Custom reports", "Revenue insights"],
            gradient: "from-teal-500/20 to-teal-500/5",
            href: "/dashboard",
          },
        ]
          .map(
            (s, i) => `
        <a href="${s.href}" class="glass-card p-7 group animate-on-scroll stagger-${i + 1} block" data-testid="card-service-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${s.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${s.title}</h3>
          <p class="text-white/40 mb-5 leading-relaxed text-[0.9375rem]">${s.description}</p>
          <ul class="space-y-2 mb-5">
            ${s.features.map((f) => `<li class="flex items-center gap-2.5 text-sm text-white/50"><div class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>${f}</li>`).join("")}
          </ul>
          <div class="flex items-center gap-2 text-[var(--accent)] text-sm font-medium group-hover:gap-3 transition-all">
            Learn more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </div>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== COMPARISON TABLE ========== -->
  <section class="py-24 lg:py-32" data-testid="comparison-section">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Why HBDR</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">
          The HBDR Advantage
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          See how our comprehensive platform compares to other solutions.
        </p>
      </div>

      <div class="glass-card overflow-hidden animate-on-scroll" data-testid="comparison-table">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/5">
                <th class="text-left p-4 lg:p-5 text-sm font-semibold text-white/60">Features</th>
                <th class="p-4 lg:p-5 text-center">
                  <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-sm font-semibold">HBDR</span>
                </th>
                <th class="p-4 lg:p-5 text-center text-sm text-white/30 font-medium">Competitor A</th>
                <th class="p-4 lg:p-5 text-center text-sm text-white/30 font-medium">Competitor B</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ["Header Bidding Implementation", true, true, false],
                ["Managed Prebid Server", true, false, false],
                ["In-App SDK (Desktop & Mobile)", true, "partial", false],
                ["Real-Time Analytics Dashboard", true, true, true],
                ["Dynamic Floor Pricing", true, false, false],
                ["Custom Video Player", true, "partial", false],
                ["CTV & OTT Support", true, false, false],
                ["24/7 Technical Support", true, true, "partial"],
                ["Dedicated Account Manager", true, false, false],
                ["Revenue Guarantee", true, false, false],
              ]
                .map(
                  (row, i) => `
              <tr class="border-t border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}" data-testid="comparison-row-${i}">
                <td class="p-4 lg:p-5 text-sm font-medium text-white/80">${row[0]}</td>
                ${[row[1], row[2], row[3]]
                  .map((val) => {
                    if (val === true) return '<td class="p-4 lg:p-5 text-center"><span class="check-icon"><svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></span></td>';
                    if (val === false) return '<td class="p-4 lg:p-5 text-center"><span class="x-icon"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></span></td>';
                    return '<td class="p-4 lg:p-5 text-center"><span class="partial-icon"><svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></span></td>';
                  })
                  .join("")}
              </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== HOW IT WORKS ========== -->
  <section id="how-it-works" class="py-24 lg:py-32" data-testid="how-it-works-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Simple Process</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">
          How It Works
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          Getting started with HBDR is simple. Our streamlined process gets you monetizing faster.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 relative">
        <div class="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        ${[
          {
            step: "01",
            title: "Discovery Call",
            description: "We analyze your current ad setup, identify optimization opportunities, and discuss revenue goals in a comprehensive discovery call.",
            details: ["Analyze current ad stack", "Identify opportunities", "Discuss revenue goals"],
          },
          {
            step: "02",
            title: "Customized Proposal",
            description: "Based on our discovery, we create a tailored proposal with revenue forecasts, ad placement strategy, and implementation roadmap.",
            details: ["Revenue projections", "Ad placement strategy", "Implementation timeline"],
          },
          {
            step: "03",
            title: "Technical Implementation",
            description: "Our expert team handles the complete integration, configuring accounts, implementing code, and ensuring smooth performance.",
            details: ["Code implementation", "Platform configuration", "Performance monitoring"],
          },
        ]
          .map(
            (step, i) => `
        <div class="glass-card p-8 text-center relative animate-on-scroll stagger-${i + 1}" data-testid="step-card-${i}">
          <div class="step-number mx-auto mb-6">${step.step}</div>
          <h3 class="text-xl font-semibold text-white mb-4">${step.title}</h3>
          <p class="text-white/40 mb-6 leading-relaxed text-[0.9375rem]">${step.description}</p>
          <ul class="space-y-3">
            ${step.details
              .map(
                (d) => `
            <li class="flex items-center gap-3 text-sm text-white/50">
              <div class="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <div class="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
              </div>
              ${d}
            </li>`
              )
              .join("")}
          </ul>
        </div>`
          )
          .join("")}
      </div>

      <div class="text-center mt-16 animate-on-scroll">
        <a href="/contact" class="glass-btn text-base px-8 py-3.5 inline-flex items-center gap-2" data-testid="button-start-journey">
          Start Your Journey
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </div>
  </section>


  <!-- ========== STATS ========== -->
  <section id="about" class="py-24 lg:py-32 relative overflow-hidden" data-testid="stats-section">
    <div class="absolute inset-0 liquid-gradient opacity-50"></div>
    <div class="orb orb-1" style="opacity: 0.2; top: 10%; right: 5%;"></div>
    <div class="orb orb-2" style="opacity: 0.15; bottom: 10%; left: 10%;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Impact</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6">
          <span class="text-gradient">Delivering Results</span> <span class="text-gradient-accent italic">at Scale</span>
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          Numbers that speak for themselves.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
           x-data="{ shown: false }"
           x-intersect:enter="shown = true">
        ${[
          { value: "1T+", label: "Ads Served", sub: "And counting every second" },
          { value: "50%+", label: "Revenue Increase", sub: "Average publisher improvement" },
          { value: "1B+", label: "Daily Impressions", sub: "Across all platforms" },
          { value: "500+", label: "Publishers", sub: "Trust us worldwide" },
        ]
          .map(
            (stat, i) => `
        <div class="glass-card p-8 text-center animate-on-scroll stagger-${i + 1}" data-testid="stat-card-${i}">
          <div class="text-4xl sm:text-5xl font-bold text-white mb-2"
               x-show="shown"
               x-transition:enter="transition ease-out duration-700"
               x-transition:enter-start="opacity-0 translate-y-3"
               x-transition:enter-end="opacity-1 translate-y-0"
               style="transition-delay: ${i * 150}ms">
            ${stat.value}
          </div>
          <div class="text-[var(--accent)] font-semibold mb-1">${stat.label}</div>
          <div class="text-sm text-white/30">${stat.sub}</div>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== TESTIMONIALS ========== -->
  <section class="py-24 lg:py-32" data-testid="testimonials-section"
           x-data="{
             current: 0,
             testimonials: [
               { quote: 'HBDR has been the behind-the-scenes engine powering billions of monthly impressions across our sites. I never have to worry about scaling or downtime \\u2014 it just works flawlessly.', author: 'Sarah Chen', title: 'VP of Revenue Operations', company: 'TechMedia Group', initials: 'SC' },
               { quote: 'Working with HBDR has been a game-changer for us. We managed to boost our RPMs by 56%, and it has been a huge lifesaver for our ad operations team.', author: 'Michael Torres', title: 'Director of Ad Monetization', company: 'Digital Publishing Co', initials: 'MT' },
               { quote: 'Considering HBDR? Know this: Their team is committed to delivering the best results for your organization, actively working to continually enhance performance.', author: 'Emily Richardson', title: 'Head of Publisher Solutions', company: 'Content Network Inc', initials: 'ER' },
               { quote: 'Working with HBDR has been an eye-opener for our business. Not only has performance substantially improved, but our understanding of the marketplace has as well.', author: 'David Park', title: 'CEO', company: 'Mobile Media Labs', initials: 'DP' },
               { quote: 'Working with HBDR has been the single most impactful decision I have ever made for my business. There is not a single company that would not benefit from working with them.', author: 'Jessica Martinez', title: 'Founder', company: 'Gaming Publishers United', initials: 'JM' }
             ],
             next() { this.current = (this.current + 1) % this.testimonials.length },
             prev() { this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length },
             autoplay: null,
             startAutoplay() { this.autoplay = setInterval(() => this.next(), 6000) },
             stopAutoplay() { if (this.autoplay) clearInterval(this.autoplay) }
           }"
           x-init="startAutoplay()"
           @mouseenter="stopAutoplay()"
           @mouseleave="startAutoplay()">

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Testimonials</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">
          What Publishers Say
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          Don't just take our word for it.
        </p>
      </div>

      <div class="relative">
        <div class="glass-card p-8 sm:p-12" data-testid="testimonial-card">
          <svg class="w-10 h-10 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/>
          </svg>

          <div class="relative min-h-[200px] sm:min-h-[180px]">
            <template x-for="(t, index) in testimonials" :key="index">
              <div x-show="current === index"
                   x-transition:enter="transition ease-out duration-500"
                   x-transition:enter-start="opacity-0 translate-x-8"
                   x-transition:enter-end="opacity-100 translate-x-0"
                   x-transition:leave="transition ease-in duration-300"
                   x-transition:leave-start="opacity-100 translate-x-0"
                   x-transition:leave-end="opacity-0 -translate-x-8"
                   class="absolute inset-0">
                <blockquote class="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 font-light" x-text="'&ldquo;' + t.quote + '&rdquo;'"></blockquote>
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-semibold text-sm" x-text="t.initials"></div>
                  <div>
                    <div class="font-semibold text-white" x-text="t.author"></div>
                    <div class="text-sm text-white/40" x-text="t.title"></div>
                    <div class="text-sm text-[var(--accent)]" x-text="t.company"></div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4 mt-8">
          <button @click="prev()" class="glass-card w-10 h-10 flex items-center justify-center !rounded-full cursor-pointer" data-testid="button-prev-testimonial" style="border-radius: 50%;">
            <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div class="flex gap-2">
            <template x-for="(_, index) in testimonials" :key="index">
              <button @click="current = index"
                      :class="current === index ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-white/20 hover:bg-white/40'"
                      class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                      :data-testid="'testimonial-dot-' + index"></button>
            </template>
          </div>

          <button @click="next()" class="glass-card w-10 h-10 flex items-center justify-center !rounded-full cursor-pointer" data-testid="button-next-testimonial" style="border-radius: 50%;">
            <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderContactFormSection()}`;

  return renderLayout({
    title: "HBDR - Header Bidding & Ad Monetization Solutions",
    description: "HBDR delivers enterprise-grade ad monetization and header bidding solutions. Maximize your ad revenue with our cutting-edge platform.",
    ogTitle: "HBDR - Header Bidding & Ad Monetization Solutions",
    ogDescription: "Maximize your ad revenue with HBDR's enterprise-grade header bidding platform.",
    canonicalPath: "/",
    bodyContent: homepageContent,
  });
}
