# Integration Test Plan: Liquid Editorial Theme

Note: All content in this document must be written in English.

## Test Files Created
- `tests/integration/liquid-editorial-theme.e2e.spec.ts` - E2E tests for Liquid Editorial Theme

## Test Scenarios

### Page Structure and Content
- ✓ Page displays with correct title and main sections
- ✓ Hero section renders with editorial typography (FLUID DYNAMICS)
- ✓ Features section displays all 6 capability cards
- ✓ Testimonials section shows quotes with author attributions
- ✓ CTA section includes action buttons and trust indicators
- ✓ Footer renders with all link sections and newsletter form

### Navigation
- ✓ Fixed navbar displays with LIQUID branding
- ✓ Anchor links navigate to correct sections (#features, #testimonials, #contact)
- ✓ Back link navigates to home page

### Mobile Navigation
- ✓ Mobile menu toggle shows/hides navigation links
- ✓ Mobile menu closes after clicking a nav link

### Responsive Design
- ✓ Mobile layout displays on small screens (375px)
- ✓ Desktop layout displays on large screens (1440px)

### AC3: Mobile Static Fallback (Acceptance Criteria)
- ✓ Static layout displays without WebGL on mobile devices
- ✓ All content remains visible and interactive

### AC4: WebGL Not Supported (Acceptance Criteria)
- ✓ Static layout displays gracefully when WebGL is disabled
- ✓ No JavaScript errors occur when WebGL context returns null

### AC5: Reduced Motion Preference (Acceptance Criteria)
- ✓ Page respects prefers-reduced-motion setting
- ✓ All content accessible with reduced motion enabled

### Form Interactions
- ✓ Email input in newsletter form accepts text
- ✓ Subscribe button is visible

### Accessibility
- ✓ Proper heading hierarchy (H1 → H2 → H3)
- ✓ Navigation, main, and footer landmarks present
- ✓ Aria-labels on icon buttons (mobile menu toggle)
- ✓ Keyboard navigation support

### Visual Consistency
- ✓ Theme colors applied correctly
- ✓ Accent color (#D9534F) visible on interactive elements

## Run Command
```bash
# Run specific feature tests
npx playwright test tests/integration/liquid-editorial-theme.e2e.spec.ts

# Run all integration tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run with UI mode (interactive debugging)
npm run test:e2e:ui
```

## Last Run Results
- Total: 115 tests (23 tests × 5 browsers)
- Passed: 38
- Failed: 77
- Duration: 6.1 minutes

### Results by Browser
| Browser | Passed | Failed | Notes |
|---------|--------|--------|-------|
| Chromium | 11 | 12 | Selector/DOM issues |
| Firefox | 12 | 10 | Selector/DOM issues |
| WebKit | 0 | 23 | Missing system deps |
| Mobile Chrome | 14 | 9 | Some mobile-specific failures |
| Mobile Safari | 0 | 23 | Missing system deps |

## Coverage
- Happy path scenarios: 10
- Error/fallback scenarios: 3 (WebGL disabled, mobile fallback, reduced motion)
- Edge case scenarios: 2 (form interactions, keyboard navigation)
- Accessibility scenarios: 4

## Tested Browsers (from playwright.config.ts)
- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Issues Found

### System Dependencies (WebKit/Mobile Safari)
- Missing `libevent-2.1-7t64` library
- Missing `libavif16` library
- Fix: `sudo apt-get install libevent-2.1-7t64 libavif16` or run `npx playwright install-deps webkit`

### Test Selector Issues
1. **CAPABILITIES heading**: Text is split across elements (`CAPA` + `BILITIES`), causing `/CAPABILITIES/i` regex to fail
2. **Mobile menu visibility**: CSS `max-h-0` not detected as hiding element by Playwright
3. **Click interception**: Hero section overlaps nav links on scroll, blocking clicks

### Recommended Fixes
1. Update heading selector to use partial match or locate parent element
2. Use `aria-hidden` or `display:none` for mobile menu hidden state
3. Add scroll offset or use `{ force: true }` for navigation clicks

## Notes
- Tests are repeatable and independent
- Run `npx playwright test --ui` for interactive debugging
- Screenshots captured on failure in `test-results/` directory
- HTML report available via `npx playwright show-report`
- WebGL fallback tests use `context.addInitScript` to disable WebGL
- Mobile tests use Playwright's built-in viewport emulation
- Reduced motion tests use `page.emulateMedia({ reducedMotion: 'reduce' })`

## Acceptance Criteria Mapping

| AC | Description | Test Coverage |
|----|-------------|---------------|
| AC1 | Desktop Scroll Distortion | Cannot verify WebGL shaders in Playwright (visual only) |
| AC2 | Scroll Stop Oscillation | Cannot verify WebGL animation in Playwright (visual only) |
| AC3 | Mobile Static Fallback | ✓ Tested - verifies content visible on mobile |
| AC4 | WebGL Not Supported | ✓ Tested - verifies graceful fallback |
| AC5 | Reduced Motion Preference | ✓ Tested - verifies static layout with prefers-reduced-motion |

**Note on AC1/AC2:** WebGL shader effects (distortion, oscillation) are visual-only and cannot be verified programmatically in Playwright. These should be tested manually or with visual regression testing tools.
