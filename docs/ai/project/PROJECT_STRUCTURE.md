# Project Structure

This document is auto-generated from codebase analysis + brief Q&A.
Edit manually as needed.

<!-- GENERATED: PROJECT_STRUCTURE:START -->

## Overview

**Project**: Landing Page Themes
**Stack**: TypeScript + Next.js 16 (App Router) + React 19 + Tailwind CSS v4
**Organization**: By layer (components, hooks, lib) with feature folders for complex features

---

## Folder Layout

```
landing-page-themes/
├── src/
│   ├── app/                              # Next.js App Router (routes & layouts)
│   │   ├── layout.tsx                   # Root layout (ThemeProvider wrapper)
│   │   ├── page.tsx                     # Home page (theme gallery)
│   │   ├── globals.css                  # Global styles + Tailwind imports
│   │   ├── favicon.ico
│   │   └── themes/                      # Theme demo routes
│   │       ├── liquid-editorial/        # Complex theme with WebGL
│   │       │   └── page.tsx
│   │       ├── theme1/
│   │       │   └── page.tsx
│   │       ├── theme2/
│   │       │   └── page.tsx
│   │       └── theme3/
│   │           └── page.tsx
│   │
│   ├── components/                       # Reusable React components
│   │   ├── index.ts                     # Barrel export
│   │   ├── ThemeProvider.tsx            # next-themes wrapper
│   │   ├── ThemeSwitcher.tsx            # Light/dark toggle component
│   │   └── liquid-editorial/            # Feature-specific components
│   │       ├── index.ts                 # Barrel export
│   │       ├── HeroSection.tsx
│   │       ├── Navbar.tsx
│   │       ├── WebGLCanvas.tsx
│   │       ├── DistortionTarget.tsx
│   │       └── StaticFallback.tsx
│   │
│   ├── hooks/                            # Custom React hooks
│   │   ├── index.ts                     # Barrel export
│   │   ├── useScrollVelocity.ts         # Scroll tracking hook
│   │   └── useWebGLSupport.ts           # WebGL capability detection
│   │
│   └── lib/                              # Utility/business logic
│       └── webgl/                       # Domain-specific utilities
│           ├── LiquidDistortion.ts      # Main WebGL class
│           ├── ScrollVelocityTracker.ts # Singleton scroll tracker
│           └── PerformanceMonitor.ts    # Performance monitoring
│
├── tests/                                # Test files
│   ├── unit/                            # Unit tests
│   │   └── *.spec.ts                    # Naming: *.spec.ts or *.test.ts
│   └── integration/                     # Integration/E2E tests
│       └── *.e2e.spec.ts                # Naming: *.e2e.spec.ts
│
├── docs/
│   └── ai/
│       ├── project/                     # Project-wide conventions & structure
│       │   ├── CODE_CONVENTIONS.md
│       │   ├── PROJECT_STRUCTURE.md
│       │   └── template-convention/     # Templates for code generation
│       ├── planning/                    # Feature plans
│       ├── implementation/              # Per-feature implementation notes
│       └── testing/                     # Test documentation
│           ├── unit-{name}.md           # Unit test docs
│           └── integration-{name}.md   # Integration test docs
│
├── public/                              # Static assets (served at root)
│
└── [config files]
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── eslint.config.mjs
    ├── vitest.config.ts                 # Vitest test configuration
    ├── vitest.setup.ts                  # Test setup file
    └── postcss.config.mjs
```

---

## Module Boundaries & Dependencies

### Import Direction
```
pages (app/) → components → hooks → lib
              ↓
         external libs (next-themes, react, three)
```

### Path Alias
- `@/*` maps to `./src/*`
- Use `@/components`, `@/hooks`, `@/lib` for imports
- Example: `import { ThemeSwitcher } from "@/components";`
- Example: `import { useScrollVelocity } from "@/hooks";`
- Example: `import { LiquidDistortion } from "@/lib/webgl/LiquidDistortion";`

### Barrel Exports
- `src/components/index.ts` — re-exports all components
- `src/components/liquid-editorial/index.ts` — feature-specific exports
- `src/hooks/index.ts` — re-exports all hooks
- Enables clean single-line imports

---

## Design Patterns in Use

### 1. Singleton Pattern
**Where**: `ScrollVelocityTracker.ts`, `PerformanceMonitor.ts`
**Purpose**: Share single instance across the application

```typescript
let instance: ScrollVelocityTracker | null = null;
export function getScrollVelocityTracker(): ScrollVelocityTracker {
  if (!instance) {
    instance = new ScrollVelocityTracker();
  }
  return instance;
}
```

### 2. Observable/Subscription Pattern
**Where**: `ScrollVelocityTracker.ts`
**Purpose**: Pub-sub for velocity updates across multiple consumers

```typescript
subscribe(callback: VelocityCallback): () => void {
  this.listeners.add(callback);
  return () => this.listeners.delete(callback);
}
```

### 3. Hook Wrapper Pattern
**Where**: `useScrollVelocity.ts`, `useWebGLSupport.ts`
**Purpose**: React hook wrapping utility class/singleton

```typescript
export function useScrollVelocity(): UseScrollVelocityResult {
  const trackerRef = useRef(getScrollVelocityTracker());
  // Subscribe and return state...
}
```

### 4. Provider Pattern
**Where**: `ThemeProvider.tsx`
**Purpose**: Wraps application with theme context

```typescript
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

### 5. Hydration-Safe Pattern (useSyncExternalStore)
**Where**: `useWebGLSupport.ts`, `ThemeSwitcher.tsx`
**Purpose**: Prevent hydration mismatch for client-only state

```typescript
const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
if (!mounted) return <button disabled />; // Placeholder during hydration
```

### 6. Config Objects Pattern
**Where**: `LiquidDistortion.ts`, `ScrollVelocityTracker.ts`
**Purpose**: Interface-based configuration for flexibility

```typescript
interface LiquidDistortionConfig {
  container: HTMLElement;
  imageUrl: string;
  // ...
}
```

### 7. Bound Event Handlers Pattern
**Where**: Utility classes with event listeners
**Purpose**: Bind methods in constructor for proper cleanup

```typescript
constructor() {
  this.boundHandleScroll = this.handleScroll.bind(this);
  this.boundHandleResize = this.handleResize.bind(this);
}
```

---

## Test Configuration

### Unit Tests
- **Framework**: Vitest
- **Run command**: `npm test` or `npx vitest run`
- **Watch mode**: `npm run test:watch`
- **Coverage**: `npm run test:coverage`
- **Config file**: `vitest.config.ts`
- **Setup file**: `vitest.setup.ts`
- **Test location**: `tests/unit/`
- **File pattern**: `*.spec.ts` or `*.test.ts`

### Integration Tests
- **Framework**: Playwright (when needed)
- **Run command**: `npx playwright test`
- **Config file**: `playwright.config.ts`
- **Test location**: `tests/integration/`
- **File pattern**: `*.e2e.spec.ts`

### Test Libraries
- `@testing-library/react` — Component testing
- `@testing-library/jest-dom` — DOM assertions
- `jsdom` — Browser environment for Vitest

---

## Config & Secrets Handling

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.mjs` | ESLint rules (flat config) |
| `vitest.config.ts` | Vitest test configuration |
| `vitest.setup.ts` | Test setup (jsdom, matchers) |
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
  "format:check": "prettier --check .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
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
| `docs/ai/testing/` | Test documentation (`unit-*.md`, `integration-*.md`) |

---

## Guiding Questions (for Future Updates)

1. **New feature?** → Add route under `app/` + components under `components/{feature}/`
2. **Shared utilities?** → Add to `src/lib/` (domain-specific subfolder if needed)
3. **Custom hooks?** → Add to `src/hooks/` with barrel export
4. **New theme?** → Add folder under `app/themes/[name]/page.tsx`
5. **Complex feature?** → Create feature folder under `components/` with own `index.ts`

<!-- GENERATED: PROJECT_STRUCTURE:END -->
