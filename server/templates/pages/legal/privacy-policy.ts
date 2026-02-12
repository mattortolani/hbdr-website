import { renderLayout } from "../../layout";
import { renderPageHero } from "../../components/hero";

export function renderPrivacyPolicyPage(): string {
  const content = `
  ${renderPageHero("Legal", "Privacy Policy", "Your privacy is important to us. This policy explains how HBDR collects, uses, and protects your information.")}

  <section class="py-20 lg:py-28" data-testid="privacy-policy-content">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll" data-testid="privacy-last-updated">
        <p class="text-white/40 text-sm">Last Updated: February 2026</p>
        <p class="text-white/50 mt-4 leading-relaxed">HBDR ("we," "our," or "us") operates an enterprise ad monetization and header bidding platform. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, use our platform, or engage with our services.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-1" data-testid="privacy-section-collect">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">1. Information We Collect</h2>

        <h3 class="text-xl font-semibold text-white mb-3">Personal Information</h3>
        <p class="text-white/40 leading-relaxed mb-4">We may collect personal information that you voluntarily provide when you register for an account, express interest in obtaining information about us or our products, participate in activities on our platform, or otherwise contact us. This includes:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2 mb-6">
          <li>Name, email address, and phone number</li>
          <li>Company name and job title</li>
          <li>Billing and payment information</li>
          <li>Website URLs and publisher account details</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h3 class="text-xl font-semibold text-white mb-3">Usage Data</h3>
        <p class="text-white/40 leading-relaxed mb-4">We automatically collect certain information when you visit, use, or navigate our platform. This includes:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2 mb-6">
          <li>Device and browser information (IP address, browser type, operating system)</li>
          <li>Log data such as access times, pages viewed, and referring URLs</li>
          <li>Ad performance metrics including impressions, clicks, and revenue data</li>
          <li>Header bidding auction data and bid response information</li>
        </ul>

        <h3 class="text-xl font-semibold text-white mb-3">Cookies & Tracking Technologies</h3>
        <p class="text-white/40 leading-relaxed">We use cookies, web beacons, pixel tags, and similar tracking technologies to collect and store information about your interactions with our platform. These technologies help us analyze trends, administer our website, track user movements, and gather demographic information. For detailed information about the cookies we use, please see our <a href="/gdpr-cookie-policy" class="text-[var(--accent)] hover:underline">GDPR & Cookie Policy</a>.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-2" data-testid="privacy-section-use">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">2. How We Use Your Information</h2>
        <p class="text-white/40 leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2">
          <li>To provide, operate, and maintain our ad monetization and header bidding services</li>
          <li>To optimize ad delivery, improve bid density, and maximize publisher revenue</li>
          <li>To process transactions, manage billing, and send invoices</li>
          <li>To communicate with you about account updates, service changes, and support requests</li>
          <li>To send marketing and promotional materials (with your consent where required)</li>
          <li>To analyze platform usage, diagnose technical issues, and improve our services</li>
          <li>To detect, prevent, and address fraud, unauthorized access, and security issues</li>
          <li>To comply with legal obligations and enforce our terms of service</li>
        </ul>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-3" data-testid="privacy-section-sharing">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">3. Information Sharing and Disclosure</h2>
        <p class="text-white/40 leading-relaxed mb-4">We may share your information in the following circumstances:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2">
          <li><strong class="text-white/80">Demand Partners & Ad Exchanges:</strong> We share bid request data with demand-side platforms (DSPs), ad exchanges, and advertising networks to facilitate programmatic ad auctions on your behalf.</li>
          <li><strong class="text-white/80">Service Providers:</strong> We engage third-party vendors who assist us with hosting, analytics, payment processing, customer support, and other operational functions.</li>
          <li><strong class="text-white/80">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
          <li><strong class="text-white/80">Legal Requirements:</strong> We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to protect our rights, safety, or property.</li>
          <li><strong class="text-white/80">With Your Consent:</strong> We may share your information with third parties when you have given us explicit consent to do so.</li>
        </ul>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-1" data-testid="privacy-section-security">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">4. Data Security</h2>
        <p class="text-white/40 leading-relaxed mb-4">We implement industry-standard security measures to protect your personal information, including:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2 mb-4">
          <li>Encryption of data in transit (TLS/SSL) and at rest</li>
          <li>Regular security audits and penetration testing</li>
          <li>Access controls and authentication protocols for platform access</li>
          <li>Secure data centers with physical and network-level protections</li>
          <li>Employee training on data protection and security best practices</li>
        </ul>
        <p class="text-white/40 leading-relaxed">While we strive to protect your personal information, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security but are committed to implementing reasonable safeguards.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-2" data-testid="privacy-section-rights">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">5. Your Rights and Choices</h2>
        <p class="text-white/40 leading-relaxed mb-4">Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
        <ul class="list-disc pl-6 text-white/40 space-y-2 mb-4">
          <li><strong class="text-white/80">Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong class="text-white/80">Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong class="text-white/80">Erasure:</strong> Request deletion of your personal data, subject to legal obligations.</li>
          <li><strong class="text-white/80">Restriction:</strong> Request that we limit how we use your data.</li>
          <li><strong class="text-white/80">Portability:</strong> Request a machine-readable copy of your data.</li>
          <li><strong class="text-white/80">Objection:</strong> Object to processing of your data for certain purposes.</li>
          <li><strong class="text-white/80">Opt-Out:</strong> Unsubscribe from marketing emails at any time by clicking the unsubscribe link or contacting us.</li>
        </ul>
        <p class="text-white/40 leading-relaxed">To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-3" data-testid="privacy-section-children">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">6. Children's Privacy</h2>
        <p class="text-white/40 leading-relaxed">Our platform and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child under 18, we will take steps to delete such information promptly. If you believe we have collected information from a child, please contact us immediately.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 mb-8 animate-on-scroll stagger-1" data-testid="privacy-section-changes">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">7. Changes to This Policy</h2>
        <p class="text-white/40 leading-relaxed">We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically. Your continued use of our services after changes are posted constitutes your acceptance of the revised policy.</p>
      </div>

      <div class="glass-card p-8 sm:p-12 animate-on-scroll stagger-2" data-testid="privacy-section-contact">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">8. Contact Us</h2>
        <p class="text-white/40 leading-relaxed mb-6">If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
        <div class="space-y-3 text-white/50">
          <p><strong class="text-white/80">HBDR</strong></p>
          <p>1200 Brickell Ave Ste 1950, Miami, FL 33131</p>
          <p>Email: <a href="mailto:contact@hbdr.com" class="text-[var(--accent)] hover:underline" data-testid="link-privacy-email">contact@hbdr.com</a></p>
          <p>Phone: <a href="tel:+17866756080" class="text-[var(--accent)] hover:underline" data-testid="link-privacy-phone">(786) 675-6080</a></p>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Privacy Policy - HBDR",
    description: "HBDR Privacy Policy. Learn how we collect, use, and protect your information across our ad monetization and header bidding platform.",
    canonicalPath: "/privacy-policy",
    bodyContent: content,
  });
}

