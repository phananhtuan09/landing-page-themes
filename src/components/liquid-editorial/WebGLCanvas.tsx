"use client";

import { useEffect, useRef } from "react";
import { LiquidDistortion } from "@/lib/webgl/LiquidDistortion";
import { useWebGLSupport, shouldEnableWebGL } from "@/hooks/useWebGLSupport";
import { useScrollVelocityRef } from "@/hooks/useScrollVelocity";

export function WebGLCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const distortionRef = useRef<LiquidDistortion | null>(null);
  const webglSupport = useWebGLSupport();
  const velocityRef = useScrollVelocityRef({ enabled: shouldEnableWebGL(webglSupport) });

  const shouldEnable = shouldEnableWebGL(webglSupport);

  useEffect(() => {
    if (!shouldEnable || !containerRef.current) {
      return;
    }

    // Initialize WebGL distortion
    distortionRef.current = new LiquidDistortion({
      container: containerRef.current,
      onReady: () => {
        // WebGL ready
      },
    });

    // Update velocity in render loop
    let animationId: number;
    const updateLoop = () => {
      animationId = requestAnimationFrame(updateLoop);
      if (distortionRef.current) {
        distortionRef.current.updateScrollVelocity(velocityRef.current);
      }
    };
    updateLoop();

    return () => {
      cancelAnimationFrame(animationId);
      if (distortionRef.current) {
        distortionRef.current.dispose();
        distortionRef.current = null;
      }
    };
  }, [shouldEnable, velocityRef]);

  // Don't render anything if WebGL shouldn't be enabled
  if (!webglSupport.isReady) {
    return null;
  }

  if (!shouldEnable) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10" aria-hidden="true" />
  );
}
