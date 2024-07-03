"use client";
// pages/index.js
import Image from "next/image";
import React, { Suspense } from "react";
import Background from "./components/Background";
import { Canvas } from "@react-three/fiber";
import PlanetOne from "./components/PlanetOne";
import Spline from "@splinetool/react-spline/next";
import { Environment, OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import HeroImage from "../../public/HeroImage.png";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import ProjectCard from "./components/projectCard";
const Model = () => {
  const gltf = useLoader(GLTFLoader, "./PlanetOne.gltf");
  const colorMap = useLoader(TextureLoader, "finaltexture.png");

  return (
    <>
      <ambientLight intensity={3} />
      <primitive object={gltf.scene} scale={1} map={colorMap} />
    </>
  );
};

const HeroPlanet = () => {
  const gltf = useLoader(GLTFLoader, "./HeroPlanet.gltf");
  // const colorMap = useLoader(TextureLoader, "finaltexture.png");

  return (
    <>
      <ambientLight intensity={10} />
      <primitive object={gltf.scene} scale={1.7} />
    </>
  );
};

export default function Home() {
  const exampleProject = {
    title: "Example Project",
    description: "This is an example project description.",
    technologies: ["React", "Next.js", "TypeScript"],
    image: "/path/to/image.jpg", // Replace with the actual image path
    link: "https://example.com",
    github: "https://github.com/example",
    demo: "https://example.com/demo",
    isMobile: false,
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Background />

      <Parallax pages={3} style={{ top: 0 }}>
        <ParallaxLayer
          speed={0.2}
          offset={0}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 0,
          }}
        >
          <div className="w-[75%] h-full">
            <Canvas>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} autoRotate />
                <HeroPlanet />
              </Suspense>
            </Canvas>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.75}
          offset={0.3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <h1 className="text-6xl font-georgia text-white">Naman Nagelia</h1>
          <h2 className="text-3xl font-georgia text-white mt-4">
            Software and AI Developer
          </h2>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.2}
          offset={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "5vh",
          }}
        >
          {/* Place ProjectCard component here */}
          <ProjectCard {...exampleProject} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
