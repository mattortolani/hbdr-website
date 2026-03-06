import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizeText } from "../sanitize";

describe("sanitizeHtml", () => {
  it("preserves allowed tags", () => {
    expect(sanitizeHtml("<p>Hello</p>")).toBe("<p>Hello</p>");
    expect(sanitizeHtml("<strong>bold</strong>")).toBe("<strong>bold</strong>");
    expect(sanitizeHtml("<a href=\"/about\">link</a>")).toBe('<a href="/about">link</a>');
  });

  it("strips disallowed tags", () => {
    expect(sanitizeHtml("<script>alert(1)</script>")).toBe("alert(1)");
    expect(sanitizeHtml("<iframe src=\"evil.com\"></iframe>")).toBe("");
    expect(sanitizeHtml("<style>body{}</style>")).toBe("body{}");
  });

  it("strips event handlers", () => {
    expect(sanitizeHtml('<div onclick="alert(1)">click</div>')).toBe("<div>click</div>");
    expect(sanitizeHtml('<img src="/ok.png" onerror="alert(1)" />')).toBe('<img src="/ok.png" />');
  });

  it("blocks javascript: URLs", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">xss</a>')).toBe("<a>xss</a>");
    expect(sanitizeHtml('<a href="JAVASCRIPT:alert(1)">xss</a>')).toBe("<a>xss</a>");
    expect(sanitizeHtml('<a href=" javascript:alert(1)">xss</a>')).toBe("<a>xss</a>");
  });

  it("blocks data: URLs", () => {
    expect(sanitizeHtml('<a href="data:text/html,test">xss</a>')).toBe("<a>xss</a>");
    expect(sanitizeHtml('<img src="data:image/png;base64,abc123" />')).toBe("<img />");
  });

  it("allows safe URLs", () => {
    expect(sanitizeHtml('<a href="https://example.com">link</a>')).toBe('<a href="https://example.com">link</a>');
    expect(sanitizeHtml('<a href="/about">link</a>')).toBe('<a href="/about">link</a>');
    expect(sanitizeHtml('<a href="mailto:test@test.com">link</a>')).toBe('<a href="mailto:test@test.com">link</a>');
    expect(sanitizeHtml('<a href="#section">link</a>')).toBe('<a href="#section">link</a>');
  });

  it("allows safe attributes and strips others", () => {
    expect(sanitizeHtml('<p class="intro" style="color:red">text</p>')).toBe('<p class="intro">text</p>');
    expect(sanitizeHtml('<img src="/ok.png" alt="image" loading="lazy" />')).toBe('<img src="/ok.png" alt="image" loading="lazy" />');
  });

  it("auto-adds rel for target=_blank", () => {
    const result = sanitizeHtml('<a href="https://example.com" target="_blank">link</a>');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it("handles self-closing tags", () => {
    expect(sanitizeHtml("<br />")).toBe("<br />");
    expect(sanitizeHtml("<br>")).toBe("<br />");
    expect(sanitizeHtml("<hr />")).toBe("<hr />");
  });

  it("handles nested allowed tags", () => {
    const input = "<p><strong>bold</strong> and <em>italic</em></p>";
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("handles mixed allowed/disallowed", () => {
    const input = "<p>Hello <script>alert(1)</script> world</p>";
    expect(sanitizeHtml(input)).toBe("<p>Hello alert(1) world</p>");
  });
});

describe("sanitizeText", () => {
  it("escapes HTML special characters", () => {
    expect(sanitizeText("<script>")).toBe("&lt;script&gt;");
    expect(sanitizeText('"hello"')).toBe("&quot;hello&quot;");
    expect(sanitizeText("it's")).toBe("it&#x27;s");
    expect(sanitizeText("a & b")).toBe("a &amp; b");
  });

  it("preserves normal text", () => {
    expect(sanitizeText("Hello World")).toBe("Hello World");
    expect(sanitizeText("test@email.com")).toBe("test@email.com");
  });
});
