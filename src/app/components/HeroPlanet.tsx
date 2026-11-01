"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT).
const noise = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
  float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * snoise(p); p *= 2.03; a *= 0.5; }
    return v * 0.5 + 0.5;
  }
  // Cheaper 3-octave version for the warp offsets.
  float fbmLo(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) { v += a * snoise(p); p *= 2.03; a *= 0.5; }
    return v * 0.5 + 0.5;
  }
`;

const LIGHT_DIR = new THREE.Vector3(-1, 0.6, 0.9).normalize();

// Gas giant in the site's palette: banded surface, rim light, glow, rings.
const surfaceShader = {
  vertexShader: /* glsl */ `
    varying vec3 vPos;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;
    void main() {
      vPos = position;
      vNormal = normalize(normalMatrix * normal);
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uLightDir;
    varying vec3 vPos;
    varying vec3 vNormal;
    varying vec3 vWorldNormal;
    ${noise}
    void main() {
      // Domain-warped noise stretched along latitude gives swirling gas bands.
      vec3 q = vPos * vec3(1.6, 5.0, 1.6);
      float t = uTime * 0.04;
      vec3 w = vec3(fbmLo(q + t), fbmLo(q + vec3(5.2, 1.3, 2.8)), 0.5);
      float n = fbm(q + w * 1.8);
      float band = smoothstep(0.15, 0.85, sin(vPos.y * 9.0 + n * 6.0) * 0.5 + 0.5);
      vec3 deep = vec3(0.08, 0.02, 0.16);
      vec3 magenta = vec3(0.60, 0.14, 0.43);
      vec3 pink = vec3(0.92, 0.26, 0.40);
      vec3 ice = vec3(0.85, 0.97, 1.0);
      vec3 col = mix(deep, magenta, band);
      col = mix(col, pink, smoothstep(0.5, 0.8, n) * 0.6);
      col = mix(col, ice, smoothstep(0.72, 0.9, w.x * n) * 0.25);

      float diff = smoothstep(-0.05, 0.85, dot(normalize(vWorldNormal), uLightDir));
      col *= 0.05 + 1.15 * diff;
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0, 0, 1)), 0.0), 3.0);
      col += vec3(0.95, 0.35, 0.55) * fresnel * (0.1 + 0.4 * diff);
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

const atmosphereShader = {
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec3 vNormal;
    void main() {
      float i = pow(clamp(0.62 - dot(vNormal, vec3(0, 0, 1.0)), 0.0, 1.0), 3.0);
      gl_FragColor = vec4(0.95, 0.30, 0.50, 1.0) * i * 0.8;
    }
  `,
};

const ringShader = {
  vertexShader: /* glsl */ `
    varying float vR;
    void main() {
      vR = length(position.xy);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    varying float vR;
    void main() {
      float t = (vR - 1.45) / 0.45;
      float bands = 0.6 + 0.4 * sin(t * 18.0);
      float edge = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.85, t);
      float gap = 1.0 - 0.85 * smoothstep(0.04, 0.0, abs(t - 0.55));
      vec3 col = mix(vec3(0.90, 0.24, 0.38), vec3(0.85, 0.99, 1.0), t * 0.8);
      gl_FragColor = vec4(col, bands * edge * gap * 0.3);
    }
  `,
};

export default function HeroPlanet({ scale = 1 }: { scale?: number }) {
  const planet = useRef<THREE.Mesh>(null);
  const moon = useRef<THREE.Group>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uLightDir: { value: LIGHT_DIR } }),
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    if (planet.current) planet.current.rotation.y += delta * 0.08;
    if (moon.current) moon.current.rotation.y += delta * 0.25;
  });

  return (
    <group scale={scale} position={[0, 0.6, 0]} rotation={[0.2, 0, 0.35]}>
      <directionalLight position={LIGHT_DIR.clone().multiplyScalar(10)} intensity={2.5} />
      <ambientLight intensity={0.15} />

      <mesh ref={planet}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial args={[{ ...surfaceShader, uniforms }]} />
      </mesh>

      <mesh scale={1.18}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          args={[atmosphereShader]}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2 + 0.25, 0, 0]}>
        <ringGeometry args={[1.45, 1.9, 256]} />
        <shaderMaterial
          args={[ringShader]}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
        />
      </mesh>

      <group ref={moon} rotation={[0.4, 0, 0]}>
        <mesh position={[2.5, 0, 0]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial color="#D9FDFE" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
