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
import Triangle from "@/../public/triangle.svg";
import backboardStats1 from "@/../public/backboardStats/backboardStats1.png";

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
  const AmazonProjectKuiper = {
    title: "Amazon Project Kuiper",
    description:
      "Full Stack Website and Mobile App I am developing for Next Gen Basketball Statistics. Using an NBA API, I get data and display live stats, advanced stats, and allow players to be compared to each other with percentile, shot charts, and overall computed ratings. Betting Odds and Mobile App are in Development!",
    technologies: [
      "React.js",
      "Next.js",
      "Python",
      "Supabase",
      "HyperLedger",
      "FastApi",
    ],
    image: [backboardStats1],
    link: "https://appdevclub.com/#/project/664d1cf1a7335496d2546586",
    github: "https://github.com/example",
    demo: "https://example.com/demo",
    isMobile: false,
  };
  const BackBoardStats = {
    title: "Backboard Stats",
    description:
      "Full Stack Website and Mobile App I am developing for Next Gen Basketball Statistics. Using an NBA API, I get data and display live stats, advanced stats, and allow players to be compared to each other with percentile, shot charts, and overall computed ratings. Betting Odds and Mobile App are in Development!",
    technologies: ["React.js", "Next.js", "Supabase", "Python", "Flask"],
    image: [backboardStats1],
    link: "https://www.backboardstats.com/home",
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
          <h1 className="text-6xl font-georgia text-white text-center">
            Naman Nagelia
          </h1>
          <h2 className="text-3xl font-poppins text-red-400 mt-4 text-center">
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
          }}
        >
          <div className="flex items-center space-x-2 justify-start mb-4 mt-28">
            <Image src={Triangle} alt="triangle" width={15} height={15} />
            <h1 className="text-5xl font-Poppins text-[#D9FDFE]">
              PROJECTS/EXPERIENCE
            </h1>
          </div>
          {/* Place ProjectCard component here */}
          <ProjectCard {...AmazonProjectKuiper} />

          <ProjectCard {...BackBoardStats} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
