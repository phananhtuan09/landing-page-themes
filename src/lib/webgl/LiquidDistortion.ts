import * as THREE from "three";

interface LiquidDistortionConfig {
  container: HTMLElement;
  onReady?: () => void;
}

export class LiquidDistortion {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private mesh: THREE.Mesh;
  private uniforms: {
    uTime: { value: number };
    uScrollVelocity: { value: number };
    uResolution: { value: THREE.Vector2 };
    uAccentColor: { value: THREE.Color };
    uDistortionStrength: { value: number };
  };
  private animationId: number | null = null;
  private isVisible = true;
  private container: HTMLElement;
  private clock: THREE.Clock;

  constructor(config: LiquidDistortionConfig) {
    this.container = config.container;
    this.clock = new THREE.Clock();

    // Scene setup
    this.scene = new THREE.Scene();

    // Orthographic camera for 2D effect
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 100);
    this.camera.position.z = 1;

    // Renderer setup with alpha for transparency
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Style the canvas
    this.renderer.domElement.style.position = "fixed";
    this.renderer.domElement.style.top = "0";
    this.renderer.domElement.style.left = "0";
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.pointerEvents = "none";
    this.renderer.domElement.style.zIndex = "1";

    // Uniforms for shaders
    this.uniforms = {
      uTime: { value: 0 },
      uScrollVelocity: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uAccentColor: { value: new THREE.Color("#D9534F") },
      uDistortionStrength: { value: 1.0 },
    };

    // Create mesh with plane geometry
    this.mesh = this.createMesh();
    this.scene.add(this.mesh);

    // Event listeners
    this.setupEventListeners();

    // Start render loop
    this.animate();

    if (config.onReady) {
      config.onReady();
    }
  }

  private createMesh(): THREE.Mesh {
    // High vertex density for smooth distortion
    const geometry = new THREE.PlaneGeometry(2, 2, 100, 100);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.getVertexShader(),
      fragmentShader: this.getFragmentShader(),
      transparent: true,
      depthWrite: false,
    });

    return new THREE.Mesh(geometry, material);
  }

  private getVertexShader(): string {
    return `
      uniform float uTime;
      uniform float uScrollVelocity;
      uniform float uDistortionStrength;

      varying vec2 vUv;
      varying float vDistortion;

      void main() {
        vUv = uv;

        vec3 pos = position;

        // Velocity-based wave distortion
        float frequency = 3.0;
        float amplitude = uScrollVelocity * 0.15 * uDistortionStrength;

        // Create wave pattern based on position and time
        float wave1 = sin(pos.y * frequency + uTime * 2.0) * amplitude;
        float wave2 = sin(pos.x * frequency * 0.5 + uTime * 1.5) * amplitude * 0.5;

        // Apply displacement
        pos.x += wave1;
        pos.y += wave2;

        // Calculate distortion amount for fragment shader
        vDistortion = abs(wave1) + abs(wave2);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;
  }

  private getFragmentShader(): string {
    return `
      uniform float uTime;
      uniform float uScrollVelocity;
      uniform vec3 uAccentColor;
      uniform vec2 uResolution;

      varying vec2 vUv;
      varying float vDistortion;

      void main() {
        // Base transparency - mostly transparent
        float alpha = 0.0;

        // Reveal accent color based on distortion intensity
        float distortionIntensity = vDistortion * 10.0;
        distortionIntensity = clamp(distortionIntensity, 0.0, 1.0);

        // Only show color during distortion
        if (distortionIntensity > 0.05) {
          // Gradient based on UV position for visual interest
          float gradient = mix(0.3, 1.0, vUv.y);

          // Accent color with distortion-based alpha
          vec3 color = uAccentColor * gradient;
          alpha = distortionIntensity * 0.3;

          gl_FragColor = vec4(color, alpha);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;
  }

  private setupEventListeners(): void {
    window.addEventListener("resize", this.handleResize.bind(this));
    document.addEventListener("visibilitychange", this.handleVisibilityChange.bind(this));
  }

  private handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    this.camera.left = -aspect;
    this.camera.right = aspect;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.uniforms.uResolution.value.set(width, height);
  }

  private handleVisibilityChange(): void {
    this.isVisible = !document.hidden;
    if (this.isVisible && !this.animationId) {
      this.clock.start();
      this.animate();
    }
  }

  private animate(): void {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.animationId = requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    this.uniforms.uTime.value += delta;

    this.renderer.render(this.scene, this.camera);
  }

  public updateScrollVelocity(velocity: number): void {
    this.uniforms.uScrollVelocity.value = velocity;
  }

  public setDistortionStrength(strength: number): void {
    this.uniforms.uDistortionStrength.value = strength;
  }

  public dispose(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    window.removeEventListener("resize", this.handleResize.bind(this));
    document.removeEventListener("visibilitychange", this.handleVisibilityChange.bind(this));

    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.ShaderMaterial).dispose();
    this.renderer.dispose();

    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
