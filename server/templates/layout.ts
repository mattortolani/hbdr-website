export interface LayoutOptions {
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
  <meta property="og:image" content="https://hbdr-website.matt-ortolani.workers.dev/assets/HBDR_Logo_Pack_all_sizes_-_2_1770577514801.jpeg" />
  <meta property="og:url" content="https://hbdr-website.matt-ortolani.workers.dev${options.canonicalPath || '/'}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${options.ogTitle || options.title}" />
  <meta name="twitter:description" content="${options.ogDescription || options.description}" />
  <link rel="icon" type="image/jpeg" href="/assets/HBDR_Logo_Pack_all_sizes_-_8_1770577514801.jpeg" />

  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.14/dist/full.min.css" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.14.8/dist/cdn.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Figtree', 'system-ui', 'sans-serif'],
            display: ['Instrument Serif', 'Georgia', 'serif'],
          },
        },
      },
    }
  </script>

  <style>
    * { font-family: 'Figtree', system-ui, sans-serif; }

    :root {
      --glass-bg: rgba(255, 255, 255, 0.04);
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-highlight: rgba(255, 255, 255, 0.12);
      --glass-shadow: rgba(0, 0, 0, 0.4);
      --accent: #2BDE73;
      --accent-glow: rgba(43, 222, 115, 0.25);
      --accent-dark: #1AAF5C;
      --accent-warm: #E8C547;
      --surface: #06060a;
      --surface-elevated: #0e0e14;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--surface);
      color: #e8e8ed;
      overflow-x: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 0;
    }

    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.5;
    }

    body > * { position: relative; z-index: 1; }

    .font-display { font-family: 'Instrument Serif', Georgia, serif; }

    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(48px) saturate(200%);
      -webkit-backdrop-filter: blur(48px) saturate(200%);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(255, 255, 255, 0.14);
      box-shadow:
        0 12px 48px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      transform: translateY(-3px);
    }

    .glass-nav {
      background: rgba(6, 6, 10, 0.75);
      backdrop-filter: blur(48px) saturate(200%);
      -webkit-backdrop-filter: blur(48px) saturate(200%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .glass-input {
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      color: #e8e8ed;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glass-input:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow), 0 0 24px rgba(43, 222, 115, 0.08);
      background: rgba(255, 255, 255, 0.06);
    }

    .glass-input::placeholder { color: rgba(255, 255, 255, 0.25); }

    .glass-btn {
      background: linear-gradient(135deg, var(--accent), var(--accent-dark));
      border: none;
      border-radius: 980px;
      color: #06060a;
      font-weight: 700;
      font-family: 'Figtree', system-ui, sans-serif;
      letter-spacing: -0.01em;
      padding: 14px 32px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .glass-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent 60%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.35s;
    }

    .glass-btn:hover {
      transform: translateY(-1px) scale(1.01);
      box-shadow: 0 6px 32px var(--accent-glow), 0 0 80px rgba(43, 222, 115, 0.12);
    }

    .glass-btn:hover::before { opacity: 1; }

    .glass-btn-outline {
      background: rgba(255, 255, 255, 0.03);
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      border-radius: 980px;
      color: #e8e8ed;
      font-weight: 600;
      font-family: 'Figtree', system-ui, sans-serif;
      letter-spacing: -0.01em;
      padding: 14px 32px;
      backdrop-filter: blur(20px);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glass-btn-outline:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 4px 24px rgba(0,0,0,0.2);
    }

    .liquid-gradient {
      background: radial-gradient(ellipse at 20% 0%, rgba(43, 222, 115, 0.1) 0%, transparent 55%),
                  radial-gradient(ellipse at 80% 100%, rgba(26, 175, 92, 0.06) 0%, transparent 55%),
                  radial-gradient(ellipse at 60% 40%, rgba(232, 197, 71, 0.03) 0%, transparent 50%);
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.3;
      animation: orbFloat 12s ease-in-out infinite;
      will-change: transform;
    }

    .orb-1 {
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(43, 222, 115, 0.3), transparent 70%);
      top: -150px; right: -100px;
      animation-delay: 0s;
    }

    .orb-2 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(26, 175, 92, 0.2), transparent 70%);
      bottom: -80px; left: -80px;
      animation-delay: -6s;
    }

    .orb-3 {
      width: 350px; height: 350px;
      background: radial-gradient(circle, rgba(232, 197, 71, 0.1), transparent 70%);
      top: 40%; left: 55%;
      animation-delay: -3s;
    }

    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(25px, -35px) scale(1.06); }
      50% { transform: translate(-15px, 15px) scale(0.97); }
      75% { transform: translate(20px, 25px) scale(1.03); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.92); }
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

    @keyframes glowPulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }

    @keyframes borderGlow {
      0%, 100% { border-color: rgba(43, 222, 115, 0.15); }
      50% { border-color: rgba(43, 222, 115, 0.35); }
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(35px);
      transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .stagger-1 { transition-delay: 0.08s; }
    .stagger-2 { transition-delay: 0.16s; }
    .stagger-3 { transition-delay: 0.24s; }
    .stagger-4 { transition-delay: 0.32s; }
    .stagger-5 { transition-delay: 0.40s; }
    .stagger-6 { transition-delay: 0.48s; }

    .logo-scroll {
      animation: scrollLogos 40s linear infinite;
    }
    .logo-scroll-reverse {
      animation: scrollLogosReverse 40s linear infinite;
    }
    @keyframes scrollLogosReverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    .logo-scroll:hover, .logo-scroll-reverse:hover { animation-play-state: paused; }

    .text-gradient {
      background: linear-gradient(160deg, #ffffff, rgba(255,255,255,0.55));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding-bottom: 0.15em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }

    .text-gradient-accent {
      background: linear-gradient(135deg, var(--accent), #8DFFC0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding-bottom: 0.15em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 1.25;
      overflow: visible;
      letter-spacing: -0.03em;
    }

    h1 .text-gradient,
    h1 .text-gradient-accent,
    h2 .text-gradient,
    h2 .text-gradient-accent {
      display: inline-block;
      padding-bottom: 0.15em;
      padding-right: 0.08em;
      padding-left: 0.02em;
    }

    .section-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    }

    .glow-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      opacity: 0.3;
    }

    .prose-content h2 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 2rem;
      font-weight: 400;
      color: #fff;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
    .prose-content h3 {
      font-size: 1.35rem;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      margin-top: 2rem;
      margin-bottom: 0.75rem;
      line-height: 1.35;
      letter-spacing: -0.02em;
    }
    .prose-content p {
      color: rgba(255,255,255,0.5);
      line-height: 1.85;
      margin-bottom: 1.25rem;
    }
    .prose-content strong {
      color: rgba(255,255,255,0.85);
      font-weight: 700;
    }
    .prose-content ul, .prose-content ol {
      color: rgba(255,255,255,0.5);
      padding-left: 1.5rem;
      margin-bottom: 1.25rem;
    }
    .prose-content ul { list-style-type: disc; }
    .prose-content ol { list-style-type: decimal; }
    .prose-content li {
      margin-bottom: 0.5rem;
      line-height: 1.75;
    }
    .prose-content a {
      color: var(--accent);
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 1px;
    }
    .prose-content a:hover {
      color: #8DFFC0;
    }
    .prose-content blockquote {
      border-left: 2px solid var(--accent);
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      color: rgba(255,255,255,0.45);
      font-style: italic;
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 1.1rem;
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
      padding: 6px 18px;
      border-radius: 980px;
      background: rgba(43, 222, 115, 0.06);
      border: 1px solid rgba(43, 222, 115, 0.15);
      color: var(--accent);
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .check-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(52, 199, 89, 0.12);
    }

    .x-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(255, 69, 58, 0.12);
    }

    .partial-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px; height: 24px;
      border-radius: 50%;
      background: rgba(255, 214, 10, 0.12);
    }

    .step-number {
      width: 56px; height: 56px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--accent), var(--accent-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.25rem;
      color: #06060a;
      box-shadow: 0 4px 24px var(--accent-glow);
    }

    .glass-select {
      appearance: none;
      background: rgba(255, 255, 255, 0.04);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      color: #e8e8ed;
      padding: 14px 44px 14px 18px;
      width: 100%;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M4.646 5.646a.5.5 0 01.708 0L8 8.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 18px center;
    }

    .glass-select:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .metric-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 14px;
      padding: 18px;
      transition: border-color 0.4s ease;
    }

    .metric-card:hover {
      border-color: rgba(43, 222, 115, 0.2);
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
        <a href="/" class="flex items-center" data-testid="link-logo">
          <img src="/assets/HBDR_logo_wo_tagline_crp_370x116_web_1770664100214.png" alt="HBDR" class="h-8 w-auto" data-testid="img-nav-logo" />
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
              <a href="/solutions/video-player" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-video-player">Video Player</a>
              <a href="/solutions/ctv-ott" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-ctv-ott">CTV & OTT</a>
              <a href="/solutions/in-app-ads" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-in-app-ads">In-App Ads</a>
              <a href="/solutions/mcm" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-mcm">MCM</a>
              <a href="/solutions/manage-account" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-manage-account">Manage Account</a>
              <a href="/solutions/manage-inventory" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-manage-inventory">Manage Inventory</a>
              <a href="/solutions/open-bidding" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-open-bidding">Open Bidding</a>
              <a href="/solutions/ad-exchange-adx" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-ad-exchange">Ad Exchange AdX</a>
            </div>
          </div>
          <a href="/publishers" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-publishers">Publishers</a>
          <a href="/advertisers" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-advertisers">Advertisers</a>
          <a href="/tools" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-tools">Tools</a>
          <a href="/partners" class="text-sm text-white/60 hover:text-white transition-colors" data-testid="link-partners">Partners</a>
          <div class="relative" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button class="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer" data-testid="link-company">
              Company
              <svg class="w-3.5 h-3.5 transition-transform" :class="open ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div x-show="open" x-cloak
                 x-transition:enter="transition ease-out duration-150"
                 x-transition:enter-start="opacity-0 translate-y-1"
                 x-transition:enter-end="opacity-100 translate-y-0"
                 x-transition:leave="transition ease-in duration-100"
                 x-transition:leave-start="opacity-100 translate-y-0"
                 x-transition:leave-end="opacity-0 translate-y-1"
                 class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl py-2 z-50" data-testid="company-dropdown">
              <a href="/about" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-about">About Us</a>
              <a href="/how-it-works" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-how-it-works">How It Works</a>
              <a href="/trust" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-trust">Trust & Compliance</a>
              <a href="/dashboard" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-dashboard">Dashboard</a>
              <a href="/blog" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-blog">Blog</a>
              <a href="/careers" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-careers">Careers</a>
              <a href="/press" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-press">Press</a>
              <a href="/contact" class="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" data-testid="link-contact">Contact</a>
            </div>
          </div>
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
         class="lg:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl overflow-y-auto" style="max-height: calc(100vh - 64px); max-height: calc(100dvh - 64px);"
         data-testid="mobile-menu">
      <div class="px-4 py-6 space-y-1" x-data="{ solOpen: false }">
        <button @click="solOpen = !solOpen" class="w-full text-left py-3 text-lg text-white/80 hover:text-white transition-colors flex items-center justify-between cursor-pointer" data-testid="mobile-link-solutions">
          Solutions
          <svg class="w-4 h-4 transition-transform" :class="solOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div x-show="solOpen" x-cloak x-transition class="pl-4 space-y-0.5 pb-2">
          <a href="/solutions/header-bidding" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-header-bidding">Header Bidding</a>
          <a href="/solutions/display-ads" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-display-ads">Display Ads</a>
          <a href="/solutions/video-player" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-video-player">Video Player</a>
          <a href="/solutions/ctv-ott" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-ctv-ott">CTV & OTT</a>
          <a href="/solutions/in-app-ads" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-in-app-ads">In-App Ads</a>
          <a href="/solutions/mcm" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-mcm">MCM</a>
          <a href="/solutions/manage-account" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-manage-account">Manage Account</a>
          <a href="/solutions/manage-inventory" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-manage-inventory">Manage Inventory</a>
          <a href="/solutions/open-bidding" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-open-bidding">Open Bidding</a>
          <a href="/solutions/ad-exchange-adx" @click="mobileOpen = false" class="block py-2 text-base text-white/60 hover:text-white transition-colors" data-testid="mobile-link-ad-exchange">Ad Exchange AdX</a>
        </div>
        <a href="/publishers" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-publishers">For Publishers</a>
        <a href="/advertisers" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-advertisers">For Advertisers</a>
        <a href="/tools" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-tools">Tools</a>
        <a href="/partners" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-partners">Partners</a>
        <a href="/how-it-works" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-how-it-works">How It Works</a>
        <a href="/about" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-about">About</a>
        <a href="/trust" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-trust">Trust & Compliance</a>
        <a href="/dashboard" @click="mobileOpen = false" class="block py-3 text-lg text-white/80 hover:text-white transition-colors" data-testid="mobile-link-dashboard">Dashboard</a>
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
  return `
  <footer class="pt-16 pb-8" data-testid="footer">
    <div class="glow-line max-w-4xl mx-auto mb-16"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        <div class="col-span-2">
          <div class="flex items-center mb-4">
            <img src="/assets/HBDR_logo_wo_tagline_crp_370x116_web_1770664100214.png" alt="HBDR" class="h-9 w-auto" data-testid="img-footer-logo" />
          </div>
          <p class="text-white/30 leading-relaxed max-w-xs text-sm mb-6">
            Global leader in ad monetization and header bidding solutions. Maximize your revenue with our enterprise-grade platform.
          </p>
          <div class="flex gap-3">
            <a href="https://linkedin.com/company/hbdr" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-linkedin">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/haborMedia" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-twitter">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="mailto:contact@hbdr.com" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-email">
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
              { label: "Video Player", href: "/solutions/video-player" },
              { label: "In-App Ads", href: "/solutions/in-app-ads" },
              { label: "CTV & OTT", href: "/solutions/ctv-ott" },
              { label: "Open Bidding", href: "/solutions/open-bidding" },
              { label: "Ad Exchange AdX", href: "/solutions/ad-exchange-adx" },
              { label: "MCM", href: "/solutions/mcm" },
              { label: "Manage Account", href: "/solutions/manage-account" },
              { label: "Manage Inventory", href: "/solutions/manage-inventory" },
            ].map((l) => `<li><a href="${l.href}" class="text-sm text-white/30 hover:text-white/60 transition-colors" data-testid="link-footer-${l.href.replace(/\//g, '-').slice(1)}">${l.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Company</h4>
          <ul class="space-y-3">
            ${[
              { label: "About Us", href: "/about" },
              { label: "How It Works", href: "/how-it-works" },
              { label: "Careers", href: "/careers" },
              { label: "Press", href: "/press" },
              { label: "Contact", href: "/contact" },
              { label: "Dashboard", href: "/dashboard" },
            ].map((l) => `<li><a href="${l.href}" class="text-sm text-white/30 hover:text-white/60 transition-colors" data-testid="link-footer-${l.href.slice(1)}">${l.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Resources</h4>
          <ul class="space-y-3">
            ${[
              { label: "For Publishers", href: "/publishers" },
              { label: "For Advertisers", href: "/advertisers" },
              { label: "Revenue Calculators", href: "/tools" },
              { label: "Partners", href: "/partners" },
              { label: "Trust & Compliance", href: "/trust" },
              { label: "Blog", href: "/blog" },
              { label: "FAQ & Support", href: "/support" },
            ].map((l) => `<li><a href="${l.href}" class="text-sm text-white/30 hover:text-white/60 transition-colors" data-testid="link-footer-${l.href.slice(1)}">${l.label}</a></li>`).join("")}
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white text-sm mb-4">Legal</h4>
          <ul class="space-y-3">
            ${[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms" },
              { label: "GDPR & Cookie Policy", href: "/gdpr-cookie-policy" },
            ].map((l) => `<li><a href="${l.href}" class="text-sm text-white/30 hover:text-white/60 transition-colors" data-testid="link-footer-${l.href.slice(1)}">${l.label}</a></li>`).join("")}
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

export function renderLayout(options: LayoutOptions): string {
  return `${renderHead(options)}

<body class="antialiased">

  ${renderNav()}

  ${options.bodyContent}

  ${renderFooter()}

  ${renderScripts()}

</body>
</html>`;
}
