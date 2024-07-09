"use client";
// pages/index.js
import Header from "./components/header";
import Image from "next/image";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Background from "./components/Background";
import ContactForm from "./components/contactus";
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
import "./page.css";
import { useMedia } from "react-use";
import sms1 from "@/../public/sparkmySport/AdminPage.png";
import sms2 from "@/../public/sparkmySport/charts.png";
import sms3 from "@/../public/sparkmySport/compare.png";
import sms4 from "@/../public/sparkmySport/TeamPage.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActiveSection } from "./components/useActiveSection";
import amazon1 from "@/../public/amazon/amazon1.png";
import Naman_Resume from "../../public/Naman_Nagelia_Resume.pdf";
import Footer from "./components/footer";
import T1 from "@/../public/tutorNova/Chat.png";
import MobileProjectCard from "./components/mobileProjectCard";
import T2 from "@/../public/tutorNova/Home.png";

//1. Get all projects in
//2: Header navigation
//3: Contact Form
//4. Resume
//5. Footer

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
  const isWide3 = useMedia("(max-width: 1440px)");
  const isWide4 = useMedia("(max-width: 1660px)");
  const [isProjectIntersecting, setIsProjectIntersecting] = useState(false);
  const [isAboutIntersecting, setIsAboutIntersecting] = useState(false);
  const [isContactIntersecting, setIsContactIntersecting] = useState(false);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

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
    image: [amazon1],
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

  const TutorNova = {
    title: "TutorNova",
    description:
      "A mobile app I am developing for a tutoring company. It allows students to tutor other students, schedule sessions, and get paid. The app uses a Firebase backend, and is built using SwiftUI for IOS devices. Still under development!",
    technologies: ["Swift", "Firebase", "Google Cloud"],
    image: [T2, T1],
    link: "",
    github: "",
    disabled: true,
  };

  const projectRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsProjectIntersecting(entry.isIntersecting);
      });

      observer.observe(node);

      return () => observer.disconnect();
    }
  }, []);

  const aboutRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsAboutIntersecting(entry.isIntersecting);
      });

      observer.observe(node);

      return () => observer.disconnect();
    }
  }, []);

  const contactRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsContactIntersecting(entry.isIntersecting);
      });

      observer.observe(node);

      return () => observer.disconnect();
    }
  }, []);

  // useEffect(() => {
  //   if (ref.current) {
  //     setElement(ref.current);
  //   }
  // }, []);

  // useEffect(() => {

  //   if (!element) return;

  //   const observer = new IntersectionObserver(([entry]) => {
  //     console.log(entry);
  //     setIsIntersecting(entry.isIntersecting);
  //   });

  //   console.log(ref.current);

  //   if (ref.current) {
  //     observer.observe(ref.current);
  //   }

  //   return () => observer.disconnect();
  // }, [element]);

  return (
    <>
      <Header
        projectsIntersecting={isProjectIntersecting}
        aboutIntersecting={isAboutIntersecting}
        contactIntersecting={isContactIntersecting}
      />

      <div className="w-screen h-screen">
        <Background />

        {/* as you add more projects, increment the pages to increase the page height */}
        <Parallax
          pages={isWide2 ? 7 : isWide3 ? 5.5 : isWide4 ? 4.8 : 4.5}
          style={{ top: 0 }}
        >
          <ParallaxLayer
            speed={0.2}
            id="home"
            offset={0}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              zIndex: 0,
            }}
          >
            <div className="w-full sm:w-[85%] h-full">
              {isWide2 && (
                <div className="fixed top-0 left-0 w-screen h-screen z-20"></div>
              )}
              <Canvas className="">
                <Suspense fallback={null}>
                  <OrbitControls enableZoom={false} autoRotate />
                  <HeroPlanet />
                </Suspense>
              </Canvas>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            speed={0.5}
            offset={0.7}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              zIndex: 1,
              height: "auto",
              position: "relative",
            }}
          >
            <h1 className="md:text-6xl text-5xl font-georgia text-white text-center">
              Naman Nagelia
            </h1>
            <h2 className="md:text-2xl text-xl font-thickPoppins text-transparent bg-clip-text bg-gradient-to-b from-[#E63E60] to-[#A32972] md:mt-4 mt-2 text-center capitalize tracking-[.25em]">
              SOFTWARE & AI DEVELOPER
            </h2>
          </ParallaxLayer>
          <div
            // factor={2.4}
            className="flex justify-center items-center flex-col md:mt-[48em] mt-[35em]"
          >
            <div
              className="flex lg:mr-auto lg:ml-32 items-center space-x-6 justify-start mb-4"
              id="about"
            >
              <Image src={Triangle} alt="triangle" width={15} height={15} />
              <h1
                className="md:text-4xl text-3xl font-thickPoppins tracking-[.25em] text-[#D9FDFE] mb-2"
                ref={!isWide2 ? aboutRefCallback : null}
              >
                ABOUT
              </h1>
            </div>
          </div>
          <div className="items-center flex flex-col">
            <p className="font-poppins text-center text-white text-lg md:text-3xl p-12 md:px-36">
              Hey! 👋 I am Naman Nagelia, a student at the University of
              Maryland studying Computer Science, and Business Analytics. I'm a
              Software and AI/ML engineer looking to create innovative solutions
              in fields I am passionate about. If you want to learn more, check
              out my resume and projects!
            </p>
            <a
              href="/Naman_Nagelia_Resume.pdf"
              download="Naman_Nagelia_Resume.pdf"
              className="items-center justify-center inline-block mt-6 px-6 py-3 bg-gradient-to-r from-[#E63E60] to-[#A32972] text-white active:scale-95 font-thickPoppins text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Download my Resume
            </a>
          </div>
          <div
            // factor={2.4}
            className="flex justify-center items-center flex-col md:mt-[16em] mt-[10em] "
          >
            <div
              className="flex lg:mr-auto lg:ml-32 items-center space-x-6 justify-start mb-4"
              id="projects"
            >
              <Image src={Triangle} alt="triangle" width={15} height={15} />
              <h1 className="md:text-4xl text-3xl font-thickPoppins tracking-[.25em] text-[#D9FDFE] mb-2">
                PROJECTS
              </h1>
            </div>
            <div
              className="project-grid"
              ref={!isWide2 ? projectRefCallback : null}
            >
              <div className="project-card-wrapper float-animation-slow">
                <ProjectCard {...AmazonProjectKuiper} />
              </div>
              <div className="project-card-wrapper float-animation-medium">
                <ProjectCard {...SparkMySport} />
              </div>
              <div className="project-card-wrapper float-animation-slow">
                <ProjectCard {...BackBoardStats} />
              </div>
              <div className="project-card-wrapper float-animation-slow">
                <MobileProjectCard {...TutorNova} />
              </div>
            </div>{" "}
          </div>

          <div
            // factor={2.4}
            className="flex justify-center items-center flex-col md:mt-[16em] mt-[10em]"
          >
            <div
              className="flex lg:mr-auto lg:ml-32 items-center space-x-6 justify-start mb-4"
              id="contact"
            >
              <Image src={Triangle} alt="triangle" width={15} height={15} />
              <h1
                className="md:text-4xl text-3xl font-thickPoppins tracking-[.25em] text-[#D9FDFE] mb-2"
                ref={!isWide2 ? contactRefCallback : null}
              >
                CONTACT
              </h1>
            </div>
            <div className="w-full mb-8">
              <p className="font-thickPoppins text-center text-white text-lg md:text-3xl p-12 md:px-36">
                Are you interested in collaborating on a project, learning more
                about me, or have any other inquiries? Please, don't hesitate to
                contact me! 📩🤝
              </p>

              <ContactForm />
            </div>
          </div>
        </Parallax>
        <Footer />
      </div>
    </>
  );
}
