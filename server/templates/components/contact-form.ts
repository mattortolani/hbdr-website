export function renderContactFormSection(): string {
  return `
  <section id="contact" class="py-24 lg:py-32" data-testid="contact-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Get Started</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-6 text-gradient">
          Start Monetizing Today
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          Ready to transform your ad revenue? Fill out the form and our team will reach out within 24 hours.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2 space-y-8 animate-on-scroll">
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">Let's Talk Revenue</h3>
            <p class="text-white/40 leading-relaxed">
              Whether you're optimizing existing ads or exploring new monetization opportunities, our experts are here to help.
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <div class="font-semibold text-white">Email Us</div>
                <div class="text-white/40">contact@hbdr.com</div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <div class="font-semibold text-white">Call Us</div>
                <div class="text-white/40">(786) 675-6080</div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <div class="font-semibold text-white">Visit Us</div>
                <div class="text-white/40">1200 Brickell Ave Ste 1950<br/>Miami, FL 33131</div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-white/5">
            <div class="text-sm text-white/30 mb-3">Response time</div>
            <div class="flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span class="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style="animation: pulse-ring 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </span>
              <span class="font-medium text-white">Usually within 24 hours</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 animate-on-scroll stagger-2">
          <div id="contact-form-container"
               x-data="{
                 formData: { name: '', email: '', company: '', impressions: '', message: '', _hp_website: '', _source: 'contact' },
                 submitting: false,
                 submitted: false,
                 error: false,
                 async submitForm() {
                   this.submitting = true;
                   this.error = false;
                   try {
                     const res = await fetch('/api/contact', {
                       method: 'POST',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(this.formData)
                     });
                     if (res.ok) {
                       this.submitted = true;
                     } else {
                       this.error = true;
                     }
                   } catch (e) {
                     this.error = true;
                   }
                   this.submitting = false;
                 }
               }">

            <div x-show="submitted" x-cloak class="glass-card p-8 text-center" x-transition>
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
              <p class="text-white/50">We'll get back to you within 24 hours. Thank you for your interest in HBDR.</p>
            </div>

            <form x-show="!submitted" @submit.prevent="submitForm()" class="glass-card p-6 sm:p-8 space-y-6" data-testid="contact-form">

              <div x-show="error" x-cloak class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                Something went wrong. Please try again or email us at contact@hbdr.com
              </div>

              <div style="position:absolute;left:-9999px;top:-9999px;opacity:0;height:0;width:0;overflow:hidden;" aria-hidden="true" tabindex="-1">
                <label for="hp_website">Website</label>
                <input type="text" id="hp_website" name="website" x-model="formData._hp_website" autocomplete="off" tabindex="-1" />
              </div>

              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                  <input type="text" x-model="formData.name" placeholder="John Smith" class="glass-input w-full px-4 py-3" required data-testid="input-name" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                  <input type="email" x-model="formData.email" placeholder="john@company.com" class="glass-input w-full px-4 py-3" required data-testid="input-email" />
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-white/60 mb-2">Company Name</label>
                  <input type="text" x-model="formData.company" placeholder="Your Company" class="glass-input w-full px-4 py-3" required data-testid="input-company" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-white/60 mb-2">Monthly Impressions</label>
                  <select x-model="formData.impressions" class="glass-select w-full" required data-testid="select-impressions">
                    <option value="" disabled selected>Select volume</option>
                    <option value="under-10m">Under 10M</option>
                    <option value="10m-50m">10M - 50M</option>
                    <option value="50m-100m">50M - 100M</option>
                    <option value="100m-500m">100M - 500M</option>
                    <option value="500m-1b">500M - 1B</option>
                    <option value="over-1b">Over 1B</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-white/60 mb-2">Message (Optional)</label>
                <textarea x-model="formData.message" placeholder="Tell us about your current ad setup and goals..." rows="4" class="glass-input w-full px-4 py-3 resize-none" data-testid="textarea-message"></textarea>
              </div>

              <button type="submit" :disabled="submitting" class="glass-btn w-full py-4 text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50" data-testid="button-submit-contact">
                <template x-if="!submitting">
                  <span class="flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    Get Your Free Analysis
                  </span>
                </template>
                <template x-if="submitting">
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                </template>
              </button>

              <p class="text-center text-sm text-white/30">
                By submitting, you agree to our <a href="/privacy-policy" class="text-[var(--accent)] hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
