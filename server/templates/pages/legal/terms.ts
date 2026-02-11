import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";

export function renderTermsPage(): string {
  const content = `
  ${renderPageHero("Legal", "Terms & Conditions", "Please read these terms carefully before using HBDR's platform and services.")}

  <section class="py-20 lg:py-28" data-testid="terms-content">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll" data-testid="terms-last-updated">
        <p class="text-white/40 text-sm">Last Updated: February 2026</p>
        <p class="text-white/50 mt-4 leading-relaxed">These Terms and Conditions ("Terms") govern your access to and use of the HBDR platform, website, and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree, you may not use our services.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-1" data-testid="terms-section-acceptance">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">1. Acceptance of Terms</h2>
        <p class="text-white/40 leading-relaxed mb-4">By creating an account, accessing our platform, or using any of our ad monetization services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy-policy" class="text-[var(--accent)] hover:underline">Privacy Policy</a>. If you are using our services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
        <p class="text-white/40 leading-relaxed">You must be at least 18 years of age and legally capable of entering into binding agreements to use our services.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-2" data-testid="terms-section-services">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">2. Services Description</h2>
        <p class="text-white/40 leading-relaxed mb-4">HBDR provides ad monetization services including but not limited to:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2">
          <li>Header bidding implementation and optimization (Prebid.js, server-side bidding)</li>
          <li>Programmatic ad exchange access and demand partner management</li>
          <li>Google Ad Manager and Google Ad Exchange (AdX) integration</li>
          <li>Display, video, CTV/OTT, and in-app advertising solutions</li>
          <li>Ad inventory management, yield optimization, and revenue analytics</li>
          <li>Multiple Customer Management (MCM) services</li>
          <li>Technical support, account management, and consulting</li>
        </ul>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-3" data-testid="terms-section-account">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">3. Account Terms</h2>
        <p class="text-white/40 leading-relaxed mb-4">When you create an account with HBDR, you agree to:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security and confidentiality of your login credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized access or security breaches</li>
          <li>Comply with all applicable Google Ad Manager and AdX policies</li>
          <li>Not use our services for any unlawful or prohibited purpose</li>
        </ul>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-1" data-testid="terms-section-ip">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">4. Intellectual Property</h2>
        <p class="text-white/40 leading-relaxed mb-4">All intellectual property rights in our platform, technology, software, documentation, and related materials are owned by HBDR or our licensors. This includes our proprietary header bidding algorithms, optimization technology, analytics dashboards, and reporting tools.</p>
        <p class="text-white/40 leading-relaxed mb-4">You retain ownership of your content, including your website content, ad inventory data, and creative assets. By using our services, you grant HBDR a non-exclusive, worldwide license to use, process, and display your content solely for the purpose of providing our services.</p>
        <p class="text-white/40 leading-relaxed">You may not copy, modify, distribute, reverse engineer, or create derivative works from our proprietary technology without our written consent.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-2" data-testid="terms-section-liability">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">5. Limitation of Liability</h2>
        <p class="text-white/40 leading-relaxed mb-4">To the maximum extent permitted by applicable law, HBDR and its directors, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services, including but not limited to:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2 mb-4">
          <li>Loss of revenue, profits, or anticipated savings</li>
          <li>Loss of data or business interruption</li>
          <li>Fluctuations in ad revenue or CPM rates due to market conditions</li>
          <li>Third-party actions, including demand partner or ad exchange decisions</li>
          <li>Service interruptions or downtime beyond our reasonable control</li>
        </ul>
        <p class="text-white/40 leading-relaxed">Our total cumulative liability for all claims arising from or related to these Terms shall not exceed the total fees paid by you to HBDR during the twelve (12) months preceding the claim.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-3" data-testid="terms-section-indemnification">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">6. Indemnification</h2>
        <p class="text-white/40 leading-relaxed">You agree to indemnify, defend, and hold harmless HBDR, its affiliates, and their respective directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of our services, your violation of these Terms, your violation of any applicable law or regulation, or your infringement of any intellectual property or other rights of a third party.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-1" data-testid="terms-section-termination">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">7. Termination</h2>
        <p class="text-white/40 leading-relaxed mb-4">Either party may terminate these Terms at any time with thirty (30) days' written notice. HBDR reserves the right to suspend or terminate your access to our services immediately, without prior notice, if:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2 mb-4">
          <li>You breach any provision of these Terms</li>
          <li>Your account is flagged for policy violations by Google or other ad platforms</li>
          <li>We detect fraudulent activity, invalid traffic, or ad policy violations</li>
          <li>Continued service would expose HBDR to legal or regulatory risk</li>
        </ul>
        <p class="text-white/40 leading-relaxed">Upon termination, your right to use our services ceases immediately. HBDR will settle any outstanding revenue balances within sixty (60) days of termination, subject to applicable payment thresholds and deductions for chargebacks or clawbacks.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-2" data-testid="terms-section-governing-law">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">8. Governing Law</h2>
        <p class="text-white/40 leading-relaxed mb-4">These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law provisions.</p>
        <p class="text-white/40 leading-relaxed">Any disputes arising out of or relating to these Terms or our services shall be resolved exclusively in the state or federal courts located in Miami-Dade County, Florida. You consent to the personal jurisdiction and venue of such courts and waive any objections based on inconvenient forum.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-3" data-testid="terms-section-changes">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">9. Changes to Terms</h2>
        <p class="text-white/40 leading-relaxed">We reserve the right to modify these Terms at any time. Material changes will be communicated via email or through a prominent notice on our platform at least thirty (30) days before they take effect. Your continued use of our services after the effective date of revised Terms constitutes your acceptance of the changes. If you do not agree to the revised Terms, you must discontinue use of our services.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 animate-on-scroll stagger-1" data-testid="terms-section-contact">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">10. Contact Information</h2>
        <p class="text-white/40 leading-relaxed mb-6">For questions or concerns about these Terms, please contact us:</p>
        <div class="space-y-3 text-white/50">
          <p><strong class="text-white/80">HBDR</strong></p>
          <p>1200 Brickell Ave Ste 1950, Miami, FL 33131</p>
          <p>Email: <a href="mailto:contact@hbdr.com" class="text-[var(--accent)] hover:underline" data-testid="link-terms-email">contact@hbdr.com</a></p>
          <p>Phone: <a href="tel:+17866756080" class="text-[var(--accent)] hover:underline" data-testid="link-terms-phone">(786) 675-6080</a></p>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Terms & Conditions - HBDR",
    description: "HBDR Terms and Conditions. Review the terms governing use of our ad monetization platform, header bidding services, and publisher tools.",
    canonicalPath: "/terms",
    bodyContent: content,
  });
}

