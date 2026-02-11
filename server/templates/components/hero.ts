export function renderPageHero(tag: string, title: string, description: string): string {
  return `
  <section class="relative overflow-hidden liquid-gradient pt-36 pb-20" data-testid="hero">
    <div class="orb orb-1" style="opacity: 0.2;"></div>
    <div class="orb orb-2" style="opacity: 0.12;"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="glass-tag mb-6 mx-auto w-fit" style="animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards">${tag}</div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight mb-6 text-gradient" style="animation: fadeInUp 0.7s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both">
        ${title}
      </h1>
      <p class="text-lg sm:text-xl text-white/45 leading-relaxed max-w-2xl mx-auto" style="animation: fadeInUp 0.7s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both">
        ${description}
      </p>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface)] to-transparent"></div>
  </section>`;
}
