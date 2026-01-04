import "@testing-library/jest-dom/vitest";

// Mock WebGL context for tests
const mockWebGLContext = {
  getParameter: () => "WebGL",
  getExtension: () => null,
  createShader: () => ({}),
  shaderSource: () => {},
  compileShader: () => {},
  getShaderParameter: () => true,
  createProgram: () => ({}),
  attachShader: () => {},
  linkProgram: () => {},
  getProgramParameter: () => true,
  useProgram: () => {},
  getUniformLocation: () => ({}),
  getAttribLocation: () => 0,
  createBuffer: () => ({}),
  bindBuffer: () => {},
  bufferData: () => {},
  enableVertexAttribArray: () => {},
  vertexAttribPointer: () => {},
  createTexture: () => ({}),
  bindTexture: () => {},
  texParameteri: () => {},
  texImage2D: () => {},
  uniform1i: () => {},
  uniform1f: () => {},
  uniform2f: () => {},
  uniform3f: () => {},
  uniform4f: () => {},
  uniformMatrix4fv: () => {},
  viewport: () => {},
  clearColor: () => {},
  clear: () => {},
  drawArrays: () => {},
  drawElements: () => {},
  enable: () => {},
  disable: () => {},
  blendFunc: () => {},
  deleteShader: () => {},
  deleteProgram: () => {},
  deleteBuffer: () => {},
  deleteTexture: () => {},
};

// Mock canvas getContext for WebGL
HTMLCanvasElement.prototype.getContext = function (contextType: string) {
  if (contextType === "webgl" || contextType === "webgl2" || contextType === "experimental-webgl") {
    return mockWebGLContext as unknown as RenderingContext;
  }
  return null;
} as typeof HTMLCanvasElement.prototype.getContext;

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
  return setTimeout(() => callback(performance.now()), 16) as unknown as number;
};

global.cancelAnimationFrame = (id: number): void => {
  clearTimeout(id);
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
