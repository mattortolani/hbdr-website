import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";

export function renderPressPage(): string {
  const content = `
  ${renderPageHero("Press", "Press & News", "Latest updates from HBDR. Stay informed about our milestones, product launches, and industry recognition.")}

  <!-- Press Releases -->
  <section class="py-24 lg:py-32" data-testid="press-releases-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Latest News</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Press Releases</h2>
      </div>

      <div class="space-y-6">
        ${[
          { title: "HBDR Surpasses 1 Trillion Ads Served", date: "January 2026", description: "A major milestone in programmatic advertising as HBDR processes its one trillionth ad impression, demonstrating the scale and reliability of its header bidding platform across 500+ global publishers." },
          { title: "HBDR Launches AI-Powered Bid Optimization", date: "November 2025", description: "New machine learning capabilities enable real-time bid optimization that automatically adjusts floor prices, demand partner priorities, and auction configurations to maximize publisher revenue by an additional 15-20%." },
          { title: "HBDR Expands European Operations", date: "September 2025", description: "Opening new offices in London and Berlin to better serve the growing European publisher market, bringing local expertise and GDPR-compliant ad monetization solutions to the region." },
          { title: "HBDR Named Top Ad Tech Company", date: "June 2025", description: "Industry recognition for innovation in header bidding technology. HBDR was selected from over 200 nominees for its contributions to advancing programmatic advertising and publisher revenue optimization." },
          { title: "HBDR Partners with Major CTV Platforms", date: "March 2025", description: "Expanding into connected TV advertising with partnerships across leading streaming platforms, enabling publishers to monetize CTV inventory through HBDR's unified auction technology." },
        ].map((pr, i) => `
        <div class="glass-card p-6 sm:p-8 animate-on-scroll stagger-${Math.min(i + 1, 5)}" data-testid="press-card-${i}">
          <div class="flex items-center gap-3 mb-3">
            <span class="glass-tag text-xs">${pr.date}</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">${pr.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${pr.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Media Contact & Brand Assets -->
  <section class="py-24 lg:py-32" data-testid="press-contact-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll" data-testid="card-media-contact">
          <div class="glass-tag mb-6">Media Contact</div>
          <h3 class="text-2xl font-bold text-white mb-4">Get in Touch</h3>
          <p class="text-white/40 leading-relaxed mb-6">
            For press inquiries, interview requests, or media partnerships, please reach out to our communications team.
          </p>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span class="text-white/60">press@hbdr.com</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span class="text-white/60">(786) 675-6080</span>
            </div>
          </div>
        </div>

        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-brand-assets">
          <div class="glass-tag mb-6">Brand Assets</div>
          <h3 class="text-2xl font-bold text-white mb-4">Media Kit</h3>
          <p class="text-white/40 leading-relaxed mb-6">
            Download our official logos, brand guidelines, and media assets for use in press coverage and publications. All assets are available in multiple formats and resolutions.
          </p>
          <p class="text-white/40 leading-relaxed">
            For custom brand asset requests or high-resolution images, please contact our media team at press@hbdr.com.
          </p>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Press & News - HBDR",
    description: "Latest news, press releases, and media resources from HBDR. Stay updated on our milestones and industry recognition.",
    canonicalPath: "/press",
    bodyContent: content,
  });
}

