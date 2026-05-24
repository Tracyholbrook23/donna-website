"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────
   WebGL Voronoi "Cell Bloom" background shader
   – Tessellated cells that drift slowly and react to the mouse
   – All colours pulled from the Out of Jersey brand palette
   ───────────────────────────────────────────────────────────────────── */

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;

/* Deterministic pseudo-random helpers */
float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
vec2 hash2(vec2 p) {
  return vec2(hash(p), hash(p * 1.37 + 57.3));
}

/* Brand palette — terracotta / clay / brass / blush / deep terracotta */
vec3 palette(float t) {
  t = fract(t);
  float s = t * 6.0;
  vec3 c0 = vec3(0.725, 0.325, 0.227); /* terracotta      #B9533A */
  vec3 c1 = vec3(0.851, 0.514, 0.416); /* terracotta-soft #D9836A */
  vec3 c2 = vec3(0.890, 0.663, 0.573); /* clay            #E3A992 */
  vec3 c3 = vec3(0.710, 0.604, 0.310); /* brass           #B58A4F */
  vec3 c4 = vec3(0.557, 0.227, 0.149); /* terracotta-deep #8E3A26 */
  vec3 c5 = vec3(0.945, 0.843, 0.784); /* blush           #F1D7C8 */
  if (s < 1.0) return mix(c0, c1, s);
  if (s < 2.0) return mix(c1, c2, s - 1.0);
  if (s < 3.0) return mix(c2, c3, s - 2.0);
  if (s < 4.0) return mix(c3, c4, s - 3.0);
  if (s < 5.0) return mix(c4, c5, s - 4.0);
                return mix(c5, c0, s - 5.0);
}

void main() {
  vec2 uv     = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  /* Aspect-correct UV: ~4 rows of cells, ~4*aspect columns */
  vec2 p  = vec2(uv.x * aspect, uv.y) * 4.0;
  vec2 ip = floor(p);
  vec2 fp = fract(p);

  /* Mouse in same coordinate space */
  vec2 mouse = vec2(
    (u_mouse.x / u_res.x) * aspect,
    1.0 - u_mouse.y / u_res.y
  ) * 4.0;

  /* Voronoi — scan 5×5 neighbourhood */
  float md = 10.0, sd = 10.0;
  vec2  mc = vec2(0.0);

  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 nb  = vec2(float(i), float(j));
      vec2 rnd = hash2(ip + nb);

      /* Each seed drifts within its cell over time */
      vec2 pt  = 0.5 + 0.42 * sin(u_time * 0.18 + 6.2831 * rnd);

      float d = length(nb + pt - fp);
      if (d < md) { sd = md; md = d; mc = ip + nb; }
      else if (d < sd) { sd = d; }
    }
  }

  float h = hash(mc);

  /* ── Border ──────────────────────────────── */
  float edge   = sd - md;
  float border = smoothstep(0.0, 0.07, edge);   /* thickness of dark lines */

  /* ── Cell colour ─────────────────────────── */
  vec3 col = palette(h * 1.618034);

  /* Gradient: bright/warm centre → darker edge */
  float ctr  = 1.0 - smoothstep(0.0, 0.48, md);
  float grad = ctr * ctr;
  col = mix(col * 0.58, col * 1.22, grad);

  /* Soft warm bloom at each cell centre */
  float bloom = pow(ctr, 3.0) * 0.45;
  col += vec3(bloom * 0.70, bloom * 0.28, bloom * 0.12);

  /* ── Mouse proximity highlight ───────────── */
  float mdist    = length(p - mouse);
  float mglow    = smoothstep(1.6, 0.0, mdist);
  col = mix(col, col * 1.45 + vec3(0.12, 0.06, 0.03), mglow * 0.65);

  /* ── Apply dark borders ───────────────────── */
  col = mix(vec3(0.07, 0.03, 0.02), col, border);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── WebGL setup ── */
    const gl = (
      canvas.getContext("webgl") ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null)
    );
    if (!gl) return; // Graceful no-op if WebGL unavailable

    const compile = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("[MeshGradient] shader error:", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vert = compile(gl.VERTEX_SHADER, VERT);
    const frag = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[MeshGradient] program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    /* Fullscreen triangle-strip quad */
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    /* Uniform locations */
    const uRes   = gl.getUniformLocation(prog, "u_res");
    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let W = 0, H = 0;
    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let raf: number;
    const t0 = performance.now();

    const resize = () => {
      /* Render at half resolution for performance — still crisp on screen */
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      W = Math.floor(window.innerWidth  * dpr * 0.6);
      H = Math.floor(window.innerHeight * dpr * 0.6);
      canvas.width  = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const draw = () => {
      const t = (performance.now() - t0) / 1000;
      gl.uniform2f(uRes,   W, H);
      gl.uniform1f(uTime,  t);
      /* Convert mouse to canvas pixel coords (canvas is 60% of CSS size) */
      const scale = W / window.innerWidth;
      gl.uniform2f(uMouse, mouseX * scale, mouseY * scale);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:          0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:         2,
        opacity:        0.68,
        mixBlendMode:  "multiply",
        imageRendering: "auto",
      }}
      aria-hidden="true"
    />
  );
}
