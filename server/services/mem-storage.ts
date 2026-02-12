// In-memory storage for local development (no database required)
import type { IStorage, User, ContactLead, BlogPost, InsertContactLead, InsertBlogPost } from "./storage";

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private contactLeads = new Map<string, ContactLead>();
  private blogPosts = new Map<string, BlogPost>();
  private seeded = false;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(user: { username: string; password: string }): Promise<User> {
    const id = crypto.randomUUID();
    const newUser = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  async createContactLead(lead: InsertContactLead & { ip?: string; source?: string }): Promise<ContactLead> {
    const id = crypto.randomUUID();
    const newLead: ContactLead = {
      id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      impressions: lead.impressions,
      message: lead.message || null,
      ip: lead.ip || null,
      source: lead.source || "contact",
      status: "new",
      createdAt: new Date(),
    };
    this.contactLeads.set(id, newLead);
    return newLead;
  }

  async getContactLeads(): Promise<ContactLead[]> {
    return Array.from(this.contactLeads.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async getContactLeadById(id: string): Promise<ContactLead | undefined> {
    return this.contactLeads.get(id);
  }

  async updateContactLeadStatus(id: string, status: string): Promise<ContactLead | undefined> {
    const lead = this.contactLeads.get(id);
    if (!lead) return undefined;
    lead.status = status;
    return lead;
  }

  async getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    const filtered = publishedOnly ? posts.filter(p => p.published === "true") : posts;
    return filtered.sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost & { publishedAt?: string | Date }): Promise<BlogPost> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newPost: BlogPost = {
      id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage || null,
      author: post.author,
      category: post.category,
      tags: post.tags || null,
      published: post.published || "true",
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : now,
      updatedAt: now,
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;
    Object.assign(post, {
      ...updates,
      coverImage: updates.coverImage !== undefined ? (updates.coverImage || null) : post.coverImage,
      tags: updates.tags !== undefined ? (updates.tags || null) : post.tags,
      updatedAt: new Date(),
    });
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async seedBlogPosts(): Promise<void> {
    if (this.seeded || this.blogPosts.size > 0) return;
    this.seeded = true;
    console.log("Seeding blog posts (in-memory)...");

    const posts: Array<InsertBlogPost & { publishedAt: string }> = [
      {
        title: "The Future of Header Bidding: Trends to Watch in 2025",
        slug: "future-of-header-bidding-2025",
        excerpt: "Header bidding continues to evolve rapidly. From server-side auctions to AI-powered optimization, discover the key trends shaping the future of programmatic advertising.",
        content: `<h2>The Evolving Landscape of Header Bidding</h2><p>Header bidding has revolutionized the way publishers monetize their digital inventory.</p><h3>1. Server-Side Header Bidding Takes Center Stage</h3><p>The shift from client-side to server-side header bidding continues to accelerate.</p><h3>2. AI-Powered Bid Optimization</h3><p>Machine learning algorithms are becoming essential tools for optimizing bid responses.</p><h3>3. Privacy-First Monetization</h3><p>With the deprecation of third-party cookies, the industry is adapting.</p><h3>4. Video and Connected TV Integration</h3><p>Header bidding is expanding beyond traditional display advertising.</p>`,
        author: "Sarah Chen",
        category: "Industry Trends",
        tags: "header bidding,programmatic,trends,2025",
        published: "true",
        publishedAt: "2025-01-15T00:00:00.000Z",
      },
      {
        title: "How Publishers Can Maximize Ad Revenue Without Sacrificing User Experience",
        slug: "maximize-ad-revenue-user-experience",
        excerpt: "Balancing ad revenue with user experience is one of the biggest challenges publishers face.",
        content: `<h2>The Revenue vs. Experience Balancing Act</h2><p>Every publisher faces the same fundamental challenge.</p><h3>Strategic Ad Placement</h3><p>Not all ad placements are created equal.</p><h3>Core Web Vitals Optimization</h3><p>Google's Core Web Vitals directly impact search rankings.</p>`,
        author: "Marcus Johnson",
        category: "Best Practices",
        tags: "user experience,ad revenue,optimization",
        published: "true",
        publishedAt: "2025-01-08T00:00:00.000Z",
      },
      {
        title: "Understanding Programmatic Advertising: A Complete Guide",
        slug: "understanding-programmatic-advertising-guide",
        excerpt: "New to programmatic advertising? This guide breaks down everything publishers need to know.",
        content: `<h2>What is Programmatic Advertising?</h2><p>Programmatic advertising is the automated buying and selling of digital ad inventory.</p><h3>Key Components</h3><p><strong>SSPs</strong> help publishers manage inventory. <strong>DSPs</strong> let advertisers bid.</p>`,
        author: "Elena Rodriguez",
        category: "Education",
        tags: "programmatic,RTB,header bidding,guide",
        published: "true",
        publishedAt: "2024-12-20T00:00:00.000Z",
      },
      {
        title: "HBDR Launches Next-Generation Server-Side Bidding Platform",
        slug: "hbdr-launches-server-side-bidding-platform",
        excerpt: "We're excited to announce the launch of our next-generation server-side bidding platform.",
        content: `<h2>Introducing HBDR Server-Side Bidding 2.0</h2><p>Today, we're thrilled to announce the launch of our next-generation platform.</p><h3>What's New</h3><ul><li>Ultra-Low Latency Auctions</li><li>200+ Active Bidders</li><li>Intelligent Floor Pricing</li></ul>`,
        author: "David Park",
        category: "Product Updates",
        tags: "product launch,server-side bidding,platform",
        published: "true",
        publishedAt: "2025-02-01T00:00:00.000Z",
      },
      {
        title: "5 Common Header Bidding Mistakes and How to Avoid Them",
        slug: "common-header-bidding-mistakes",
        excerpt: "Even experienced publishers make these header bidding mistakes.",
        content: `<h2>Are You Leaving Money on the Table?</h2><p>Header bidding is powerful, but only as effective as its implementation.</p><h3>Mistake #1: Too Many Demand Partners</h3><p>More isn't always better.</p><h3>Mistake #2: Static Timeout Settings</h3><p>Implementing dynamic timeouts can increase bid responses by 15-20%.</p>`,
        author: "Sarah Chen",
        category: "Best Practices",
        tags: "header bidding,mistakes,optimization,tips",
        published: "true",
        publishedAt: "2025-01-22T00:00:00.000Z",
      },
    ];

    for (const post of posts) {
      await this.createBlogPost(post);
    }
    console.log(`Seeded ${posts.length} blog posts.`);
  }
}
