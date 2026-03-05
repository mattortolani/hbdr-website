import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";
import { BlogPostData, formatDate, getCategoryColor, estimateReadTime } from "../components/blog-helpers";

export function renderBlogPage(posts: BlogPostData[]): string {
  const categories = Array.from(new Set(posts.map(p => p.category)));

  const postCards = posts.map(post => {
    const readTime = estimateReadTime(post.content);
    return `
    <article class="glass-card overflow-hidden group"
             x-show="(!activeCategory || activeCategory === '${post.category}') && (!searchQuery || '${post.title.toLowerCase().replace(/'/g, "\\'")}' .includes(searchQuery.toLowerCase()) || '${post.excerpt.toLowerCase().replace(/'/g, "\\'")}' .includes(searchQuery.toLowerCase()))"
             x-transition:enter="transition ease-out duration-200"
             x-transition:enter-start="opacity-0 scale-95"
             x-transition:enter-end="opacity-100 scale-100"
             data-testid="blog-card-${post.slug}">
      ${post.coverImage ? `
      <div class="aspect-[16/9] overflow-hidden">
        <img src="${post.coverImage}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      ` : ""}
      <div class="p-6 sm:p-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(post.category)}" data-testid="badge-category">${post.category}</span>
          <span class="text-xs text-white/30">${formatDate(post.publishedAt)}</span>
          <span class="text-xs text-white/30 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ${readTime} min read
          </span>
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
  `;
  }).join("");

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

  <section class="py-16 lg:py-24" data-testid="blog-listing" x-data="{ activeCategory: '', searchQuery: '' }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div class="relative flex-1 max-w-md">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" x-model="searchQuery" placeholder="Search articles..."
                 class="glass-input w-full pl-11 pr-4 py-3 text-sm" data-testid="input-blog-search" />
        </div>
      </div>

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

export function renderBlogPostPage(post: BlogPostData, relatedPosts?: BlogPostData[]): string {
  const tagsList = post.tags ? post.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const tagsHtml = tagsList.map(tag => `
    <span class="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40">${tag}</span>
  `).join("");

  const readTime = estimateReadTime(post.content);

  const showUpdated = post.updatedAt && post.publishedAt &&
    new Date(post.updatedAt).toDateString() !== new Date(post.publishedAt).toDateString();

  const relatedSection = relatedPosts && relatedPosts.length > 0 ? `
    <div class="mt-16 pt-12 border-t border-white/5">
      <h2 class="text-2xl font-display text-gradient mb-8" data-testid="related-posts-heading">Related Articles</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${relatedPosts.slice(0, 3).map(rp => `
          <a href="/blog/${rp.slug}" class="glass-card p-6 group block" data-testid="related-post-${rp.slug}">
            ${rp.coverImage ? `
            <div class="aspect-[16/9] rounded-lg overflow-hidden mb-4">
              <img src="${rp.coverImage}" alt="${rp.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            ` : ""}
            <span class="text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(rp.category)} mb-3 inline-block">${rp.category}</span>
            <h3 class="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors leading-snug mb-2">${rp.title}</h3>
            <p class="text-sm text-white/40 line-clamp-3">${rp.excerpt}</p>
            <div class="flex items-center gap-2 mt-3 text-xs text-white/30">
              <span>${formatDate(rp.publishedAt)}</span>
              <span>&middot;</span>
              <span>${estimateReadTime(rp.content)} min read</span>
            </div>
          </a>
        `).join("")}
      </div>
    </div>
  ` : "";

  const content = `
  <article class="pt-28 pb-16" data-testid="blog-post-${post.slug}">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8" style="animation: fadeInUp 0.6s ease forwards">
        <a href="/blog" class="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[var(--accent)] transition-colors mb-6" data-testid="link-back-to-blog">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Blog
        </a>
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <span class="text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(post.category)}">${post.category}</span>
          <span class="text-sm text-white/30">${formatDate(post.publishedAt)}</span>
          ${showUpdated ? `<span class="text-sm text-white/25">Updated ${formatDate(post.updatedAt)}</span>` : ""}
          <span class="text-sm text-white/30 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ${readTime} min read
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight text-gradient leading-snug mb-6" data-testid="text-post-title">${post.title}</h1>
        <p class="text-lg text-white/50 leading-relaxed mb-8">${post.excerpt}</p>

        ${post.coverImage ? `
        <div class="rounded-2xl overflow-hidden mb-8 border border-white/5">
          <img src="${post.coverImage}" alt="${post.title}" class="w-full h-auto" />
        </div>
        ` : ""}

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

      ${relatedSection}

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
