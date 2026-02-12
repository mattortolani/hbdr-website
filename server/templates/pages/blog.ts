import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";
import { BlogPostData, formatDate, getCategoryColor } from "../components/blog-helpers";

export function renderBlogPage(posts: BlogPostData[]): string {
  const categories = Array.from(new Set(posts.map(p => p.category)));

  const postCards = posts.map(post => `
    <article class="glass-card overflow-hidden group"
             x-show="!activeCategory || activeCategory === '${post.category}'"
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 scale-95"
             x-transition:enter-end="opacity-100 scale-100"
             data-testid="blog-card-${post.slug}">
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

  <section class="py-16 lg:py-24" data-testid="blog-listing" x-data="{ activeCategory: '' }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center gap-3 mb-12" data-testid="blog-filters">
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
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight text-gradient leading-snug mb-6" data-testid="text-post-title">${post.title}</h1>
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
