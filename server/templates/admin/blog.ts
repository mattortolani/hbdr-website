// Blog admin templates — blog manager and post editor
import { renderLayout } from "../layout";
import { BlogPostData, formatDate, getCategoryColor } from "../components/blog-helpers";

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
