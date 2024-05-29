"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import SpiralGalaxy from "./galaxy";

function GradientBackground() {
  const backgroundRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    const background = backgroundRef.current;
    const backgroundColor = new THREE.Color(0x051432);
    const dustColor = new THREE.Color(0x6a0dad); // Purple color for dust

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 backgroundColor;
      uniform vec3 dustColor;
      varying vec2 vUv;
      uniform float time;

      vec4 permute(vec4 x) {
          return mod(((x*34.0)+1.0)*x, 289.0);
      }

      vec4 taylorInvSqrt(vec4 r) {
          return 1.79284291400159 - 0.85373472095314 * r;
      }

      vec3 fade(vec3 t) {
          return t*t*t*(t*(t*6.0-15.0)+10.0);
      }

      float cnoise(vec3 P) {
          vec3 Pi0 = floor(P); 
          vec3 Pi1 = Pi0 + vec3(1.0); 
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P); 
          vec3 Pf1 = Pf0 - vec3(1.0); 
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
          vec4 iz0 = vec4(Pi0.z);
          vec4 iz1 = vec4(Pi1.z);

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 / 7.0;
          vec4 gy0 = floor(gx0) / 7.0;
          vec4 gz0 = floor(gy0) / 6.0;
          gx0 = fract(gx0) - 0.5;
          gy0 = fract(gy0) - 0.5;
          gz0 = fract(gz0) - 0.5;

          vec4 gx1 = ixy1 / 7.0;
          vec4 gy1 = floor(gx1) / 7.0;
          vec4 gz1 = floor(gy1) / 6.0;
          gx1 = fract(gx1) - 0.5;
          gy1 = fract(gy1) - 0.5;
          gz1 = fract(gz1) - 0.5;

          vec4 norm0 = taylorInvSqrt(gx0 * gx0 + gy0 * gy0 + gz0 * gz0);
          gx0 *= norm0.x;
          gy0 *= norm0.y;
          gz0 *= norm0.z;

          vec4 norm1 = taylorInvSqrt(gx1 * gx1 + gy1 * gy1 + gz1 * gz1);
          gx1 *= norm1.x;
          gy1 *= norm1.y;
          gz1 *= norm1.z;

          float n000 = dot(vec3(gx0.x,gy0.x,gz0.x), vec3(Pf0.x,Pf0.y,Pf0.z));
          float n100 = dot(vec3(gx0.y,gy0.y,gz0.y), vec3(Pf1.x,Pf0.y,Pf0.z));
          float n010 = dot(vec3(gx0.z,gy0.z,gz0.z), vec3(Pf0.x,Pf1.y,Pf0.z));
          float n110 = dot(vec3(gx0.w,gy0.w,gz0.w), vec3(Pf1.x,Pf1.y,Pf0.z));
          float n001 = dot(vec3(gx1.x,gy1.x,gz1.x), vec3(Pf0.x,Pf0.y,Pf1.z));
          float n101 = dot(vec3(gx1.y,gy1.y,gz1.y), vec3(Pf1.x,Pf0.y,Pf1.z));
          float n011 = dot(vec3(gx1.z,gy1.z,gz1.z), vec3(Pf0.x,Pf1.y,Pf1.z));
          float n111 = dot(vec3(gx1.w,gy1.w,gz1.w), vec3(Pf1.x,Pf1.y,Pf1.z));

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
          return 2.2 * n_xyz;
      }

      void main() {
        vec3 noisePos = vec3(vUv * 10.0, time * 0.1);
        float noise = cnoise(noisePos);

        vec3 color = backgroundColor;
        color += mix(vec3(0.0), dustColor, noise * 0.5);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    background.material = new THREE.ShaderMaterial({
      uniforms: {
        backgroundColor: { value: backgroundColor },
        dustColor: { value: dustColor },
        time: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
    });
  }, []);

  useFrame(({ clock }) => {
    if (backgroundRef.current) {
      const material = backgroundRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={backgroundRef}>
      <sphereGeometry args={[500, 64, 64]} />
    </mesh>
  );
}

function AnimatedStars() {
  return (
    <Stars
      radius={100}
      depth={50}
      count={7000}
      factor={8}
      saturation={0}
      fade
      speed={1}
    />
  );
}

export default function Background() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <GradientBackground />
      <AnimatedStars />
    </Canvas>
  );
}
