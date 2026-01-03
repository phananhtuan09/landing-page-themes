type VelocityCallback = (velocity: number) => void;

interface ScrollVelocityTrackerConfig {
  smoothing?: number;
  decayRate?: number;
  oscillationFrequency?: number;
  oscillationDamping?: number;
}

export class ScrollVelocityTracker {
  private lastScrollY = 0;
  private lastTime = 0;
  private velocity = 0;
  private targetVelocity = 0;
  private isScrolling = false;
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private animationId: number | null = null;
  private callbacks: VelocityCallback[] = [];
  private oscillationPhase = 0;
  private oscillationAmplitude = 0;

  private smoothing: number;
  private decayRate: number;
  private oscillationFrequency: number;
  private oscillationDamping: number;

  constructor(config: ScrollVelocityTrackerConfig = {}) {
    this.smoothing = config.smoothing ?? 0.15;
    this.decayRate = config.decayRate ?? 0.95;
    this.oscillationFrequency = config.oscillationFrequency ?? 8;
    this.oscillationDamping = config.oscillationDamping ?? 5;

    this.lastScrollY = window.scrollY;
    this.lastTime = performance.now();

    this.setupListeners();
    this.startLoop();
  }

  private setupListeners(): void {
    window.addEventListener("scroll", this.handleScroll.bind(this), { passive: true });
  }

  private handleScroll(): void {
    const currentTime = performance.now();
    const currentScrollY = window.scrollY;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    const deltaScroll = currentScrollY - this.lastScrollY;

    if (deltaTime > 0) {
      // Calculate raw velocity (pixels per second)
      const rawVelocity = deltaScroll / deltaTime;

      // Normalize velocity to -1 to 1 range (with some headroom)
      this.targetVelocity = Math.max(-1, Math.min(1, rawVelocity / 2000));
    }

    this.lastScrollY = currentScrollY;
    this.lastTime = currentTime;

    // Mark as scrolling and reset timeout
    this.isScrolling = true;
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      // Start oscillation when scrolling stops
      this.oscillationAmplitude = Math.abs(this.velocity);
      this.oscillationPhase = 0;
    }, 100);
  }

  private startLoop(): void {
    const loop = () => {
      this.animationId = requestAnimationFrame(loop);
      this.update();
    };
    loop();
  }

  private update(): void {
    if (this.isScrolling) {
      // Smooth interpolation towards target velocity
      this.velocity += (this.targetVelocity - this.velocity) * this.smoothing;
    } else {
      // Oscillation effect when scrolling stops
      if (this.oscillationAmplitude > 0.01) {
        // Damped oscillation: A * sin(wt) * e^(-dt)
        const oscillation =
          this.oscillationAmplitude *
          Math.sin(this.oscillationFrequency * this.oscillationPhase) *
          Math.exp(-this.oscillationDamping * this.oscillationPhase);

        this.velocity = oscillation;
        this.oscillationPhase += 0.016; // Approximate 60fps timestep

        // Decay the amplitude
        this.oscillationAmplitude *= this.decayRate;
      } else {
        // Decay velocity towards zero
        this.velocity *= this.decayRate;
        if (Math.abs(this.velocity) < 0.001) {
          this.velocity = 0;
        }
      }
    }

    // Notify all callbacks
    for (const callback of this.callbacks) {
      callback(this.velocity);
    }
  }

  public subscribe(callback: VelocityCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  public getVelocity(): number {
    return this.velocity;
  }

  public getDirection(): number {
    return Math.sign(this.velocity);
  }

  public dispose(): void {
    window.removeEventListener("scroll", this.handleScroll.bind(this));

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.callbacks = [];
  }
}

// Singleton instance for shared use
let instance: ScrollVelocityTracker | null = null;

export function getScrollVelocityTracker(): ScrollVelocityTracker {
  if (!instance) {
    instance = new ScrollVelocityTracker();
  }
  return instance;
}

export function disposeScrollVelocityTracker(): void {
  if (instance) {
    instance.dispose();
    instance = null;
  }
}
