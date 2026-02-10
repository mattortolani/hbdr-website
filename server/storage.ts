import { type User, type InsertUser, type ContactLead, type InsertContactLead, type BlogPost, type InsertBlogPost, users, contactLeads, blogPosts } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactLead(lead: InsertContactLead & { ip?: string; source?: string }): Promise<ContactLead>;
  getContactLeads(): Promise<ContactLead[]>;
  getContactLeadById(id: string): Promise<ContactLead | undefined>;
  updateContactLeadStatus(id: string, status: string): Promise<ContactLead | undefined>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactLead(insertLead: InsertContactLead & { ip?: string; source?: string }): Promise<ContactLead> {
    const [lead] = await db.insert(contactLeads).values({
      name: insertLead.name,
      email: insertLead.email,
      company: insertLead.company,
      impressions: insertLead.impressions,
      message: insertLead.message || null,
      ip: insertLead.ip || null,
      source: insertLead.source || "contact",
      status: "new",
    }).returning();
    return lead;
  }

  async getContactLeads(): Promise<ContactLead[]> {
    return db.select().from(contactLeads).orderBy(desc(contactLeads.createdAt));
  }

  async getContactLeadById(id: string): Promise<ContactLead | undefined> {
    const [lead] = await db.select().from(contactLeads).where(eq(contactLeads.id, id));
    return lead;
  }

  async updateContactLeadStatus(id: string, status: string): Promise<ContactLead | undefined> {
    const [lead] = await db.update(contactLeads).set({ status }).where(eq(contactLeads.id, id)).returning();
    return lead;
  }

  async getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    const allPosts = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
    if (publishedOnly) {
      return allPosts.filter(p => p.published === "true");
    }
    return allPosts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values({
      ...insertPost,
      coverImage: insertPost.coverImage || null,
      tags: insertPost.tags || null,
      published: insertPost.published || "true",
    }).returning();
    return post;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = await this.getBlogPostById(id);
    if (!existing) return undefined;
    const [post] = await db.update(blogPosts).set({
      ...updates,
      updatedAt: new Date(),
      coverImage: updates.coverImage !== undefined ? (updates.coverImage || null) : undefined,
      tags: updates.tags !== undefined ? (updates.tags || null) : undefined,
    }).where(eq(blogPosts.id, id)).returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }
}

export const storage: IStorage = new DatabaseStorage();
