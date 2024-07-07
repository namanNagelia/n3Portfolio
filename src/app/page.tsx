"use client";
// pages/index.js
import Header from "./components/header";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
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
import { Parallax as OtherParallax } from "react-scroll-parallax";
import ProjectCard from "./components/projectCard";
import Triangle from "@/../public/triangle.svg";
import backboardStats1 from "@/../public/backboardStats/backboardStats1.png";
import backboardStats2 from "@/../public/backboardStats/bbs2.png";
import backboardStats3 from "@/../public/backboardStats/bbs3.png";
import backboardStats4 from "@/../public/backboardStats/bbs.png";
import backboardStats5 from "@/../public/backboardStats/bbs5.png";

import { useMedia } from "react-use";
import sms1 from "@/../public/sparkmySport/AdminPage.png";
import sms2 from "@/../public/sparkmySport/charts.png";
import sms3 from "@/../public/sparkmySport/compare.png";
import sms4 from "@/../public/sparkmySport/TeamPage.png";

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
  const isWide = useMedia("(max-width: 955px)");
  const isWide2 = useMedia("(max-width: 820px)");
  const gltf = useLoader(GLTFLoader, "./HeroPlanet.gltf");
  // const colorMap = useLoader(TextureLoader, "finaltexture.png");

  return (
    <>
      <ambientLight intensity={10} />
      <primitive
        object={gltf.scene}
        scale={!isWide ? 1.7 : !isWide2 ? 1.5 : 1.3}
      />
    </>
  );
};

export default function Home() {
  const isWide2 = useMedia("(max-width: 820px)");

  const AmazonProjectKuiper = {
    title: "Amazon Project Kuiper",
    description:
      "In a collaboration with the University of Maryland's App Dev Club, we designed a low Earth orbit satellite visualization system. This was designed for Project Kuiper as a way to visualize satellite collision risk to non-technical stakeholders at Amazon, and use game theory and hyperledger frameworks to help operators choose the best path to take in case of a collision.",
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
  const SparkMySport = {
    title: "Spark My Sport",
    description:
      "Designed the entire website and web app for spark my sport, a sports analytics startup aimed at allowing grassroots athletes get their stats visualized and recognized by scouts. Used OpenAI to make AI driven insights, alongside live stats, streaming, and graphs. ",
    technologies: [
      "React.js",
      "Next.js",
      "MySQL",
      "OpenAI",
      "SocketIO",
      "Firebase",
    ],
    image: [sms4, sms3, sms2, sms1],
    link: "https://sparkmysport.com/",
    github: "https://github.com/example",
    demo: "https://example.com/demo",
    isMobile: false,
  };
  const BackBoardStats = {
    title: "Backboard Stats",
    description:
      "Full Stack Website and Mobile App I am developing for Next Gen Basketball Statistics. Using an NBA API, I get data and display live stats, advanced stats, and allow players to be compared to each other with percentile, shot charts, and overall computed ratings. Betting Odds and Mobile App are in Development!",
    technologies: ["React.js", "Next.js", "Supabase", "Python", "Flask"],
    image: [
      backboardStats5,
      backboardStats1,
      backboardStats2,
      backboardStats3,
      backboardStats4,
    ],
    link: "https://www.backboardstats.com/home",
    github: "https://github.com/example",
    demo: "https://example.com/demo",
    isMobile: false,
  };

  return (
    <>
      <Header />

      <div className="w-screen h-full">
        <Background />

        {/* as you add more projects, increment the pages to increase the page height */}
        <Parallax pages={5} style={{ top: 0 }}>
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
            <div
              className="w-full sm:w-[85%] h-full"
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="fixed top-0 left-0 w-screen h-screen z-20"></div>
              <Canvas className="-z-10">
                <Suspense fallback={null}>
                  <OrbitControls
                    enableZoom={false}
                    autoRotate
                    enableRotate={!isWide2}
                  />

                  <HeroPlanet />
                </Suspense>
              </Canvas>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            speed={0.5}
            offset={0.3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              zIndex: 1,
              position: "relative",
            }}
          >
            <h1 className="md:text-6xl text-5xl font-georgia text-white text-center">
              Naman Nagelia
            </h1>
            <h2 className="md:text-3xl text-2xl font-poppins text-red-400 md:mt-4 mt-2 text-center">
              Software and AI Developer
            </h2>
          </ParallaxLayer>
          <div
            // factor={2.4}
            className="flex justify-center items-center flex-col -mt-9"
          >
            <div className="flex lg:mr-auto lg:ml-32 items-center space-x-2 justify-start mb-4">
              <Image src={Triangle} alt="triangle" width={15} height={15} />
              <h1 className="md:text-5xl text-4xl font-Poppins text-[#D9FDFE]">
                EXPERIENCE
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center space-y-10">
              <ProjectCard {...AmazonProjectKuiper} />
              <ProjectCard {...SparkMySport} />
              <ProjectCard {...BackBoardStats} />
            </div>
          </div>
        </Parallax>
      </div>
    </>
  );
}
