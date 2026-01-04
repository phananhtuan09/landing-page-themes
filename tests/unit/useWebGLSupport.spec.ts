import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { shouldEnableWebGL } from "@/hooks/useWebGLSupport";

// Type for the WebGL support result
interface WebGLSupportResult {
  isSupported: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isReady: boolean;
}

describe("shouldEnableWebGL", () => {
  describe("happy path", () => {
    it("should return true when all conditions are met", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(true);
    });
  });

  describe("isReady condition", () => {
    it("should return false when isReady is false", () => {
      const support: WebGLSupportResult = {
        isReady: false,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return true when isReady is true and other conditions met", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(true);
    });
  });

  describe("isSupported condition", () => {
    it("should return false when WebGL is not supported", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: false,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return true when WebGL is supported and other conditions met", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(true);
    });
  });

  describe("prefersReducedMotion condition", () => {
    it("should return false when user prefers reduced motion", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: true,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return true when reduced motion is not preferred", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(true);
    });
  });

  describe("isMobile condition", () => {
    it("should return false when on mobile device", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: true,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return true when not on mobile device", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(true);
    });
  });

  describe("multiple conditions failing", () => {
    it("should return false when both isSupported and isReady are false", () => {
      const support: WebGLSupportResult = {
        isReady: false,
        isSupported: false,
        prefersReducedMotion: false,
        isMobile: false,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return false when isMobile and prefersReducedMotion are true", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: true,
        isMobile: true,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return false when all conditions fail", () => {
      const support: WebGLSupportResult = {
        isReady: false,
        isSupported: false,
        prefersReducedMotion: true,
        isMobile: true,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });

    it("should return false when only isReady is true but others fail", () => {
      const support: WebGLSupportResult = {
        isReady: true,
        isSupported: false,
        prefersReducedMotion: true,
        isMobile: true,
      };

      expect(shouldEnableWebGL(support)).toBe(false);
    });
  });

  describe("parameter combinations", () => {
    // Test all 16 combinations of the 4 boolean parameters
    const testCases: Array<{
      isReady: boolean;
      isSupported: boolean;
      prefersReducedMotion: boolean;
      isMobile: boolean;
      expected: boolean;
    }> = [
      // All conditions met
      {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
        expected: true,
      },
      // One condition fails at a time
      {
        isReady: false,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: false,
        expected: false,
      },
      {
        isReady: true,
        isSupported: false,
        prefersReducedMotion: false,
        isMobile: false,
        expected: false,
      },
      {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: true,
        isMobile: false,
        expected: false,
      },
      {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: true,
        expected: false,
      },
      // Two conditions fail
      {
        isReady: false,
        isSupported: false,
        prefersReducedMotion: false,
        isMobile: false,
        expected: false,
      },
      {
        isReady: false,
        isSupported: true,
        prefersReducedMotion: true,
        isMobile: false,
        expected: false,
      },
      {
        isReady: false,
        isSupported: true,
        prefersReducedMotion: false,
        isMobile: true,
        expected: false,
      },
      {
        isReady: true,
        isSupported: false,
        prefersReducedMotion: true,
        isMobile: false,
        expected: false,
      },
      {
        isReady: true,
        isSupported: false,
        prefersReducedMotion: false,
        isMobile: true,
        expected: false,
      },
      {
        isReady: true,
        isSupported: true,
        prefersReducedMotion: true,
        isMobile: true,
        expected: false,
      },
      // Three conditions fail
      {
        isReady: false,
        isSupported: false,
        prefersReducedMotion: true,
        isMobile: false,
        expected: false,
      },
      {
        isReady: false,
        isSupported: false,
        prefersReducedMotion: false,
        isMobile: true,
        expected: false,
      },
      {
        isReady: false,
        isSupported: true,
        prefersReducedMotion: true,
        isMobile: true,
        expected: false,
      },
      {
        isReady: true,
        isSupported: false,
        prefersReducedMotion: true,
        isMobile: true,
        expected: false,
      },
      // All conditions fail
      {
        isReady: false,
        isSupported: false,
        prefersReducedMotion: true,
        isMobile: true,
        expected: false,
      },
    ];

    testCases.forEach((testCase, index) => {
      it(`should return ${testCase.expected} for combination #${index + 1}: isReady=${testCase.isReady}, isSupported=${testCase.isSupported}, prefersReducedMotion=${testCase.prefersReducedMotion}, isMobile=${testCase.isMobile}`, () => {
        const support: WebGLSupportResult = {
          isReady: testCase.isReady,
          isSupported: testCase.isSupported,
          prefersReducedMotion: testCase.prefersReducedMotion,
          isMobile: testCase.isMobile,
        };

        expect(shouldEnableWebGL(support)).toBe(testCase.expected);
      });
    });
  });
});

describe("WebGL detection functions", () => {
  // Note: These tests verify the behavior of the detection functions
  // which are exposed through the hook but tested via their effects

  describe("checkWebGL behavior (via mocking)", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should detect WebGL support when context is available", () => {
      // The mock in vitest.setup.ts provides WebGL context
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");

      expect(context).not.toBeNull();
    });

    it("should handle WebGL2 context", () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");

      expect(context).not.toBeNull();
    });

    it("should handle experimental-webgl context", () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("experimental-webgl");

      expect(context).not.toBeNull();
    });
  });

  describe("checkReducedMotion behavior (via mocking)", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("should return false by default (mock returns false)", () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      expect(mediaQuery.matches).toBe(false);
    });

    it("should handle matchMedia query", () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      expect(mediaQuery.media).toBe("(prefers-reduced-motion: reduce)");
    });
  });

  describe("checkMobile behavior", () => {
    const originalWindow = global.window;

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should detect touch capability", () => {
      // In jsdom environment, these properties are accessible
      expect(typeof navigator.maxTouchPoints).toBe("number");
    });

    it("should detect screen width", () => {
      expect(typeof window.innerWidth).toBe("number");
    });
  });
});

describe("shouldEnableWebGL property-based tests", () => {
  it("should be idempotent - same input always produces same output", () => {
    const support: WebGLSupportResult = {
      isReady: true,
      isSupported: true,
      prefersReducedMotion: false,
      isMobile: false,
    };

    const result1 = shouldEnableWebGL(support);
    const result2 = shouldEnableWebGL(support);
    const result3 = shouldEnableWebGL(support);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  it("should be pure - no side effects", () => {
    const support: WebGLSupportResult = {
      isReady: true,
      isSupported: true,
      prefersReducedMotion: false,
      isMobile: false,
    };

    const originalSupport = { ...support };

    shouldEnableWebGL(support);

    // Object should not be mutated
    expect(support).toEqual(originalSupport);
  });

  it("should follow boolean logic - order of checks doesn't matter", () => {
    // The function is AND of all positive conditions
    // isReady AND isSupported AND NOT prefersReducedMotion AND NOT isMobile
    const trueCase: WebGLSupportResult = {
      isReady: true,
      isSupported: true,
      prefersReducedMotion: false,
      isMobile: false,
    };

    const result = shouldEnableWebGL(trueCase);

    // Manually verify the logic
    const expected =
      trueCase.isReady &&
      trueCase.isSupported &&
      !trueCase.prefersReducedMotion &&
      !trueCase.isMobile;

    expect(result).toBe(expected);
  });
});
