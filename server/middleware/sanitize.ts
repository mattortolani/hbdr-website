// Shared HTML and text sanitization
// Single source of truth — imported by route modules

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/<link[\s\S]*?>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]*/gi, "")
    .replace(/javascript\s*:/gi, "blocked:")
    .replace(/data\s*:/gi, "blocked:")
    .replace(/vbscript\s*:/gi, "blocked:");
}

export function sanitizeText(text: string): string {
  return text.replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "&": "&amp;",
    };
    return entities[char] || char;
  });
}
