import { describe, it, expect } from "vitest";
import { estimateReadTime, formatDate, getCategoryColor } from "../blog-helpers";

describe("estimateReadTime", () => {
  it("returns 1 minute for very short content", () => {
    expect(estimateReadTime("Hello world")).toBe(1);
  });

  it("estimates based on 200 WPM", () => {
    // 400 words should be ~2 minutes
    const words = Array(400).fill("word").join(" ");
    expect(estimateReadTime(words)).toBe(2);
  });

  it("strips HTML tags before counting", () => {
    const html = "<p>" + Array(200).fill("word").join(" ") + "</p><div>extra</div>";
    expect(estimateReadTime(html)).toBe(1);
  });

  it("handles empty content", () => {
    expect(estimateReadTime("")).toBe(1);
  });

  it("rounds to nearest minute", () => {
    // 500 words / 200 WPM = 2.5, rounds to 3
    const words = Array(500).fill("word").join(" ");
    expect(estimateReadTime(words)).toBe(3);
  });
});

describe("formatDate", () => {
  it("formats a valid date", () => {
    const result = formatDate(new Date("2024-06-15"));
    expect(result).toContain("June");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("returns empty string for null", () => {
    expect(formatDate(null)).toBe("");
  });
});

describe("getCategoryColor", () => {
  it("returns specific colors for known categories", () => {
    expect(getCategoryColor("Industry Trends")).toContain("blue");
    expect(getCategoryColor("Best Practices")).toContain("emerald");
    expect(getCategoryColor("Education")).toContain("purple");
    expect(getCategoryColor("Product Updates")).toContain("amber");
    expect(getCategoryColor("Case Studies")).toContain("rose");
  });

  it("returns accent fallback for unknown categories", () => {
    const result = getCategoryColor("Unknown Category");
    expect(result).toContain("accent");
  });
});
