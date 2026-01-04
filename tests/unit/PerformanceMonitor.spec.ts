import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  PerformanceMonitor,
  getPerformanceMonitor,
  disposePerformanceMonitor,
} from "@/lib/webgl/PerformanceMonitor";

describe("PerformanceMonitor", () => {
  let monitor: PerformanceMonitor;

  beforeEach(() => {
    // Reset singleton before each test
    disposePerformanceMonitor();
    vi.useFakeTimers();
  });

  afterEach(() => {
    if (monitor) {
      monitor.dispose();
    }
    disposePerformanceMonitor();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create instance with default config", () => {
      monitor = new PerformanceMonitor();

      expect(monitor).toBeInstanceOf(PerformanceMonitor);
      expect(monitor.getQuality()).toBe("high");
    });

    it("should create instance with custom config", () => {
      monitor = new PerformanceMonitor({
        targetFPS: 30,
        sampleSize: 20,
        lowFPSThreshold: 15,
        mediumFPSThreshold: 25,
      });

      expect(monitor).toBeInstanceOf(PerformanceMonitor);
    });

    it("should handle partial config with defaults for missing values", () => {
      monitor = new PerformanceMonitor({
        targetFPS: 120,
      });

      expect(monitor).toBeInstanceOf(PerformanceMonitor);
    });

    it("should handle empty config object", () => {
      monitor = new PerformanceMonitor({});

      expect(monitor).toBeInstanceOf(PerformanceMonitor);
    });
  });

  describe("getQuality", () => {
    it("should return 'high' initially", () => {
      monitor = new PerformanceMonitor();

      expect(monitor.getQuality()).toBe("high");
    });

    it("should return valid quality level", () => {
      monitor = new PerformanceMonitor();
      const quality = monitor.getQuality();

      expect(["high", "medium", "low"]).toContain(quality);
    });
  });

  describe("getCurrentFPS", () => {
    it("should return default 60 FPS when no frames recorded", () => {
      monitor = new PerformanceMonitor();
      const fps = monitor.getCurrentFPS();

      // Default is 1000 / 16.67 ≈ 60
      expect(fps).toBeCloseTo(60, 0);
    });

    it("should return calculated FPS after recording frames", () => {
      monitor = new PerformanceMonitor({ sampleSize: 5 });

      // Simulate 60 FPS frames (16.67ms each)
      vi.spyOn(performance, "now")
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(16.67)
        .mockReturnValueOnce(33.33)
        .mockReturnValueOnce(50)
        .mockReturnValueOnce(66.67)
        .mockReturnValueOnce(83.33);

      // Record frames
      for (let i = 0; i < 5; i++) {
        monitor.recordFrame();
      }

      const fps = monitor.getCurrentFPS();
      expect(fps).toBeGreaterThan(50);
    });
  });

  describe("recordFrame", () => {
    it("should record frame times", () => {
      monitor = new PerformanceMonitor({ sampleSize: 3 });

      let currentTime = 0;
      vi.spyOn(performance, "now").mockImplementation(() => {
        const time = currentTime;
        currentTime += 16.67;
        return time;
      });

      monitor.recordFrame();
      monitor.recordFrame();
      monitor.recordFrame();

      const fps = monitor.getCurrentFPS();
      expect(fps).toBeGreaterThan(0);
    });

    it("should maintain sample size limit", () => {
      monitor = new PerformanceMonitor({ sampleSize: 3 });

      let currentTime = 0;
      vi.spyOn(performance, "now").mockImplementation(() => {
        const time = currentTime;
        currentTime += 16.67;
        return time;
      });

      // Record more frames than sample size
      for (let i = 0; i < 10; i++) {
        monitor.recordFrame();
      }

      // FPS should still be valid
      const fps = monitor.getCurrentFPS();
      expect(fps).toBeGreaterThan(0);
    });
  });

  describe("subscribe", () => {
    it("should add callback and return unsubscribe function", () => {
      monitor = new PerformanceMonitor();
      const callback = vi.fn();

      const unsubscribe = monitor.subscribe(callback);

      expect(typeof unsubscribe).toBe("function");
    });

    it("should allow multiple subscriptions", () => {
      monitor = new PerformanceMonitor();
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const unsubscribe1 = monitor.subscribe(callback1);
      const unsubscribe2 = monitor.subscribe(callback2);

      expect(typeof unsubscribe1).toBe("function");
      expect(typeof unsubscribe2).toBe("function");
    });

    it("should unsubscribe correctly", () => {
      monitor = new PerformanceMonitor();
      const callback = vi.fn();

      const unsubscribe = monitor.subscribe(callback);
      unsubscribe();

      // Should not throw when calling unsubscribe again
      expect(() => unsubscribe()).not.toThrow();
    });

    it("should handle unsubscribe when callback not in list", () => {
      monitor = new PerformanceMonitor();
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      monitor.subscribe(callback1);
      const unsubscribe2 = monitor.subscribe(callback2);

      unsubscribe2();
      // Call again - should handle gracefully
      expect(() => unsubscribe2()).not.toThrow();
    });
  });

  describe("start and stop", () => {
    it("should start monitoring loop", () => {
      monitor = new PerformanceMonitor();

      expect(() => monitor.start()).not.toThrow();
    });

    it("should stop monitoring loop", () => {
      monitor = new PerformanceMonitor();
      monitor.start();

      expect(() => monitor.stop()).not.toThrow();
    });

    it("should handle stop when not started", () => {
      monitor = new PerformanceMonitor();

      expect(() => monitor.stop()).not.toThrow();
    });

    it("should handle multiple start calls", () => {
      monitor = new PerformanceMonitor();

      monitor.start();
      expect(() => monitor.start()).not.toThrow();
    });

    it("should handle multiple stop calls", () => {
      monitor = new PerformanceMonitor();
      monitor.start();
      monitor.stop();

      expect(() => monitor.stop()).not.toThrow();
    });
  });

  describe("dispose", () => {
    it("should clean up resources", () => {
      monitor = new PerformanceMonitor();
      monitor.start();

      expect(() => monitor.dispose()).not.toThrow();
    });

    it("should remove all callbacks", () => {
      monitor = new PerformanceMonitor();
      const callback = vi.fn();

      monitor.subscribe(callback);
      monitor.dispose();

      // Should not throw
      expect(monitor.getQuality()).toBe("high");
    });

    it("should handle dispose when already disposed", () => {
      monitor = new PerformanceMonitor();
      monitor.dispose();

      expect(() => monitor.dispose()).not.toThrow();
    });
  });
});

describe("getPerformanceMonitor (singleton)", () => {
  afterEach(() => {
    disposePerformanceMonitor();
  });

  it("should return a PerformanceMonitor instance", () => {
    const monitor = getPerformanceMonitor();

    expect(monitor).toBeInstanceOf(PerformanceMonitor);
  });

  it("should return the same instance on multiple calls", () => {
    const monitor1 = getPerformanceMonitor();
    const monitor2 = getPerformanceMonitor();

    expect(monitor1).toBe(monitor2);
  });

  it("should create new instance after dispose", () => {
    const monitor1 = getPerformanceMonitor();
    disposePerformanceMonitor();
    const monitor2 = getPerformanceMonitor();

    expect(monitor1).not.toBe(monitor2);
  });

  it("should auto-start the singleton", () => {
    const monitor = getPerformanceMonitor();

    // Should be running (started automatically)
    expect(monitor.getQuality()).toBe("high");
  });
});

describe("disposePerformanceMonitor", () => {
  it("should dispose the singleton instance", () => {
    const monitor = getPerformanceMonitor();
    const spy = vi.spyOn(monitor, "dispose");

    disposePerformanceMonitor();

    expect(spy).toHaveBeenCalled();
  });

  it("should handle dispose when no instance exists", () => {
    // Ensure no instance exists
    disposePerformanceMonitor();

    // Should not throw when disposing again
    expect(() => disposePerformanceMonitor()).not.toThrow();
  });

  it("should allow creating new singleton after dispose", () => {
    getPerformanceMonitor();
    disposePerformanceMonitor();

    const newMonitor = getPerformanceMonitor();

    expect(newMonitor).toBeInstanceOf(PerformanceMonitor);
  });
});

describe("PerformanceMonitor quality evaluation", () => {
  afterEach(() => {
    disposePerformanceMonitor();
    vi.restoreAllMocks();
  });

  it("should detect low quality when FPS is below low threshold", () => {
    const monitor = new PerformanceMonitor({
      sampleSize: 3,
      lowFPSThreshold: 30,
      mediumFPSThreshold: 45,
    });

    const callback = vi.fn();
    monitor.subscribe(callback);

    // Simulate very slow frames (100ms each = 10 FPS)
    let currentTime = 0;
    vi.spyOn(performance, "now").mockImplementation(() => {
      const time = currentTime;
      currentTime += 100; // 10 FPS
      return time;
    });

    // Record enough frames to trigger quality evaluation
    for (let i = 0; i < 3; i++) {
      monitor.recordFrame();
    }

    expect(monitor.getQuality()).toBe("low");
    monitor.dispose();
  });

  it("should detect medium quality when FPS is between thresholds", () => {
    const monitor = new PerformanceMonitor({
      sampleSize: 3,
      lowFPSThreshold: 30,
      mediumFPSThreshold: 45,
    });

    // Simulate 35 FPS frames (~28.6ms each)
    let currentTime = 0;
    vi.spyOn(performance, "now").mockImplementation(() => {
      const time = currentTime;
      currentTime += 28.6; // ~35 FPS
      return time;
    });

    // Record enough frames to trigger quality evaluation
    for (let i = 0; i < 3; i++) {
      monitor.recordFrame();
    }

    expect(monitor.getQuality()).toBe("medium");
    monitor.dispose();
  });

  it("should maintain high quality when FPS is above medium threshold", () => {
    const monitor = new PerformanceMonitor({
      sampleSize: 3,
      lowFPSThreshold: 30,
      mediumFPSThreshold: 45,
    });

    // Simulate 60 FPS frames (~16.67ms each)
    let currentTime = 0;
    vi.spyOn(performance, "now").mockImplementation(() => {
      const time = currentTime;
      currentTime += 16.67; // 60 FPS
      return time;
    });

    // Record enough frames to trigger quality evaluation
    for (let i = 0; i < 3; i++) {
      monitor.recordFrame();
    }

    expect(monitor.getQuality()).toBe("high");
    monitor.dispose();
  });

  it("should notify subscribers when quality changes", () => {
    const monitor = new PerformanceMonitor({
      sampleSize: 3,
      lowFPSThreshold: 30,
      mediumFPSThreshold: 45,
    });

    const callback = vi.fn();
    monitor.subscribe(callback);

    // First, establish high quality
    let currentTime = 0;
    const perfNowMock = vi.spyOn(performance, "now").mockImplementation(() => {
      const time = currentTime;
      currentTime += 16.67; // 60 FPS
      return time;
    });

    // Record high-quality frames
    for (let i = 0; i < 3; i++) {
      monitor.recordFrame();
    }

    // Now simulate low FPS
    perfNowMock.mockImplementation(() => {
      const time = currentTime;
      currentTime += 100; // 10 FPS
      return time;
    });

    // Record low-quality frames
    for (let i = 0; i < 3; i++) {
      monitor.recordFrame();
    }

    // Callback should have been called with quality change
    expect(callback).toHaveBeenCalledWith("low");
    monitor.dispose();
  });
});

describe("PerformanceMonitor edge cases", () => {
  afterEach(() => {
    disposePerformanceMonitor();
    vi.restoreAllMocks();
  });

  it("should handle zero delta time", () => {
    const monitor = new PerformanceMonitor({ sampleSize: 3 });

    vi.spyOn(performance, "now").mockReturnValue(1000);

    // Multiple frames at same time
    monitor.recordFrame();
    monitor.recordFrame();

    expect(monitor.getCurrentFPS()).toBeGreaterThan(0);
    monitor.dispose();
  });

  it("should handle very large delta time", () => {
    const monitor = new PerformanceMonitor({ sampleSize: 3 });

    let currentTime = 0;
    vi.spyOn(performance, "now").mockImplementation(() => {
      const time = currentTime;
      currentTime += 10000; // 10 second frame time
      return time;
    });

    monitor.recordFrame();
    monitor.recordFrame();

    const fps = monitor.getCurrentFPS();
    expect(fps).toBeGreaterThan(0);
    expect(fps).toBeLessThan(1);
    monitor.dispose();
  });

  it("should handle config with zero sample size gracefully", () => {
    // This tests edge case - should work but may have undefined behavior
    const monitor = new PerformanceMonitor({ sampleSize: 0 });

    expect(monitor).toBeInstanceOf(PerformanceMonitor);
    monitor.dispose();
  });

  it("should handle config with negative thresholds", () => {
    const monitor = new PerformanceMonitor({
      lowFPSThreshold: -10,
      mediumFPSThreshold: -5,
    });

    expect(monitor).toBeInstanceOf(PerformanceMonitor);
    expect(monitor.getQuality()).toBe("high");
    monitor.dispose();
  });
});
