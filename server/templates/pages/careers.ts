import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";

export function renderCareersPage(): string {
  const content = `
  ${renderPageHero("Careers", "Join Our Team", "Shape the future of ad tech. We're building the next generation of ad monetization technology and we want you on our team.")}

  <!-- Why HBDR -->
  <section class="py-24 lg:py-32" data-testid="careers-why-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Why Join Us</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Why HBDR</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Join a team that's redefining digital advertising technology.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>', title: "Cutting-Edge Technology", description: "Work with the latest in ad tech, real-time bidding systems, machine learning optimization, and distributed computing at massive scale." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Global Impact", description: "Your work impacts billions of ad impressions daily across 500+ publishers worldwide. Build systems that operate at truly global scale." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Growth & Learning", description: "Continuous learning opportunities, mentorship from industry veterans, and a clear career growth path in one of tech's fastest-growing sectors." },
        ].map((item, i) => `
        <div class="glass-card p-8 group animate-on-scroll stagger-${i + 1}" data-testid="careers-why-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${item.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${item.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${item.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Benefits -->
  <section class="py-24 lg:py-32" data-testid="careers-benefits-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Perks & Benefits</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Benefits</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">We take care of our team so they can focus on doing their best work.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>', title: "Remote-First", description: "Work from anywhere in the world with flexible location policies." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Competitive Pay", description: "Top-of-market compensation with equity and performance bonuses." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>', title: "Health & Wellness", description: "Comprehensive health, dental, and vision coverage for you and your family." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>', title: "Learning Budget", description: "Annual learning stipend for courses, conferences, and professional development." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Flexible Hours", description: "Results-oriented culture with flexible working hours and unlimited PTO." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Team Retreats", description: "Annual company retreats and quarterly team offsites around the world." },
        ].map((b, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${i + 1}" data-testid="benefit-card-${i}">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${b.icon}</svg>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">${b.title}</h3>
          <p class="text-white/40 leading-relaxed text-sm">${b.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Open Positions -->
  <section class="py-24 lg:py-32" data-testid="careers-positions-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Open Roles</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">Open Positions</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Find your next opportunity at HBDR.</p>
      </div>

      <div class="space-y-4">
        ${[
          { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Remote", description: "Build and scale our ad-serving infrastructure handling billions of daily requests. Work with real-time bidding systems, distributed architectures, and performance-critical code." },
          { title: "Ad Operations Manager", dept: "Operations", location: "New York", description: "Manage publisher relationships and optimize ad configurations for maximum revenue. Analyze performance data and implement strategic improvements across our publisher network." },
          { title: "Product Designer", dept: "Design", location: "Remote", description: "Shape the user experience of our publisher dashboard and internal tools. Design intuitive interfaces that make complex ad tech data accessible and actionable." },
          { title: "Data Scientist", dept: "Data", location: "San Francisco", description: "Develop ML models for bid optimization and revenue prediction. Build and iterate on algorithms that process billions of data points to maximize publisher yield." },
        ].map((pos, i) => `
        <div class="glass-card p-6 sm:p-8 animate-on-scroll stagger-${i + 1}" data-testid="position-card-${i}">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h3 class="text-xl font-semibold text-white">${pos.title}</h3>
              <div class="flex items-center gap-3 mt-2">
                <span class="glass-tag text-xs">${pos.dept}</span>
                <span class="text-sm text-white/40">${pos.location}</span>
              </div>
            </div>
            <a href="/contact" class="glass-btn text-sm px-6 py-2.5 text-center flex-shrink-0" data-testid="button-apply-${i}">Apply Now</a>
          </div>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${pos.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Don't see your role? Reach out anyway.", "Contact Us")}`;

  return renderLayout({
    title: "Careers - HBDR",
    description: "Join the HBDR team and shape the future of ad tech. Explore open positions in engineering, design, operations, and data science.",
    canonicalPath: "/careers",
    bodyContent: content,
  });
}

