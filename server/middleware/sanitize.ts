// Shared HTML and text sanitization
// Allowlist-based: only explicitly permitted tags and attributes pass through

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "ul", "ol", "li",
  "a", "strong", "em", "b", "i", "u", "s",
  "blockquote", "pre", "code",
  "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "div", "span",
  "figure", "figcaption",
  "sup", "sub", "mark", "small",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height", "loading"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan", "scope"]),
  "*": new Set(["class", "id"]),
};

const UNSAFE_URL_PATTERN = /^\s*(javascript|vbscript|data)\s*:/i;
const SAFE_URL_PROTOCOLS = /^(https?:|mailto:|\/|#)/i;

function isUrlSafe(url: string): boolean {
  if (UNSAFE_URL_PATTERN.test(url)) return false;
  // Allow relative URLs and safe protocols
  if (url.startsWith("/") || url.startsWith("#") || SAFE_URL_PROTOCOLS.test(url)) return true;
  // Block anything else that looks like a protocol
  return !/^[a-z][a-z0-9+.-]*:/i.test(url);
}

function sanitizeAttributes(tagName: string, attrString: string): string {
  const allowedForTag = ALLOWED_ATTRS[tagName] || new Set<string>();
  const globalAllowed = ALLOWED_ATTRS["*"];
  const result: string[] = [];

  // Match attributes: name="value", name='value', name=value, or boolean name
  const attrRegex = /([a-z][a-z0-9-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>"']+)))?/gi;
  let match;

  while ((match = attrRegex.exec(attrString)) !== null) {
    const attrName = match[1].toLowerCase();
    const attrValue = match[2] ?? match[3] ?? match[4] ?? "";

    // Skip event handlers
    if (attrName.startsWith("on")) continue;

    // Check if attribute is allowed for this tag or globally
    if (!allowedForTag.has(attrName) && !globalAllowed.has(attrName)) continue;

    // Validate URL attributes
    if ((attrName === "href" || attrName === "src") && !isUrlSafe(attrValue)) continue;

    result.push(`${attrName}="${attrValue.replace(/"/g, "&quot;")}"`);

    // Auto-add rel="noopener noreferrer" for external links
    if (attrName === "target" && attrValue === "_blank") {
      result.push('rel="noopener noreferrer"');
    }
  }

  return result.length > 0 ? " " + result.join(" ") : "";
}

export function sanitizeHtml(html: string): string {
  // Process tag by tag
  return html.replace(/<\/?([a-z][a-z0-9]*)\b([^>]*?)\s*\/?>/gi, (fullMatch, tagName, attrs) => {
    const tag = tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) return "";

    const isClosing = fullMatch.startsWith("</");
    if (isClosing) return `</${tag}>`;

    const isSelfClosing = fullMatch.endsWith("/>") || tag === "br" || tag === "hr" || tag === "img";
    const sanitizedAttrs = sanitizeAttributes(tag, attrs || "");

    return isSelfClosing ? `<${tag}${sanitizedAttrs} />` : `<${tag}${sanitizedAttrs}>`;
  });
}

export function sanitizeText(text: string): string {
  return text.replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "&": "&amp;",
    };
    return entities[char] || char;
  });
}
