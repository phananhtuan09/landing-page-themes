type QualityLevel = "high" | "medium" | "low";
type QualityCallback = (level: QualityLevel) => void;

interface PerformanceMonitorConfig {
  targetFPS?: number;
  sampleSize?: number;
  lowFPSThreshold?: number;
  mediumFPSThreshold?: number;
}

export class PerformanceMonitor {
  private frameTimes: number[] = [];
  private lastFrameTime = 0;
  private currentQuality: QualityLevel = "high";
  private callbacks: QualityCallback[] = [];
  private animationId: number | null = null;

  private targetFPS: number;
  private sampleSize: number;
  private lowFPSThreshold: number;
  private mediumFPSThreshold: number;

  constructor(config: PerformanceMonitorConfig = {}) {
    this.targetFPS = config.targetFPS ?? 60;
    this.sampleSize = config.sampleSize ?? 30;
    this.lowFPSThreshold = config.lowFPSThreshold ?? 30;
    this.mediumFPSThreshold = config.mediumFPSThreshold ?? 45;

    this.lastFrameTime = performance.now();
  }

  public start(): void {
    const loop = () => {
      this.animationId = requestAnimationFrame(loop);
      this.recordFrame();
    };
    loop();
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public recordFrame(): void {
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.frameTimes.push(deltaTime);

    // Keep only the last N samples
    if (this.frameTimes.length > this.sampleSize) {
      this.frameTimes.shift();
    }

    // Check quality every sampleSize frames
    if (this.frameTimes.length === this.sampleSize) {
      this.evaluateQuality();
    }
  }

  private evaluateQuality(): void {
    const avgFrameTime = this.getAverageFrameTime();
    const currentFPS = 1000 / avgFrameTime;

    let newQuality: QualityLevel = "high";

    if (currentFPS < this.lowFPSThreshold) {
      newQuality = "low";
    } else if (currentFPS < this.mediumFPSThreshold) {
      newQuality = "medium";
    }

    if (newQuality !== this.currentQuality) {
      this.currentQuality = newQuality;
      this.notifyCallbacks();

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(
          `[PerformanceMonitor] Quality changed to: ${newQuality} (FPS: ${currentFPS.toFixed(1)})`
        );
      }
    }
  }

  private getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) {
      return 16.67; // Default to 60 FPS
    }
    const sum = this.frameTimes.reduce((a, b) => a + b, 0);
    return sum / this.frameTimes.length;
  }

  public getCurrentFPS(): number {
    return 1000 / this.getAverageFrameTime();
  }

  public getQuality(): QualityLevel {
    return this.currentQuality;
  }

  public subscribe(callback: QualityCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  private notifyCallbacks(): void {
    for (const callback of this.callbacks) {
      callback(this.currentQuality);
    }
  }

  public dispose(): void {
    this.stop();
    this.callbacks = [];
    this.frameTimes = [];
  }
}

// Singleton instance
let instance: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!instance) {
    instance = new PerformanceMonitor();
    instance.start();
  }
  return instance;
}

export function disposePerformanceMonitor(): void {
  if (instance) {
    instance.dispose();
    instance = null;
  }
}
