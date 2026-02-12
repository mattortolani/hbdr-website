// Shared blog types and helpers used by both blog pages and blog admin

export interface BlogPostData {
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

export function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Industry Trends": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Best Practices": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "Education": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Product Updates": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "Case Studies": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };
  return colors[category] || "bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/30";
}
