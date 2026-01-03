"use client";

import { useSyncExternalStore, useCallback } from "react";

interface WebGLSupportResult {
  isSupported: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  isReady: boolean;
}

// Check WebGL support
function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

// Check reduced motion preference
function checkReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Check if mobile device
function checkMobile(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // Check for touch capability and screen size
  const hasTouchScreen =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error - msMaxTouchPoints is a legacy property
    navigator.msMaxTouchPoints > 0;

  const isSmallScreen = window.innerWidth < 1024;

  // Also check user agent for mobile devices
  const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return (hasTouchScreen && isSmallScreen) || mobileUserAgent;
}

// Cached snapshot to avoid infinite loops with useSyncExternalStore
let cachedSnapshot: WebGLSupportResult | null = null;

function getSnapshot(): WebGLSupportResult {
  const isSupported = checkWebGL();
  const prefersReducedMotion = checkReducedMotion();
  const isMobile = checkMobile();

  // Only create new object if values changed
  if (
    cachedSnapshot === null ||
    cachedSnapshot.isSupported !== isSupported ||
    cachedSnapshot.prefersReducedMotion !== prefersReducedMotion ||
    cachedSnapshot.isMobile !== isMobile
  ) {
    cachedSnapshot = {
      isSupported,
      prefersReducedMotion,
      isMobile,
      isReady: true,
    };
  }

  return cachedSnapshot;
}

// Server snapshot is static, so we can define it once
const serverSnapshot: WebGLSupportResult = {
  isSupported: false,
  prefersReducedMotion: false,
  isMobile: false,
  isReady: false,
};

function getServerSnapshot(): WebGLSupportResult {
  return serverSnapshot;
}

export function useWebGLSupport(): WebGLSupportResult {
  const subscribe = useCallback((callback: () => void) => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", callback);
    window.addEventListener("resize", callback);
    return () => {
      mediaQuery.removeEventListener("change", callback);
      window.removeEventListener("resize", callback);
    };
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function shouldEnableWebGL(support: WebGLSupportResult): boolean {
  return (
    support.isReady && support.isSupported && !support.prefersReducedMotion && !support.isMobile
  );
}
