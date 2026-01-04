# Unit Test Plan: Liquid Editorial Theme

Note: All content in this document must be written in English.

## Test Files Created
- `tests/unit/ScrollVelocityTracker.spec.ts` - Tests for ScrollVelocityTracker class and singleton functions
- `tests/unit/PerformanceMonitor.spec.ts` - Tests for PerformanceMonitor class and singleton functions
- `tests/unit/useWebGLSupport.spec.ts` - Tests for shouldEnableWebGL and WebGL detection

## Unit Tests

### ScrollVelocityTracker
- ✓ Happy path: constructor creates instance with default config
- ✓ Happy path: constructor creates instance with custom config
- ✓ Edge case: partial config with defaults for missing values
- ✓ Edge case: config with zero smoothing
- ✓ Edge case: config with high decay rate
- ✓ Edge case: config with zero oscillation frequency
- ✓ Edge case: negative config values handled gracefully
- ✓ Parameter variation: getVelocity returns 0 initially
- ✓ Parameter variation: getDirection returns 0 when velocity is 0
- ✓ Subscription: subscribe returns unsubscribe function
- ✓ Subscription: callback called with velocity updates
- ✓ Subscription: multiple subscriptions allowed
- ✓ Subscription: unsubscribe works correctly
- ✓ Subscription: handles unsubscribe when callback not found
- ✓ Dispose: cleans up resources
- ✓ Dispose: removes all callbacks
- ✓ Dispose: handles dispose when already disposed

### getScrollVelocityTracker (Singleton)
- ✓ Happy path: returns ScrollVelocityTracker instance
- ✓ Property-based: returns same instance on multiple calls
- ✓ Edge case: creates new instance after dispose

### disposeScrollVelocityTracker
- ✓ Happy path: disposes the singleton instance
- ✓ Edge case: handles dispose when no instance exists
- ✓ Edge case: allows creating new singleton after dispose

### PerformanceMonitor
- ✓ Happy path: constructor creates instance with default config
- ✓ Happy path: constructor creates instance with custom config
- ✓ Edge case: partial config with defaults for missing values
- ✓ Edge case: empty config object handled
- ✓ Parameter variation: getQuality returns 'high' initially
- ✓ Parameter variation: getCurrentFPS returns default 60 when no frames
- ✓ Parameter variation: getCurrentFPS returns calculated FPS after frames
- ✓ Recording: recordFrame records frame times
- ✓ Recording: maintains sample size limit
- ✓ Subscription: subscribe returns unsubscribe function
- ✓ Subscription: multiple subscriptions allowed
- ✓ Subscription: unsubscribe works correctly
- ✓ Start/Stop: start monitoring loop
- ✓ Start/Stop: stop monitoring loop
- ✓ Start/Stop: handles stop when not started
- ✓ Start/Stop: handles multiple start/stop calls
- ✓ Dispose: cleans up resources
- ✓ Dispose: removes all callbacks
- ✓ Dispose: handles dispose when already disposed

### PerformanceMonitor Quality Evaluation
- ✓ Quality: detects low quality when FPS below low threshold
- ✓ Quality: detects medium quality when FPS between thresholds
- ✓ Quality: maintains high quality when FPS above medium threshold
- ✓ Quality: notifies subscribers when quality changes

### PerformanceMonitor Edge Cases
- ✓ Edge case: handles zero delta time
- ✓ Edge case: handles very large delta time
- ✓ Edge case: handles config with zero sample size
- ✓ Edge case: handles config with negative thresholds

### getPerformanceMonitor (Singleton)
- ✓ Happy path: returns PerformanceMonitor instance
- ✓ Property-based: returns same instance on multiple calls
- ✓ Edge case: creates new instance after dispose
- ✓ Behavior: auto-starts the singleton

### disposePerformanceMonitor
- ✓ Happy path: disposes the singleton instance
- ✓ Edge case: handles dispose when no instance exists
- ✓ Edge case: allows creating new singleton after dispose

### shouldEnableWebGL
- ✓ Happy path: returns true when all conditions met
- ✓ Condition: returns false when isReady is false
- ✓ Condition: returns false when WebGL not supported
- ✓ Condition: returns false when user prefers reduced motion
- ✓ Condition: returns false when on mobile device
- ✓ Multiple failures: returns false when both isSupported and isReady false
- ✓ Multiple failures: returns false when isMobile and prefersReducedMotion true
- ✓ Multiple failures: returns false when all conditions fail
- ✓ Parameter combinations: all 16 boolean combinations tested
- ✓ Property-based: idempotent - same input produces same output
- ✓ Property-based: pure function - no side effects
- ✓ Property-based: follows boolean logic correctly

### WebGL Detection Functions
- ✓ WebGL: detects WebGL support when context available
- ✓ WebGL: handles WebGL2 context
- ✓ WebGL: handles experimental-webgl context
- ✓ ReducedMotion: returns false by default (mock)
- ✓ ReducedMotion: handles matchMedia query
- ✓ Mobile: detects touch capability
- ✓ Mobile: detects screen width

## Run Command
```bash
npm test
# or
npx vitest run
# with coverage
npm run test:coverage
```

## Last Run Results
- Total: 100 tests
- Passed: 96
- Failed: 4
- Skipped: 0
- Duration: 2.28s

### Failed Tests
1. `PerformanceMonitor.spec.ts` - Quality: detects low quality when FPS below low threshold
2. `PerformanceMonitor.spec.ts` - Quality: detects medium quality when FPS between thresholds
3. `PerformanceMonitor.spec.ts` - Quality: maintains high quality when FPS above medium threshold
4. `useWebGLSupport.spec.ts` - Mobile: detects touch capability

### Failure Analysis
- **PerformanceMonitor quality tests**: FPS calculation returning unexpected quality levels. Likely timing/mock issue with frame recording.
- **Touch capability test**: jsdom doesn't properly expose `navigator.maxTouchPoints` property.

## Coverage Targets
- Target: 80% (lines), 70% (branches) for utility classes
- Current: Pending measurement (run `npm run test:coverage`)
- Status: ⚠️ 4 tests failing - needs investigation

## Notes
- All tests run automatically via command line
- Test results logged to terminal with detailed output
- Focus on logic testing, edge cases, and parameter variations
- No complex integration or UI rendering tests
- Tests use jsdom environment with WebGL mocks from vitest.setup.ts
- Singleton patterns tested with proper disposal between tests
- LiquidDistortion.ts not unit tested (requires heavy Three.js mocking, better suited for integration tests)
- React hooks (useScrollVelocity, useWebGLSupport) require React testing setup for full coverage

## Quality Checks
- Linter: ✅ passed
- Type checks: ✅ passed
- Build: ✅ passed

## Process
- After each batch of implementation edits, run linter/type/build on changed files.
- Auto-fix linter issues (up to 3 attempts) before requesting review.
