export function renderStatsSection(): string {
  return `
  <section class="py-24 lg:py-32 relative overflow-hidden" data-testid="stats-section">
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
  </section>`;
}
