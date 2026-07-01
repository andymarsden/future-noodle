# Button Test Setup Summary

This file documents the changes that made the `Button` test work in this repo.

## What changed

- Used `@testing-library/svelte` to render the Svelte component.
- Imported `describe`, `it`, and `expect` from `vitest`.
- Added `import '@testing-library/jest-dom/vitest';` so DOM matchers like `toBeInTheDocument()` work.
- Installed `@testing-library/jest-dom` as a dev dependency.

## Working test snippet

```js
import { render, screen } from '@testing-library/svelte';
import Button from './button.svelte';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Button', () => {
  it('renders a button', () => {
    render(Button);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## Notes

- This setup works with the current Svelte/Vitest environment in the repo.
- If the repo uses Svelte 5, ensure component mounting matches the Svelte 5 test API when needed.
