# Project Structure

This document is auto-generated from codebase analysis + brief Q&A.
Edit manually as needed.

<!-- GENERATED: PROJECT_STRUCTURE:START -->

## Overview

**Project**: Landing Page Themes
**Stack**: TypeScript + Next.js 16 (App Router) + React 19 + Tailwind CSS v4
**Organization**: By layer (components, pages separate)

---

## Folder Layout

```
landing-page-themes/
├── src/
│   ├── app/                          # Next.js App Router (routes & layouts)
│   │   ├── layout.tsx               # Root layout (ThemeProvider wrapper)
│   │   ├── page.tsx                 # Home page (theme gallery)
│   │   ├── globals.css              # Global styles + Tailwind imports
│   │   ├── favicon.ico
│   │   └── themes/                  # Theme demo routes
│   │       ├── theme1/
│   │       │   └── page.tsx         # Theme 1 demo page
│   │       ├── theme2/
│   │       │   └── page.tsx         # Theme 2 demo page
│   │       └── theme3/
│   │           └── page.tsx         # Theme 3 demo page
│   │
│   └── components/                  # Reusable React components
│       ├── index.ts                 # Barrel export
│       ├── ThemeProvider.tsx        # next-themes wrapper
│       └── ThemeSwitcher.tsx        # Light/dark toggle component
│
├── docs/
│   └── ai/
│       ├── project/                 # Project-wide conventions & structure
│       │   ├── CODE_CONVENTIONS.md
│       │   ├── PROJECT_STRUCTURE.md
│       │   └── template-convention/ # Templates for code generation
│       ├── planning/                # Feature plans (feature-template.md)
│       ├── implementation/          # Per-feature implementation notes
│       └── testing/                 # Test plans and results
│
├── public/                          # Static assets (served at root)
│
├── __tests__/                       # Test files (to be added)
│   └── *.test.tsx                   # Preferred naming pattern
│
└── [config files]
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── eslint.config.mjs
    ├── .prettierrc
    └── postcss.config.mjs
```

---

## Module Boundaries & Dependencies

### Import Direction
```
pages (app/) → components → (utils, hooks)
              ↓
         external libs (next-themes, react)
```

### Path Alias
- `@/*` maps to `./src/*`
- Use `@/components` for component imports
- Example: `import { ThemeSwitcher } from "@/components";`

### Barrel Exports
- `src/components/index.ts` re-exports all components
- Enables clean single-line imports

---

## Design Patterns in Use

### 1. Provider Pattern
**Where**: `ThemeProvider.tsx`
**Purpose**: Wraps application with theme context from `next-themes`
**Usage**: Applied in `layout.tsx` to provide theme state to all children

```typescript
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

### 2. Client-Server Separation
**Where**: Component-level directives
**Purpose**: Optimize rendering by keeping components server-side when possible

- **Server Components** (default): Page components, layouts
- **Client Components** (`"use client"`): `ThemeProvider`, `ThemeSwitcher`

### 3. Composition Pattern
**Where**: `ThemeSwitcher` usage across pages
**Purpose**: Reusable UI component composed into multiple pages

### 4. Data-as-Configuration
**Where**: `page.tsx` home page
**Purpose**: Define theme metadata as static array, map to render

```typescript
const themes = [
  { name: "Theme 1", path: "/themes/theme1", description: "..." },
  // ...
];
```

### 5. Hydration-Safe Pattern
**Where**: `ThemeSwitcher.tsx`
**Purpose**: Prevent hydration mismatch for theme state

```typescript
const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
if (!mounted) return <button disabled />; // Placeholder during hydration
```

---

## Test Placement

| Aspect | Convention |
|--------|------------|
| **Location** | `__tests__/` directory at project root |
| **Naming** | `*.test.tsx` or `*.spec.tsx` |
| **Framework** | To be configured (Jest/Vitest recommended) |

---

## Config & Secrets Handling

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.mjs` | ESLint rules (flat config) |
| `.prettierrc` | Prettier formatting options |
| `postcss.config.mjs` | PostCSS with Tailwind plugin |

### Environment Variables
- Use `.env.local` for local secrets (not committed)
- Use `NEXT_PUBLIC_*` prefix for client-exposed variables
- Access via `process.env.VARIABLE_NAME`

---

## Build & Deployment

### Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

### Build Output
- `.next/` — Next.js build artifacts (gitignored)
- `out/` — Static export if configured (gitignored)

---

## AI Documentation Roles

| Directory | Purpose |
|-----------|---------|
| `docs/ai/project/` | Repository-wide conventions and structure |
| `docs/ai/planning/` | Feature plans using `feature-template.md` |
| `docs/ai/implementation/` | Per-feature implementation notes |
| `docs/ai/testing/` | Test plans and results |

---

## Guiding Questions (for Future Updates)

1. How should new features be organized? → Add route under `app/` or component under `components/`
2. Where do shared utilities go? → Create `src/utils/` or `src/lib/` when needed
3. Where do custom hooks go? → Create `src/hooks/` when needed
4. How to add new theme? → Add folder under `app/themes/[name]/page.tsx`

<!-- GENERATED: PROJECT_STRUCTURE:END -->
