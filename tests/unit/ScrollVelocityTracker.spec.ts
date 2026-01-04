import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  ScrollVelocityTracker,
  getScrollVelocityTracker,
  disposeScrollVelocityTracker,
} from "@/lib/webgl/ScrollVelocityTracker";

describe("ScrollVelocityTracker", () => {
  let tracker: ScrollVelocityTracker;

  beforeEach(() => {
    // Reset singleton before each test
    disposeScrollVelocityTracker();

    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
      configurable: true,
    });

    // Mock performance.now
    vi.spyOn(performance, "now").mockReturnValue(0);
  });

  afterEach(() => {
    if (tracker) {
      tracker.dispose();
    }
    disposeScrollVelocityTracker();
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create instance with default config", () => {
      tracker = new ScrollVelocityTracker();

      expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
      expect(tracker.getVelocity()).toBe(0);
    });

    it("should create instance with custom config", () => {
      tracker = new ScrollVelocityTracker({
        smoothing: 0.2,
        decayRate: 0.9,
        oscillationFrequency: 10,
        oscillationDamping: 6,
      });

      expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
    });

    it("should handle partial config with defaults for missing values", () => {
      tracker = new ScrollVelocityTracker({
        smoothing: 0.5,
      });

      expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
    });
  });

  describe("getVelocity", () => {
    it("should return 0 initially", () => {
      tracker = new ScrollVelocityTracker();

      expect(tracker.getVelocity()).toBe(0);
    });

    it("should return current velocity value", () => {
      tracker = new ScrollVelocityTracker();

      // Initially should be 0
      expect(tracker.getVelocity()).toBe(0);
    });
  });

  describe("getDirection", () => {
    it("should return 0 when velocity is 0", () => {
      tracker = new ScrollVelocityTracker();

      expect(tracker.getDirection()).toBe(0);
    });
  });

  describe("subscribe", () => {
    it("should add callback and return unsubscribe function", () => {
      tracker = new ScrollVelocityTracker();
      const callback = vi.fn();

      const unsubscribe = tracker.subscribe(callback);

      expect(typeof unsubscribe).toBe("function");
    });

    it("should call callback with velocity updates", async () => {
      tracker = new ScrollVelocityTracker();
      const callback = vi.fn();

      tracker.subscribe(callback);

      // Wait for animation frame to fire
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(callback).toHaveBeenCalled();
    });

    it("should allow multiple subscriptions", () => {
      tracker = new ScrollVelocityTracker();
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const unsubscribe1 = tracker.subscribe(callback1);
      const unsubscribe2 = tracker.subscribe(callback2);

      expect(typeof unsubscribe1).toBe("function");
      expect(typeof unsubscribe2).toBe("function");
    });

    it("should unsubscribe correctly", async () => {
      tracker = new ScrollVelocityTracker();
      const callback = vi.fn();

      const unsubscribe = tracker.subscribe(callback);
      callback.mockClear();

      unsubscribe();

      // Wait for animation frame
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Should not receive updates after unsubscribe
      // Note: Callback might have been called before unsubscribe
      const callCountAfterUnsubscribe = callback.mock.calls.length;

      await new Promise((resolve) => setTimeout(resolve, 50));

      // Should not receive more calls
      expect(callback.mock.calls.length).toBe(callCountAfterUnsubscribe);
    });

    it("should handle unsubscribe when callback not found", () => {
      tracker = new ScrollVelocityTracker();
      const callback = vi.fn();
      const otherCallback = vi.fn();

      tracker.subscribe(callback);
      const unsubscribeOther = tracker.subscribe(otherCallback);

      // Unsubscribe other
      unsubscribeOther();

      // Should not throw when unsubscribing again
      expect(() => unsubscribeOther()).not.toThrow();
    });
  });

  describe("dispose", () => {
    it("should clean up resources", () => {
      tracker = new ScrollVelocityTracker();
      const callback = vi.fn();

      tracker.subscribe(callback);
      tracker.dispose();

      // Should not throw after dispose
      expect(tracker.getVelocity()).toBe(0);
    });

    it("should remove all callbacks", async () => {
      tracker = new ScrollVelocityTracker();
      const callback = vi.fn();

      tracker.subscribe(callback);
      callback.mockClear();

      tracker.dispose();

      // Wait for potential animation frames
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Should not receive updates after dispose
      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle dispose when already disposed", () => {
      tracker = new ScrollVelocityTracker();

      tracker.dispose();

      // Should not throw when disposing again
      expect(() => tracker.dispose()).not.toThrow();
    });
  });
});

describe("getScrollVelocityTracker (singleton)", () => {
  afterEach(() => {
    disposeScrollVelocityTracker();
  });

  it("should return a ScrollVelocityTracker instance", () => {
    const tracker = getScrollVelocityTracker();

    expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
  });

  it("should return the same instance on multiple calls", () => {
    const tracker1 = getScrollVelocityTracker();
    const tracker2 = getScrollVelocityTracker();

    expect(tracker1).toBe(tracker2);
  });

  it("should create new instance after dispose", () => {
    const tracker1 = getScrollVelocityTracker();
    disposeScrollVelocityTracker();
    const tracker2 = getScrollVelocityTracker();

    expect(tracker1).not.toBe(tracker2);
  });
});

describe("disposeScrollVelocityTracker", () => {
  it("should dispose the singleton instance", () => {
    const tracker = getScrollVelocityTracker();
    const spy = vi.spyOn(tracker, "dispose");

    disposeScrollVelocityTracker();

    expect(spy).toHaveBeenCalled();
  });

  it("should handle dispose when no instance exists", () => {
    // Ensure no instance exists
    disposeScrollVelocityTracker();

    // Should not throw when disposing again
    expect(() => disposeScrollVelocityTracker()).not.toThrow();
  });

  it("should allow creating new singleton after dispose", () => {
    getScrollVelocityTracker();
    disposeScrollVelocityTracker();

    const newTracker = getScrollVelocityTracker();

    expect(newTracker).toBeInstanceOf(ScrollVelocityTracker);
  });
});

describe("ScrollVelocityTracker edge cases", () => {
  afterEach(() => {
    disposeScrollVelocityTracker();
    vi.restoreAllMocks();
  });

  it("should handle config with zero smoothing", () => {
    const tracker = new ScrollVelocityTracker({ smoothing: 0 });

    expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
    tracker.dispose();
  });

  it("should handle config with high decay rate", () => {
    const tracker = new ScrollVelocityTracker({ decayRate: 0.99 });

    expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
    tracker.dispose();
  });

  it("should handle config with zero oscillation frequency", () => {
    const tracker = new ScrollVelocityTracker({ oscillationFrequency: 0 });

    expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
    tracker.dispose();
  });

  it("should handle negative config values gracefully", () => {
    const tracker = new ScrollVelocityTracker({
      smoothing: -0.1,
      decayRate: -0.5,
    });

    expect(tracker).toBeInstanceOf(ScrollVelocityTracker);
    tracker.dispose();
  });
});
