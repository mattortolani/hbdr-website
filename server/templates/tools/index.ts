import { renderLayout } from "../layout";

function renderToolCard(id: string, title: string, description: string, icon: string, alpineData: string, inputs: string, outputs: string): string {
  return `
  <div class="glass-card p-8 sm:p-10 animate-on-scroll" data-testid="tool-${id}" x-data="${alpineData}">
    <div class="flex items-start gap-4 mb-8">
      <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center flex-shrink-0">
        <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icon}</svg>
      </div>
      <div>
        <h3 class="text-2xl font-bold text-white mb-1" data-testid="title-${id}">${title}</h3>
        <p class="text-white/40 text-sm leading-relaxed">${description}</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <div class="space-y-5">
        <div class="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">Inputs</div>
        ${inputs}
      </div>

      <div class="glass-card-inner p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <div class="text-xs font-semibold uppercase tracking-wider text-white/30 mb-5">Estimated Results</div>
        ${outputs}
      </div>
    </div>
  </div>`;
}

function renderSliderInput(model: string, label: string, min: string, max: string, step: string, unit: string, tooltip: string): string {
  return `
  <div data-testid="input-${model}">
    <div class="flex items-center justify-between mb-2">
      <label class="text-sm text-white/60 flex items-center gap-1.5">
        ${label}
        <span class="cursor-help text-white/20 hover:text-white/40 transition-colors" title="${tooltip}">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </span>
      </label>
      <span class="text-sm font-mono text-[var(--accent)]" x-text="Number(${model}).toLocaleString() + '${unit}'"></span>
    </div>
    <input type="range" x-model.number="${model}" min="${min}" max="${max}" step="${step}"
      class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]
      [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(43,222,115,0.4)]
      [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:border-0" />
  </div>`;
}

function renderSelectInput(model: string, label: string, options: {value: string, label: string}[], tooltip: string): string {
  const optionsHtml = options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
  return `
  <div data-testid="input-${model}">
    <div class="flex items-center justify-between mb-2">
      <label class="text-sm text-white/60 flex items-center gap-1.5">
        ${label}
        <span class="cursor-help text-white/20 hover:text-white/40 transition-colors" title="${tooltip}">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </span>
      </label>
    </div>
    <select x-model="${model}" class="glass-select w-full">
      ${optionsHtml}
    </select>
  </div>`;
}

function renderOutputMetric(label: string, value: string, highlight: boolean = false): string {
  const textClass = highlight ? 'text-3xl sm:text-4xl font-bold text-[var(--accent)]' : 'text-2xl sm:text-3xl font-bold text-white';
  return `
  <div data-testid="output-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
    <div class="text-xs text-white/30 mb-1">${label}</div>
    <div class="${textClass}" x-text="${value}"></div>
  </div>`;
}

function renderHbdrUplift(currentExpr: string, projectedExpr: string, fmtFn: string): string {
  return `
  <div class="glass-card p-6 rounded-2xl border border-[var(--accent)]/20 mt-6" style="border-color: rgba(43,222,115,0.2); background: rgba(43,222,115,0.03);">
    <div class="flex items-center gap-2 mb-5">
      <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
      <span class="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider">HBDR Uplift Projection</span>
    </div>
    <div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
      <div class="text-center">
        <div class="text-xs text-white/30 mb-1">Current Revenue</div>
        <div class="text-xl sm:text-2xl font-bold text-white/60" x-text="${fmtFn}(${currentExpr})"></div>
      </div>
      <div class="flex flex-col items-center gap-1">
        <svg class="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        <span class="text-xs font-mono text-[var(--accent)]">+35%</span>
      </div>
      <div class="text-center">
        <div class="text-xs text-white/30 mb-1">With HBDR</div>
        <div class="text-xl sm:text-2xl font-bold text-[var(--accent)]" x-text="${fmtFn}(${projectedExpr})"></div>
      </div>
    </div>
  </div>`;
}

export function renderPublisherToolsPage(): string {
  const content = `
  <section class="relative py-24 lg:py-32 overflow-hidden" data-testid="tools-hero">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
          </svg>
          Publisher Tools
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight mb-6 text-gradient">
          Revenue Calculators
        </h1>
        <p class="text-lg sm:text-xl text-white/40 max-w-3xl mx-auto leading-relaxed">
          Model your ad revenue across every inventory type. Adjust the sliders to see real-time estimates for display, video, in-app, and CTV/OTT monetization.
        </p>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Tab Navigation + Calculators -->
  <section class="py-8 lg:py-16" data-testid="tools-calculators" x-data="{ activeCalc: 'display' }">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Tab Buttons -->
      <div class="flex flex-wrap gap-3 justify-center mb-12" data-testid="tools-nav">
        <button @click="activeCalc = 'display'"
          :class="activeCalc === 'display' ? 'glass-btn' : 'glass-btn-outline'"
          class="text-sm px-5 py-2.5 transition-all" data-testid="tab-display">
          Display Revenue
        </button>
        <button @click="activeCalc = 'hb'"
          :class="activeCalc === 'hb' ? 'glass-btn' : 'glass-btn-outline'"
          class="text-sm px-5 py-2.5 transition-all" data-testid="tab-hb">
          Header Bidding Uplift
        </button>
        <button @click="activeCalc = 'video'"
          :class="activeCalc === 'video' ? 'glass-btn' : 'glass-btn-outline'"
          class="text-sm px-5 py-2.5 transition-all" data-testid="tab-video">
          Video Player
        </button>
        <button @click="activeCalc = 'inapp'"
          :class="activeCalc === 'inapp' ? 'glass-btn' : 'glass-btn-outline'"
          class="text-sm px-5 py-2.5 transition-all" data-testid="tab-inapp">
          In-App Ads
        </button>
        <button @click="activeCalc = 'ctv'"
          :class="activeCalc === 'ctv' ? 'glass-btn' : 'glass-btn-outline'"
          class="text-sm px-5 py-2.5 transition-all" data-testid="tab-ctv">
          CTV / OTT
        </button>
      </div>

      <!-- ===== 1. DISPLAY AD REVENUE CALCULATOR ===== -->
      <div x-show="activeCalc === 'display'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" data-testid="section-display-calc">
        ${renderToolCard(
          'display',
          'Display Ad Revenue Calculator',
          'Estimate your website display ad revenue based on traffic, ad density, fill rate, CPMs, and market factors like geo, device, vertical, and seasonality.',
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
          `{
            pageviews: 500000,
            adSlots: 4,
            fillRate: 85,
            viewability: 65,
            baseCpm: 2.50,
            geoMix: 'us',
            deviceSplit: '50-50',
            vertical: 'general',
            season: 'q2',
            get geoMultiplier() { return {us:1, eu:0.75, mixed:0.85, row:0.4}[this.geoMix] || 1 },
            get deviceMultiplier() { return {desktop:1.2, mobile:0.8, '50-50':1.0}[this.deviceSplit] || 1 },
            get verticalMultiplier() { return {finance:2.5, tech:1.8, health:1.6, news:1.2, entertainment:0.9, general:0.7}[this.vertical] || 1 },
            get seasonMultiplier() { return {q1:0.85, q2:1.0, q3:0.95, q4:1.3}[this.season] || 1 },
            get adjustedCpm() { return this.baseCpm * this.geoMultiplier * this.deviceMultiplier * this.verticalMultiplier * this.seasonMultiplier },
            get impressions() { return this.pageviews * this.adSlots },
            get filledImpressions() { return this.impressions * (this.fillRate / 100) },
            get viewableImpressions() { return this.filledImpressions * (this.viewability / 100) },
            get monthlyRevenue() { return (this.filledImpressions / 1000) * this.adjustedCpm },
            get rpm() { return this.pageviews > 0 ? (this.monthlyRevenue / this.pageviews) * 1000 : 0 },
            get effectiveEcpm() { return this.impressions > 0 ? (this.monthlyRevenue / this.impressions) * 1000 : 0 },
            fmt(n) { return '$' + n.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') },
            fmtN(n) { return n.toLocaleString() }
          }`,
          [
            renderSliderInput('pageviews', 'Monthly Pageviews', '10000', '10000000', '10000', '', 'Total monthly pageviews on your site'),
            renderSliderInput('adSlots', 'Ad Slots per Page', '1', '10', '1', '', 'Number of ad units displayed on each page'),
            renderSliderInput('fillRate', 'Fill Rate', '20', '100', '1', '%', 'Percentage of ad requests that return a paid ad'),
            renderSliderInput('viewability', 'Viewability Rate', '20', '100', '1', '%', 'Percentage of served ads that are actually viewable (50% of pixels in viewport for 1 second)'),
            renderSliderInput('baseCpm', 'Base CPM', '0.50', '15.00', '0.10', '', 'Base cost per 1,000 impressions before market adjustments'),
            renderSelectInput('geoMix', 'Geo Mix', [
              {value: 'us', label: 'US (1.0x)'},
              {value: 'eu', label: 'EU (0.75x)'},
              {value: 'mixed', label: 'Mixed (0.85x)'},
              {value: 'row', label: 'ROW (0.4x)'},
            ], 'Geographic distribution of your traffic affects CPM rates'),
            renderSelectInput('deviceSplit', 'Device Split', [
              {value: 'desktop', label: 'Desktop (1.2x)'},
              {value: 'mobile', label: 'Mobile (0.8x)'},
              {value: '50-50', label: '50-50 (1.0x)'},
            ], 'Desktop traffic typically commands higher CPMs than mobile'),
            renderSelectInput('vertical', 'Vertical', [
              {value: 'finance', label: 'Finance (2.5x)'},
              {value: 'tech', label: 'Tech (1.8x)'},
              {value: 'health', label: 'Health (1.6x)'},
              {value: 'news', label: 'News (1.2x)'},
              {value: 'entertainment', label: 'Entertainment (0.9x)'},
              {value: 'general', label: 'General (0.7x)'},
            ], 'Content vertical significantly impacts advertiser demand and CPMs'),
            renderSelectInput('season', 'Seasonality', [
              {value: 'q1', label: 'Q1 (0.85x)'},
              {value: 'q2', label: 'Q2 (1.0x)'},
              {value: 'q3', label: 'Q3 (0.95x)'},
              {value: 'q4', label: 'Q4 (1.3x)'},
            ], 'Ad spending peaks in Q4 (holiday season) and dips in Q1'),
          ].join(''),
          `
          <div class="space-y-6">
            ${renderOutputMetric('Estimated Monthly Revenue', "fmt(monthlyRevenue)", true)}
            <div class="h-px bg-white/5"></div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Adjusted CPM', "fmt(adjustedCpm)")}
              ${renderOutputMetric('Page RPM', "fmt(rpm)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Effective eCPM', "fmt(effectiveEcpm)")}
              ${renderOutputMetric('Total Impressions', "fmtN(impressions)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Filled Impressions', "fmtN(filledImpressions)")}
              ${renderOutputMetric('Viewable Impressions', "fmtN(viewableImpressions)")}
            </div>
            <div class="h-px bg-white/5"></div>
            ${renderOutputMetric('Estimated Annual Revenue', "fmt(monthlyRevenue * 12)", true)}
            <div class="h-px bg-white/5"></div>
            ${renderHbdrUplift('monthlyRevenue', 'monthlyRevenue * 1.35', 'fmt')}
            <p class="text-xs text-white/20 mt-4 text-center">Estimates based on industry benchmarks. Actual results may vary.</p>
          </div>`
        )}
      </div>

      <!-- ===== 2. HEADER BIDDING UPLIFT CALCULATOR ===== -->
      <div x-show="activeCalc === 'hb'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" data-testid="section-hb-calc">
        ${renderToolCard(
          'hb-uplift',
          'Header Bidding Uplift Calculator',
          'See how switching from a traditional waterfall to header bidding with HBDR can boost your revenue. Compare side by side.',
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>',
          `{
            monthlyImpressions: 2000000,
            currentCpm: 1.80,
            currentFill: 70,
            hbUpliftPct: 40,
            hbFillBoost: 15,
            demandPartners: 15,
            timeout: 1000,
            currentMethod: 'adsense',
            geoMix: 'us',
            get geoMultiplier() { return {us:1, eu:0.75, mixed:0.85, row:0.4}[this.geoMix] || 1 },
            get partnerMultiplier() { return Math.min(1.5, 0.7 + 0.3 * Math.log(this.demandPartners / 5) / Math.log(10)) },
            get methodMultiplier() { return {adsense:1.0, singlessp:0.7, waterfall:0.5}[this.currentMethod] || 1 },
            get effectiveUpliftPct() { return this.hbUpliftPct * this.partnerMultiplier * this.methodMultiplier },
            get currentRevenue() { return (this.monthlyImpressions / 1000) * (this.currentCpm * this.geoMultiplier) * (this.currentFill / 100) },
            get hbCpm() { return (this.currentCpm * this.geoMultiplier) * (1 + this.effectiveUpliftPct / 100) },
            get hbFill() { return Math.min(100, this.currentFill + this.hbFillBoost) },
            get hbRevenue() { return (this.monthlyImpressions / 1000) * this.hbCpm * (this.hbFill / 100) },
            get upliftAmount() { return this.hbRevenue - this.currentRevenue },
            get upliftPercent() { return this.currentRevenue > 0 ? ((this.hbRevenue - this.currentRevenue) / this.currentRevenue) * 100 : 0 },
            fmt(n) { return '$' + n.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') },
            fmtPct(n) { return n.toFixed(1) + '%' }
          }`,
          [
            renderSliderInput('monthlyImpressions', 'Monthly Impressions', '100000', '50000000', '100000', '', 'Total ad impressions served per month'),
            renderSliderInput('currentCpm', 'Current Average CPM', '0.50', '10.00', '0.10', '', 'Your current average CPM with waterfall or existing setup'),
            renderSliderInput('currentFill', 'Current Fill Rate', '30', '100', '1', '%', 'Your current ad fill rate percentage'),
            renderSliderInput('hbUpliftPct', 'Expected CPM Uplift', '10', '80', '5', '%', 'Typical header bidding CPM uplift ranges from 20-60% depending on inventory quality'),
            renderSliderInput('hbFillBoost', 'Fill Rate Improvement', '0', '30', '1', '%', 'Header bidding typically improves fill rates by 5-20% through more demand competition'),
            renderSliderInput('demandPartners', 'Demand Partners', '5', '50', '1', '', 'Number of demand partners in your header bidding wrapper (diminishing returns above ~20)'),
            renderSliderInput('timeout', 'Timeout', '200', '3000', '100', 'ms', 'Header bidding auction timeout in milliseconds'),
            renderSelectInput('currentMethod', 'Current Method', [
              {value: 'adsense', label: 'AdSense Only (1.0x)'},
              {value: 'singlessp', label: 'Single SSP (0.7x)'},
              {value: 'waterfall', label: 'Waterfall (0.5x)'},
            ], 'Your current monetization method affects how much uplift header bidding can deliver'),
            renderSelectInput('geoMix', 'Geo CPM Mix', [
              {value: 'us', label: 'US (1.0x)'},
              {value: 'eu', label: 'EU (0.75x)'},
              {value: 'mixed', label: 'Mixed (0.85x)'},
              {value: 'row', label: 'ROW (0.4x)'},
            ], 'Geographic distribution of your traffic affects baseline CPMs'),
          ].join(''),
          `
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-xs text-white/30 mb-1">Current Monthly Revenue</div>
                <div class="text-xl font-bold text-white/60 line-through" x-text="fmt(currentRevenue)"></div>
              </div>
              <div>
                <div class="text-xs text-white/30 mb-1">With Header Bidding</div>
                <div class="text-xl font-bold text-[var(--accent)]" x-text="fmt(hbRevenue)"></div>
              </div>
            </div>
            <div class="h-px bg-white/5"></div>
            ${renderOutputMetric('Additional Monthly Revenue', "'+' + fmt(upliftAmount)", true)}
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Revenue Uplift', "fmtPct(upliftPercent)")}
              ${renderOutputMetric('New Effective CPM', "fmt(hbCpm)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Current Fill Rate', "fmtPct(currentFill)")}
              ${renderOutputMetric('Projected Fill Rate', "fmtPct(hbFill)")}
            </div>
            <div class="h-px bg-white/5"></div>
            ${renderOutputMetric('Additional Annual Revenue', "'+' + fmt(upliftAmount * 12)", true)}
            <div class="h-px bg-white/5"></div>
            ${renderHbdrUplift('hbRevenue', 'hbRevenue * 1.35', 'fmt')}
            <p class="text-xs text-white/20 mt-4 text-center">Estimates based on industry benchmarks. Actual results may vary.</p>
          </div>`
        )}
      </div>

      <!-- ===== 3. VIDEO PLAYER MONETIZATION CALCULATOR ===== -->
      <div x-show="activeCalc === 'video'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" data-testid="section-video-calc">
        ${renderToolCard(
          'video',
          'Video Player Revenue Calculator',
          'Estimate your video ad revenue across pre-roll, mid-roll, and post-roll placements. Factor in content type, player position, and VAST version.',
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
          `{
            videoStarts: 300000,
            adPodsPerVideo: 2,
            adsPerPod: 2,
            videoFillRate: 75,
            completionRate: 70,
            videoCpm: 12.00,
            contentType: 'long',
            playerPosition: 'preroll',
            vastVersion: '3.0',
            get contentMultiplier() { return {short:0.7, long:1.3, live:1.5}[this.contentType] || 1 },
            get positionMultiplier() { return {preroll:1.0, inarticle:0.8, sticky:1.2}[this.playerPosition] || 1 },
            get vastMultiplier() { return {'2.0':0.8, '3.0':1.0, '4.x':1.15}[this.vastVersion] || 1 },
            get adjustedVideoCpm() { return this.videoCpm * this.contentMultiplier * this.positionMultiplier * this.vastMultiplier },
            get totalAdSlots() { return this.videoStarts * this.adPodsPerVideo * this.adsPerPod },
            get filledAds() { return this.totalAdSlots * (this.videoFillRate / 100) },
            get completedAds() { return this.filledAds * (this.completionRate / 100) },
            get monthlyRevenue() { return (this.completedAds / 1000) * this.adjustedVideoCpm },
            get effectiveCpmPerStart() { return this.videoStarts > 0 ? (this.monthlyRevenue / this.videoStarts) * 1000 : 0 },
            get revenuePerStart() { return this.videoStarts > 0 ? this.monthlyRevenue / this.videoStarts : 0 },
            fmt(n) { return '$' + n.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') },
            fmtN(n) { return n.toLocaleString() }
          }`,
          [
            renderSliderInput('videoStarts', 'Monthly Video Starts', '10000', '5000000', '10000', '', 'Total number of video plays initiated per month'),
            renderSliderInput('adPodsPerVideo', 'Ad Breaks per Video', '1', '5', '1', '', 'Number of ad breaks (pre-roll, mid-roll, post-roll) per video'),
            renderSliderInput('adsPerPod', 'Ads per Break', '1', '4', '1', '', 'Number of ad slots in each ad break/pod'),
            renderSliderInput('videoFillRate', 'Video Fill Rate', '30', '100', '1', '%', 'Percentage of VAST ad requests that return a creative'),
            renderSliderInput('completionRate', 'Ad Completion Rate (VTR)', '30', '100', '1', '%', 'Percentage of video ads watched to completion (view-through rate)'),
            renderSliderInput('videoCpm', 'Base Video CPM', '3.00', '35.00', '0.50', '', 'Base CPM for completed video ad views before adjustments'),
            renderSelectInput('contentType', 'Content Type', [
              {value: 'short', label: 'Short-form (0.7x)'},
              {value: 'long', label: 'Long-form (1.3x)'},
              {value: 'live', label: 'Live (1.5x)'},
            ], 'Longer and live content commands higher CPMs due to deeper engagement'),
            renderSelectInput('playerPosition', 'Player Position', [
              {value: 'preroll', label: 'Pre-roll (1.0x)'},
              {value: 'inarticle', label: 'In-article (0.8x)'},
              {value: 'sticky', label: 'Sticky (1.2x)'},
            ], 'Sticky players maintain viewability; in-article may have lower completion'),
            renderSelectInput('vastVersion', 'VAST Version', [
              {value: '2.0', label: 'VAST 2.0 (0.8x)'},
              {value: '3.0', label: 'VAST 3.0 (1.0x)'},
              {value: '4.x', label: 'VAST 4.x (1.15x)'},
            ], 'Newer VAST versions support more ad formats and better viewability measurement'),
          ].join(''),
          `
          <div class="space-y-6">
            ${renderOutputMetric('Estimated Monthly Revenue', "fmt(monthlyRevenue)", true)}
            <div class="h-px bg-white/5"></div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Adjusted Video CPM', "fmt(adjustedVideoCpm)")}
              ${renderOutputMetric('Revenue per Start', "fmt(revenuePerStart)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Completed Ad Views', "fmtN(Math.round(completedAds))")}
              ${renderOutputMetric('Total Ad Slots', "fmtN(totalAdSlots)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Filled Ads', "fmtN(Math.round(filledAds))")}
              ${renderOutputMetric('eCPM per Start', "fmt(effectiveCpmPerStart)")}
            </div>
            <div class="h-px bg-white/5"></div>
            ${renderOutputMetric('Estimated Annual Revenue', "fmt(monthlyRevenue * 12)", true)}
            <div class="h-px bg-white/5"></div>
            ${renderHbdrUplift('monthlyRevenue', 'monthlyRevenue * 1.35', 'fmt')}
            <p class="text-xs text-white/20 mt-4 text-center">Estimates based on industry benchmarks. Actual results may vary.</p>
          </div>`
        )}
      </div>

      <!-- ===== 4. IN-APP AD REVENUE CALCULATOR ===== -->
      <div x-show="activeCalc === 'inapp'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" data-testid="section-inapp-calc">
        ${renderToolCard(
          'inapp',
          'In-App Ad Revenue Calculator',
          'Project your mobile app ad revenue using DAU, session depth, and ad placement data. Factor in platform, ad format mix, and user engagement.',
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
          `{
            dau: 50000,
            sessionsPerUser: 3,
            adsPerSession: 4,
            inappFillRate: 80,
            inappEcpm: 5.00,
            platform: 'both',
            adFormat: 'mixed',
            engagement: 'mid',
            get platformMultiplier() { return {ios:1.3, android:0.8, both:1.0}[this.platform] || 1 },
            get formatMultiplier() { return {banners:0.5, interstitials:1.5, rewarded:2.5, mixed:1.0}[this.adFormat] || 1 },
            get engagementMultiplier() { return {casual:0.7, mid:1.0, hardcore:1.4}[this.engagement] || 1 },
            get adjustedEcpm() { return this.inappEcpm * this.platformMultiplier * this.formatMultiplier * this.engagementMultiplier },
            get monthlyActiveUsers() { return Math.round(this.dau * 3.2) },
            get dailyImpressions() { return this.dau * this.sessionsPerUser * this.adsPerSession },
            get monthlyImpressions() { return this.dailyImpressions * 30 },
            get filledImpressions() { return this.monthlyImpressions * (this.inappFillRate / 100) },
            get dailyRevenue() { return (this.dailyImpressions * (this.inappFillRate / 100) / 1000) * this.adjustedEcpm },
            get monthlyRevenue() { return this.dailyRevenue * 30 },
            get arpdau() { return this.dau > 0 ? this.dailyRevenue / this.dau : 0 },
            fmt(n) { return '$' + n.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') },
            fmtN(n) { return n.toLocaleString() }
          }`,
          [
            renderSliderInput('dau', 'Daily Active Users (DAU)', '1000', '1000000', '1000', '', 'Average number of unique users who open your app daily'),
            renderSliderInput('sessionsPerUser', 'Sessions per User/Day', '1', '10', '1', '', 'Average number of app sessions each user has per day'),
            renderSliderInput('adsPerSession', 'Ad Impressions per Session', '1', '15', '1', '', 'Number of ads shown per session (banners, interstitials, rewarded)'),
            renderSliderInput('inappFillRate', 'Fill Rate', '30', '100', '1', '%', 'Percentage of ad requests filled by demand partners'),
            renderSliderInput('inappEcpm', 'Base eCPM', '0.50', '30.00', '0.50', '', 'Base blended eCPM before platform and format adjustments'),
            renderSelectInput('platform', 'Platform', [
              {value: 'ios', label: 'iOS (1.3x)'},
              {value: 'android', label: 'Android (0.8x)'},
              {value: 'both', label: 'Both (1.0x)'},
            ], 'iOS users typically generate higher eCPMs due to demographics and spending patterns'),
            renderSelectInput('adFormat', 'Ad Format Mix', [
              {value: 'banners', label: 'Banners (0.5x)'},
              {value: 'interstitials', label: 'Interstitials (1.5x)'},
              {value: 'rewarded', label: 'Rewarded (2.5x)'},
              {value: 'mixed', label: 'Mixed (1.0x)'},
            ], 'Rewarded video commands the highest eCPMs; banners are lowest but most scalable'),
            renderSelectInput('engagement', 'Engagement Tier', [
              {value: 'casual', label: 'Casual (0.7x)'},
              {value: 'mid', label: 'Mid-Core (1.0x)'},
              {value: 'hardcore', label: 'Hardcore (1.4x)'},
            ], 'Highly engaged users are more valuable to advertisers'),
          ].join(''),
          `
          <div class="space-y-6">
            ${renderOutputMetric('Estimated Monthly Revenue', "fmt(monthlyRevenue)", true)}
            <div class="h-px bg-white/5"></div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Adjusted eCPM', "fmt(adjustedEcpm)")}
              ${renderOutputMetric('ARPDAU', "fmt(arpdau)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Daily Revenue', "fmt(dailyRevenue)")}
              ${renderOutputMetric('Monthly Impressions', "fmtN(monthlyImpressions)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Filled Impressions', "fmtN(filledImpressions)")}
              ${renderOutputMetric('Estimated MAU', "fmtN(monthlyActiveUsers)")}
            </div>
            <div class="h-px bg-white/5"></div>
            ${renderOutputMetric('Estimated Annual Revenue', "fmt(monthlyRevenue * 12)", true)}
            <div class="h-px bg-white/5"></div>
            ${renderHbdrUplift('monthlyRevenue', 'monthlyRevenue * 1.35', 'fmt')}
            <p class="text-xs text-white/20 mt-4 text-center">Estimates based on industry benchmarks. Actual results may vary.</p>
          </div>`
        )}
      </div>

      <!-- ===== 5. CTV/OTT REVENUE ESTIMATOR ===== -->
      <div x-show="activeCalc === 'ctv'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" data-testid="section-ctv-calc">
        ${renderToolCard(
          'ctv',
          'CTV & OTT Revenue Estimator',
          'Model your Connected TV and OTT streaming ad revenue. Factor in content genre, programmatic vs direct sales mix, and audience targetability.',
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 21h8"/>',
          `{
            monthlyStreams: 200000,
            avgStreamMinutes: 25,
            adBreakFrequency: 8,
            adsPerBreak: 2,
            ctvFillRate: 70,
            ctvCpm: 25.00,
            genre: 'entertainment',
            programmaticPct: 70,
            targetability: 5,
            get genreMultiplier() { return {news:1.0, sports:1.4, entertainment:1.1, lifestyle:0.9}[this.genre] || 1 },
            get directPremium() { return 1 + (1 - this.programmaticPct / 100) * 0.4 },
            get targetMultiplier() { return 0.7 + (this.targetability * 0.06) },
            get adjustedCtvCpm() { return this.ctvCpm * this.genreMultiplier * this.directPremium * this.targetMultiplier },
            get adBreaksPerStream() { return Math.floor(this.avgStreamMinutes / this.adBreakFrequency) },
            get totalAdSlots() { return this.monthlyStreams * this.adBreaksPerStream * this.adsPerBreak },
            get filledAds() { return this.totalAdSlots * (this.ctvFillRate / 100) },
            get monthlyRevenue() { return (this.filledAds / 1000) * this.adjustedCtvCpm },
            get revenuePerStream() { return this.monthlyStreams > 0 ? this.monthlyRevenue / this.monthlyStreams : 0 },
            get adLoadMinutes() { return (this.adBreaksPerStream * this.adsPerBreak * 0.5) },
            get adLoadPct() { return this.avgStreamMinutes > 0 ? (this.adLoadMinutes / this.avgStreamMinutes) * 100 : 0 },
            fmt(n) { return '$' + n.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',') },
            fmtN(n) { return n.toLocaleString() },
            fmtPct(n) { return n.toFixed(1) + '%' }
          }`,
          [
            renderSliderInput('monthlyStreams', 'Monthly Stream Sessions', '10000', '5000000', '10000', '', 'Total number of content streams/views per month'),
            renderSliderInput('avgStreamMinutes', 'Avg Stream Duration (min)', '5', '120', '1', '', 'Average length of a viewing session in minutes'),
            renderSliderInput('adBreakFrequency', 'Minutes Between Ad Breaks', '3', '20', '1', '', 'How often an ad break occurs during content playback'),
            renderSliderInput('adsPerBreak', 'Ads per Break', '1', '5', '1', '', 'Number of ads shown in each commercial break'),
            renderSliderInput('ctvFillRate', 'Fill Rate', '30', '100', '1', '%', 'Percentage of CTV ad requests that are filled with a paid ad'),
            renderSliderInput('ctvCpm', 'Base CTV CPM', '8.00', '50.00', '1.00', '', 'Base CPM for CTV/OTT inventory before adjustments'),
            renderSelectInput('genre', 'Content Genre', [
              {value: 'news', label: 'News (1.0x)'},
              {value: 'sports', label: 'Sports (1.4x)'},
              {value: 'entertainment', label: 'Entertainment (1.1x)'},
              {value: 'lifestyle', label: 'Lifestyle (0.9x)'},
            ], 'Sports and premium entertainment content command higher CPMs'),
            renderSliderInput('programmaticPct', 'Programmatic %', '0', '100', '5', '%', 'Percentage of inventory sold programmatically vs direct. Direct sales command up to 40% premium.'),
            renderSliderInput('targetability', 'Audience Targetability', '1', '10', '1', '', 'How targetable your audience is (1=broad, 10=highly specific). Better targeting increases CPMs.'),
          ].join(''),
          `
          <div class="space-y-6">
            ${renderOutputMetric('Estimated Monthly Revenue', "fmt(monthlyRevenue)", true)}
            <div class="h-px bg-white/5"></div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Adjusted CTV CPM', "fmt(adjustedCtvCpm)")}
              ${renderOutputMetric('Revenue per Stream', "fmt(revenuePerStream)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Ad Breaks per Stream', "adBreaksPerStream.toString()")}
              ${renderOutputMetric('Total Ad Slots', "fmtN(totalAdSlots)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Ads Filled', "fmtN(Math.round(filledAds))")}
              ${renderOutputMetric('Est. Ad Load', "fmtPct(adLoadPct)")}
            </div>
            <div class="grid grid-cols-2 gap-4">
              ${renderOutputMetric('Ad Minutes per Stream', "adLoadMinutes.toFixed(1) + ' min'")}
              ${renderOutputMetric('Direct Premium', "fmtPct((directPremium - 1) * 100)")}
            </div>
            <div class="h-px bg-white/5"></div>
            ${renderOutputMetric('Estimated Annual Revenue', "fmt(monthlyRevenue * 12)", true)}
            <div class="h-px bg-white/5"></div>
            ${renderHbdrUplift('monthlyRevenue', 'monthlyRevenue * 1.35', 'fmt')}
            <p class="text-xs text-white/20 mt-4 text-center">Estimates based on industry benchmarks. Actual results may vary.</p>
          </div>`
        )}
      </div>

    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- CTA Section -->
  <section class="py-24 lg:py-32" data-testid="tools-cta-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
      <div class="glass-card p-10 sm:p-16">
        <div class="glass-tag mb-6 mx-auto w-fit">Ready to Go Beyond Estimates?</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">
          Get Your Personalized Revenue Audit
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed mb-10">
          These calculators provide useful estimates, but every publisher's setup is unique. Our team will analyze your specific inventory, traffic patterns, and demand stack to show you exactly how much more you could be earning with HBDR.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/contact" class="glass-btn-primary px-10 py-4 text-lg" data-testid="link-tools-contact">
            Request a Free Audit
            <svg class="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
          <a href="/publishers" class="glass-btn px-8 py-4 text-lg" data-testid="link-tools-publishers">Learn More for Publishers</a>
        </div>
        <p class="text-sm text-white/20 mt-8">No commitment required. Results typically delivered within 48 hours.</p>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Publisher Revenue Calculators & Tools - HBDR",
    description: "Free ad revenue calculators for publishers. Estimate display, video, in-app, CTV/OTT ad revenue. Model header bidding uplift and optimize your monetization strategy.",
    canonicalPath: "/tools",
    bodyContent: content,
  });
}
