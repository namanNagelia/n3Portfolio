"use client";
import React, { useState } from "react";
import Image from "next/image";
import NextJs from "@/../public/stackIcons/next.png";
import PythonImage from "@/../public/stackIcons/python.png";
import reactJs from "@/../public/stackIcons/React.svg";
import Supabase from "@/../public/stackIcons/Supabase.png";
import FlaskLogo from "@/../public/stackIcons/Flask.svg";
import hyperLedgerLogo from "@/../public/stackIcons/hyperledger.svg";
import mySQL from "@/../public/stackIcons/mysql.svg";
import fastApi from "@/../public/stackIcons/fastApi.svg";
import OpenAI from "@/../public/stackIcons/openAI.svg";
import SocketIO from "@/../public/stackIcons/socketIO.png";
import Firebase from "@/../public/stackIcons/firebase.png";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import PyTorch from "@/../public/stackIcons/PyTorch.svg";
import Swift from "@/../public/stackIcons/Swift.svg";
import GoogleCloud from "@/../public/stackIcons/googleCloud.png";

interface Props {
  title: string;
  description: string;
  technologies: string[];
  image: any[];
  link: string;
  github?: string;
  demo?: string;
  isMobile?: boolean;
  disabled?: boolean;
}

const ProjectCard: React.FC<Props> = ({
  title,
  description,
  technologies,
  image,
  link,
  github,
  demo,
  isMobile,
  disabled,
}) => {
  const techImages: { [key: string]: any } = {
    "Next.js": NextJs,
    Python: PythonImage,
    "React.js": reactJs,
    Supabase: Supabase,
    Flask: FlaskLogo,
    HyperLedger: hyperLedgerLogo,
    MySQL: mySQL,
    FastApi: fastApi,
    OpenAI: OpenAI,
    SocketIO: SocketIO,
    Firebase: Firebase,
    Swift: Swift,
    "Google Cloud": GoogleCloud,
    PyTorch: PyTorch,
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? image.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="default-glass rounded-md p-5 w-[80%] lg:w-[85%] h-auto lg:h-[100%] text-center">
      <h3 className="font-georgia font-bold md:text-5xl text-3xl mb-4">
        {title}
      </h3>
      <div className="relative mb-3 w-full aspect-video overflow-hidden">
        <AnimatePresence initial={false} custom={currentImageIndex}>
          <motion.div
            key={currentImageIndex}
            custom={currentImageIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={image[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </motion.div>
        </AnimatePresence>
        {image.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
      <p className="text-lg font-poppins text-white mt-2">{description}</p>
      <div>
        <div className="flex justify-center space-x-4 my-4 items-center">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="rounded-lg overflow-hidden relative group"
              style={{
                background: "linear-gradient(180deg, #041433 0%, #010918 100%)",
                padding: "10px",
                transition: "transform 0.3s ease",
              }}
              title={tech} // Tooltip showing the technology name
            >
              <div
                className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                style={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                <span className="text-white text-xs font-poppins">{tech}</span>
              </div>
              <Image
                src={techImages[tech]}
                alt={tech}
                width={50}
                height={50}
                className="group-hover:scale-110 group-hover:opacity-50 transition-transform duration-300 ease-in-out" // Scale effect and dim image on hover
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className={`rounded-full px-2 py-1 w-full font-georgia font-bold text-2xl ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#98002E] hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          }`}
          onClick={() => !disabled && window.open(link, "_blank")}
          disabled={disabled}
        >
          {disabled ? "Coming Soon" : "Website"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
