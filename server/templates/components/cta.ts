export function renderCTASection(heading: string, buttonText: string): string {
  return `
  <section class="py-24 lg:py-32 relative overflow-hidden" data-testid="cta-section">
    <div class="absolute inset-0 liquid-gradient opacity-40"></div>
    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">${heading}</h2>
      <a href="/contact" class="glass-btn text-base px-8 py-3.5 inline-flex items-center gap-2" data-testid="button-cta">
        ${buttonText}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </section>`;
}
