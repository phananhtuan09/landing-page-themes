# Plan: Liquid Editorial Theme - Layout & UX Fixes

Note: All content in this document must be written in English.

## 0. Requirements Reference

- **Original Plan**: [archive/feature-liquid-editorial-theme_*.md](./archive/) (original implementation plan)
- **Issue Report**: User-reported problems with component overlaps, illogical arrangement, and distracting scroll effects
- **Review Feedback**: End user, Senior UI, and Senior UX reviews identifying typography, accessibility, and flow issues

---

## 1. Codebase Context

### Problem Analysis

Based on codebase exploration and comprehensive reviews, the following issues were identified:

**Component Overlap Issues:**
| File | Pattern | Problem |
|------|---------|---------|
| `FeaturesSection.tsx:1-42` | Negative margins (`-mt-8`, `-mt-16`, `-mt-4`) | Cards collide with each other |
| `TestimonialsSection.tsx:41-56` | `lg:-mt-12`, `lg:-mt-8` | Testimonials overlap unpredictably |
| `HeroSection.tsx:5-18` | `absolute -right-20`, `-left-16` | Elements overflow viewport |

**Typography & Readability Issues (from UI Review):**
| Issue | Current State | Required Fix |
|-------|---------------|--------------|
| Body text too small | ~10-12px in Capabilities boxes | Increase to 14-16px minimum |
| Typography hierarchy gap | H1/H2 → body text (too steep) | Add H3/medium-weight bridging text |
| "CAPA BILITIES" word break | Confusing split word | Keep visual but fix semantics |

**Accessibility Issues (from UX Review):**
| Issue | WCAG Impact | Required Fix |
|-------|-------------|--------------|
| "CAPA BILITIES" screen reader | Announces as two words | Add `aria-label="Capabilities"` |
| Gray text on cream background | Likely fails WCAG AA contrast | Darken gray text in Voices section |
| Light metadata text | Low contrast ratios | Increase text darkness |

**Scroll Effect Issues:**
| File | Code | Impact |
|------|------|--------|
| `LiquidDistortion.ts:103-134` | Wave frequency 3.0, amplitude 0.15 | Too aggressive distortion |
| `LiquidDistortion.ts:137-169` | Fragment shader alpha 0.3 max | Accent color overlay reduces readability |
| `WebGLCanvas.tsx:58` | `z-10` container with canvas `z-index: 1` | Z-index mismatch causes layering issues |

**UX Flow Issues:**
- Middle section feels "scattered" - users have to hunt for information
- Staggered grid violates F-pattern/Z-pattern scanning conventions
- Mobile transition loses 50% of design intent if cards just stack vertically

### Files to Modify
- `src/components/liquid-editorial/FeaturesSection.tsx` - Fix grid layout, typography, accessibility
- `src/components/liquid-editorial/TestimonialsSection.tsx` - Fix overlaps, contrast, typography
- `src/components/liquid-editorial/HeroSection.tsx` - Clean up decorative elements
- `src/components/liquid-editorial/CTASection.tsx` - Simplify layout
- `src/lib/webgl/LiquidDistortion.ts` - Reduce distortion intensity
- `src/components/liquid-editorial/WebGLCanvas.tsx` - Fix z-index layering
- `src/app/globals.css` - Add typography scale variables

---

## 2. Design Specifications

### Current Theme Tokens (Keep)
- Background: #F9F7F2 (Honeyed neutral / Cream)
- Text: #1C1C1C (Near-black)
- Accent: #D9534F (International Orange / Warm Red)

### Typography Scale (NEW - Address UI Review)

**Current Problem:**
- Headlines are commanding (H1/H2)
- Body copy is ~10-12px (too small)
- No intermediate weights to bridge the gap

**Fixed Typography Scale:**
| Element | Current | Fixed | Notes |
|---------|---------|-------|-------|
| H1 (Hero) | 50-80vh | Keep | Dramatic, intentional |
| H2 (Section) | 4xl-6xl | Keep | Strong hierarchy |
| H3 (Card titles) | text-lg (~18px) | text-xl (20px) | Bridge gap |
| Body | ~10-12px | 16px (base) | Legible minimum |
| Card descriptions | text-sm (~14px) | text-base (16px) | +20% increase |
| Metadata/captions | text-xs (~12px) | text-sm (14px) | Improve readability |

**Line Heights:**
- Body text: 1.6-1.8 (relaxed for readability)
- Card descriptions: 1.5

### Color Contrast Fixes (WCAG AA Compliance)

**Current Problem (Voices/Testimonials):**
- Light gray text on cream (#F9F7F2) background
- Likely fails 4.5:1 contrast ratio requirement

**Fixed Contrast:**
| Element | Current | Fixed | Contrast Ratio |
|---------|---------|-------|----------------|
| Body text | #1C1C1C | Keep | ~16:1 (excellent) |
| Metadata (name, role) | ~#999 or lighter | #666666 | 5.7:1 (passes AA) |
| Secondary text | ~#AAA | #737373 | 4.5:1 (passes AA) |
| Placeholder/disabled | varies | #8C8C8C | 3.5:1 (AA for large text) |

### Layout Philosophy Change

**FROM (Broken Grid / Editorial Overlap):**
- Intentional overlaps with negative margins
- Extreme decorative elements with 2-10% opacity
- Aggressive scroll distortion effects
- Violated F-pattern/Z-pattern scanning

**TO (Clean Editorial / Readable Grid):**
- Clear visual hierarchy with logical flow
- Subtle decorative elements that enhance rather than distract
- Gentle scroll effects that add polish without reducing readability
- Supports natural reading patterns while maintaining editorial aesthetic

### Spacing & Layout Guidelines

**Section Spacing:**
- Between sections: `py-24` to `py-32` (generous but not extreme)
- Within sections: `gap-8` to `gap-12` for grids
- No negative margins for layout (only for minor adjustments like underlines)

**Grid Layout:**
- Use standard CSS Grid without manual `gridArea` positioning
- 3-column grid for features on desktop
- 2-column for testimonials
- Natural document flow (no overlapping)
- Add subtle visual anchoring (numbering, flow indicators)

---

## 3. Goal & Acceptance Criteria

### Goal
Fix the Liquid Editorial theme to have a clean, readable layout with logical component arrangement, proper typography scaling, WCAG-compliant contrast, and accessible markup. The scroll distortion effect should be subtle and enhance the experience rather than make content harder to read.

### Acceptance Criteria (Given/When/Then)

**AC1: No Component Overlaps**
- Given a user viewing the page on desktop
- When they scroll through all sections
- Then no content overlaps unexpectedly
- And all text remains fully readable
- And visual hierarchy is clear

**AC2: Logical Component Arrangement**
- Given a user viewing the Features section
- When they scan the content
- Then features are arranged in a logical grid pattern
- And the reading flow follows left-to-right, top-to-bottom

**AC3: Subtle Scroll Effect**
- Given a user scrolling on desktop
- When WebGL distortion activates
- Then the effect is subtle (barely noticeable)
- And text remains completely readable
- And the effect enhances rather than distracts

**AC4: Clean Mobile Experience**
- Given a user on mobile device
- When viewing the page
- Then all content stacks cleanly in single column
- And no horizontal overflow occurs
- And all content is fully visible

**AC5: Readable Typography** (NEW)
- Given a user reading the Capabilities section
- When they view card descriptions
- Then text is at least 16px (not tiny/squinting required)
- And there is clear hierarchy from headings to body text

**AC6: WCAG AA Contrast Compliance** (NEW)
- Given a user viewing the Voices/Testimonials section
- When they read metadata (names, roles, dates)
- Then all text passes WCAG AA contrast ratio (4.5:1 minimum)
- And no text requires straining to read

**AC7: Screen Reader Accessibility** (NEW)
- Given a screen reader user navigating the page
- When the reader announces "CAPA BILITIES" heading
- Then it announces as single word "Capabilities"
- And all content is semantically correct

---

## 4. Risks & Assumptions

### Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Removing overlaps changes design intent | Medium | Low | Keep editorial typography and color scheme |
| WebGL effect may become too subtle | Low | Low | Make distortion configurable for future adjustment |
| Changes may affect other themes | Low | Medium | Changes scoped to liquid-editorial folder only |
| Larger text may affect visual balance | Medium | Low | Adjust spacing proportionally |
| Mobile transition loses design soul | Medium | Medium | Design intentional mobile experience, not just stacked cards |

### Assumptions
- The original "broken grid" design intent is less important than usability
- Users prefer readable content over artistic effects
- Subtle effects are preferable to aggressive ones
- WCAG AA compliance is mandatory (not optional)
- Screen reader accessibility is required

---

## 5. Definition of Done
- [ ] Build passes (linter, type checks, compile)
- [ ] No horizontal overflow on any viewport size
- [ ] All text remains readable during scroll effects
- [ ] Features displayed in logical 3-column grid
- [ ] Testimonials displayed in clean 2-column layout
- [ ] Scroll distortion effect is subtle (amplitude reduced by 70%+)
- [ ] Page tested at mobile (375px), tablet (768px), and desktop (1440px)
- [ ] Body text minimum 16px in all sections (NEW)
- [ ] All text passes WCAG AA contrast (4.5:1 ratio) (NEW)
- [ ] "CAPA BILITIES" has proper aria-label for screen readers (NEW)
- [ ] No split words confuse screen readers (NEW)

---

## 6. Implementation Plan

### Summary
Fix layout and UX issues in 4 phases: (1) Fix typography scale and contrast for readability, (2) Fix component layouts with standard grids, (3) Add accessibility fixes for screen readers, (4) Reduce WebGL distortion and polish. Each phase independently improves the page.

---

### Phase 1: Typography & Contrast Fixes (HIGH PRIORITY)

**Goal**: Make all text readable and WCAG AA compliant.

- [x] [MODIFIED] `src/app/globals.css` — Add typography scale CSS variables
  ```
  Pseudo-code:
  - Add CSS custom properties for consistent typography:
    --liquid-text-body: 16px (was ~12px)
    --liquid-text-card: 16px (was ~14px)
    --liquid-text-meta: 14px (was ~12px)
    --liquid-text-secondary: #666666 (WCAG AA compliant gray)
    --liquid-text-tertiary: #737373 (WCAG AA for metadata)
  - Keep existing color variables intact
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/FeaturesSection.tsx` — Fix typography scale
  ```
  Pseudo-code:
  - Increase card description text from text-sm to text-base (16px)
  - Increase card title from text-lg to text-xl (20px) for better hierarchy
  - Add line-height: 1.6 for body text readability
  - Keep heading "CAPA BILITIES" visual but add accessibility fix (Phase 3)
  - Ensure minimum touch target size for mobile (44x44px)
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/TestimonialsSection.tsx` — Fix contrast and typography
  ```
  Pseudo-code:
  - Increase quote text from any small size to text-base (16px) minimum
  - Change metadata color (name, role, company) from light gray to #666666
  - Ensure attribution text is at least text-sm (14px)
  - Add line-height: 1.6 for quote readability
  - Verify contrast ratio >= 4.5:1 for all text elements
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/CTASection.tsx` — Fix typography
  ```
  Pseudo-code:
  - Ensure body text is text-base (16px)
  - Check stats section text size and contrast
  - Verify all metadata passes WCAG AA
  ```

---

### Phase 2: Fix Component Layouts (HIGH PRIORITY)

**Goal**: Remove overlapping elements and create logical, readable layouts with visual flow.

- [x] [MODIFIED] `src/components/liquid-editorial/FeaturesSection.tsx` — Replace broken grid with standard grid
  ```
  Pseudo-code:
  - Remove `offset` property from features array (remove all -mt-* classes)
  - Remove `gridArea` style from feature cards
  - Change grid container to: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
  - Let cards flow naturally in document order
  - ADD: Visible numbering (01, 02, 03...) for visual anchoring/flow guidance
  - Remove background decorative circle (opacity-[0.02] is invisible)
  - Remove side decorative text "FEAT" (opacity-5 is barely visible)
  - Keep hover effects on cards (they work well)
  - MOBILE: Design intentional single-column with clear separation
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/TestimonialsSection.tsx` — Fix testimonial grid layout
  ```
  Pseudo-code:
  - Change grid from 12-column complex to: grid-cols-1 lg:grid-cols-2 gap-8
  - Remove lg:-mt-12 and lg:-mt-8 negative margins
  - Remove col-span and row-start manual positioning
  - Let testimonials flow naturally: first two side-by-side, third full-width or centered
  - Remove massive decorative quote mark (20rem, opacity-[0.03])
  - Keep smaller quote marks inside cards (opacity-10 is acceptable)
  - MOBILE: Stack with clear visual separation between quotes
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/HeroSection.tsx` — Clean up hero decorative elements
  ```
  Pseudo-code:
  - Remove decorative shapes with negative positioning (-right-20, -left-16)
  - Keep the headline typography (it's the main feature)
  - Keep scroll indicator but improve positioning (not absolute bottom-left)
  - Remove or improve vertical "001" text (currently 8rem at opacity-10)
  - Ensure hero content is centered and readable
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/CTASection.tsx` — Simplify CTA layout
  ```
  Pseudo-code:
  - Remove opacity-[0.02] radial gradient overlay (invisible)
  - Keep content centered and clean
  - Ensure buttons have proper hover states
  - Maintain stats row at bottom
  ```

---

### Phase 3: Accessibility Fixes (MEDIUM PRIORITY)

**Goal**: Ensure screen reader compatibility and semantic HTML.

- [x] [MODIFIED] `src/components/liquid-editorial/FeaturesSection.tsx` — Fix "CAPA BILITIES" accessibility
  ```
  Pseudo-code:
  - Current: "CAPA" and "BILITIES" as separate text/lines
  - Fix option 1: Use CSS to break word visually
    <h2 aria-label="Capabilities" class="...">
      <span aria-hidden="true">CAPA<br/>BILITIES</span>
      <span class="sr-only">Capabilities</span>
    </h2>
  - Fix option 2: Use word-break or &shy; for visual break
  - Ensure screen readers announce "Capabilities" as single word
  - Add sr-only class for screen-reader-only text if needed
  ```

- [ ] [MODIFIED] `src/app/themes/liquid-editorial/page.tsx` — Verify semantic structure
  ```
  Pseudo-code:
  - Ensure proper heading hierarchy (h1 → h2 → h3, no skipping levels)
  - Verify landmark regions (nav, main, footer)
  - Add skip-to-content link if not present
  - Ensure all interactive elements have focus states
  ```

- [ ] [ADDED] `src/components/liquid-editorial/ScreenReaderText.tsx` — Utility component (if needed)
  ```
  Pseudo-code:
  - Create reusable sr-only component for visually hidden text
  - Props: children (text content)
  - Classes: absolute, w-px, h-px, overflow-hidden, whitespace-nowrap
  - Use for any decorative text that needs screen reader alternatives
  ```

---

### Phase 4: Reduce WebGL Distortion & Polish

**Goal**: Make scroll distortion effect subtle and non-intrusive.

- [x] [MODIFIED] `src/lib/webgl/LiquidDistortion.ts` — Reduce distortion parameters
  ```
  Pseudo-code (lines 103-134, vertex shader):
  - Reduce amplitude multiplier from 0.15 to 0.03-0.05 (70% reduction)
  - Reduce wave frequency from 3.0 to 1.5-2.0 (smoother waves)
  - Keep time-based animation but reduce speed (uTime * 2.0 → uTime * 0.5)

  Pseudo-code (lines 137-169, fragment shader):
  - Reduce alpha multiplier from 0.3 to 0.1-0.15 (50% reduction)
  - Increase visibility threshold from 0.05 to 0.1 (less frequent rendering)
  - Keep accent color but make it more subtle
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/WebGLCanvas.tsx` — Fix z-index layering
  ```
  Pseudo-code:
  - Change container z-index from z-10 to z-[1] to match canvas z-index: 1
  - OR change canvas inline style zIndex from "1" to "10"
  - Ensure consistent layering (WebGL behind content)
  ```

- [x] [MODIFIED] `src/lib/webgl/ScrollVelocityTracker.ts` — Reduce velocity sensitivity
  ```
  Pseudo-code:
  - Add velocity damping/smoothing if not present
  - Reduce raw velocity multiplier to create gentler response
  - Increase oscillation decay rate for quicker settle after scroll stops
  ```

- [ ] [MODIFIED] `src/components/liquid-editorial/Navbar.tsx` — Ensure proper layering
  ```
  Pseudo-code:
  - Keep z-50 for navbar (correct - should be above WebGL)
  - Verify backdrop-blur works correctly with WebGL layer
  - No changes if working correctly
  ```

- [ ] [MODIFIED] `src/components/liquid-editorial/Footer.tsx` — Verify layout
  ```
  Pseudo-code:
  - Check for any overlapping issues
  - Ensure footer is properly separated from CTA section
  - No changes if working correctly
  ```

---

## 7. Follow-ups
- [ ] Consider adding user preference for distortion intensity (settings toggle)
- [ ] Add visual regression tests for layout
- [ ] Document the design decision to prioritize readability over artistic effects
- [ ] Consider A/B testing subtle vs. no distortion effect
- [ ] Run automated accessibility audit (axe-core or similar)
- [ ] Test with actual screen readers (NVDA, VoiceOver, JAWS)
- [ ] Consider adding reduced motion media query support for animations
- [ ] Add visual flow indicators (arrows/lines) between features if scannability still poor (LOW PRIORITY from review)

---

## Appendix: Review Summary

### End User Feedback
- ✅ First impression is "expensive and artsy" (keep this aesthetic)
- ❌ Text in Capabilities boxes is tiny (fixed in Phase 1)
- ❌ "CAPA BILITIES" split is confusing (fixed in Phase 3)
- ❌ Middle section scattered/hard to scan (fixed in Phase 2)

### Senior UI Review
- ✅ Color palette is sophisticated and consistent (keep)
- ✅ Serif/sans-serif mix is well-executed (keep)
- ❌ Typography hierarchy gap too steep (fixed in Phase 1)
- ❌ Body text ~10-12px is illegible (fixed in Phase 1 → 16px)

### Senior UX Review
- ✅ Narrative arc is sound (keep)
- ❌ Broken words are accessibility risk (fixed in Phase 3)
- ❌ Light gray text fails WCAG contrast (fixed in Phase 1)
- ❌ Mobile transition needs careful design (addressed in Phase 2)
