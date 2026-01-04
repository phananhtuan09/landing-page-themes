# Plan: Liquid Editorial Theme

Note: All content in this document must be written in English.

## 0. Requirements Reference

- **Requirement Doc**: [req-liquid-editorial-theme.md](../requirements/req-liquid-editorial-theme.md)

---

## 1. Codebase Context

### Similar Features
- `src/app/themes/theme1/page.tsx` - StartupX SaaS theme: clean structure, minimal design pattern
- `src/app/themes/theme2/page.tsx` - CreativeStudio agency theme: bold gradients, dynamic layout
- `src/app/themes/theme3/page.tsx` - LUXE luxury theme: elegant black/amber, premium aesthetic

### Reusable Components/Utils
- `src/components/ThemeSwitcher.tsx` - Dark mode toggle with hydration safety (exclude for this theme - no dark mode)
- `src/components/ThemeProvider.tsx` - Wraps next-themes for light/dark (use for provider wrapper)
- `src/components/index.ts` - Barrel export pattern for new components

### Architectural Patterns
- **Page Structure**: Each theme is a standalone `page.tsx` in `src/app/themes/themeX/`
- **Styling**: Pure Tailwind CSS classes, no CSS-in-JS
- **Layout**: Fixed navbar → Hero → Sections → Footer pattern
- **Responsive**: `sm:`, `md:`, `lg:` breakpoints with mobile-first approach
- **Containers**: `max-w-7xl mx-auto px-4` standard container pattern

### Key Files to Reference
- `src/app/globals.css` - CSS variables and Tailwind imports (add theme-specific variables here)
- `src/app/layout.tsx` - Font setup pattern (add Inter, Space Grotesk, Playfair Display)
- `src/app/themes/theme1/page.tsx` - Reference for basic theme structure

### WebGL Status
- **No existing WebGL/Three.js** - Clean slate for implementation
- Three.js must be added as a dependency

---

## 2a. Design Specifications

### Reference
- **Source**: Requirement document specifications
- **Style**: Brutalist Typography meets Fluid Dynamics
- **Aesthetic**: Editorial magazine with broken grid layout

### Design Tokens

**Colors**:
- Background: #F9F7F2 (Honeyed neutral - warm off-white)
- Text: #1C1C1C (Near-black for strong contrast)
- Accent: #D9534F (International Orange - revealed during distortion)

**Typography**:
- Headlines (Neo-Grotesque): Inter / Space Grotesk
  - Hero H1: 50-80% viewport height (massive brutalist scale)
  - Section H2: 4xl-6xl responsive
  - Weight: 900 (Black) for headlines
- Body (Display Serif): Playfair Display
  - Base: 18px, weight 400
  - Line height: 1.6-1.8 for readability

**Spacing Scale**:
- Extreme whitespace: Large section padding (py-32 to py-48)
- Content breathing room: Generous margins between elements
- Editorial framing: Wide gutters, asymmetric negative space

**Layout**:
- Broken grid with intentional overlaps
- Z-index layering for depth (no drop shadows)
- Asymmetric element positioning

### Component Breakdown

**Hero Section**:
- Massive typography: 50-80vh headline size
- Full-width WebGL canvas backdrop
- Overlapping decorative elements
- Subtle scroll indicator

**Features Section**:
- Broken grid layout (CSS Grid with manual positioning)
- Overlapping cards/content blocks
- Service/capability cards with hover states
- Image + text combinations

**Testimonials Section**:
- Quote cards with distortion effects
- Large quotation marks as decorative elements
- Client attribution with subtle styling
- Asymmetric card placement

**CTA Section**:
- Prominent call-to-action
- Accent color reveal on interaction
- Editorial-style layout
- Contact/conversion focus

### Responsive Specifications

**Mobile (< 768px)**:
- Static layout only (no WebGL distortion)
- Single column layout
- Reduced typography scale
- CSS-only subtle hover effects
- Touch-friendly tap targets

**Tablet (768px - 1024px)**:
- Transitional layout
- 2-column grid where appropriate
- Static or reduced effects based on capability

**Desktop (> 1024px)**:
- Full WebGL distortion effects
- Broken grid layout
- Maximum typography scale
- All interactive features enabled

---

## 3. Goal & Acceptance Criteria

### Goal
Create an immersive "Liquid Editorial" landing page theme that combines brutalist typography with WebGL-powered fluid distortion effects. The page will feature velocity-based scroll distortion using Three.js and GLSL shaders, transforming static editorial content into a living, responsive canvas that showcases technical excellence and artistic vision.

### Acceptance Criteria (Given/When/Then)

**AC1: Desktop Scroll Distortion**
- Given a user on a WebGL-capable desktop browser
- When the user scrolls down the page
- Then all images, headlines, and decorative elements stretch/distort based on scroll velocity
- And the #D9534F accent color is revealed during distortion
- And the animation runs at 60 FPS

**AC2: Scroll Stop Oscillation**
- Given distorted elements during active scrolling
- When the user stops scrolling
- Then elements oscillate gently (gel-like effect)
- And elements snap back to their rigid grid positions

**AC3: Mobile Static Fallback**
- Given a user on a mobile device
- When the page loads
- Then the static layout is displayed without WebGL distortion
- And CSS-only subtle hover effects remain functional

**AC4: WebGL Not Supported**
- Given a user on an older browser without WebGL support
- When the page loads
- Then WebGL detection fails gracefully
- And static layout with CSS hover effects is displayed
- And no JavaScript errors occur

**AC5: Reduced Motion Preference**
- Given a user with `prefers-reduced-motion: reduce` system setting
- When the page loads
- Then all distortion effects are disabled
- And static editorial layout is displayed

---

## 4. Risks & Assumptions

### Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| WebGL performance issues on mid-range GPUs | Medium | High | Implement adaptive quality settings, reduce mesh complexity |
| DOM-to-Canvas sync lag causing visual jitter | Medium | Medium | Use RAF for sync, debounce position calculations |
| Three.js bundle size impacting load time | Low | Medium | Dynamic import, code splitting for WebGL module |
| GLSL shader compilation failures on some GPUs | Low | High | Test on multiple devices, provide shader fallbacks |
| Text rendering quality in WebGL canvas | Medium | Medium | Use high-DPI canvas scaling, anti-aliasing |

### Assumptions
- Users on desktop have modern browsers with WebGL 2.0 support
- Mobile users expect fast loading over interactive effects
- Three.js r150+ provides adequate performance for this use case
- Free fonts (Inter, Space Grotesk, Playfair Display) are acceptable alternatives to paid fonts
- Next.js 16 supports dynamic imports for Three.js without issues
- Project uses Tailwind CSS for all styling (confirmed from codebase exploration)

---

## 5. Definition of Done
- [ ] Build passes (linter, type checks, compile) with no errors
- [ ] Theme page renders correctly at `/themes/liquid-editorial`
- [ ] WebGL distortion works on desktop Chrome, Firefox, Safari, Edge
- [ ] Mobile fallback displays static layout without errors
- [ ] `prefers-reduced-motion` respected and disables effects
- [ ] 60 FPS maintained during scroll on desktop
- [ ] All sections implemented: Hero, Features, Testimonials, CTA
- [ ] Typography uses specified fonts (Inter/Space Grotesk/Playfair)
- [ ] Color palette matches specification (#F9F7F2, #1C1C1C, #D9534F)
- [ ] Code follows existing project patterns and conventions

---

## 6. Implementation Plan

### Summary
Build the Liquid Editorial Theme in 5 phases: (1) Foundation setup with fonts and colors, (2) Static layout components with broken grid, (3) WebGL distortion engine using Three.js, (4) DOM-to-Canvas synchronization for text/image rendering, (5) Polish with oscillation effects and accessibility. Each phase builds upon the previous, allowing for testing and validation at each step.

---

### Phase 1: Foundation Setup

**Goal**: Configure fonts, colors, and create the base theme page structure.

- [x] [MODIFIED] `package.json` — Add Three.js dependency
  ```
  Pseudo-code:
  - Add "three": "^0.169.0" to dependencies
  - Add "@types/three": "^0.169.0" to devDependencies
  - Run npm install to update lock file
  ```

- [x] [MODIFIED] `src/app/globals.css` — Add Liquid Editorial theme CSS variables
  ```
  Pseudo-code:
  - Add :root variables for theme colors:
    --liquid-bg: #F9F7F2
    --liquid-text: #1C1C1C
    --liquid-accent: #D9534F
  - Add font-face declarations or import statements if needed
  - Keep existing theme variables intact
  ```

- [x] [MODIFIED] `src/app/layout.tsx` — Configure Google Fonts
  ```
  Pseudo-code:
  - Import Inter, Space_Grotesk, Playfair_Display from next/font/google
  - Configure font subsets and weights:
    - Inter: 400, 500, 700, 900
    - Space_Grotesk: 700, 900
    - Playfair_Display: 400, 500, 600
  - Add CSS variables for fonts to html element
  ```

- [x] [ADDED] `src/app/themes/liquid-editorial/page.tsx` — Create base theme page
  ```
  Pseudo-code:
  - Create page component with metadata export
  - Add basic HTML structure: nav, main, sections, footer
  - Apply theme background color and font classes
  - Add placeholder content for all 4 sections
  - Include Link to navigate back to theme gallery
  ```

---

### Phase 2: Static Layout & Components

**Goal**: Build the complete static layout with broken grid, massive typography, and all content sections.

- [x] [ADDED] `src/components/liquid-editorial/HeroSection.tsx` — Hero with massive typography
  ```
  Pseudo-code:
  - Create full-viewport hero section
  - Implement 50-80vh headline sizing with responsive scaling
  - Use Space Grotesk for headline, Playfair for subtext
  - Add overlapping decorative elements with absolute positioning
  - Include subtle scroll indicator animation
  - Apply extreme whitespace and editorial framing
  ```

- [x] [ADDED] `src/components/liquid-editorial/FeaturesSection.tsx` — Broken grid features
  ```
  Pseudo-code:
  - Implement CSS Grid with intentional overlap areas
  - Create feature cards with asymmetric positioning
  - Use z-index layering for depth effect (no shadows)
  - Add service/capability descriptions
  - Include image placeholders with proper aspect ratios
  ```

- [x] [ADDED] `src/components/liquid-editorial/TestimonialsSection.tsx` — Quote cards
  ```
  Pseudo-code:
  - Create testimonial cards with large decorative quotes
  - Implement broken grid for quote placement
  - Add client name, role, and company attribution
  - Style with editorial typography (Playfair for quotes)
  - Prepare elements with data attributes for distortion targeting
  ```

- [x] [ADDED] `src/components/liquid-editorial/CTASection.tsx` — Conversion section
  ```
  Pseudo-code:
  - Create prominent call-to-action layout
  - Style CTA button with hover state (accent color hint)
  - Add editorial-style supporting text
  - Include contact/conversion elements
  - Apply asymmetric layout with whitespace framing
  ```

- [x] [ADDED] `src/components/liquid-editorial/Navbar.tsx` — Fixed navigation
  ```
  Pseudo-code:
  - Create fixed top navigation bar
  - Add logo/brand mark
  - Include navigation links (smooth scroll to sections)
  - Style with theme colors and typography
  - Implement backdrop blur effect
  ```

- [x] [ADDED] `src/components/liquid-editorial/Footer.tsx` — Editorial footer
  ```
  Pseudo-code:
  - Create minimal editorial-style footer
  - Add copyright and brand information
  - Include social links or contact info
  - Apply consistent typography and spacing
  ```

- [x] [MODIFIED] `src/components/index.ts` — Export new components
  ```
  Pseudo-code:
  - Add barrel exports for all liquid-editorial components
  - Group under liquid-editorial namespace if needed
  ```

- [x] [MODIFIED] `src/app/themes/liquid-editorial/page.tsx` — Integrate static components
  ```
  Pseudo-code:
  - Import all section components
  - Replace placeholder content with actual components
  - Verify responsive layout at all breakpoints
  - Add section IDs for smooth scroll navigation
  ```

---

### Phase 3: WebGL Distortion Engine

**Goal**: Create the Three.js-based distortion system with velocity-based vertex displacement.

- [x] [ADDED] `src/lib/webgl/LiquidDistortion.ts` — Core WebGL class
  ```
  Pseudo-code:
  - Create class extending Three.js renderer setup
  - Initialize: Scene, OrthographicCamera, WebGLRenderer
  - Create plane geometry with sufficient vertex density (100x100 segments)
  - Implement resize handler for responsive canvas
  - Add render loop with RAF and visibility check (pause when tab inactive)
  - Export singleton or factory function
  ```

- [x] [ADDED] `src/lib/webgl/shaders/distortion.vert` — Vertex shader (embedded in LiquidDistortion.ts)
  ```
  Pseudo-code:
  - Receive uniforms: uTime, uScrollVelocity, uMouse (optional)
  - Calculate vertex displacement based on:
    - Scroll velocity (primary driver)
    - Position on screen (wave pattern)
    - Time for subtle animation
  - Apply sinusoidal displacement: position.xy += sin(uv * frequency) * velocity
  - Output displaced position to fragment shader
  ```

- [x] [ADDED] `src/lib/webgl/shaders/distortion.frag` — Fragment shader (embedded in LiquidDistortion.ts)
  ```
  Pseudo-code:
  - Receive uniforms: uTexture, uAccentColor, uDistortionAmount
  - Sample texture at distorted UV coordinates
  - Calculate distortion magnitude from displaced UVs
  - Mix accent color (#D9534F) based on distortion intensity
  - Output final color with accent reveal effect
  ```

- [x] [ADDED] `src/lib/webgl/ScrollVelocityTracker.ts` — Scroll velocity calculator
  ```
  Pseudo-code:
  - Track scroll position over time using RAF
  - Calculate velocity: (currentScroll - lastScroll) / deltaTime
  - Apply smoothing/damping for fluid feel
  - Detect scroll direction for directional distortion
  - Export velocity as normalized value (-1 to 1)
  - Implement oscillation decay when scroll stops
  ```

- [x] [ADDED] `src/hooks/useWebGLSupport.ts` — WebGL detection hook
  ```
  Pseudo-code:
  - Create canvas element and get WebGL context
  - Check for WebGL 2.0 support
  - Check for prefers-reduced-motion preference
  - Check for mobile/touch device
  - Return { isSupported, prefersReducedMotion, isMobile }
  ```

- [x] [ADDED] `src/hooks/useScrollVelocity.ts` — React hook for scroll tracking
  ```
  Pseudo-code:
  - Use useEffect to attach scroll listener
  - Import and use ScrollVelocityTracker
  - Provide velocity value via useState/useRef
  - Clean up listener on unmount
  - Memoize for performance
  ```

---

### Phase 4: DOM-to-Canvas Synchronization

**Goal**: Render DOM content (text, images) onto WebGL canvas while maintaining accessibility.

- [x] [ADDED] `src/lib/webgl/DOMToTexture.ts` — DOM element to texture converter (simplified - overlay approach)
  ```
  Pseudo-code:
  - Query target DOM elements by selector/data attribute
  - For each element:
    - Get bounding rect and computed styles
    - Create OffscreenCanvas at element dimensions
    - Draw element content (text/image) to canvas
    - Convert to Three.js Texture
  - Cache textures for performance
  - Implement update mechanism for dynamic content
  ```

- [x] [ADDED] `src/lib/webgl/TextRenderer.ts` — High-quality text rendering (simplified - overlay approach)
  ```
  Pseudo-code:
  - Create canvas with 2x pixel ratio for retina
  - Configure font, size, weight from computed styles
  - Render text with proper baseline and alignment
  - Handle multi-line text with line height
  - Apply anti-aliasing for smooth edges
  - Return texture ready for Three.js
  ```

- [x] [ADDED] `src/components/liquid-editorial/WebGLCanvas.tsx` — Main canvas component
  ```
  Pseudo-code:
  - Create full-page fixed canvas element
  - Use useEffect to initialize LiquidDistortion
  - Connect scroll velocity to shader uniforms
  - Handle window resize events
  - Implement conditional rendering based on useWebGLSupport
  - Clean up WebGL resources on unmount
  ```

- [x] [ADDED] `src/components/liquid-editorial/DistortionTarget.tsx` — Wrapper component
  ```
  Pseudo-code:
  - Wrap children with data attribute for targeting
  - Register element position with WebGL system
  - Handle visibility and intersection observer
  - Provide ref to parent for position updates
  - Apply CSS classes for static/hidden state switching
  ```

- [x] [MODIFIED] `src/app/themes/liquid-editorial/page.tsx` — Integrate WebGL
  ```
  Pseudo-code:
  - Import WebGLCanvas and DistortionTarget
  - Wrap distortable elements with DistortionTarget
  - Add WebGLCanvas at page level (fixed behind content)
  - Implement visibility CSS: DOM hidden when WebGL active
  - Ensure fallback shows DOM content when WebGL disabled
  ```

---

### Phase 5: Polish & Accessibility

**Goal**: Add oscillation effects, performance optimization, and ensure accessibility compliance.

- [x] [MODIFIED] `src/lib/webgl/ScrollVelocityTracker.ts` — Add oscillation effect
  ```
  Pseudo-code:
  - Detect when scroll stops (velocity near zero)
  - Trigger oscillation animation:
    - Use damped sine wave: amplitude * sin(frequency * t) * e^(-decay * t)
    - Apply to distortion amount
    - Duration: ~500-800ms
  - Elements snap back to grid position as oscillation ends
  ```

- [x] [ADDED] `src/lib/webgl/PerformanceMonitor.ts` — FPS tracking and adaptation
  ```
  Pseudo-code:
  - Track frame times using performance.now()
  - Calculate rolling average FPS
  - If FPS drops below 45, reduce quality:
    - Decrease geometry complexity
    - Lower texture resolution
    - Simplify shader calculations
  - Log performance metrics in development mode
  ```

- [x] [MODIFIED] `src/components/liquid-editorial/WebGLCanvas.tsx` — Add reduced motion support
  ```
  Pseudo-code:
  - Check prefers-reduced-motion media query
  - If reduced motion preferred:
    - Skip WebGL initialization entirely
    - Return null (show DOM fallback)
  - Add aria-hidden="true" to canvas
  - Ensure all content remains in accessible DOM
  ```

- [x] [ADDED] `src/components/liquid-editorial/StaticFallback.tsx` — CSS-only fallback
  ```
  Pseudo-code:
  - Create wrapper component for non-WebGL state
  - Add subtle CSS hover effects:
    - Gentle scale on hover (transform: scale(1.02))
    - Smooth opacity transitions
    - Subtle shadow on focus
  - Maintain editorial layout and typography
  - Apply when: mobile, no WebGL, reduced motion
  ```

- [x] [MODIFIED] `src/app/themes/liquid-editorial/page.tsx` — Final integration
  ```
  Pseudo-code:
  - Implement conditional rendering:
    - If WebGL supported && desktop && !reducedMotion → show WebGLCanvas
    - Else → show StaticFallback with visible DOM
  - Add page metadata for SEO
  - Verify all sections render correctly
  - Test keyboard navigation and screen reader access
  ```

- [x] [MODIFIED] `src/app/page.tsx` — Add theme to gallery
  ```
  Pseudo-code:
  - Add Liquid Editorial theme card to theme gallery
  - Include preview image/thumbnail
  - Add descriptive text: "Brutalist Typography + WebGL Distortion"
  - Link to /themes/liquid-editorial
  ```

---

## 7. Follow-ups

- [ ] Add unit tests for WebGL utility functions
- [ ] Create Storybook stories for static components
- [ ] Performance profiling on various GPU configurations
- [ ] Consider adding mouse/cursor-based distortion (enhancement)
- [ ] Explore adding page transition effects between sections
- [ ] Create documentation for WebGL architecture decisions
- [ ] Consider dark mode variant (marked as out of scope but could be future enhancement)
