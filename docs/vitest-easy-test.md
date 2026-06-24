# Easy Vitest Starter Test

This file describes a simple Vitest exercise that covers basic utility functions in `src/lib/index.js`.

## What this tests

- `shortId()` returns the first 8 characters of a string.
- `shortId()` handles invalid input safely by returning an empty string.
- `parseDate()` parses a valid ISO date string into a `Date` object.
- `parseDate()` returns `null` when the input is not a valid date.

## Test code

Create `src/lib/index.test.js` with the following content:

```js
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
```

## Run the test

From the repo root, run:

```bash
npx vitest run src/lib/index.test.js
```

Or add a script to `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

Then run:

```bash
npm test
```
