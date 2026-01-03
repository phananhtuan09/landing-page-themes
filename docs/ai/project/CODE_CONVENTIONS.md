# Code Conventions

This document is auto-generated from codebase analysis + brief Q&A.
Edit manually as needed.

<!-- GENERATED: CODE_CONVENTIONS:START -->

## Project Context

| Property      | Value                                         |
|---------------|-----------------------------------------------|
| **Language**  | TypeScript 5                                  |
| **Framework** | Next.js 16 (App Router) + React 19            |
| **Styling**   | Tailwind CSS v4                               |
| **Tooling**   | ESLint 9 + Prettier (integrated via plugin)   |
| **Build**     | PostCSS with Tailwind                         |
| **Path Alias**| `@/*` → `./src/*`                             |

---

## Principles — The "Why"

- **DRY (Don't Repeat Yourself)**: Avoid duplicating code. Abstract common logic into reusable functions, classes, or modules.
- **KISS (Keep It Simple, Stupid)**: Prefer simple, straightforward solutions over clever or unnecessarily complex ones. Code should be as simple as possible, but no simpler.
- **YAGNI (You Ain't Gonna Need It)**: Do not add functionality or create abstractions until they are actually needed. Avoid premature optimization.

---

## Naming Conventions

### Variables & Functions
- Use **camelCase** for all value-level identifiers
- Examples: `setTheme`, `mounted`, `emptySubscribe`, `themes`

### Components & Types
- Use **PascalCase** for React components, types, interfaces, and classes
- Examples: `ThemeSwitcher`, `ThemeProvider`, `Metadata`

### Constants
- Use **camelCase** for local constants
- Use **UPPER_SNAKE_CASE** for truly global/immutable configuration values

### Files
- Use **PascalCase** for component files (e.g., `ThemeSwitcher.tsx`)
- Use **kebab-case** for route folders (e.g., `theme1/`, `theme2/`)
- Use **camelCase** for utility files if added

### CSS Classes
- Use Tailwind utility classes (kebab-case)
- Examples: `min-h-screen`, `bg-gradient-to-br`, `dark:bg-gray-900`

### General Rules
- Prefer meaningful, verbose names over abbreviations
- Avoid 1–2 character identifiers (except `i`, `j`, `k` in small loops)
- Be consistent: if you use `getUser`, use `getProduct`, not `fetchProduct`
- Function names should be verbs; variables and classes should be nouns

---

## TypeScript Conventions

### Types & Interfaces
- Use `interface` for public APIs and object shapes (easily extended)
- Use `type` for unions (`|`), intersections (`&`), tuples, or complex aliases
- Avoid the `I` prefix (e.g., `User`, not `IUser`)

### Type Safety
- **Avoid `any`** — it disables type-checking entirely (`@typescript-eslint/no-explicit-any`: warn)
- Prefer `unknown` over `any` when the type is truly unknown
- Use `readonly` for properties that should not be mutated
- Explicitly type all public function signatures

### Modules
- Use ES Modules (`import`/`export`)
- Prefer **named exports** over default exports for consistency
- Avoid `namespace`; use modules for encapsulation

### Configured Rules (from ESLint)
```json
"@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
"@typescript-eslint/no-explicit-any": "warn"
```

---

## React Conventions

### Components
- Use **PascalCase** for component names; one component per file
- Props are immutable; derive minimal state
- Use stable `key` for lists (not index) when order can change
- Mark client components with `"use client"` directive at top

### Hooks
- Follow the Rules of Hooks (top-level, consistent order)
- Declare all hook dependencies explicitly
- Prefer stable callbacks with `useCallback` when passed to children
- Memoize expensive computations with `useMemo` only when measured bottlenecks exist

### State & Effects
- Keep state minimal and serializable
- Side effects belong in `useEffect` with correct deps; cleanup subscriptions/timers
- For hydration-safe patterns, use `useSyncExternalStore`

### Performance
- Avoid unnecessary re-renders: memo child components when props are stable
- Prefer code splitting (lazy + Suspense) for large routes/widgets

### Accessibility
- Use semantic HTML elements first
- Include `aria-*` only when needed
- Ensure interactive elements are keyboard-accessible

### Configured Rules (from ESLint)
```json
"react/jsx-key": "error"
"react/no-array-index-key": "warn"
"react/self-closing-comp": "error"
"react-hooks/rules-of-hooks": "error"
"react-hooks/exhaustive-deps": "warn"
```

---

## Import Order & Grouping

Observed pattern in this codebase:

1. **Directives** — `"use client"` for client components
2. **Framework imports** — Next.js, React
3. **Third-party imports** — External libraries (e.g., `next-themes`)
4. **Internal imports** — Using path alias `@/...`
5. **CSS imports** — At the end (e.g., `"./globals.css"`)

**Example:**
```typescript
"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { ThemeSwitcher } from "@/components";
```

---

## Functions / Methods

- **Single Responsibility**: A function should do one thing well
- **Limit Arguments**: Prefer 0-2 arguments; use config objects for more
- **Avoid Side Effects**: Functions should be predictable; don't modify external state
- **Guard Clauses**: Prefer early returns to reduce nesting depth
- **Max Nesting**: Avoid nesting beyond 2–3 levels; refactor into smaller functions

---

## Error Handling

- Throw errors with clear, actionable messages
- Do not catch errors without meaningful handling (logging, retrying, or re-throwing)
- Swallowing exceptions silently is a major source of bugs

### Configured Rules
```json
"no-unused-expressions": "error"
```

---

## Comments

- Add comments only for complex or non-obvious logic; explain **"why"**, not **"how"**
- Place comments above code blocks or use JSDoc (`/** ... */`)
- Avoid trailing inline comments
- **Remove dead code** — do not leave commented-out code; Git is the history

---

## Formatting

### Prettier Configuration
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "jsxSingleQuote": false
}
```

### General Rules
- Match existing repository formatting (Prettier enforces this)
- Prefer multi-line over long one-liners or complex ternaries
- Do not reformat unrelated code in logic-focused changes
- Use curly braces for all control statements (`curly: ["error", "all"]`)

---

## Testing

- **Test Directory**: `__tests__/` at the source level
- **Naming Pattern**: `*.test.tsx` or `*.spec.tsx`
- **Testing Strategy**: Unit tests first; integration tests when needed
- **Coverage**: Focus on critical paths and edge cases

> Note: Testing infrastructure not yet configured in this project.

---

## Change Discipline

- Re-read target files before editing to ensure accurate context
- After edits, run fast validation on changed files:
  - `npm run lint` (ESLint)
  - `npx tsc --noEmit` (Type check)
  - Do NOT run Prettier manually (CI/tooling handles formatting)
- Attempt auto-fixes up to 3 times (`npm run lint:fix`) before requesting help

---

## Configured ESLint Rules Summary

| Rule | Level | Notes |
|------|-------|-------|
| `prettier/prettier` | warn | Formatting via plugin |
| `@typescript-eslint/no-unused-vars` | error | Allows `_` prefix |
| `@typescript-eslint/no-explicit-any` | warn | Discourage `any` |
| `react/jsx-key` | error | Required for lists |
| `react/no-array-index-key` | warn | Prefer stable keys |
| `react/self-closing-comp` | error | Clean JSX |
| `react-hooks/rules-of-hooks` | error | Hooks discipline |
| `react-hooks/exhaustive-deps` | warn | Correct deps |
| `no-console` | warn | Allow warn/error only |
| `no-debugger` | error | No debugger statements |
| `no-duplicate-imports` | error | Clean imports |
| `eqeqeq` | error | Always use `===` |
| `curly` | error | Always use braces |

<!-- GENERATED: CODE_CONVENTIONS:END -->
