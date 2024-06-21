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
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      // style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <Background />

      <Parallax pages={2}>
        <ParallaxLayer
          speed={0.2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <div className="w-full h-full">
            <Canvas>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <HeroPlanet />
              </Suspense>
            </Canvas>
          </div>
          {/* <Image
            src={HeroImage}
            alt="An illustration of a techy planet with rings around it"
            width={700}
            height={700}
          /> */}
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.5}
          offset={0.35}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="text-6xl font-georgia text-white">Naman Nagelia</h1>
          <h2 className="text-3xl font-georgia text-white mt-4">
            Software and AI Developer
          </h2>
        </ParallaxLayer>
      </Parallax>

      {/* <main className="min-h-screenp-24">
        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-16">
          <Image src={HeroImage} alt="An illustration of a techy planet with rings around it" width={700} height={700} />
          <h1 className="text-6xl font-georgia text-white">Naman Nagelia</h1>
          <h2 className="text-3xl font-georgia text-white mt-4">
            Software and AI Developer
          </h2>
        </div>
        </main> */}
      {/* <div className="w-full h-[500px]">
          <Canvas>
          <Suspense fallback={null}>
          <OrbitControls />
          <Model />
          </Suspense>
          </Canvas>
          </div> */}
    </div>
  );
}
