// Validation schemas — pure Zod, no Drizzle dependency
import { z } from "zod";

// Contact lead validation
export const insertContactLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  impressions: z.string().min(1, "Please select your monthly impressions"),
  message: z.string().nullable().optional(),
});

// Blog post validation
export const insertBlogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  coverImage: z.string().nullable().optional(),
  author: z.string().min(2, "Author name is required"),
  category: z.string().min(2, "Category is required"),
  tags: z.string().nullable().optional(),
  published: z.string().optional().default("true"),
});

// Inferred types (for callers that need the insert shape)
export type InsertContactLead = z.infer<typeof insertContactLeadSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
