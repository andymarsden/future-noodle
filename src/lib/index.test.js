import { describe, it, expect } from "vitest";
import { shortId, parseDate } from "./index.js";

describe("lib/index utilities", () => {
  it("returns the first 8 chars for a string", () => {
    expect(shortId("future-noodle")).toBe("future-n");
  });

  it("returns an empty string for non-string input", () => {
    expect(shortId(123)).toBe("");
    expect(shortId(null)).toBe("");
  });

  it("parses a valid ISO date string", () => {
    const result = parseDate("2026-06-24");
    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString().slice(0, 10)).toBe("2026-06-24");
  });

  it("returns null for invalid date input", () => {
    expect(parseDate("not a date")).toBeNull();
  });
});