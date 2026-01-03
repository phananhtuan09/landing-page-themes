"use client";

import { ReactNode } from "react";
import { useWebGLSupport, shouldEnableWebGL } from "@/hooks/useWebGLSupport";

interface StaticFallbackProps {
  children: ReactNode;
}

export function StaticFallback({ children }: StaticFallbackProps) {
  const support = useWebGLSupport();

  // If WebGL is enabled, no need for fallback styles
  if (shouldEnableWebGL(support)) {
    return <>{children}</>;
  }

  return (
    <div className="static-fallback-wrapper">
      <style jsx>{`
        .static-fallback-wrapper :global(.distortion-target) {
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }
        .static-fallback-wrapper :global(.distortion-target:hover) {
          transform: scale(1.01) translateY(-2px);
          opacity: 0.95;
        }
        .static-fallback-wrapper :global(button:hover) {
          transform: scale(1.02);
        }
        .static-fallback-wrapper :global(a:hover) {
          opacity: 1;
        }
        .static-fallback-wrapper :global([data-distortion="true"]) {
          transition: all 0.25s ease;
        }
        .static-fallback-wrapper :global([data-distortion="true"]:hover) {
          transform: translateX(2px) translateY(-2px);
        }
      `}</style>
      {children}
    </div>
  );
}

export function useIsStaticFallback(): boolean {
  const support = useWebGLSupport();
  return !shouldEnableWebGL(support);
}
