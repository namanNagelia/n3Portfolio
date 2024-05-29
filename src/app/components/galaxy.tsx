"use client";
import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpiralGalaxyProps {
  numParticles: number;
  radius: number;
  arms: number;
  color: string;
}

function createSpiralGalaxy(
  numParticles: number,
  radius: number,
  arms: number
) {
  const positions = new Float32Array(numParticles * 3);
  const angleStep = (2 * Math.PI) / arms;

  for (let i = 0; i < numParticles; i++) {
    const arm = i % arms;
    const angle = (i / numParticles) * Math.PI * 2 + arm * angleStep;
    const distance = (i / numParticles) * radius;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const z = (Math.random() - 0.5) * radius * 0.5;

    positions.set([x, y, z], i * 3);
  }

  return positions;
}

const SpiralGalaxy: React.FC<SpiralGalaxyProps> = ({
  numParticles,
  radius,
  arms,
  color,
}) => {
  const particlesRef = React.useRef<THREE.BufferGeometry>(null);

  const positions = useMemo(
    () => createSpiralGalaxy(numParticles, radius, arms),
    [numParticles, radius, arms]
  );

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotateY(0.002);
    }
  });

  return (
    <points>
      <bufferGeometry ref={particlesRef}>
        <bufferAttribute
          attach="position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.1} />
    </points>
  );
};

export default SpiralGalaxy;
