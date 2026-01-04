# Plan: Liquid Editorial Theme - Premium Animation Enhancement

Note: All content in this document must be written in English.

## 0. Requirements Reference

- **Original Plan**: [archive/feature-liquid-editorial-theme_*.md](./archive/) (layout/UX fixes - mostly complete)
- **Review Source**: "Landing Page Virtuoso" critique - transform from "boring 6.5/10" to "Awwwards-contender"
- **Goal**: Add personality, premium interactions, and fluid dynamics while maintaining clean aesthetic

---

## 1. Codebase Context

### Current State Analysis

The layout/UX fixes from the previous plan are complete. The page now has:
- Clean typography hierarchy with WCAG AA compliance
- Standard grid layouts without overlapping
- Subtle WebGL scroll distortion (reduced from original aggressive effect)
- Proper accessibility with screen reader support

**Current Animation Stack:**
| Library | Version | Current Usage |
|---------|---------|---------------|
| Three.js | 0.169.0 | WebGL scroll distortion in `LiquidDistortion.ts` |
| CSS | Native | Basic transitions (hover states, bounce animation) |
| None | - | No split-text, no scroll triggers, no magnetic effects |

**What's Missing (from "Virtuoso" review):**
- Character/word-level text animations (currently fade whole blocks)
- Variable font interactions (reactive font weight on hover)
- Accent text depth treatment (currently flat red color)
- Staggered scroll-trigger animations
- Magnetic hover with 3D tilt effects
- Parallax depth in testimonials
- Liquid reveal animations for CTA

### Files to Modify/Add
| File | Action | Purpose |
|------|--------|---------|
| `src/components/liquid-editorial/HeroSection.tsx` | MODIFIED | Split-text animation, accent shadow |
| `src/components/liquid-editorial/FeaturesSection.tsx` | MODIFIED | Scroll stagger, magnetic hover, variable font |
| `src/components/liquid-editorial/TestimonialsSection.tsx` | MODIFIED | Parallax scroll depths |
| `src/components/liquid-editorial/CTASection.tsx` | MODIFIED | Liquid reveal, rotating icon |
| `src/lib/animations/SplitText.tsx` | ADDED | Character/word split animation utility |
| `src/lib/animations/useMagneticHover.ts` | ADDED | Magnetic cursor-follow with 3D tilt |
| `src/lib/animations/useScrollTrigger.ts` | ADDED | Intersection Observer-based scroll triggers |
| `src/lib/animations/useParallax.ts` | ADDED | Scroll-based parallax offsets |
| `src/lib/animations/LiquidReveal.tsx` | ADDED | SVG mask liquid fill animation |
| `src/app/globals.css` | MODIFIED | Variable font setup, accent shadow utility |
| `package.json` | MODIFIED | Add Framer Motion dependency |

### Reusable Patterns to Follow
- CSS variables for theming (`--liquid-accent`, `--liquid-text`, etc.)
- Component-based architecture with TypeScript interfaces
- Three.js pattern from `LiquidDistortion.ts` for WebGL effects
- Tailwind-style utility classes with custom CSS variables

---

## 2a. Design Specifications

### Animation Philosophy

**From Virtuoso Review:**
> "A site with this name needs to feel alive, reactive, and organic. Currently, it feels like a well-designed PDF."

**Animation Principles:**
1. **Entrance**: Staggered reveals, not block fades
2. **Reactivity**: UI responds to user presence (hover, scroll)
3. **Depth**: Break the 2D plane with parallax and shadows
4. **Continuity**: Smooth, intentional motion with heavy easing

### Motion Design Tokens

**Easing Functions:**
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

**Duration Scale:**
| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 200ms | Micro-interactions, hovers |
| `--duration-normal` | 400ms | State changes, reveals |
| `--duration-slow` | 800ms | Page transitions, hero animations |
| `--duration-dramatic` | 1200ms | Split-text entrance, liquid reveals |

**Stagger Delays:**
- Character animation: 30-50ms per character
- Word animation: 80-120ms per word
- Grid items: 100-150ms per item (diagonal pattern)

### Accent Text Treatment

**Current:** Flat `color: var(--liquid-accent)` (#D9534F)

**Enhanced:**
```css
.accent-text-elevated {
  color: var(--liquid-accent);
  text-shadow: 2px 2px 0px rgba(217, 83, 79, 0.3);
  /* Subtle lift effect giving tactile, printed feel */
}
```

### Variable Font Specification

**If using Inter Variable (recommended):**
- Default weight: 400
- Hover weight: 550 (interpolated)
- Transition: 200ms ease-out

**Fallback for non-variable fonts:**
- Use `font-weight` transition (less smooth but functional)

---

## 3. Goal & Acceptance Criteria

### Goal
Transform the Liquid Editorial theme from a functional, static design (rated 6.5/10) into a premium, reactive experience worthy of Awwwards consideration. Add personality through sophisticated animations while maintaining the clean editorial aesthetic and accessibility standards already achieved.

### Acceptance Criteria (Given/When/Then)

**AC1: Split-Text Hero Animation**
- Given a user lands on the page
- When the hero section loads
- Then the headline "FLUID DYNAMICS" animates character-by-character
- And characters slide up from below with slight rotation
- And they snap into place with heavy expo easing
- And the animation completes within 1.2s

**AC2: Variable Font Hover Interaction**
- Given a user viewing the Features/Capabilities grid
- When they hover over a feature card title
- Then the font weight smoothly increases from 400 to 550
- And the transition feels "breathing" and reactive
- And the effect reverses smoothly on mouse leave

**AC3: Accent Text Depth**
- Given a user viewing "DYNAMICS" or "FLOW" text
- When rendered on screen
- Then the text has a subtle colored drop shadow (2px 2px, 30% opacity)
- And the effect gives a tactile, printed feel
- And does not reduce readability

**AC4: Staggered Grid Scroll Reveal**
- Given a user scrolling down to the Capabilities section
- When the section enters the viewport
- Then cards animate in with staggered timing (top-left first, bottom-right last)
- And each card slides up with fade-in
- And delay follows diagonal pattern (100-150ms between items)

**AC5: Magnetic Hover with 3D Tilt**
- Given a user hovering near a feature card
- When their cursor is within proximity of the card
- Then the card magnetically pulls slightly toward the cursor
- And tilts subtly in 3D space (max 5-10 degrees)
- And returns to neutral on mouse leave with spring easing

**AC6: Testimonials Parallax Depth**
- Given a user scrolling through the Voices section
- When testimonial cards are visible
- Then the middle card scrolls at a different speed than side cards
- And the effect creates visual depth (breaking 2D plane)
- And movement is subtle (parallax factor 0.1-0.2)

**AC7: CTA Liquid Reveal Animation**
- Given a user scrolling to the CTA section
- When "FLOW" text enters viewport
- Then it reveals with a liquid-fill SVG mask animation
- And the effect looks like text filling with red liquid
- And the infinity icon slowly rotates continuously

**AC8: Performance & Accessibility**
- Given the enhanced animations
- When running on capable devices
- Then frame rate maintains 60 FPS
- And `prefers-reduced-motion` disables all non-essential animations
- And all content remains accessible without animations

---

## 4. Risks & Assumptions

### Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Framer Motion bundle size impact | Medium | Medium | Use tree-shaking, lazy load animations |
| Variable fonts not supported in all browsers | Low | Low | Graceful fallback to standard weight transition |
| Complex animations causing jank on lower-end devices | Medium | High | Implement performance detection, reduce motion on slow devices |
| Split-text breaking accessibility | Low | High | Preserve semantic HTML, test with screen readers |
| Magnetic hover conflicting with touch devices | Medium | Low | Disable on touch devices (no hover intent) |
| Too many animations becoming distracting | Medium | Medium | User testing, ensure animations enhance not distract |

### Assumptions
- Framer Motion is acceptable as a dependency (adds ~20-40kb gzipped)
- Target browsers support CSS custom properties and modern transforms
- Variable font (Inter Variable) can be loaded or fallback is acceptable
- WebGL-capable devices are the primary target (existing Three.js usage)
- The existing clean layout from previous plan phases will be preserved

---

## 5. Definition of Done

- [ ] Build passes (linter, type checks, compile)
- [ ] All 8 acceptance criteria demonstrated and verified
- [ ] Animations respect `prefers-reduced-motion` media query
- [ ] Frame rate maintains 60 FPS on modern devices
- [ ] No layout shift (CLS) during animations
- [ ] Bundle size increase documented (Framer Motion impact)
- [ ] Touch devices have appropriate fallbacks (no magnetic hover)
- [ ] Screen reader testing confirms no accessibility regression
- [ ] Visual regression tests pass (if configured)
- [ ] Code follows existing project patterns (TypeScript, CSS variables)

---

## 6. Implementation Plan

### Summary
Implement premium animations in 4 phases: (1) Install Framer Motion and create core animation utilities, (2) Implement Hero split-text and accent treatment, (3) Add Features grid animations (scroll trigger, magnetic hover, variable font), (4) Complete Testimonials parallax and CTA liquid reveal. Each phase is independently deployable.

---

### Phase 1: Animation Infrastructure Setup

**Goal:** Install dependencies and create reusable animation utilities.

- [x] [MODIFIED] `package.json` — Add Framer Motion dependency
  ```
  Pseudo-code:
  - Add "framer-motion": "^11.15.0" to dependencies
  - Run npm install to update lockfile
  - Verify no peer dependency conflicts
  ```
  **Done:** Installed framer-motion@11.15.0, added 3 packages, no vulnerabilities.

- [x] [MODIFIED] `src/app/globals.css` — Add motion design tokens and accent shadow
  ```
  Pseudo-code:
  - Add CSS custom properties for easing functions:
    --ease-out-expo, --ease-in-out-quart, --ease-spring
  - Add duration tokens: --duration-fast/normal/slow/dramatic
  - Add .accent-text-elevated class with text-shadow
  - Add @media (prefers-reduced-motion: reduce) overrides
  ```
  **Done:** Added easing functions, duration scale, .accent-text-elevated, .variable-font-hover, and reduced motion overrides.

- [x] [ADDED] `src/lib/animations/useReducedMotion.ts` — Reduced motion preference hook
  ```
  Pseudo-code:
  - Create hook using window.matchMedia('prefers-reduced-motion: reduce')
  - Return boolean indicating if reduced motion is preferred
  - Listen for preference changes
  - Use as guard for all animation components
  ```
  **Done:** Created hydration-safe hook using useSyncExternalStore pattern.

- [x] [ADDED] `src/lib/animations/useScrollTrigger.ts` — Intersection Observer scroll trigger
  ```
  Pseudo-code:
  - Accept ref, threshold, rootMargin options
  - Use IntersectionObserver to detect when element enters viewport
  - Return { isInView, hasAnimated } state
  - Support once-only animation trigger
  - Respect reduced motion preference
  ```
  **Done:** Created with IntersectionObserver, triggerOnce support, and reduced motion awareness.

- [x] [ADDED] `src/lib/animations/useMagneticHover.ts` — Magnetic cursor effect with 3D tilt
  ```
  Pseudo-code:
  - Accept ref to target element
  - Track mouse position relative to element center
  - Calculate transform: translateX/Y (pull toward cursor)
  - Calculate rotateX/Y based on cursor position (3D tilt)
  - Apply transform with spring physics
  - Return { style, handlers } for element
  - Disable on touch devices and reduced motion
  ```
  **Done:** Created with perspective 3D, spring easing, touch device detection, and reduced motion support.

- [x] [ADDED] `src/lib/animations/useParallax.ts` — Scroll-based parallax offset
  ```
  Pseudo-code:
  - Accept speed factor (e.g., 0.1 = 10% of scroll speed)
  - Track scroll position with requestAnimationFrame
  - Calculate translateY offset based on element position and scroll
  - Return transform style to apply
  - Disable on reduced motion
  ```
  **Done:** Created with passive scroll listener, RAF optimization, and reduced motion support.

---

### Phase 2: Hero Section Enhancement

**Goal:** Implement split-text animation and accent treatment for maximum first impression.

- [x] [ADDED] `src/lib/animations/SplitText.tsx` — Split text animation component
  ```
  Pseudo-code:
  - Accept children (text content), type ('chars' | 'words'), stagger delay
  - Split text into spans preserving whitespace
  - Animate each span with Framer Motion variants:
    initial: { y: 20, opacity: 0, rotateX: -10 }
    animate: { y: 0, opacity: 1, rotateX: 0 }
  - Stagger children with configurable delay
  - Use --ease-out-expo for heavy snapping effect
  - Support aria-label on container for accessibility
  ```
  **Done:** Created with Framer Motion, 3D perspective, screen reader support, and reduced motion fallback.

- [x] [MODIFIED] `src/components/liquid-editorial/HeroSection.tsx` — Add split-text and accent styling
  ```
  Pseudo-code (lines 6-23):
  - Wrap "FLUID" in SplitText component (type='chars', stagger=40ms)
  - Wrap "DYNAMICS" in SplitText with accent-text-elevated class
  - Add animation delay between FLUID and DYNAMICS (0.4s)
  - Keep aria-label on h1 for screen reader: "Fluid Dynamics"
  - Add motion.div wrapper with initial={{ opacity: 0 }} for subtext
  - Animate subtext in after headline completes (delay: 1.2s)
  - Ensure scroll indicator only appears after all animations
  ```
  **Done:** Added SplitText for FLUID/DYNAMICS, accent-text-elevated class, motion.div for subtext and scroll indicator with staggered delays.

---

### Phase 3: Features Grid Animations

**Goal:** Make the Capabilities grid feel organic with scroll-triggered stagger, magnetic hover, and variable font.

- [x] [MODIFIED] `src/app/globals.css` — Add variable font hover styles
  ```
  Pseudo-code:
  - Define .variable-font-hover class:
    font-variation-settings: 'wght' 400;
    transition: font-variation-settings 200ms var(--ease-out-expo);
  - Add hover state: font-variation-settings: 'wght' 550
  - Fallback for non-variable fonts: font-weight transition
  ```
  **Done:** Already added in Phase 1 along with motion design tokens.

- [x] [MODIFIED] `src/components/liquid-editorial/FeaturesSection.tsx` — Add scroll stagger, magnetic hover
  ```
  Pseudo-code (entire component refactor):
  - Import useScrollTrigger, useMagneticHover, motion from framer-motion
  - Wrap section in ref for scroll trigger detection
  - Create staggered animation variants:
    container: { staggerChildren: 0.12, delayChildren: 0.2 }
    item: {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { ease: 'easeOut' } }
    }
  - Calculate stagger order: diagonal pattern (top-left=0, bottom-right=last)
    Order formula: row * 0.5 + col (creates diagonal flow)
  - For each feature card:
    - Wrap in motion.div with item variants
    - Apply useMagneticHover for tilt effect (max 8deg rotation)
    - Add variable-font-hover class to title
  - Only trigger animation once (hasAnimated flag)
  ```
  **Done:** Added scroll-triggered stagger, FeatureCard component with magnetic hover, variable-font-hover on titles, diagonal order calculation.

---

### Phase 4: Testimonials Parallax & CTA Finale

**Goal:** Add depth to testimonials and create dramatic CTA reveal.

- [ ] [MODIFIED] `src/components/liquid-editorial/TestimonialsSection.tsx` — Add parallax scrolling
  ```
  Pseudo-code (lines 40-50):
  - Import useParallax hook
  - Apply different parallax speeds to testimonial cards:
    - First card (left): speed = 0.1 (slower)
    - Second card (right): speed = -0.05 (counter, subtle)
    - Third card (center): speed = 0.15 (faster, creates focal depth)
  - Apply transform style from useParallax to each card wrapper
  - Ensure cards have will-change: transform for performance
  - Add scroll-triggered fade-in for initial reveal
  ```

- [ ] [ADDED] `src/lib/animations/LiquidReveal.tsx` — SVG liquid mask animation
  ```
  Pseudo-code:
  - Create SVG clipPath with wavy edge (sine wave path)
  - Animate wave moving upward (y position from 100% to 0%)
  - Apply clipPath to children text
  - Use Framer Motion for path animation
  - Accept trigger (when to start), duration, waveAmplitude props
  - Effect: text appears to fill with liquid from bottom
  ```

- [ ] [MODIFIED] `src/components/liquid-editorial/CTASection.tsx` — Liquid reveal + rotating icon
  ```
  Pseudo-code (lines 13-24, 28-38):
  - Import LiquidReveal, useScrollTrigger, motion
  - Wrap "FLOW" text in LiquidReveal component
    - Trigger on scroll into viewport
    - Duration: 1.2s, waveAmplitude: 10
    - Color: var(--liquid-accent)
  - Replace static infinity symbol with motion.div:
    animate: { rotate: 360 }
    transition: { duration: 8, repeat: Infinity, ease: 'linear' }
  - Add subtle scale pulse to icon:
    scale: [1, 1.05, 1] over 4s, repeat
  - Add scroll-triggered stagger for stats row (same as Features)
  ```

- [ ] [ADDED] `src/lib/animations/index.ts` — Export all animation utilities
  ```
  Pseudo-code:
  - Export SplitText from './SplitText'
  - Export LiquidReveal from './LiquidReveal'
  - Export useScrollTrigger from './useScrollTrigger'
  - Export useMagneticHover from './useMagneticHover'
  - Export useParallax from './useParallax'
  - Export useReducedMotion from './useReducedMotion'
  - Central import point for all animations
  ```

---

## 7. Follow-ups

- [ ] Consider adding mouse-reactive fluid ripples to Hero WebGL (from review: "fluid should gently ripple around cursor")
- [ ] Add cursor trail or custom cursor effect for extra polish
- [ ] Implement page transition animations between routes (if SPA navigation added)
- [ ] Create Storybook stories for animation components
- [ ] Add animation performance monitoring (track frame drops)
- [ ] Consider OGL library as alternative to Three.js for fluid simulation (lighter weight)
- [ ] A/B test animation intensity preferences with real users
- [ ] Document animation system in project README

---

## Appendix: Virtuoso Review Mapping

| Virtuoso Recommendation | Plan Phase | Component |
|-------------------------|------------|-----------|
| Split-text staggered reveal | Phase 2 | `SplitText.tsx` |
| Variable font hover | Phase 3 | `FeaturesSection.tsx` + CSS |
| Accent text drop shadow | Phase 2 | `globals.css` + `HeroSection.tsx` |
| WebGL fluid with mouse reactive | Follow-up | (Future enhancement) |
| Scroll-trigger stagger for grid | Phase 3 | `FeaturesSection.tsx` |
| Magnetic hover with 3D tilt | Phase 3 | `useMagneticHover.ts` |
| Testimonials parallax | Phase 4 | `TestimonialsSection.tsx` |
| CTA liquid reveal | Phase 4 | `LiquidReveal.tsx` + `CTASection.tsx` |
| Rotating infinity icon | Phase 4 | `CTASection.tsx` |
