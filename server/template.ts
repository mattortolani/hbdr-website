interface LayoutOptions {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalPath?: string;
  bodyContent: string;
}

function renderHead(options: LayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${options.title}</title>
  <meta name="description" content="${options.description}" />
  <meta property="og:title" content="${options.ogTitle || options.title}" />
  <meta property="og:description" content="${options.ogDescription || options.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/assets/HBDR_Logo_Pack_all_sizes_-_2_1770577514801.jpeg" />
  <meta property="og:url" content="${options.canonicalPath || '/'}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${options.ogTitle || options.title}" />
  <meta name="twitter:description" content="${options.ogDescription || options.description}" />
  <link rel="icon" type="image/jpeg" href="/assets/HBDR_Logo_Pack_all_sizes_-_8_1770577514801.jpeg" />

  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.14/dist/full.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.14.8/dist/cdn.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          },
        },
      },
    }
  </script>

  <style>
    * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }

    :root {
      --glass-bg: rgba(255, 255, 255, 0.06);
      --glass-border: rgba(255, 255, 255, 0.12);
      --glass-highlight: rgba(255, 255, 255, 0.15);
      --glass-shadow: rgba(0, 0, 0, 0.3);
      --accent: #2BDE73;
      --accent-glow: rgba(43, 222, 115, 0.3);
      --accent-dark: #1AAF5C;
      --surface: #0a0a0c;
      --surface-elevated: #141416;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--surface);
      color: #f5f5f7;
      overflow-x: hidden;
    }

    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.09);
      border-color: rgba(255, 255, 255, 0.18);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .glass-nav {
      background: rgba(10, 10, 12, 0.7);
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .glass-input {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f5f5f7;
      transition: all 0.3s ease;
    }

    .glass-input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
      background: rgba(255, 255, 255, 0.08);
    }

    .glass-input::placeholder { color: rgba(255, 255, 255, 0.35); }

    .glass-btn {
      background: linear-gradient(135deg, var(--accent), var(--accent-dark));
      border: none;
      border-radius: 980px;
      color: #0a0a0c;
      font-weight: 600;
      padding: 12px 28px;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }

    .glass-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .glass-btn:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 20px var(--accent-glow);
    }

    .glass-btn:hover::before { opacity: 1; }

    .glass-btn-outline {
      background: transparent;
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 980px;
      color: #f5f5f7;
      font-weight: 500;
      padding: 12px 28px;
      backdrop-filter: blur(20px);
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .glass-btn-outline:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.4);
      transform: scale(1.02);
    }

    .liquid-gradient {
      background: radial-gradient(ellipse at 30% 20%, rgba(43, 222, 115, 0.12) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 80%, rgba(26, 175, 92, 0.08) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, rgba(43, 222, 115, 0.04) 0%, transparent 70%);
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
      animation: orbFloat 8s ease-in-out infinite;
    }

    .orb-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(43, 222, 115, 0.35), transparent);
      top: -100px; right: -100px;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(26, 175, 92, 0.25), transparent);
      bottom: -50px; left: -50px;
      animation-delay: -4s;
    }

    .orb-3 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(108, 245, 160, 0.15), transparent);
      top: 40%; left: 60%;
      animation-delay: -2s;
    }

    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.05); }
      66% { transform: translate(-20px, 20px) scale(0.95); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes countUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes scrollLogos {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .stagger-1 { transition-delay: 0.1s; }
    .stagger-2 { transition-delay: 0.2s; }
    .stagger-3 { transition-delay: 0.3s; }
    .stagger-4 { transition-delay: 0.4s; }
    .stagger-5 { transition-delay: 0.5s; }
    .stagger-6 { transition-delay: 0.6s; }

    .logo-scroll {
      animation: scrollLogos 30s linear infinite;
    }

    .logo-scroll:hover { animation-play-state: paused; }

    .text-gradient {
      background: linear-gradient(135deg, #f5f5f7, rgba(255,255,255,0.6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding-bottom: 0.15em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }

    .text-gradient-accent {
      background: linear-gradient(135deg, var(--accent), #6CF5A0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding-bottom: 0.15em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 1.35;
      overflow: visible;
    }

    h1 .text-gradient,
    h1 .text-gradient-accent,
    h2 .text-gradient,
    h2 .text-gradient-accent {
      display: inline-block;
      padding-bottom: 0.15em;
    }

    .section-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    }

    .prose-content h2 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #fff;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .prose-content h3 {
      font-size: 1.35rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }
    .prose-content p {
      color: rgba(255,255,255,0.55);
      line-height: 1.8;
      margin-bottom: 1.25rem;
    }
    .prose-content strong {
      color: rgba(255,255,255,0.85);
      font-weight: 600;
    }
    .prose-content ul, .prose-content ol {
      color: rgba(255,255,255,0.55);
      padding-left: 1.5rem;
      margin-bottom: 1.25rem;
    }
    .prose-content ul { list-style-type: disc; }
    .prose-content ol { list-style-type: decimal; }
    .prose-content li {
      margin-bottom: 0.5rem;
      line-height: 1.7;
    }
    .prose-content a {
      color: var(--accent);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .prose-content a:hover {
      color: var(--accent-dark);
    }
    .prose-content blockquote {
      border-left: 3px solid var(--accent);
      padding-left: 1.25rem;
      margin: 1.5rem 0;
      color: rgba(255,255,255,0.5);
      font-style: italic;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .glass-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      border-radius: 980px;
      background: rgba(43, 222, 115, 0.1);
      border: 1px solid rgba(43, 222, 115, 0.2);
      color: var(--accent);
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .check-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(52, 199, 89, 0.15);
    }

    .x-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(255, 69, 58, 0.15);
    }

    .partial-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(255, 214, 10, 0.15);
    }

    .step-number {
      width: 56px; height: 56px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--accent), var(--accent-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.25rem;
      color: #0a0a0c;
      box-shadow: 0 4px 20px var(--accent-glow);
    }

    .glass-select {
      appearance: none;
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: #f5f5f7;
      padding: 12px 40px 12px 16px;
      width: 100%;
      transition: all 0.3s ease;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.5)' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 01.708 0L8 8.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
    }

    .glass-select:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .metric-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 16px;
    }

    .bar-chart { display: flex; align-items: flex-end; gap: 3px; height: 100px; }
    .bar-chart div {
      flex: 1;
      border-radius: 3px 3px 0 0;
      background: linear-gradient(to top, var(--accent), rgba(43, 222, 115, 0.4));
      transition: height 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .htmx-indicator { display: none; }
    .htmx-request .htmx-indicator { display: inline-flex; }
    .htmx-request .submit-text { display: none; }

    @media (max-width: 768px) {
      .orb { opacity: 0.2; }
      .glass-card { border-radius: 16px; }
    }
  </style>
</head>`;
}

function renderNav(): string {
  return `
  <nav class="glass-nav fixed top-0 left-0 right-0 z-50" x-data="{ mobileOpen: false, scrolled: false }"
       x-init="window.addEventListener('scroll', () => { scrolled = window.scrollY > 20 })"
       :class="{ 'shadow-lg': scrolled }"
       data-testid="navigation">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-[72px]">
        <a href="/" class="flex items-center gap-2.5" data-testid="link-logo">
          <img src="/assets/HBDR_Logo_Pack_all_sizes_-_8_1770577514801.jpeg" alt="HBDR Logo" class="h-9 w-9 rounded-lg object-cover" data-testid="img-nav-logo" />
          <span class="text-xl font-bold text-white tracking-tight">HBDR</span>
        </a>

        <div class="hidden lg:flex items-center gap-8">
          <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button class="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer" data-testid="link-solutions">
              Solutions
              <svg class="w-3.5 h-3.5 transition-transform" :class="open ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div x-show="open" x-cloak
                 x-transition:enter="transition ease-out duration-150"
                 x-transition:enter-start="opacity-0 translate-y-1"
                 x-transition:enter-end="opacity-100 translate-y-0"
                 x-transition:leave="transition ease-in duration-100"
                 x-transition:leave-start="opacity-100 translate-y-0"
                 x-transition:leave-end="opacity-0 translate-y-1"
                 class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl py-2 z-50" data-testid="solutions-dropdown">
              <a href="/solutions/header-bidding" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-header-bidding">Header Bidding</a>
              <a href="/solutions/display-ads" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-display-ads">Display Ads</a>
              <a href="/solutions/ctv-ott" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-ctv-ott">CTV & OTT</a>
              <a href="/solutions/in-app-ads" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-in-app-ads">In-App Ads</a>
              <a href="/solutions/mcm" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-mcm">MCM</a>
              <a href="/solutions/manage-account" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-manage-account">Manage Account</a>
              <a href="/solutions/manage-inventory" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-manage-inventory">Manage Inventory</a>
              <a href="/solutions/open-bidding" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-open-bidding">Open Bidding</a>
              <a href="/solutions/ad-exchange-adx" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-ad-exchange">Ad Exchange AdX</a>
            </div>
          </div>
          <a href="/how-it-works" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-how-it-works">How It Works</a>
          <a href="/about" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-about">About</a>
          <a href="/blog" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-blog">Blog</a>
          <a href="/contact" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-contact">Contact</a>
        </div>

        <div class="hidden lg:flex items-center gap-3">
          <a href="/contact" class="glass-btn-outline text-sm" data-testid="button-schedule-call">Schedule a Call</a>
          <a href="/contact" class="glass-btn text-sm" data-testid="button-get-started">Get Started</a>
        </div>

        <button class="lg:hidden p-2 text-white/80" @click="mobileOpen = !mobileOpen" data-testid="button-mobile-menu">
          <svg x-show="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg x-show="mobileOpen" x-cloak class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div x-show="mobileOpen" x-cloak
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0 -translate-y-2"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100 translate-y-0"
         x-transition:leave-end="opacity-0 -translate-y-2"
         class="lg:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl"
         data-testid="mobile-menu">
      <div class="px-4 py-6 space-y-1" x-data="{ solOpen: false }">
        <button @click="solOpen = !solOpen" class="w-full text-left py-3 text-lg text-white/80 hover:text-white transition-colors flex items-center justify-between cursor-pointer" data-testid="mobile-link-solutions">
          Solutions
          <svg class="w-4 h-4 transition-transform" :class="solOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div x-show="solOpen" x-cloak x-transition class="pl-4 space-y-0.5 pb-2">
          <a href="/solutions/header-bidding" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-header-bidding">Header Bidding</a>
          <a href="/solutions/display-ads" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-display-ads">Display Ads</a>
          <a href="/solutions/ctv-ott" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-ctv-ott">CTV & OTT</a>
          <a href="/solutions/in-app-ads" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-in-app-ads">In-App Ads</a>
          <a href="/solutions/mcm" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-mcm">MCM</a>
          <a href="/solutions/manage-account" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-manage-account">Manage Account</a>
          <a href="/solutions/manage-inventory" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-manage-inventory">Manage Inventory</a>
          <a href="/solutions/open-bidding" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-open-bidding">Open Bidding</a>
          <a href="/solutions/ad-exchange-adx" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-ad-exchange">Ad Exchange AdX</a>
        </div>
        <a href="/how-it-works" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-how-it-works">How It Works</a>
        <a href="/about" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-about">About</a>
        <a href="/blog" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-blog">Blog</a>
        <a href="/contact" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-contact">Contact</a>
        <div class="pt-4 flex flex-col gap-3">
          <a href="/contact" @click="mobileOpen = false" class="glass-btn text-center text-sm" data-testid="mobile-button-get-started">Get Started</a>
        </div>
      </div>
    </div>
  </nav>`;
}

function renderFooter(): string {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ];

  return `
  <footer class="border-t border-white/5 pt-16 pb-8" data-testid="footer">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        <div class="col-span-2">
          <div class="flex items-center gap-2.5 mb-4">
            <img src="/assets/HBDR_Logo_Pack_all_sizes_-_8_1770577514801.jpeg" alt="HBDR Logo" class="h-10 w-10 rounded-lg object-cover" data-testid="img-footer-logo" />
            <span class="text-xl font-bold text-white tracking-tight">HBDR</span>
          </div>
          <p class="text-white/30 leading-relaxed max-w-xs text-sm mb-6">
            Global leader in ad monetization and header bidding solutions. Maximize your revenue with our enterprise-grade platform.
          </p>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-linkedin">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-twitter">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-email">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Solutions</h4>
          <ul class="space-y-3">
            ${[
              { label: "Header Bidding", href: "/solutions/header-bidding" },
              { label: "Display Ads", href: "/solutions/display-ads" },
              { label: "In-App Ads", href: "/solutions/in-app-ads" },
              { label: "CTV & OTT", href: "/solutions/ctv-ott" },
              { label: "Open Bidding", href: "/solutions/open-bidding" },
              { label: "Ad Exchange AdX", href: "/solutions/ad-exchange-adx" },
            ].map((l) => `<li><a href="${l.href}" class="text-sm text-white/30 hover:text-white/60 transition-colors">${l.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Company</h4>
          <ul class="space-y-3">
            ${companyLinks.map((l) => `<li><a href="${l.href}" class="text-sm text-white/30 hover:text-white/60 transition-colors">${l.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Resources</h4>
          <ul class="space-y-3">
            ${["Blog", "Case Studies", "Documentation", "Support", "FAQ"].map((l) => `<li><a href="#" class="text-sm text-white/30 hover:text-white/60 transition-colors">${l}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Legal</h4>
          <ul class="space-y-3">
            ${["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((l) => `<li><a href="#" class="text-sm text-white/30 hover:text-white/60 transition-colors">${l}</a></li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-white/20 text-sm">&copy; ${new Date().getFullYear()} HBDR. All rights reserved.</p>
        <button onclick="window.scrollTo({top:0,behavior:'smooth'})" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer" data-testid="button-scroll-top">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
        </button>
      </div>
    </div>
  </footer>`;
}

function renderScripts(): string {
  return `
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
      });
    });
  </script>

  <style>[x-cloak] { display: none !important; }</style>`;
}

function renderLayout(options: LayoutOptions): string {
  return `${renderHead(options)}

<body class="antialiased">

  ${renderNav()}

  ${options.bodyContent}

  ${renderFooter()}

  ${renderScripts()}

</body>
</html>`;
}

function renderContactFormSection(): string {
  return `
  <section id="contact" class="py-24 lg:py-32" data-testid="contact-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Get Started</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">
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
                <div class="text-white/40">+1 (555) 123-4567</div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <div class="font-semibold text-white">Visit Us</div>
                <div class="text-white/40">123 Ad Tech Boulevard<br/>San Francisco, CA 94102</div>
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
                 formData: { name: '', email: '', company: '', impressions: '', message: '' },
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
                By submitting, you agree to our Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderStatsSection(): string {
  return `
  <section class="py-24 lg:py-32 relative overflow-hidden" data-testid="stats-section">
    <div class="absolute inset-0 liquid-gradient opacity-50"></div>
    <div class="orb orb-1" style="opacity: 0.2; top: 10%; right: 5%;"></div>
    <div class="orb orb-2" style="opacity: 0.15; bottom: 10%; left: 10%;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Impact</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">
          Delivering Results at Scale
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

function renderPageHero(tag: string, title: string, description: string): string {
  return `
  <section class="relative overflow-hidden liquid-gradient pt-32 pb-16" data-testid="page-hero">
    <div class="orb orb-1" style="opacity: 0.25;"></div>
    <div class="orb orb-2" style="opacity: 0.15;"></div>
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="glass-tag mb-6 mx-auto w-fit" style="animation: fadeInUp 0.6s ease forwards">${tag}</div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gradient" style="animation: fadeInUp 0.6s 0.1s ease both">
        ${title}
      </h1>
      <p class="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto" style="animation: fadeInUp 0.6s 0.2s ease both">
        ${description}
      </p>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--surface)] to-transparent"></div>
  </section>`;
}

function renderCTASection(heading: string, buttonText: string): string {
  return `
  <section class="py-24 lg:py-32 relative overflow-hidden" data-testid="cta-section">
    <div class="absolute inset-0 liquid-gradient opacity-40"></div>
    <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">${heading}</h2>
      <a href="/contact" class="glass-btn text-base px-8 py-3.5 inline-flex items-center gap-2" data-testid="button-cta">
        ${buttonText}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </a>
    </div>
  </section>`;
}

export function renderPage(): string {
  const homepageContent = `

  <!-- ========== HERO ========== -->
  <section class="relative min-h-screen flex items-center overflow-hidden liquid-gradient" data-testid="hero-section">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="text-center lg:text-left">
          <div class="glass-tag mb-8" style="animation: fadeInUp 0.6s ease forwards">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            25+ Years of Ad Tech Expertise
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.2] tracking-tight mb-6" style="animation: fadeInUp 0.6s 0.1s ease both">
            <span class="text-gradient">Maximize Your</span><br/>
            <span class="text-gradient-accent">Ad Revenue</span><br/>
            <span class="text-gradient">with Header Bidding</span>
          </h1>

          <p class="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0" style="animation: fadeInUp 0.6s 0.2s ease both">
            HBDR delivers enterprise-grade ad monetization solutions that help publishers increase revenue by up to 50%.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style="animation: fadeInUp 0.6s 0.3s ease both">
            <a href="/contact" class="glass-btn text-base px-8 py-3.5 text-center" data-testid="button-hero-get-started">
              Get Started Free
              <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="/how-it-works" class="glass-btn-outline text-base px-8 py-3.5 text-center" data-testid="button-hero-learn">
              Learn More
            </a>
          </div>

          <div class="grid grid-cols-3 gap-6 mt-14" style="animation: fadeInUp 0.6s 0.5s ease both">
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-white" data-testid="text-stat-revenue">50%+</div>
              <div class="text-xs sm:text-sm text-white/40 mt-1">Revenue Increase</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-white" data-testid="text-stat-publishers">500+</div>
              <div class="text-xs sm:text-sm text-white/40 mt-1">Publishers</div>
            </div>
            <div class="text-center lg:text-left">
              <div class="text-2xl sm:text-3xl font-bold text-white" data-testid="text-stat-impressions">1B+</div>
              <div class="text-xs sm:text-sm text-white/40 mt-1">Daily Impressions</div>
            </div>
          </div>
        </div>

        <div class="hidden lg:block" style="animation: slideInRight 0.8s 0.3s ease both">
          <div class="glass-card p-8">
            <div class="flex items-center justify-between mb-6">
              <span class="text-white/50 text-sm font-medium">Revenue Dashboard</span>
              <span class="flex items-center gap-2 text-sm">
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span class="text-green-400 font-medium">Live</span>
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">Today's Revenue</div>
                <div class="text-xl font-bold text-white">$12,847</div>
                <div class="text-green-400 text-xs mt-1">+23%</div>
              </div>
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">Fill Rate</div>
                <div class="text-xl font-bold text-white">94.2%</div>
                <div class="text-green-400 text-xs mt-1">+5.1%</div>
              </div>
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">eCPM</div>
                <div class="text-xl font-bold text-white">$4.82</div>
                <div class="text-green-400 text-xs mt-1">+18%</div>
              </div>
              <div class="metric-card">
                <div class="text-white/40 text-xs mb-1">Impressions</div>
                <div class="text-xl font-bold text-white">2.7M</div>
                <div class="text-green-400 text-xs mt-1">+31%</div>
              </div>
            </div>

            <div class="bar-chart" x-data x-init="$nextTick(() => { $el.querySelectorAll('div').forEach((b, i) => { b.style.height = b.dataset.h }) })">
              <div data-h="40%" style="height: 0%"></div>
              <div data-h="65%" style="height: 0%"></div>
              <div data-h="45%" style="height: 0%"></div>
              <div data-h="80%" style="height: 0%"></div>
              <div data-h="55%" style="height: 0%"></div>
              <div data-h="90%" style="height: 0%"></div>
              <div data-h="70%" style="height: 0%"></div>
              <div data-h="85%" style="height: 0%"></div>
              <div data-h="60%" style="height: 0%"></div>
              <div data-h="95%" style="height: 0%"></div>
              <div data-h="75%" style="height: 0%"></div>
              <div data-h="88%" style="height: 0%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface)] to-transparent"></div>
  </section>


  <!-- ========== LOGO CAROUSEL ========== -->
  <section class="py-16 overflow-hidden" data-testid="logo-carousel">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <p class="text-center text-white/30 text-sm font-medium uppercase tracking-widest animate-on-scroll">
        Trusted by Leading Publishers Worldwide
      </p>
    </div>
    <div class="relative">
      <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--surface)] to-transparent z-10"></div>
      <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--surface)] to-transparent z-10"></div>
      <div class="flex logo-scroll" style="width: max-content;">
        ${["TechMedia", "AdVantage", "MediaFlow", "PubGrowth", "StreamAds", "ContentPro", "AdRevenue", "MediaMax", "PubTech", "AdSphere", "TechMedia", "AdVantage", "MediaFlow", "PubGrowth", "StreamAds", "ContentPro", "AdRevenue", "MediaMax", "PubTech", "AdSphere"]
          .map(
            (name) => `
          <div class="flex-shrink-0 mx-6">
            <div class="glass-card px-6 py-3 flex items-center gap-3" style="border-radius: 12px;">
              <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40">${name.substring(0, 2)}</div>
              <span class="text-sm font-medium text-white/50 whitespace-nowrap">${name}</span>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== SOLUTIONS ========== -->
  <section id="solutions" class="py-24 lg:py-32" data-testid="services-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Solutions</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          <span class="text-gradient">Complete Ad Monetization</span><br/>
          <span class="text-gradient-accent">Platform</span>
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          From header bidding to CTV, we provide end-to-end solutions to maximize your advertising revenue.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>',
            title: "Header Bidding",
            description: "Advanced header bidding that creates open auctions, allowing multiple advertisers to bid simultaneously on your inventory.",
            features: ["Real-time bidding", "Premium demand", "Higher CPMs"],
            gradient: "from-emerald-500/20 to-emerald-500/5",
            href: "/solutions/header-bidding",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>',
            title: "Display Advertising",
            description: "Website display ad monetization with smart layouts that maximize revenue while preserving user experience.",
            features: ["Smart layouts", "Viewability optimization", "Brand safety"],
            gradient: "from-purple-500/20 to-purple-500/5",
            href: "/solutions/display-ads",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
            title: "In-App Monetization",
            description: "Mobile app advertising solutions including banner, native, video, and app open ads with Google AdX integration.",
            features: ["Native formats", "Rewarded video", "Open bidding"],
            gradient: "from-green-500/20 to-green-500/5",
            href: "/solutions/in-app-ads",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
            title: "CTV Monetization",
            description: "Connected-TV advertising solutions to capture the growing streaming audience with premium video inventory.",
            features: ["SSAI support", "Premium buyers", "Cross-platform"],
            gradient: "from-amber-500/20 to-amber-500/5",
            href: "/solutions/ctv-ott",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
            title: "Video Ad Solutions",
            description: "Comprehensive video ad solutions including instream, outstream, and interactive formats for maximum engagement.",
            features: ["VAST/VPAID", "High viewability", "Engagement metrics"],
            gradient: "from-rose-500/20 to-rose-500/5",
            href: "/solutions/open-bidding",
          },
          {
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
            title: "Advanced Analytics",
            description: "Detailed metrics on partner-level performance, auction data, and A/B testing capabilities for optimization.",
            features: ["Real-time data", "Custom reports", "Revenue insights"],
            gradient: "from-teal-500/20 to-teal-500/5",
            href: "/solutions/manage-account",
          },
        ]
          .map(
            (s, i) => `
        <a href="${s.href}" class="glass-card p-7 group animate-on-scroll stagger-${i + 1} block" data-testid="card-service-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${s.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${s.title}</h3>
          <p class="text-white/40 mb-5 leading-relaxed text-[0.9375rem]">${s.description}</p>
          <ul class="space-y-2 mb-5">
            ${s.features.map((f) => `<li class="flex items-center gap-2.5 text-sm text-white/50"><div class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>${f}</li>`).join("")}
          </ul>
          <div class="flex items-center gap-2 text-[var(--accent)] text-sm font-medium group-hover:gap-3 transition-all">
            Learn more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </div>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== COMPARISON TABLE ========== -->
  <section class="py-24 lg:py-32" data-testid="comparison-section">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Why HBDR</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">
          The HBDR Advantage
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          See how our comprehensive platform compares to other solutions.
        </p>
      </div>

      <div class="glass-card overflow-hidden animate-on-scroll" data-testid="comparison-table">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/5">
                <th class="text-left p-4 lg:p-5 text-sm font-semibold text-white/60">Features</th>
                <th class="p-4 lg:p-5 text-center">
                  <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] text-sm font-semibold">HBDR</span>
                </th>
                <th class="p-4 lg:p-5 text-center text-sm text-white/30 font-medium">Competitor A</th>
                <th class="p-4 lg:p-5 text-center text-sm text-white/30 font-medium">Competitor B</th>
              </tr>
            </thead>
            <tbody>
              ${[
                ["Header Bidding Implementation", true, true, false],
                ["Managed Prebid Server", true, false, false],
                ["In-App SDK (Desktop & Mobile)", true, "partial", false],
                ["Real-Time Analytics Dashboard", true, true, true],
                ["Dynamic Floor Pricing", true, false, false],
                ["Custom Video Player", true, "partial", false],
                ["CTV & OTT Support", true, false, false],
                ["24/7 Technical Support", true, true, "partial"],
                ["Dedicated Account Manager", true, false, false],
                ["Revenue Guarantee", true, false, false],
              ]
                .map(
                  (row, i) => `
              <tr class="border-t border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}" data-testid="comparison-row-${i}">
                <td class="p-4 lg:p-5 text-sm font-medium text-white/80">${row[0]}</td>
                ${[row[1], row[2], row[3]]
                  .map((val) => {
                    if (val === true) return '<td class="p-4 lg:p-5 text-center"><span class="check-icon"><svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></span></td>';
                    if (val === false) return '<td class="p-4 lg:p-5 text-center"><span class="x-icon"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></span></td>';
                    return '<td class="p-4 lg:p-5 text-center"><span class="partial-icon"><svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></span></td>';
                  })
                  .join("")}
              </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== HOW IT WORKS ========== -->
  <section id="how-it-works" class="py-24 lg:py-32" data-testid="how-it-works-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Simple Process</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">
          How It Works
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          Getting started with HBDR is simple. Our streamlined process gets you monetizing faster.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 relative">
        <div class="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        ${[
          {
            step: "01",
            title: "Discovery Call",
            description: "We analyze your current ad setup, identify optimization opportunities, and discuss revenue goals in a comprehensive discovery call.",
            details: ["Analyze current ad stack", "Identify opportunities", "Discuss revenue goals"],
          },
          {
            step: "02",
            title: "Customized Proposal",
            description: "Based on our discovery, we create a tailored proposal with revenue forecasts, ad placement strategy, and implementation roadmap.",
            details: ["Revenue projections", "Ad placement strategy", "Implementation timeline"],
          },
          {
            step: "03",
            title: "Technical Implementation",
            description: "Our expert team handles the complete integration, configuring accounts, implementing code, and ensuring smooth performance.",
            details: ["Code implementation", "Platform configuration", "Performance monitoring"],
          },
        ]
          .map(
            (step, i) => `
        <div class="glass-card p-8 text-center relative animate-on-scroll stagger-${i + 1}" data-testid="step-card-${i}">
          <div class="step-number mx-auto mb-6">${step.step}</div>
          <h3 class="text-xl font-semibold text-white mb-4">${step.title}</h3>
          <p class="text-white/40 mb-6 leading-relaxed text-[0.9375rem]">${step.description}</p>
          <ul class="space-y-3">
            ${step.details
              .map(
                (d) => `
            <li class="flex items-center gap-3 text-sm text-white/50">
              <div class="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <div class="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
              </div>
              ${d}
            </li>`
              )
              .join("")}
          </ul>
        </div>`
          )
          .join("")}
      </div>

      <div class="text-center mt-16 animate-on-scroll">
        <a href="/contact" class="glass-btn text-base px-8 py-3.5 inline-flex items-center gap-2" data-testid="button-start-journey">
          Start Your Journey
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </a>
      </div>
    </div>
  </section>


  <!-- ========== STATS ========== -->
  <section id="about" class="py-24 lg:py-32 relative overflow-hidden" data-testid="stats-section">
    <div class="absolute inset-0 liquid-gradient opacity-50"></div>
    <div class="orb orb-1" style="opacity: 0.2; top: 10%; right: 5%;"></div>
    <div class="orb orb-2" style="opacity: 0.15; bottom: 10%; left: 10%;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Impact</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">
          Delivering Results at Scale
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
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>


  <!-- ========== TESTIMONIALS ========== -->
  <section class="py-24 lg:py-32" data-testid="testimonials-section"
           x-data="{
             current: 0,
             testimonials: [
               { quote: 'HBDR has been the behind-the-scenes engine powering billions of monthly impressions across our sites. I never have to worry about scaling or downtime \\u2014 it just works flawlessly.', author: 'Sarah Chen', title: 'VP of Revenue Operations', company: 'TechMedia Group', initials: 'SC' },
               { quote: 'Working with HBDR has been a game-changer for us. We managed to boost our RPMs by 56%, and it has been a huge lifesaver for our ad operations team.', author: 'Michael Torres', title: 'Director of Ad Monetization', company: 'Digital Publishing Co', initials: 'MT' },
               { quote: 'Considering HBDR? Know this: Their team is committed to delivering the best results for your organization, actively working to continually enhance performance.', author: 'Emily Richardson', title: 'Head of Publisher Solutions', company: 'Content Network Inc', initials: 'ER' },
               { quote: 'Working with HBDR has been an eye-opener for our business. Not only has performance substantially improved, but our understanding of the marketplace has as well.', author: 'David Park', title: 'CEO', company: 'Mobile Media Labs', initials: 'DP' },
               { quote: 'Working with HBDR has been the single most impactful decision I have ever made for my business. There is not a single company that would not benefit from working with them.', author: 'Jessica Martinez', title: 'Founder', company: 'Gaming Publishers United', initials: 'JM' }
             ],
             next() { this.current = (this.current + 1) % this.testimonials.length },
             prev() { this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length },
             autoplay: null,
             startAutoplay() { this.autoplay = setInterval(() => this.next(), 6000) },
             stopAutoplay() { if (this.autoplay) clearInterval(this.autoplay) }
           }"
           x-init="startAutoplay()"
           @mouseenter="stopAutoplay()"
           @mouseleave="startAutoplay()">

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Testimonials</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">
          What Publishers Say
        </h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
          Don't just take our word for it.
        </p>
      </div>

      <div class="relative">
        <div class="glass-card p-8 sm:p-12 min-h-[280px]" data-testid="testimonial-card">
          <svg class="w-10 h-10 text-white/10 mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/>
          </svg>

          <template x-for="(t, index) in testimonials" :key="index">
            <div x-show="current === index"
                 x-transition:enter="transition ease-out duration-500"
                 x-transition:enter-start="opacity-0 translate-x-8"
                 x-transition:enter-end="opacity-100 translate-x-0"
                 x-transition:leave="transition ease-in duration-300"
                 x-transition:leave-start="opacity-100 translate-x-0"
                 x-transition:leave-end="opacity-0 -translate-x-8">
              <blockquote class="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 font-light" x-text="'&ldquo;' + t.quote + '&rdquo;'"></blockquote>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-semibold text-sm" x-text="t.initials"></div>
                <div>
                  <div class="font-semibold text-white" x-text="t.author"></div>
                  <div class="text-sm text-white/40" x-text="t.title"></div>
                  <div class="text-sm text-[var(--accent)]" x-text="t.company"></div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="flex items-center justify-center gap-4 mt-8">
          <button @click="prev()" class="glass-card w-10 h-10 flex items-center justify-center !rounded-full cursor-pointer" data-testid="button-prev-testimonial" style="border-radius: 50%;">
            <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <div class="flex gap-2">
            <template x-for="(_, index) in testimonials" :key="index">
              <button @click="current = index"
                      :class="current === index ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-white/20 hover:bg-white/40'"
                      class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                      :data-testid="'testimonial-dot-' + index"></button>
            </template>
          </div>

          <button @click="next()" class="glass-card w-10 h-10 flex items-center justify-center !rounded-full cursor-pointer" data-testid="button-next-testimonial" style="border-radius: 50%;">
            <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderContactFormSection()}`;

  return renderLayout({
    title: "HBDR - Header Bidding & Ad Monetization Solutions",
    description: "HBDR delivers enterprise-grade ad monetization and header bidding solutions. Maximize your ad revenue with our cutting-edge platform.",
    ogTitle: "HBDR - Header Bidding & Ad Monetization Solutions",
    ogDescription: "Maximize your ad revenue with HBDR's enterprise-grade header bidding platform.",
    canonicalPath: "/",
    bodyContent: homepageContent,
  });
}

export function renderAboutPage(): string {
  const content = `
  ${renderPageHero("About Us", "About HBDR", "We are a global leader in ad monetization and header bidding solutions, helping publishers maximize their revenue since 2015.")}

  <!-- Mission -->
  <section class="py-24 lg:py-32" data-testid="about-mission-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mission">
          <div class="glass-tag mb-6">Our Mission</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Maximizing Publisher Revenue</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            At HBDR, our mission is to empower digital publishers with enterprise-grade ad monetization technology. We believe every publisher deserves access to the most advanced header bidding solutions, transparent analytics, and dedicated support to unlock their full revenue potential.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            We combine cutting-edge technology with deep industry expertise to deliver solutions that consistently outperform traditional ad networks, helping our partners achieve an average revenue increase of over 50%.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Story / Timeline -->
  <section class="py-24 lg:py-32" data-testid="about-story-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Journey</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Our Story</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Key milestones that shaped who we are today.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 relative">
        <div class="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        ${[
          { step: "2015", title: "Founded", description: "HBDR was founded with a vision to revolutionize ad monetization for digital publishers through advanced header bidding technology." },
          { step: "2020", title: "1B Daily Impressions", description: "Reached the milestone of processing over 1 billion daily ad impressions across our global network of publishers." },
          { step: "2025", title: "500+ Publishers Globally", description: "Expanded to serve over 500 publishers worldwide, processing more than 1 trillion ads served across all platforms." },
        ].map((item, i) => `
        <div class="glass-card p-8 text-center relative animate-on-scroll stagger-${i + 1}" data-testid="timeline-card-${i}">
          <div class="step-number mx-auto mb-6">${item.step}</div>
          <h3 class="text-xl font-semibold text-white mb-4">${item.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${item.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Values -->
  <section class="py-24 lg:py-32" data-testid="about-values-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">What We Stand For</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Our Values</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">The principles that guide everything we do.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>', title: "Innovation", description: "Constantly pushing boundaries with cutting-edge ad tech solutions and AI-powered optimization." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>', title: "Transparency", description: "Full visibility into performance data, auction mechanics, and revenue attribution for every publisher." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>', title: "Partnership", description: "We succeed when our publishers succeed. Every relationship is built on mutual growth and trust." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Performance", description: "Relentless focus on delivering measurable results and maximizing revenue for every partner." },
        ].map((v, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${i + 1}" data-testid="value-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${v.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${v.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${v.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- Stats -->
  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- CTA -->
  ${renderCTASection("Ready to partner with us?", "Get In Touch")}`;

  return renderLayout({
    title: "About Us - HBDR",
    description: "Learn about HBDR's mission to maximize publisher revenue through advanced header bidding and ad monetization solutions.",
    canonicalPath: "/about",
    bodyContent: content,
  });
}

export function renderHowItWorksPage(): string {
  const content = `
  ${renderPageHero("Our Process", "How It Works", "Our streamlined onboarding process gets you from discovery to revenue growth in weeks, not months.")}

  <!-- 3-Step Process -->
  <section class="py-24 lg:py-32" data-testid="hiw-steps-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Getting Started</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Three Simple Steps</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Getting started with HBDR is simple. Our streamlined process gets you monetizing faster.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 relative">
        <div class="hidden lg:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        ${[
          { step: "01", title: "Discovery Call", description: "We start with a comprehensive analysis of your current ad setup. Our team reviews your traffic patterns, existing demand partners, ad placement strategy, and revenue performance to identify optimization opportunities and set clear goals.", details: ["Deep dive into your current ad stack", "Traffic and audience analysis", "Revenue goal setting", "Competitive landscape review"] },
          { step: "02", title: "Customized Proposal", description: "Based on our discovery findings, we create a tailored monetization strategy with detailed revenue forecasts, recommended ad configurations, and a clear implementation roadmap designed specifically for your properties.", details: ["Detailed revenue projections", "Custom ad placement strategy", "Demand partner recommendations", "Implementation timeline and milestones"] },
          { step: "03", title: "Technical Implementation", description: "Our expert engineering team handles the complete integration. We configure your accounts, implement header bidding wrappers, set up analytics dashboards, and run thorough testing to ensure everything performs optimally from day one.", details: ["Header bidding code implementation", "Platform and account configuration", "Analytics dashboard setup", "Performance testing and QA"] },
        ].map((step, i) => `
        <div class="glass-card p-8 text-center relative animate-on-scroll stagger-${i + 1}" data-testid="hiw-step-card-${i}">
          <div class="step-number mx-auto mb-6">${step.step}</div>
          <h3 class="text-xl font-semibold text-white mb-4">${step.title}</h3>
          <p class="text-white/40 mb-6 leading-relaxed text-[0.9375rem]">${step.description}</p>
          <ul class="space-y-3">
            ${step.details.map((d) => `
            <li class="flex items-center gap-3 text-sm text-white/50">
              <div class="w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <div class="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
              </div>
              ${d}
            </li>`).join("")}
          </ul>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <!-- What Happens Next -->
  <section class="py-24 lg:py-32" data-testid="hiw-next-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">After Launch</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">What Happens Next</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Our partnership doesn't end at implementation. Here's how we continue to drive results.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>', title: "Ongoing Optimization", description: "Our algorithms continuously analyze auction data and adjust configurations to maximize your yield. We A/B test ad placements, floor prices, and demand partner configurations to ensure peak performance." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>', title: "Dedicated Support", description: "Every publisher gets a dedicated account manager who monitors your performance daily, provides strategic recommendations, and is available whenever you need assistance with your ad operations." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Revenue Growth", description: "Through continuous optimization, new demand partner integrations, and advanced bidding strategies, we consistently drive quarter-over-quarter revenue growth for our publisher partners." },
        ].map((item, i) => `
        <div class="glass-card p-8 group animate-on-scroll stagger-${i + 1}" data-testid="hiw-next-card-${i}">
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

  <!-- FAQ -->
  <section class="py-24 lg:py-32" data-testid="hiw-faq-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">FAQ</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Frequently Asked Questions</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Common questions about working with HBDR.</p>
      </div>

      <div class="space-y-4" x-data="{ openFaq: null }">
        ${[
          { q: "How long does integration take?", a: "Most integrations are completed within 2-4 weeks, depending on the complexity of your existing ad stack. Our engineering team handles the heavy lifting, and we work closely with your technical team to ensure a smooth transition with zero downtime." },
          { q: "Do I need to change my existing ad stack?", a: "No. HBDR works alongside your existing setup. We integrate with your current ad server and add our header bidding layer on top, complementing your existing demand sources while adding new premium demand partners to increase competition and revenue." },
          { q: "What's the minimum traffic requirement?", a: "We work with publishers starting at 10M monthly impressions. This threshold ensures that our optimization algorithms have sufficient data to deliver meaningful revenue improvements. If you're below this threshold, reach out and we'll discuss options." },
          { q: "How is HBDR different from other solutions?", a: "Unlike traditional ad networks, HBDR uses real-time header bidding technology that creates true competition for every impression. Combined with our proprietary AI-powered bid optimization, managed Prebid server, and dedicated account management, we consistently deliver 30-50% higher revenue than alternatives." },
          { q: "What kind of support do you provide?", a: "Every publisher gets a dedicated account manager who serves as your primary point of contact. You also have access to our 24/7 technical support team, detailed analytics dashboards, and regular performance review meetings to ensure your revenue goals are being met." },
        ].map((faq, i) => `
        <div class="glass-card animate-on-scroll stagger-${i + 1}" data-testid="faq-card-${i}">
          <button @click="openFaq === ${i} ? openFaq = null : openFaq = ${i}" class="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer" data-testid="faq-toggle-${i}">
            <span class="font-semibold text-white text-lg">${faq.q}</span>
            <svg :class="openFaq === ${i} ? 'rotate-180' : ''" class="w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div x-show="openFaq === ${i}" x-cloak x-transition:enter="transition ease-out duration-200" x-transition:enter-start="opacity-0 -translate-y-2" x-transition:enter-end="opacity-100 translate-y-0" class="px-6 pb-6">
            <p class="text-white/40 leading-relaxed">${faq.a}</p>
          </div>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to get started?", "Contact Us")}`;

  return renderLayout({
    title: "How It Works - HBDR",
    description: "Learn how HBDR's simple 3-step process helps publishers maximize ad revenue through header bidding and advanced monetization.",
    canonicalPath: "/how-it-works",
    bodyContent: content,
  });
}

export function renderCareersPage(): string {
  const content = `
  ${renderPageHero("Careers", "Join Our Team", "Shape the future of ad tech. We're building the next generation of ad monetization technology and we want you on our team.")}

  <!-- Why HBDR -->
  <section class="py-24 lg:py-32" data-testid="careers-why-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Why Join Us</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Why HBDR</h2>
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
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Benefits</h2>
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
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Open Positions</h2>
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

export function renderPressPage(): string {
  const content = `
  ${renderPageHero("Press", "Press & News", "Latest updates from HBDR. Stay informed about our milestones, product launches, and industry recognition.")}

  <!-- Press Releases -->
  <section class="py-24 lg:py-32" data-testid="press-releases-section">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Latest News</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Press Releases</h2>
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
              <span class="text-white/60">+1 (555) 123-4567</span>
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

export function renderContactPage(): string {
  const content = `
  ${renderPageHero("Contact", "Get In Touch", "Ready to transform your ad revenue? Our team is here to help you get started with HBDR.")}

  ${renderContactFormSection()}`;

  return renderLayout({
    title: "Contact Us - HBDR",
    description: "Contact HBDR to learn how our header bidding and ad monetization solutions can maximize your publisher revenue.",
    canonicalPath: "/contact",
    bodyContent: content,
  });
}

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  author: string;
  category: string;
  tags: string | null;
  published: string;
  publishedAt: Date | null;
  updatedAt: Date | null;
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Industry Trends": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Best Practices": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Education": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Product Updates": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Case Studies": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };
  return colors[category] || "bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/30";
}

export function renderBlogPage(posts: BlogPostData[]): string {
  const categories = Array.from(new Set(posts.map(p => p.category)));

  const postCards = posts.map(post => `
    <article class="glass-card overflow-hidden group" data-testid="blog-card-${post.slug}">
      <div class="p-6 sm:p-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(post.category)}" data-testid="badge-category">${post.category}</span>
          <span class="text-xs text-white/30">${formatDate(post.publishedAt)}</span>
        </div>
        <a href="/blog/${post.slug}" class="block" data-testid="link-blog-post-${post.slug}">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors leading-snug">${post.title}</h2>
        </a>
        <p class="text-white/40 leading-relaxed mb-5 line-clamp-3">${post.excerpt}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
              <span class="text-xs font-semibold text-[var(--accent)]">${post.author.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <span class="text-sm text-white/50">${post.author}</span>
          </div>
          <a href="/blog/${post.slug}" class="text-sm text-[var(--accent)] font-medium hover:text-[var(--accent-dark)] transition-colors flex items-center gap-1" data-testid="link-read-more-${post.slug}">
            Read More
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  const categoryFilters = categories.map(cat => `
    <button @click="activeCategory = activeCategory === '${cat}' ? '' : '${cat}'"
            :class="activeCategory === '${cat}' ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'border-white/10 text-white/50 hover:text-white hover:border-white/20'"
            class="text-sm px-4 py-2 rounded-full border transition-all"
            data-testid="filter-${cat.toLowerCase().replace(/\s+/g, '-')}">
      ${cat}
    </button>
  `).join("");

  const content = `
  ${renderPageHero("Blog", "Insights & Updates", "Expert perspectives on header bidding, ad monetization, and the future of programmatic advertising.")}

  <section class="py-16 lg:py-24" data-testid="blog-listing">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center gap-3 mb-12" x-data="{ activeCategory: '' }" data-testid="blog-filters">
        <button @click="activeCategory = ''"
                :class="!activeCategory ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'border-white/10 text-white/50 hover:text-white hover:border-white/20'"
                class="text-sm px-4 py-2 rounded-full border transition-all"
                data-testid="filter-all">
          All Posts
        </button>
        ${categoryFilters}
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${postCards}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Want to learn more?", "Contact Us")}`;

  return renderLayout({
    title: "Blog - HBDR",
    description: "Read the latest insights on header bidding, ad monetization, and programmatic advertising from the HBDR team.",
    canonicalPath: "/blog",
    bodyContent: content,
  });
}

export function renderBlogPostPage(post: BlogPostData): string {
  const tagsList = post.tags ? post.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const tagsHtml = tagsList.map(tag => `
    <span class="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40">${tag}</span>
  `).join("");

  const content = `
  <article class="pt-28 pb-16" data-testid="blog-post-${post.slug}">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8" style="animation: fadeInUp 0.6s ease forwards">
        <a href="/blog" class="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[var(--accent)] transition-colors mb-6" data-testid="link-back-to-blog">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Blog
        </a>
        <div class="flex items-center gap-3 mb-6">
          <span class="text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(post.category)}">${post.category}</span>
          <span class="text-sm text-white/30">${formatDate(post.publishedAt)}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gradient leading-snug mb-6" data-testid="text-post-title">${post.title}</h1>
        <p class="text-lg text-white/50 leading-relaxed mb-8">${post.excerpt}</p>
        <div class="flex items-center gap-4 pb-8 border-b border-white/5">
          <div class="w-12 h-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
            <span class="text-sm font-semibold text-[var(--accent)]">${post.author.split(" ").map(n => n[0]).join("")}</span>
          </div>
          <div>
            <div class="font-medium text-white" data-testid="text-post-author">${post.author}</div>
            <div class="text-sm text-white/30">${formatDate(post.publishedAt)}</div>
          </div>
        </div>
      </div>

      <div class="prose-content mt-12" style="animation: fadeInUp 0.6s 0.2s ease both" data-testid="blog-post-content">
        ${post.content}
      </div>

      ${tagsList.length > 0 ? `
      <div class="mt-12 pt-8 border-t border-white/5">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-sm text-white/30 mr-2">Tags:</span>
          ${tagsHtml}
        </div>
      </div>
      ` : ""}

      <div class="mt-12 pt-8 border-t border-white/5">
        <a href="/blog" class="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:text-[var(--accent-dark)] transition-colors" data-testid="link-back-to-blog-bottom">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to All Posts
        </a>
      </div>
    </div>
  </article>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to maximize your ad revenue?", "Get Started")}`;

  return renderLayout({
    title: `${post.title} - HBDR Blog`,
    description: post.excerpt,
    ogTitle: post.title,
    ogDescription: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    bodyContent: content,
  });
}

export function renderBlogAdminPage(posts: BlogPostData[]): string {
  const postRows = posts.map(post => `
    <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors" data-testid="admin-row-${post.id}">
      <td class="py-4 px-4">
        <div class="font-medium text-white text-sm">${post.title}</div>
        <div class="text-xs text-white/30 mt-1">/blog/${post.slug}</div>
      </td>
      <td class="py-4 px-4 hidden sm:table-cell">
        <span class="text-xs font-medium px-2.5 py-1 rounded-full border ${getCategoryColor(post.category)}">${post.category}</span>
      </td>
      <td class="py-4 px-4 hidden md:table-cell text-sm text-white/40">${post.author}</td>
      <td class="py-4 px-4 hidden md:table-cell text-sm text-white/40">${formatDate(post.publishedAt)}</td>
      <td class="py-4 px-4">
        <span class="text-xs px-2.5 py-1 rounded-full ${post.published === 'true' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/40'}">${post.published === "true" ? "Published" : "Draft"}</span>
      </td>
      <td class="py-4 px-4">
        <div class="flex items-center gap-2">
          <a href="/admin/blog/edit/${post.id}" class="text-xs text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors font-medium" data-testid="link-edit-${post.id}">Edit</a>
          <button onclick="if(confirm('Delete this post?')){fetch('/api/blog/${post.id}',{method:'DELETE'}).then(()=>window.location.reload())}"
                  class="text-xs text-red-400 hover:text-red-300 transition-colors font-medium" data-testid="button-delete-${post.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");

  const content = `
  <section class="pt-28 pb-16" data-testid="blog-admin">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">Blog Manager</h1>
          <p class="text-white/40">Create, edit, and manage your blog content.</p>
        </div>
        <a href="/admin/blog/new" class="glass-btn text-sm px-6" data-testid="button-new-post">New Post</a>
      </div>

      <div class="glass-card overflow-hidden">
        <table class="w-full" data-testid="admin-posts-table">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left text-xs font-semibold text-white/50 uppercase tracking-wider py-3 px-4">Title</th>
              <th class="text-left text-xs font-semibold text-white/50 uppercase tracking-wider py-3 px-4 hidden sm:table-cell">Category</th>
              <th class="text-left text-xs font-semibold text-white/50 uppercase tracking-wider py-3 px-4 hidden md:table-cell">Author</th>
              <th class="text-left text-xs font-semibold text-white/50 uppercase tracking-wider py-3 px-4 hidden md:table-cell">Date</th>
              <th class="text-left text-xs font-semibold text-white/50 uppercase tracking-wider py-3 px-4">Status</th>
              <th class="text-left text-xs font-semibold text-white/50 uppercase tracking-wider py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${postRows}
          </tbody>
        </table>
        ${posts.length === 0 ? `
        <div class="py-16 text-center">
          <p class="text-white/40 mb-4">No blog posts yet.</p>
          <a href="/admin/blog/new" class="glass-btn text-sm px-6">Create Your First Post</a>
        </div>
        ` : ""}
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: "Blog Manager - HBDR Admin",
    description: "Manage your HBDR blog content.",
    canonicalPath: "/admin/blog",
    bodyContent: content,
  });
}

export function renderBlogEditorPage(post?: BlogPostData): string {
  const isEdit = !!post;
  const formAction = isEdit ? `/api/blog/${post!.id}` : "/api/blog";
  const formMethod = isEdit ? "PUT" : "POST";

  const content = `
  <section class="pt-28 pb-16" data-testid="blog-editor">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <a href="/admin/blog" class="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[var(--accent)] transition-colors mb-4" data-testid="link-back-to-admin">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Blog Manager
        </a>
        <h1 class="text-3xl font-bold text-white">${isEdit ? "Edit Post" : "New Post"}</h1>
      </div>

      <div class="glass-card p-6 sm:p-8"
           x-data='{
             formData: {
               title: ${JSON.stringify(post?.title || "")},
               slug: ${JSON.stringify(post?.slug || "")},
               excerpt: ${JSON.stringify(post?.excerpt || "")},
               content: ${JSON.stringify(post?.content || "")},
               author: ${JSON.stringify(post?.author || "")},
               category: ${JSON.stringify(post?.category || "")},
               tags: ${JSON.stringify(post?.tags || "")},
               coverImage: ${JSON.stringify(post?.coverImage || "")},
               published: ${JSON.stringify(post?.published || "true")}
             },
             saving: false,
             error: "",
             autoSlug() {
               if (!${isEdit}) {
                 this.formData.slug = this.formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
               }
             },
             async savePost() {
               this.saving = true;
               this.error = "";
               try {
                 const res = await fetch("${formAction}", {
                   method: "${formMethod}",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(this.formData)
                 });
                 const data = await res.json();
                 if (!res.ok) {
                   this.error = data.message || "Failed to save post";
                   this.saving = false;
                   return;
                 }
                 window.location.href = "/admin/blog";
               } catch (e) {
                 this.error = "Failed to save post. Please try again.";
                 this.saving = false;
               }
             }
           }'>
        <div x-show="error" x-cloak class="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm" x-text="error" data-testid="text-error"></div>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Title</label>
            <input type="text" x-model="formData.title" @input="autoSlug()"
                   class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                   placeholder="Enter post title" data-testid="input-title" />
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Slug</label>
            <input type="text" x-model="formData.slug"
                   class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                   placeholder="url-friendly-slug" data-testid="input-slug" />
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-white/60 mb-2">Author</label>
              <input type="text" x-model="formData.author"
                     class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                     placeholder="Author name" data-testid="input-author" />
            </div>
            <div>
              <label class="block text-sm font-medium text-white/60 mb-2">Category</label>
              <input type="text" x-model="formData.category"
                     class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                     placeholder="e.g. Industry Trends" data-testid="input-category" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Tags (comma-separated)</label>
            <input type="text" x-model="formData.tags"
                   class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
                   placeholder="header bidding, programmatic, trends" data-testid="input-tags" />
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Excerpt</label>
            <textarea x-model="formData.excerpt" rows="3"
                      class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 resize-none"
                      placeholder="Brief summary of the post" data-testid="input-excerpt"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-white/60 mb-2">Content (HTML)</label>
            <textarea x-model="formData.content" rows="16"
                      class="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 resize-y font-mono text-sm"
                      placeholder="<h2>Your heading</h2><p>Your content here...</p>" data-testid="input-content"></textarea>
          </div>

          <div class="flex items-center gap-3">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" :checked="formData.published === 'true'" @change="formData.published = $event.target.checked ? 'true' : 'false'" class="sr-only peer" data-testid="input-published" />
              <div class="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:bg-[var(--accent)] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
            <span class="text-sm text-white/60">Published</span>
          </div>

          <div class="flex items-center gap-4 pt-4">
            <button @click="savePost()" :disabled="saving"
                    class="glass-btn text-sm px-8 py-3 disabled:opacity-50"
                    data-testid="button-save-post">
              <span x-show="!saving">${isEdit ? "Update Post" : "Publish Post"}</span>
              <span x-show="saving" x-cloak>Saving...</span>
            </button>
            <a href="/admin/blog" class="text-sm text-white/40 hover:text-white transition-colors" data-testid="link-cancel">Cancel</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  return renderLayout({
    title: `${isEdit ? "Edit" : "New"} Post - HBDR Admin`,
    description: "Blog content editor.",
    canonicalPath: isEdit ? `/admin/blog/edit/${post!.id}` : "/admin/blog/new",
    bodyContent: content,
  });
}

export function renderHeaderBiddingPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Header Bidding", "Maximize every impression with unified auctions powered by Prebid.js and server-side bidding. Our header bidding stack drives fierce competition among demand partners to unlock your true revenue potential.")}

  <section class="py-24 lg:py-32" data-testid="hb-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-hb-overview">
          <div class="glass-tag mb-6">Unified Auctions</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">How Header Bidding Works</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Header bidding revolutionizes programmatic advertising by allowing multiple demand sources to bid on your inventory simultaneously, rather than sequentially through a traditional waterfall. HBDR's implementation leverages Prebid.js — the industry-standard open-source framework — combined with our proprietary server-side bidding infrastructure to ensure every impression is sold at the highest possible price.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our unified auction engine processes bids from 50+ demand partners in under 100 milliseconds, eliminating latency concerns while creating genuine competition for every ad slot. Publishers using HBDR's header bidding solution see an average CPM uplift of 40-60% compared to traditional waterfall setups.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="hb-approach-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Our Approach</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Client-Side & Server-Side Bidding</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">We deploy a hybrid architecture that combines the transparency of client-side auctions with the speed and scale of server-to-server connections.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-client-side">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Client-Side (Prebid.js)</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Our optimized Prebid.js wrapper runs directly in the browser, enabling full auction transparency. We configure bid adapters for each demand partner, implement smart timeout management, and utilize price granularity settings tailored to your inventory.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Full bid-level reporting and transparency</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Cookie-based audience targeting support</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Real-time bid debugging and analytics</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-server-side">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Server-Side (Prebid Server)</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Our Prebid Server infrastructure handles high-volume server-to-server connections, dramatically reducing page latency. This enables more demand partners to participate without impacting user experience or Core Web Vitals scores.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Sub-100ms auction completion times</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Unlimited demand partner connections</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Zero impact on page load performance</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="hb-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Key Features</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Enterprise-Grade Header Bidding</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every feature designed to maximize yield and simplify operations.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Dynamic Floor Pricing", description: "AI-driven floor prices that adapt in real time to market conditions, bid density, and historical performance to maximize CPMs." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>', title: "Auto-Refresh Optimization", description: "Intelligent ad refresh cycles that maximize viewable impressions without sacrificing user experience or violating demand partner policies." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Granular Analytics", description: "Bid-level reporting across every demand partner, ad unit, device, and geography with real-time dashboards and automated alerting." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "A/B Testing Engine", description: "Run controlled experiments on bidder configurations, timeout settings, and floor prices with statistical significance tracking." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Brand Safety Controls", description: "Comprehensive blocklists, category filters, and ads.txt/sellers.json management to ensure only quality demand reaches your inventory." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>', title: "Global Demand Network", description: "Access 50+ premium SSPs and exchanges including Google AdX, Amazon TAM, Index Exchange, OpenX, and PubMatic from a single integration." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="hb-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to supercharge your header bidding?", "Start Your Free Audit")}`;

  return renderLayout({
    title: "Header Bidding Solutions - HBDR",
    description: "Maximize ad revenue with HBDR's enterprise header bidding solutions. Prebid.js, server-side bidding, unified auctions, and 50+ demand partners.",
    canonicalPath: "/solutions/header-bidding",
    bodyContent: content,
  });
}

export function renderDisplayAdsPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Display Ads", "High-impact display advertising optimized for viewability, engagement, and revenue. From standard IAB units to rich media formats, we maximize every pixel.")}

  <section class="py-24 lg:py-32" data-testid="display-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-display-overview">
          <div class="glass-tag mb-6">Display Monetization</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Beyond the Banner</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Display advertising remains the backbone of digital monetization, but the landscape has evolved far beyond simple banners. HBDR's display solution optimizes across all IAB standard formats — from leaderboards and skyscrapers to high-impact adhesion units and responsive multi-size placements — ensuring maximum fill rates and CPMs across every device.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our proprietary viewability engine ensures ads are only served when they have the highest probability of being seen, improving advertiser satisfaction and commanding premium pricing. Combined with lazy loading, smart refresh, and responsive ad unit management, publishers achieve 30-50% higher display revenue.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="display-formats-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Ad Formats</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Premium Display Formats</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Optimized ad units that balance user experience with maximum revenue potential.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { title: "Responsive Multi-Size", desc: "Dynamic ad units that request multiple sizes (e.g., 300x250, 336x280, 300x600) and serve the highest-paying creative that fits the available space. Responsive containers ensure clean layouts across all viewports.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>' },
          { title: "Sticky & Adhesion Units", desc: "Bottom and side adhesion placements that maintain visibility as users scroll, delivering consistently high viewability rates above 85%. Smart dismissal and frequency controls protect user experience.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>' },
          { title: "Rich Media & Interstitials", desc: "High-impact interstitial and expandable formats for premium campaigns. Web interstitials fire between page navigations with compliant close controls and frequency capping per IAB and Google standards.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>' },
        ].map((f, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${i + 1}" data-testid="display-format-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="display-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Key Capabilities</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Intelligent Display Optimization</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every tool you need to maximize display revenue while protecting user experience.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>', title: "Viewability Optimization", description: "Lazy loading and viewport detection ensure ads load only when visible, boosting viewability rates above 70%." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>', title: "Mobile-First Design", description: "Responsive ad containers that adapt to any screen size with mobile-specific formats and touch-friendly interactions." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Brand Safety", description: "Comprehensive category blocking, advertiser exclusions, and malvertising protection to maintain site integrity." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>', title: "Core Web Vitals", description: "Optimized ad delivery that protects CLS, LCP, and FID scores, preserving SEO rankings and user experience." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="display-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to optimize your display revenue?", "Get Your Free Analysis")}`;

  return renderLayout({
    title: "Display Ads Solutions - HBDR",
    description: "Maximize display ad revenue with responsive formats, viewability optimization, and brand safety controls. Premium IAB formats and intelligent refresh.",
    canonicalPath: "/solutions/display-ads",
    bodyContent: content,
  });
}

export function renderCtvOttPage(): string {
  const content = `
  ${renderPageHero("Solutions", "CTV & OTT Advertising", "Tap into the fastest-growing segment of programmatic advertising. Deliver premium video ads across connected TV and streaming platforms with SSAI and server-side ad insertion.")}

  <section class="py-24 lg:py-32" data-testid="ctv-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-ctv-overview">
          <div class="glass-tag mb-6">Premium Video</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">The Future of TV Advertising</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Connected TV and OTT platforms represent the most lucrative opportunity in programmatic advertising. With CPMs 5-10x higher than standard display, CTV offers publishers an unparalleled revenue channel. HBDR's CTV solution connects your streaming inventory to premium video demand from leading DSPs, agencies, and brand-direct buyers.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our server-side ad insertion (SSAI) technology ensures seamless, broadcast-quality ad experiences that match the production value of the surrounding content. No buffering, no latency, no ad blockers — just premium ads delivered to engaged, lean-back audiences on the biggest screen in the house.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ctv-capabilities-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Capabilities</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">End-to-End CTV Monetization</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">From ad pod management to audience targeting, everything you need to monetize streaming content.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-ssai">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Server-Side Ad Insertion (SSAI)</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Ads are stitched directly into the content stream at the manifest level, delivering a seamless viewing experience identical to linear TV. SSAI eliminates buffering between content and ads, prevents ad blocking, and supports all major streaming protocols including HLS and DASH.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Broadcast-quality ad transitions</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad-block resistant delivery</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> HLS, DASH, and CMAF support</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-ad-pods">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Ad Pod Management</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Intelligent ad pod construction with competitive separation, frequency capping, and optimal pod length configuration. Our system dynamically adjusts pre-roll, mid-roll, and post-roll positions based on content duration, viewer engagement, and revenue optimization models.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Dynamic pod length optimization</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Competitive separation rules</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Viewer-centric frequency capping</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ctv-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Platform Features</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Built for Streaming Scale</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Enterprise features that power the biggest names in streaming.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Audience Targeting", description: "Leverage first-party data, ACR signals, and contextual metadata to deliver highly targeted ads across CTV environments." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Unified Reporting", description: "Cross-platform analytics that unify CTV, OTT, and web video performance into a single dashboard with real-time metrics." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Premium Demand", description: "Direct connections to top-tier video DSPs including The Trade Desk, DV360, Amazon, and brand-direct programmatic guaranteed deals." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${i + 1}" data-testid="ctv-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to monetize your streaming content?", "Launch CTV Ads")}`;

  return renderLayout({
    title: "CTV & OTT Advertising - HBDR",
    description: "Monetize connected TV and streaming content with SSAI, premium video demand, and ad pod management. Reach engaged audiences on the biggest screen.",
    canonicalPath: "/solutions/ctv-ott",
    bodyContent: content,
  });
}

export function renderInAppAdsPage(): string {
  const content = `
  ${renderPageHero("Solutions", "In-App Advertising", "Monetize your mobile app with SDK-less integration, rewarded video, interstitials, and native ad formats that drive revenue without compromising user retention.")}

  <section class="py-24 lg:py-32" data-testid="inapp-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-inapp-overview">
          <div class="glass-tag mb-6">Mobile Monetization</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Revenue Without Friction</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            In-app advertising is the primary revenue driver for the vast majority of free-to-play mobile applications. HBDR's in-app solution offers lightweight, SDK-less integration via server-side APIs, eliminating the bloat and complexity of traditional SDK stacks while connecting your app to the full breadth of programmatic demand.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our platform supports all major in-app ad formats — including rewarded video, interstitials, banners, and native ads — with intelligent mediation that maximizes eCPM across every user session. Advanced frequency capping and placement optimization ensure ads enhance rather than interrupt the user experience.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="inapp-formats-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Ad Formats</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Formats That Perform</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every format optimized for engagement, revenue, and user retention.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Rewarded Video", description: "Users opt-in to watch 15-30 second video ads in exchange for in-app rewards. Highest eCPMs with 90%+ completion rates and positive user sentiment." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>', title: "Interstitials", description: "Full-screen ads displayed at natural transition points. Smart frequency capping and contextual triggers ensure maximum impact without disrupting app flow." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>', title: "Native Ads", description: "Seamlessly integrated ads that match your app's look and feel. Custom templates ensure native placements feel organic while delivering strong eCPMs." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z"/>', title: "Banner Ads", description: "Standard and adaptive banner placements optimized for mobile viewports. Smart refresh cycles maximize revenue per session while maintaining quality." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="inapp-format-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="inapp-integration-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-inapp-integration">
          <div class="glass-tag mb-6">Integration</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">SDK-Less Architecture</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Unlike traditional mediation platforms that require heavy SDK integrations, HBDR's server-side approach connects your app to our auction engine via lightweight API calls. This means smaller app binary sizes, fewer crashes, faster app review cycles, and the ability to update demand configurations without app store submissions.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our solution supports both iOS and Android with native-quality rendering, GDPR/CCPA-compliant consent management, and SKAdNetwork/Privacy Sandbox compatibility for post-IDFA attribution.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to monetize your app?", "Start Integration")}`;

  return renderLayout({
    title: "In-App Advertising Solutions - HBDR",
    description: "Monetize mobile apps with rewarded video, interstitials, native ads, and SDK-less integration. Maximize eCPMs while protecting user experience.",
    canonicalPath: "/solutions/in-app-ads",
    bodyContent: content,
  });
}

export function renderMcmPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Multiple Customer Management", "Scale your publishing network with Google's MCM program. HBDR manages the complexity of multi-publisher operations so you can focus on growing your partner portfolio.")}

  <section class="py-24 lg:py-32" data-testid="mcm-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mcm-overview">
          <div class="glass-tag mb-6">Google MCM</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What is Google MCM?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Multiple Customer Management (MCM) is Google's program that allows ad management companies to represent and manage Google Ad Manager accounts on behalf of multiple publishers. As a certified MCM partner, HBDR provides publishers access to premium Google Ad Exchange demand, advanced yield optimization, and enterprise-level support — even if they don't meet Google's individual eligibility thresholds.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Through our MCM relationship, publishers benefit from HBDR's negotiated pricing tiers, priority support channels, and access to exclusive demand that would otherwise be unavailable. We handle all the technical complexity of account provisioning, policy compliance, and revenue reconciliation.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mcm-benefits-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Benefits</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Why Publishers Choose MCM</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Unlock premium demand, simplified operations, and accelerated revenue growth through our MCM partnership.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Google AdX Access", description: "Gain access to Google Ad Exchange premium demand without meeting individual eligibility requirements. Our MCM status opens the door to the world's largest programmatic exchange." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>', title: "Higher Revenue Share", description: "Benefit from HBDR's negotiated revenue share tiers that improve as your network grows. Our scale allows us to pass through better economics than publishers could achieve independently." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Policy Compliance", description: "We handle all Google Ad Manager policy enforcement, ads.txt management, and compliance monitoring so publishers can focus on creating content." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Network Management", description: "Centralized dashboard to manage all publisher accounts, monitor performance across the network, and identify optimization opportunities at scale." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>', title: "Dedicated Support", description: "Priority access to HBDR's ad operations team and escalation paths to Google for account reviews, policy questions, and technical troubleshooting." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Transparent Reporting", description: "Real-time revenue reporting with full breakdowns by publisher, ad unit, geography, and demand source. No hidden fees or opaque revenue calculations." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="mcm-benefit-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mcm-process-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mcm-process">
          <div class="glass-tag mb-6">Onboarding</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Seamless MCM Onboarding</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Getting started with HBDR's MCM program is straightforward. We handle the Google approval process, configure your Ad Manager account, set up demand partnerships, and begin optimization — typically within 5-7 business days. Publishers retain full ownership of their accounts and data throughout the relationship.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Our MCM agreement is transparent with no lock-in periods. Publishers can review performance monthly and our team provides regular optimization recommendations to continuously improve yield across all demand channels.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to join our MCM network?", "Apply for MCM")}`;

  return renderLayout({
    title: "Multiple Customer Management (MCM) - HBDR",
    description: "Join HBDR's Google MCM program. Access Google Ad Exchange, premium demand, and expert ad operations management for your publishing network.",
    canonicalPath: "/solutions/mcm",
    bodyContent: content,
  });
}

export function renderManageAccountPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Manage Account (Google MA)", "Connect to HBDR's parent MCM account in Google Ad Manager 360 and unlock premium AdX demand — while keeping full control of your own GAM and ad operations.")}

  <section class="py-24 lg:py-32" data-testid="account-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-account-overview">
          <div class="glass-tag mb-6">Google MA &middot; MCM Connection</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What Is HBDR Manage Account?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Account (MA) is a <strong class="text-white/70">Multiple Customer Management (MCM)</strong> relationship inside <strong class="text-white/70">Google Ad Manager 360</strong>. When you connect to HBDR's parent MCM account, your Google Ad Manager network is linked to our parent network as a child publisher. This connection grants your site access to <strong class="text-white/70">Google Ad Exchange (AdX)</strong> premium programmatic demand through HBDR — demand that is otherwise unavailable to publishers who don't meet Google's direct AdX eligibility requirements.
          </p>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            The key advantage of a Google MA arrangement is that <strong class="text-white/70">you continue to operate inside your own GAM</strong>. You keep your existing ad units, line items, reporting, and trafficking workflows exactly as they are. HBDR's parent MCM simply extends AdX eligibility to your account so high-value exchange demand can compete in your unified auction alongside your other demand partners.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Whether you call it a Google MA, an HBDR MA, or an MCM Manage Account connection — the result is the same: more competition for every impression, higher CPMs, and significantly more revenue, all without giving up control of your ad operations.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mcm-structure-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">How It Works</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">The MCM Parent-Child Structure</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">A transparent relationship where HBDR provides the AdX connection and you stay in the driver's seat.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1 text-center" data-testid="card-mcm-step-1">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">1</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">MCM Invitation</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            HBDR sends an MCM invitation from our Google Ad Manager 360 parent account to your GAM network. You accept the invitation directly inside your own GAM — a simple, one-click approval.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2 text-center" data-testid="card-mcm-step-2">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">2</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">AdX Demand Flows In</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Once the MCM link is active, Google Ad Exchange demand from HBDR's parent account is made available to compete in your ad auctions. AdX line items appear inside your GAM, competing alongside your existing header bidding, direct deals, and other programmatic partners.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-3 text-center" data-testid="card-mcm-step-3">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">3</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">You Stay in Control</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            You continue to manage your own GAM — your ad units, line item priorities, targeting, reporting, and yield strategy remain entirely under your control. HBDR provides the AdX connection; you run the show.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ma-benefits-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Benefits</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Why Publishers Choose HBDR MA</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Access premium Google AdX demand without changing how you run your ads.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Premium AdX Access", description: "Gain access to Google Ad Exchange's premium programmatic demand pool through HBDR's parent MCM account. AdX buyers compete directly in your GAM auction, driving up CPMs across all your inventory." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Keep Your Own GAM", description: "Unlike other MCM arrangements, a Manage Account connection means you remain the operator of your Google Ad Manager. Your ad stack, your rules, your reporting — nothing changes except more demand." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>', title: "Instant Revenue Lift", description: "Publishers typically see a 20-40% revenue increase within the first 30 days of activating HBDR MA. AdX fills impressions that your existing partners miss and raises the floor for every auction." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Unified Reporting", description: "See all AdX revenue alongside your other demand sources inside your own GAM reports. Full transparency into what HBDR MA is earning you — broken down by ad unit, geography, device, and more." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "No Technical Overhead", description: "There's no SDK to install, no code to add to your site, and no tags to change. The MCM connection is established entirely within Google Ad Manager — HBDR handles the setup and you approve it." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Dedicated Support", description: "Every HBDR MA publisher gets a dedicated account manager who monitors AdX performance, handles policy compliance, manages ads.txt and sellers.json updates, and provides monthly performance reviews." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="account-service-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ma-who-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-ma-who">
          <div class="glass-tag mb-6">Ideal For</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Who Is Google MA Right For?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Account is built for publishers who already have an ad ops team (or handle their own ad operations) and simply need access to premium AdX demand. If you're comfortable managing your own Google Ad Manager but don't qualify for a direct Google Ad Exchange relationship — or if your current AdX partner isn't delivering the results you expect — HBDR MA is the solution.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mt-8">
            ${[
              "Publishers with their own GAM who need AdX access",
              "Sites with 1M+ monthly pageviews seeking higher CPMs",
              "Ad ops teams who want to keep control of their stack",
              "Publishers switching from underperforming MCM partners",
              "Multi-site networks looking for a single AdX connection",
              "Content creators ready to monetize with premium demand",
            ].map(item => `
            <div class="flex items-start gap-3">
              <span class="text-[var(--accent)] mt-1 flex-shrink-0">&#10003;</span>
              <span class="text-white/50 text-[0.9375rem]">${item}</span>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ma-faq-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">FAQ</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Common Questions About Google MA</h2>
      </div>

      <div class="max-w-3xl mx-auto space-y-6">
        ${[
          { q: "What does 'Manage Account' mean in Google Ad Manager?", a: "In Google Ad Manager's MCM (Multiple Customer Management) program, 'Manage Account' means the parent network (HBDR) provides demand — specifically Google AdX — to the child publisher, but the publisher continues to operate in their own GAM. The publisher manages their own ad units, line items, and yield strategy independently." },
          { q: "Will HBDR have access to my GAM?", a: "No. In a Manage Account arrangement, HBDR does not log into or manage your Google Ad Manager. The MCM link simply enables AdX demand to flow from our parent account into your auction. You maintain full administrative control of your own GAM network." },
          { q: "How is Google MA different from Manage Inventory?", a: "With Manage Account, you run your own ad operations and HBDR provides AdX access. With Manage Inventory, HBDR takes over the operational management of your ad stack entirely — setting up ad units, optimizing yield, and managing your GAM on your behalf. MA is hands-off for HBDR; MI is full-service from HBDR." },
          { q: "How quickly can I get started with HBDR MA?", a: "Once your site is approved, the MCM invitation is typically sent within 24-48 hours. After you accept the invitation in your GAM, AdX demand usually begins flowing within a few days once Google completes the policy review." },
          { q: "What are the revenue share terms?", a: "HBDR operates on a transparent revenue share model. Contact us for specific terms based on your traffic volume and inventory profile. There are no setup fees, no minimums, and no long-term contracts required." },
        ].map((faq, i) => `
        <div class="glass-card p-6 animate-on-scroll" data-testid="ma-faq-${i}">
          <h3 class="text-lg font-semibold text-white mb-3">${faq.q}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${faq.a}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to unlock AdX with HBDR Manage Account?", "Get Your MA Connection")}`;

  return renderLayout({
    title: "Manage Account (Google MA) - MCM Connection for AdX Access | HBDR",
    description: "HBDR Manage Account connects your Google Ad Manager to our parent MCM account in GAM 360, giving you premium AdX demand while you keep full control of your own GAM and ad operations. Learn about Google MA and HBDR MA.",
    ogTitle: "Google MA & HBDR MA - Manage Account MCM Connection | HBDR",
    ogDescription: "Connect to HBDR's parent MCM account in Google Ad Manager 360. Access premium AdX demand while running your own GAM. No code changes, no loss of control.",
    canonicalPath: "/solutions/manage-account",
    bodyContent: content,
  });
}

export function renderManageInventoryPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Manage Inventory", "Full-stack ad operations by HBDR. Connect to our parent MCM account and let our team manage your entire ad inventory — yield optimization, demand management, and everything in between.")}

  <section class="py-24 lg:py-32" data-testid="inventory-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-inventory-overview">
          <div class="glass-tag mb-6">Full-Stack Ad Operations</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What Is HBDR Manage Inventory?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Inventory is a <strong class="text-white/70">full-service ad operations engagement</strong> built on top of Google's <strong class="text-white/70">Multiple Customer Management (MCM)</strong> program. Unlike our <a href="/solutions/manage-account" class="text-[var(--accent)] hover:underline">Manage Account</a> offering — where you run your own GAM and we simply provide AdX access — Manage Inventory means <strong class="text-white/70">HBDR takes over the complete management of your ad inventory</strong> inside your Google Ad Manager.
          </p>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            When you connect to HBDR's parent MCM account under a Manage Inventory arrangement, you're granting our team the access needed to operate your ad stack on your behalf. We handle everything: ad unit creation and configuration, header bidding setup, demand partner management, floor pricing, yield optimization, reporting, policy compliance, and ongoing performance tuning. You focus on creating content and growing your audience; we focus on maximizing every dollar your traffic earns.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            This is the engagement model for publishers who want to completely hand off ad monetization to a dedicated team with the tools, technology, and expertise to get the best possible results.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-how-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">How It Works</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">The MCM Manage Inventory Connection</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">You grant HBDR access to manage your GAM inventory, and our team takes it from there.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1 text-center" data-testid="card-mi-step-1">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">1</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">MCM Inventory Link</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            HBDR sends an MCM invitation from our parent Google Ad Manager 360 account. You accept the invitation inside your GAM, granting HBDR the permissions to manage your ad inventory directly.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2 text-center" data-testid="card-mi-step-2">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">2</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">HBDR Takes Over</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            Our ad ops team audits your current setup, then builds and optimizes your entire ad stack from scratch — ad units, Prebid configuration, Google AdX, Open Bidding, demand partners, floor pricing, and more.
          </p>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-3 text-center" data-testid="card-mi-step-3">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center mb-6 mx-auto">
            <span class="text-2xl font-bold text-white/90">3</span>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Continuous Optimization</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">
            HBDR's team continuously monitors and optimizes your yield using our proprietary tools and real-time data. You receive transparent reporting and a dedicated account manager for ongoing communication.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-services-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">What HBDR Manages</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Complete Yield Management</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Every layer of your ad monetization stack, handled by our expert team using industry-leading tools.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-gam-management">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">GAM Setup & Configuration</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            HBDR builds your Google Ad Manager configuration from the ground up. We create optimized ad units, set up line item structures, configure key-value targeting, and implement the ad tags on your site. If you already have a GAM setup, we audit and restructure it for maximum performance.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad unit creation and placement strategy</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Line item architecture and priority management</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Key-value targeting and audience segmentation</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-demand-management">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Demand Partner Stack</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            We select, integrate, and manage a curated stack of demand partners tailored to your traffic profile. This includes Prebid.js header bidding, Google AdX through our MCM parent account, Open Bidding partners, and direct SSP relationships — all continuously optimized for your specific audience and content verticals.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Prebid.js configuration and bidder management</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Google AdX access through HBDR parent MCM</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> 50+ SSP and exchange integrations</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-yield-optimization">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Yield Optimization</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            HBDR's yield management team uses our proprietary optimization tools to squeeze maximum revenue from every impression. We run continuous A/B tests on floor prices, bidder configurations, ad layouts, refresh strategies, and timeout settings — making data-driven decisions that compound into significant revenue growth over time.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Dynamic floor pricing powered by ML</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Automated A/B testing across ad configurations</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Ad refresh and lazy-load optimization</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-reporting-compliance">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Reporting & Compliance</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem] mb-4">
            Full transparency into your ad performance with custom dashboards, monthly strategy reviews, and proactive policy compliance monitoring. HBDR manages your ads.txt, sellers.json, privacy consent (CMP), and all Google policy requirements so you never have to worry about account flags or violations.
          </p>
          <ul class="space-y-2 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Custom revenue dashboards and reports</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> ads.txt and sellers.json management</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> CMP/consent and privacy compliance</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-ma-comparison-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mi-vs-ma">
          <div class="glass-tag mb-6">MA vs. MI</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Manage Account vs. Manage Inventory</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-8">
            Both options connect your GAM to HBDR's parent MCM account, but the level of service is completely different. Here's how to decide which is right for you:
          </p>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-[0.9375rem]">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="py-4 pr-4 text-white/70 font-semibold"></th>
                  <th class="py-4 px-4 text-white/70 font-semibold">Manage Account (MA)</th>
                  <th class="py-4 pl-4 text-white/70 font-semibold">Manage Inventory (MI)</th>
                </tr>
              </thead>
              <tbody class="text-white/40">
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Who runs GAM?</td>
                  <td class="py-3 px-4">You (the publisher)</td>
                  <td class="py-3 pl-4">HBDR</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">AdX Access</td>
                  <td class="py-3 px-4">Yes, via HBDR MCM</td>
                  <td class="py-3 pl-4">Yes, via HBDR MCM</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Ad unit setup</td>
                  <td class="py-3 px-4">You handle it</td>
                  <td class="py-3 pl-4">HBDR handles it</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Header bidding</td>
                  <td class="py-3 px-4">You configure Prebid</td>
                  <td class="py-3 pl-4">HBDR configures Prebid</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Yield optimization</td>
                  <td class="py-3 px-4">You optimize</td>
                  <td class="py-3 pl-4">HBDR optimizes</td>
                </tr>
                <tr class="border-b border-white/5">
                  <td class="py-3 pr-4 text-white/60 font-medium">Floor pricing</td>
                  <td class="py-3 px-4">You set floors</td>
                  <td class="py-3 pl-4">HBDR sets floors (ML-powered)</td>
                </tr>
                <tr>
                  <td class="py-3 pr-4 text-white/60 font-medium">Best for</td>
                  <td class="py-3 px-4">Publishers with ad ops teams</td>
                  <td class="py-3 pl-4">Publishers who want hands-off monetization</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-tools-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">HBDR Advantage</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Our Tools & Team</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Proprietary technology and seasoned ad ops professionals working together to maximize your revenue.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Real-Time Analytics Platform", description: "HBDR's proprietary analytics dashboard gives our team (and you) real-time visibility into revenue, CPMs, fill rates, and bidder performance across every ad unit, geo, and device." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "ML-Powered Floor Engine", description: "Our machine learning floor pricing engine analyzes billions of bid signals to set optimal floors per impression, adjusting dynamically for time of day, seasonality, user value, and market conditions." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>', title: "24/7 Monitoring & Alerts", description: "Automated systems monitor your revenue around the clock. Our team gets instant alerts for fill rate drops, traffic anomalies, demand partner issues, and policy flags — so problems are fixed before you even notice." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "Automated A/B Testing", description: "HBDR runs continuous multivariate tests on bidder configurations, timeout settings, ad layouts, and refresh strategies — compounding incremental gains into significant long-term revenue growth." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', title: "Dedicated Account Manager", description: "Your dedicated HBDR account manager provides monthly performance reviews, strategic recommendations, and direct communication for any questions or requests. Real people, real responsiveness." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>', title: "Transparent Reporting", description: "No black boxes. You get full access to your revenue data, see exactly how every demand source performs, and receive clear explanations for every optimization decision HBDR makes on your behalf." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="inventory-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="mi-who-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-mi-who">
          <div class="glass-tag mb-6">Ideal For</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">Who Should Choose Manage Inventory?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            HBDR Manage Inventory is the right choice for publishers who want to completely outsource their ad monetization. If you don't have an in-house ad ops team — or simply don't want to spend time managing demand partners, floor prices, and GAM configurations — this is the engagement model for you.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mt-8">
            ${[
              "Publishers without an in-house ad ops team",
              "Content creators who want to focus on content, not ads",
              "Sites looking for fully outsourced monetization",
              "Publishers frustrated with underperforming ad partners",
              "Growing sites that need expert yield management from day one",
              "Multi-site operators who need a single partner for all properties",
            ].map(item => `
            <div class="flex items-start gap-3">
              <span class="text-[var(--accent)] mt-1 flex-shrink-0">&#10003;</span>
              <span class="text-white/50 text-[0.9375rem]">${item}</span>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready for full-stack ad operations by HBDR?", "Let HBDR Manage Your Inventory")}`;

  return renderLayout({
    title: "Manage Inventory - Full-Stack Ad Operations by HBDR | MCM",
    description: "HBDR Manage Inventory is a full-service MCM engagement where HBDR manages your entire ad stack — yield optimization, header bidding, demand partners, floor pricing, and GAM operations. Let our team and tools maximize your revenue.",
    ogTitle: "HBDR Manage Inventory - Full-Stack Ad Operations & Yield Management",
    ogDescription: "Hand off your ad monetization to HBDR. We manage your GAM inventory, demand partners, yield optimization, and everything else through our MCM parent account.",
    canonicalPath: "/solutions/manage-inventory",
    bodyContent: content,
  });
}

export function renderOpenBiddingPage(): string {
  const content = `
  ${renderPageHero("Solutions", "Open Bidding", "Leverage Google Open Bidding (formerly EBDA) for server-to-server real-time auctions that bring additional demand into your Google Ad Manager stack without client-side overhead.")}

  <section class="py-24 lg:py-32" data-testid="ob-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-ob-overview">
          <div class="glass-tag mb-6">Server-to-Server Bidding</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What is Open Bidding?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Google Open Bidding (formerly Exchange Bidding Dynamic Allocation, or EBDA) is Google's server-side bidding solution that allows third-party exchanges and SSPs to compete in a unified auction alongside Google Ad Exchange demand — all within Google Ad Manager. Unlike client-side header bidding, Open Bidding happens server-to-server, eliminating page latency while maintaining competitive auction dynamics.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            HBDR configures and manages your Open Bidding setup to complement your existing header bidding stack, creating a multi-layered auction strategy that maximizes competition and revenue. Our hybrid approach ensures you capture demand from partners that perform better in server-side environments while maintaining the transparency benefits of client-side Prebid.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ob-advantages-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">Advantages</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Why Open Bidding Matters</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Combine the best of server-side speed with the scale of Google's ecosystem.</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        ${[
          { title: "Zero Latency Impact", desc: "All auction processing happens server-to-server within Google's infrastructure. No JavaScript, no browser processing, no impact on page load speed or Core Web Vitals scores.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
          { title: "Unified Auction", desc: "Open Bidding participants compete directly against AdX demand in the same auction, ensuring the highest bid always wins. No more waterfall inefficiencies or last-look advantages.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>' },
          { title: "Simplified Billing", desc: "Revenue from all Open Bidding partners is consolidated in your Google Ad Manager payment, reducing reconciliation complexity and providing a single, reliable payment stream.", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>' },
        ].map((f, i) => `
        <div class="glass-card p-8 animate-on-scroll stagger-${i + 1}" data-testid="ob-advantage-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.desc}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="ob-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">HBDR Advantage</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Our Open Bidding Expertise</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">We maximize Open Bidding performance through strategic partner selection and ongoing optimization.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>', title: "Partner Selection", description: "We analyze your traffic profile to identify the ideal Open Bidding yield partners that complement your existing demand stack." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>', title: "Hybrid Strategy", description: "We configure Open Bidding to work seamlessly alongside Prebid.js, ensuring no demand cannibalization and optimal auction pressure." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Revenue Tracking", description: "Detailed reporting on Open Bidding contribution with win rate, CPM trends, and incremental revenue attribution versus other demand channels." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "Ongoing Tuning", description: "Continuous optimization of yield partner configurations, timeout settings, and floor prices specific to the Open Bidding auction environment." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="ob-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to activate Open Bidding?", "Get Started Today")}`;

  return renderLayout({
    title: "Open Bidding Solutions - HBDR",
    description: "Maximize revenue with Google Open Bidding. Server-to-server real-time auctions with zero latency impact and unified auction dynamics in Google Ad Manager.",
    canonicalPath: "/solutions/open-bidding",
    bodyContent: content,
  });
}

export function renderAdExchangePage(): string {
  const content = `
  ${renderPageHero("Solutions", "Google Ad Exchange (AdX)", "Access the world's largest programmatic exchange with premium demand, real-time auctions, and CPMs that outperform standard AdSense by 2-3x. HBDR is your gateway to Google AdX.")}

  <section class="py-24 lg:py-32" data-testid="adx-overview-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto animate-on-scroll">
        <div class="glass-card p-8 sm:p-12" data-testid="card-adx-overview">
          <div class="glass-tag mb-6">Premium Exchange</div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-gradient">What is Google Ad Exchange?</h2>
          <p class="text-lg text-white/50 leading-relaxed mb-6">
            Google Ad Exchange (AdX) is a premium programmatic marketplace that connects publishers with the world's largest pool of brand advertisers and agency demand. Unlike Google AdSense, which serves as an ad network with fixed pricing, AdX operates as a real-time auction exchange where thousands of buyers compete for every impression — resulting in significantly higher CPMs and fill rates.
          </p>
          <p class="text-lg text-white/50 leading-relaxed">
            Access to Google AdX requires either direct qualification through Google or partnership with a certified Google MCM or reseller partner like HBDR. Through our partnership, publishers of all sizes gain access to AdX's premium demand, advanced reporting, and granular controls that are otherwise only available to the largest media companies.
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="adx-comparison-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">AdX vs AdSense</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Why AdX Outperforms AdSense</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">The key differences that drive 2-3x higher revenue for publishers.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="glass-card p-8 animate-on-scroll stagger-1" data-testid="card-adx-benefits">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3">Google Ad Exchange Advantages</h3>
          <ul class="space-y-3 text-white/40 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Real-time auction with thousands of competing buyers</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Access to premium brand and agency demand</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Granular floor pricing and blocking controls</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Private marketplace (PMP) deal support</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Preferred deal and programmatic guaranteed capabilities</li>
            <li class="flex items-start gap-2"><span class="text-[var(--accent)] mt-1">&#10003;</span> Advanced reporting with buyer-level insights</li>
          </ul>
        </div>
        <div class="glass-card p-8 animate-on-scroll stagger-2" data-testid="card-adsense-comparison">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-5">
            <svg class="w-7 h-7 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 12H6"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-white/60 mb-3">Google AdSense Limitations</h3>
          <ul class="space-y-3 text-white/30 text-[0.9375rem]">
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Fixed pricing with limited competition</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Smaller pool of advertisers</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Limited pricing and blocking controls</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> No private marketplace support</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> No programmatic deal capabilities</li>
            <li class="flex items-start gap-2"><span class="text-white/20 mt-1">&#8722;</span> Basic reporting with limited transparency</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  <section class="py-24 lg:py-32" data-testid="adx-features-section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20 animate-on-scroll">
        <div class="glass-tag mb-6 mx-auto w-fit">HBDR + AdX</div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gradient">Maximize Your AdX Revenue</h2>
        <p class="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">Our expertise turns AdX access into maximum revenue.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>', title: "Optimized Configuration", description: "Expert setup of AdX line items, pricing rules, and creative controls tailored to your specific inventory and traffic patterns for maximum yield." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>', title: "Header Bidding + AdX", description: "Our hybrid setup ensures AdX competes against Prebid demand in a true unified auction, driving the highest possible clearing prices for every impression." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>', title: "Policy & Compliance", description: "Full ads.txt and sellers.json management, content policy monitoring, and proactive compliance reviews to protect your AdX account standing." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>', title: "Deal Management", description: "Set up and manage private marketplace deals, preferred deals, and programmatic guaranteed campaigns to capture premium direct-sold revenue through AdX." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>', title: "Revenue Analytics", description: "Comprehensive AdX performance dashboards with buyer-level insights, price floor analysis, and competitive intelligence to inform optimization strategy." },
          { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>', title: "Dedicated Support", description: "Priority escalation to Google for account reviews, policy questions, and feature access. Our direct relationship with Google ensures faster resolution times." },
        ].map((f, i) => `
        <div class="glass-card p-7 group animate-on-scroll stagger-${(i % 3) + 1}" data-testid="adx-feature-card-${i}">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">${f.icon}</svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">${f.title}</h3>
          <p class="text-white/40 leading-relaxed text-[0.9375rem]">${f.description}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderStatsSection()}

  <div class="section-divider max-w-5xl mx-auto"></div>

  ${renderCTASection("Ready to access Google Ad Exchange?", "Get AdX Access")}`;

  return renderLayout({
    title: "Google Ad Exchange (AdX) - HBDR",
    description: "Access Google Ad Exchange premium demand through HBDR. Real-time auctions, 2-3x higher CPMs than AdSense, and expert AdX management for publishers.",
    canonicalPath: "/solutions/ad-exchange-adx",
    bodyContent: content,
  });
}
