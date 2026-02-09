import { type User, type InsertUser, type ContactLead, type InsertContactLead, type BlogPost, type InsertBlogPost } from "@shared/schema";

let idCounter = 0;
function generateId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {}
  idCounter++;
  const timestamp = Date.now().toString(36);
  const counter = idCounter.toString(36).padStart(4, '0');
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${counter}-${random}`;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactLead(lead: InsertContactLead): Promise<ContactLead>;
  getContactLeads(): Promise<ContactLead[]>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactLeads: Map<string, ContactLead>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.contactLeads = new Map();
    this.blogPosts = new Map();
    this.seedBlogPosts();
  }

  private seedBlogPosts() {
    const posts: Array<InsertBlogPost & { id: string; publishedAt: Date; updatedAt: Date }> = [
      {
        id: generateId(),
        title: "The Future of Header Bidding: Trends to Watch in 2025",
        slug: "future-of-header-bidding-2025",
        excerpt: "Header bidding continues to evolve rapidly. From server-side auctions to AI-powered optimization, discover the key trends shaping the future of programmatic advertising.",
        content: `<h2>The Evolving Landscape of Header Bidding</h2>
<p>Header bidding has revolutionized the way publishers monetize their digital inventory. What started as a simple client-side auction mechanism has grown into a sophisticated ecosystem that drives higher CPMs and increased revenue for publishers worldwide.</p>

<h3>1. Server-Side Header Bidding Takes Center Stage</h3>
<p>The shift from client-side to server-side header bidding continues to accelerate. Server-side solutions reduce page latency, improve user experience, and allow publishers to connect with more demand partners simultaneously. At HBDR, we've seen publishers experience up to 30% faster page load times after migrating to server-side implementations.</p>

<h3>2. AI-Powered Bid Optimization</h3>
<p>Machine learning algorithms are becoming essential tools for optimizing bid responses. These systems analyze billions of data points in real-time to predict the optimal floor prices, identify high-value impressions, and dynamically adjust auction parameters. Publishers using AI-driven optimization report an average 15-25% increase in programmatic revenue.</p>

<h3>3. Privacy-First Monetization</h3>
<p>With the deprecation of third-party cookies and increasing privacy regulations, the industry is adapting. Contextual targeting, first-party data strategies, and privacy-compliant identity solutions are becoming critical components of any header bidding setup. Publishers who proactively adopt these approaches are better positioned for long-term success.</p>

<h3>4. Video and Connected TV Integration</h3>
<p>Header bidding is expanding beyond traditional display advertising. Video header bidding, particularly for Connected TV (CTV) inventory, represents one of the fastest-growing segments in programmatic. Publishers with video content should be exploring these opportunities now.</p>

<h3>Looking Ahead</h3>
<p>The header bidding landscape will continue to evolve, but the core principle remains the same: creating fair, transparent auctions that maximize publisher revenue while delivering value to advertisers. At HBDR, we're committed to staying at the forefront of these changes and helping our partners navigate this dynamic landscape.</p>`,
        author: "Sarah Chen",
        category: "Industry Trends",
        tags: "header bidding,programmatic,trends,2025",
        published: "true",
        publishedAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15"),
      },
      {
        id: generateId(),
        title: "How Publishers Can Maximize Ad Revenue Without Sacrificing User Experience",
        slug: "maximize-ad-revenue-user-experience",
        excerpt: "Balancing ad revenue with user experience is one of the biggest challenges publishers face. Learn proven strategies to optimize both simultaneously.",
        content: `<h2>The Revenue vs. Experience Balancing Act</h2>
<p>Every publisher faces the same fundamental challenge: maximizing ad revenue while maintaining a positive user experience. Overloading pages with ads drives short-term revenue but ultimately hurts engagement, page views, and long-term monetization. Here's how to strike the right balance.</p>

<h3>Strategic Ad Placement</h3>
<p>Not all ad placements are created equal. Research shows that ads placed within content, particularly between paragraphs, generate significantly higher engagement and CPMs than sidebar or footer placements. The key is to integrate ads naturally into the content flow rather than disrupting it.</p>

<h3>Lazy Loading for Performance</h3>
<p>Implementing lazy loading for ad units that appear below the fold can dramatically improve page load times. Users see content faster, bounce rates decrease, and ad viewability actually improves because ads only load when they're likely to be seen.</p>

<h3>Optimizing Ad Density</h3>
<p>Google's Better Ads Standards provide clear guidelines on ad density. Pages should maintain a maximum ad density of 30% on mobile. But smart publishers go further, using data to determine the optimal number of ads per page for their specific audience.</p>

<h3>Core Web Vitals Optimization</h3>
<p>Google's Core Web Vitals directly impact search rankings and user experience. Publishers should monitor their Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS) scores. Header bidding implementations that prioritize these metrics will see better search visibility and user engagement.</p>

<h3>The HBDR Approach</h3>
<p>At HBDR, we use proprietary algorithms to determine the optimal ad configuration for each page and user segment. Our technology continuously tests different layouts, formats, and densities to find the sweet spot where revenue and experience are both maximized.</p>`,
        author: "Marcus Johnson",
        category: "Best Practices",
        tags: "user experience,ad revenue,optimization,core web vitals",
        published: "true",
        publishedAt: new Date("2025-01-08"),
        updatedAt: new Date("2025-01-08"),
      },
      {
        id: generateId(),
        title: "Understanding Programmatic Advertising: A Complete Guide for Publishers",
        slug: "understanding-programmatic-advertising-guide",
        excerpt: "New to programmatic advertising? This comprehensive guide breaks down everything publishers need to know about RTB, header bidding, and maximizing yield.",
        content: `<h2>What is Programmatic Advertising?</h2>
<p>Programmatic advertising is the automated buying and selling of digital ad inventory using technology and data. Instead of manual negotiations between publishers and advertisers, programmatic platforms use algorithms to match ads with available inventory in real-time.</p>

<h3>Key Components of the Programmatic Ecosystem</h3>
<p><strong>Supply-Side Platforms (SSPs)</strong> help publishers manage and sell their ad inventory. They connect to multiple demand sources and run auctions to maximize the price publishers receive for each impression.</p>
<p><strong>Demand-Side Platforms (DSPs)</strong> allow advertisers to bid on and purchase ad inventory across multiple publishers simultaneously. They use data and targeting to reach specific audiences efficiently.</p>
<p><strong>Ad Exchanges</strong> are digital marketplaces where SSPs and DSPs connect. They facilitate the real-time auction process that determines which ad is shown to which user.</p>

<h3>Real-Time Bidding (RTB) Explained</h3>
<p>RTB is the process by which individual ad impressions are bought and sold in real-time auctions. When a user visits a webpage, information about the available ad slot is sent to an ad exchange, which runs an auction among interested advertisers. The winning bid's ad is then displayed to the user. This entire process happens in milliseconds.</p>

<h3>Where Header Bidding Fits In</h3>
<p>Header bidding is an advanced programmatic technique that allows publishers to offer inventory to multiple ad exchanges simultaneously before making calls to their ad servers. This creates competition among demand sources, driving up CPMs and increasing publisher revenue by 20-50% compared to traditional waterfall setups.</p>

<h3>Getting Started with Programmatic</h3>
<p>Publishers looking to enter the programmatic space should start by partnering with an experienced monetization platform like HBDR. We handle the technical complexity so you can focus on creating great content while we maximize your ad revenue.</p>`,
        author: "Elena Rodriguez",
        category: "Education",
        tags: "programmatic,RTB,header bidding,guide,beginners",
        published: "true",
        publishedAt: new Date("2024-12-20"),
        updatedAt: new Date("2024-12-20"),
      },
      {
        id: generateId(),
        title: "HBDR Launches Next-Generation Server-Side Bidding Platform",
        slug: "hbdr-launches-server-side-bidding-platform",
        excerpt: "We're excited to announce the launch of our next-generation server-side bidding platform, delivering faster auctions, higher fill rates, and improved publisher revenue.",
        content: `<h2>Introducing HBDR Server-Side Bidding 2.0</h2>
<p>Today, we're thrilled to announce the launch of our next-generation server-side bidding platform. This represents the culmination of two years of development and testing, designed to address the most pressing challenges facing publishers in programmatic advertising.</p>

<h3>What's New</h3>
<p><strong>Ultra-Low Latency Auctions:</strong> Our new infrastructure processes bid requests in under 50ms, a 60% improvement over our previous platform. This means faster page loads and better user experiences for your visitors.</p>
<p><strong>Expanded Demand Partners:</strong> We've integrated 40+ new demand partners, bringing our total to over 200 active bidders. More competition means higher CPMs for every impression.</p>
<p><strong>Intelligent Floor Pricing:</strong> Our new machine learning model analyzes historical bid data, user signals, and market conditions to set optimal floor prices in real-time. Early adopters have seen a 22% increase in average CPMs.</p>

<h3>Results from Beta Testing</h3>
<p>During our three-month beta testing period with select publisher partners, the results exceeded expectations:</p>
<ul>
<li>Average revenue increase of 35% compared to previous setup</li>
<li>Page load time improvement of 40%</li>
<li>Ad viewability rates increased by 18%</li>
<li>Fill rate improvement of 12%</li>
</ul>

<h3>Availability</h3>
<p>The new platform is available immediately for all existing HBDR partners. New publishers can get started by contacting our team for a free consultation and migration plan. Our engineering team will handle the entire transition with zero downtime.</p>`,
        author: "David Park",
        category: "Product Updates",
        tags: "product launch,server-side bidding,platform,announcement",
        published: "true",
        publishedAt: new Date("2025-02-01"),
        updatedAt: new Date("2025-02-01"),
      },
      {
        id: generateId(),
        title: "5 Common Header Bidding Mistakes and How to Avoid Them",
        slug: "common-header-bidding-mistakes",
        excerpt: "Even experienced publishers make these header bidding mistakes. Learn what they are and how to fix them to unlock your full revenue potential.",
        content: `<h2>Are You Leaving Money on the Table?</h2>
<p>Header bidding is powerful, but it's only as effective as its implementation. After auditing hundreds of publisher setups, we've identified the five most common mistakes that cost publishers significant revenue.</p>

<h3>Mistake #1: Too Many Demand Partners</h3>
<p>More isn't always better. Adding too many demand partners to a client-side header bidding setup can dramatically slow down page loads. Each additional bidder adds latency, and after a certain point, the diminishing returns in revenue don't justify the performance hit. We recommend starting with 5-8 high-quality demand partners and using data to determine which ones actually drive value.</p>

<h3>Mistake #2: Static Timeout Settings</h3>
<p>Many publishers set a single, static timeout for all bid requests. But optimal timeout values vary based on device type, connection speed, and demand partner response times. Implementing dynamic timeouts that adapt to conditions can increase bid responses by 15-20% without sacrificing page performance.</p>

<h3>Mistake #3: Ignoring Price Floors</h3>
<p>Running without price floors or with outdated floor prices is one of the quickest ways to leave money on the table. Smart floor pricing requires continuous optimization based on market conditions, seasonal trends, and inventory quality. Publishers who implement dynamic floor pricing typically see CPM increases of 10-30%.</p>

<h3>Mistake #4: Not Monitoring Discrepancies</h3>
<p>Revenue discrepancies between your ad server and SSP reports can add up quickly. Regular monitoring and reconciliation of reporting data helps identify issues early and ensures you're getting paid for every impression. We recommend weekly audits of key metrics across all demand sources.</p>

<h3>Mistake #5: One-Size-Fits-All Configuration</h3>
<p>Different pages, content types, and user segments deserve different ad configurations. A homepage should be treated differently from an article page. Mobile and desktop often require distinct setups. Tailoring your header bidding configuration to your specific content and audience is essential for maximizing revenue.</p>

<h3>The Fix</h3>
<p>At HBDR, our platform addresses all five of these common issues automatically. Our intelligent optimization engine continuously adjusts partner selection, timeouts, floor pricing, and configuration to ensure you're always running at peak efficiency.</p>`,
        author: "Sarah Chen",
        category: "Best Practices",
        tags: "header bidding,mistakes,optimization,tips",
        published: "true",
        publishedAt: new Date("2025-01-22"),
        updatedAt: new Date("2025-01-22"),
      },
    ];

    for (const post of posts) {
      this.blogPosts.set(post.id, {
        ...post,
        coverImage: post.coverImage || null,
        tags: post.tags || null,
      });
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = generateId();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactLead(insertLead: InsertContactLead): Promise<ContactLead> {
    const id = generateId();
    const lead: ContactLead = { 
      ...insertLead, 
      id,
      message: insertLead.message || null,
      createdAt: new Date(),
    };
    this.contactLeads.set(id, lead);
    return lead;
  }

  async getContactLeads(): Promise<ContactLead[]> {
    return Array.from(this.contactLeads.values());
  }

  async getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    const posts = Array.from(this.blogPosts.values());
    const filtered = publishedOnly ? posts.filter(p => p.published === "true") : posts;
    return filtered.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(p => p.slug === slug);
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = generateId();
    const post: BlogPost = {
      ...insertPost,
      id,
      coverImage: insertPost.coverImage || null,
      tags: insertPost.tags || null,
      published: insertPost.published || "true",
      publishedAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    const updated: BlogPost = {
      ...existing,
      ...updates,
      id: existing.id,
      updatedAt: new Date(),
      publishedAt: existing.publishedAt,
      coverImage: updates.coverImage !== undefined ? (updates.coverImage || null) : existing.coverImage,
      tags: updates.tags !== undefined ? (updates.tags || null) : existing.tags,
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

let _storage: MemStorage | null = null;
export const storage: IStorage = new Proxy({} as IStorage, {
  get(_target, prop) {
    if (!_storage) {
      _storage = new MemStorage();
    }
    const value = (_storage as any)[prop];
    if (typeof value === 'function') {
      return value.bind(_storage);
    }
    return value;
  }
});
