import { renderLayout } from "../layout";

export function render404Page(): string {
  const links = [
    { label: "Home", href: "/", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/>' },
    { label: "Solutions", href: "/solutions/header-bidding", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
    { label: "Publishers", href: "/publishers", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>' },
    { label: "Blog", href: "/blog", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>' },
    { label: "Contact", href: "/contact", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' },
    { label: "Tools", href: "/tools", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>' },
  ];

  const linkGrid = links.map(link => `
    <a href="${link.href}" class="glass-card p-5 flex items-center gap-3 group" data-testid="link-404-${link.label.toLowerCase()}">
      <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/10 transition-colors">
        <svg class="w-5 h-5 text-white/40 group-hover:text-[var(--accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">${link.icon}</svg>
      </div>
      <span class="text-sm font-medium text-white/60 group-hover:text-white transition-colors">${link.label}</span>
    </a>
  `).join("");

  const content = `
  <section class="relative min-h-[80vh] flex items-center justify-center py-24" data-testid="error-404">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div class="animate-on-scroll">
        <div class="font-display text-[8rem] sm:text-[10rem] lg:text-[12rem] leading-none text-gradient tracking-tight opacity-80 mb-2" style="animation: fadeInUp 0.6s ease forwards">
          404
        </div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4" style="animation: fadeInUp 0.6s 0.1s ease both">
          Page Not Found
        </h1>
        <p class="text-lg text-white/40 max-w-lg mx-auto mb-12" style="animation: fadeInUp 0.6s 0.2s ease both">
          The page you're looking for doesn't exist or has been moved. Here are some helpful links to get you back on track.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10" style="animation: fadeInUp 0.6s 0.3s ease both">
        ${linkGrid}
      </div>

      <div style="animation: fadeInUp 0.6s 0.4s ease both">
        <a href="/" class="glass-btn text-sm px-8 py-3.5 inline-flex items-center gap-2" data-testid="link-404-home-btn">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Go to Homepage
        </a>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Page Not Found - HBDR",
    description: "The page you're looking for doesn't exist. Navigate back to HBDR's homepage or explore our solutions.",
    bodyContent: content,
  });
}

export function render500Page(): string {
  const content = `
  <section class="relative min-h-[80vh] flex items-center justify-center py-24" data-testid="error-500">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div class="animate-on-scroll">
        <div class="font-display text-[8rem] sm:text-[10rem] lg:text-[12rem] leading-none text-gradient tracking-tight opacity-80 mb-2" style="animation: fadeInUp 0.6s ease forwards">
          500
        </div>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4" style="animation: fadeInUp 0.6s 0.1s ease both">
          Something Went Wrong
        </h1>
        <p class="text-lg text-white/40 max-w-lg mx-auto mb-12" style="animation: fadeInUp 0.6s 0.2s ease both">
          We're experiencing a temporary issue. Please try again in a moment, or reach out to our support team if the problem persists.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4" style="animation: fadeInUp 0.6s 0.3s ease both">
        <a href="/" class="glass-btn text-sm px-8 py-3.5 inline-flex items-center gap-2" data-testid="link-500-home">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Go to Homepage
        </a>
        <a href="/support" class="glass-btn-outline text-sm px-8 py-3.5 inline-flex items-center gap-2" data-testid="link-500-support">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          Contact Support
        </a>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Server Error - HBDR",
    description: "Something went wrong. Please try again or contact our support team.",
    bodyContent: content,
  });
}
