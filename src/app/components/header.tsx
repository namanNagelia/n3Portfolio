"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  projectsIntersecting: boolean;
  aboutIntersecting: boolean;
  contactIntersecting: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  // console.log(activeSection);
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState<string | undefined>(undefined);
  const [active, setActive] = useState<string | undefined>("");

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (
      (hash == "#projects" && props.projectsIntersecting) ||
      props.projectsIntersecting
    ) {
      setActive("projects");
    }

    if (
      (hash == "#about" && props.aboutIntersecting) ||
      props.aboutIntersecting
    ) {
      setActive("about");
    }

    if (
      (hash == "#contact" && props.contactIntersecting) ||
      props.contactIntersecting
    ) {
      setActive("contact");
    }
  }, [
    hash,
    props.projectsIntersecting,
    props.aboutIntersecting,
    props.contactIntersecting,
  ]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-white p-8 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between py-2 md:px-10 md:backdrop-blur-md md:bg-[#1D2D49]/40 rounded-[3rem] items-center">
        <nav className="hidden md:flex w-full justify-between items-center">
          <div className="flex space-x-24">
            <Link
              href="#about"
              scroll={false}
              onClick={() => {
                setHash("#about");

                const element = document.getElementById("about");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                active == "about"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="#projects"
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                active == "projects"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
              scroll={false}
              onClick={() => {
                setHash("#projects");

                const element = document.getElementById("projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              PROJECTS
            </Link>
          </div>

          <Link
            href="/"
            onClick={() => {
              setHash("");
              const element = document.getElementById("home");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Image
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className={`hover:scale-125 cursor-pointer transition-all ease-in-out duration-200`}
            />
          </Link>

          <div className="flex space-x-24">
            <Link
              href="#skills"
              className="text-transparent fill-transparent"
            >
              SKILLS
            </Link>
            <Link
              href="#contact"
              scroll={false}
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                active == "contact"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
              onClick={() => {
                setHash("#contact");

                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              CONTACT
            </Link>
          </div>
        </nav>
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <></>
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="h-6 w-6 z-60 relative"
              />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-[#1D2D49]/80 backdrop-blur-md z-50">
          <div className="absolute top-0 left-0 p-8">
            <FontAwesomeIcon
              icon={faTimes}
              className="h-6 w-6 z-60"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>

          <Link
            href="#about"
            scroll={false}
            className="block py-4 text-4xl font-thickPoppins text-white/80 hover:text-white transition-all duration-200"
            onClick={() => {
              setHash("#about");
              setIsOpen(false);

              const element = document.getElementById("about");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            ABOUT
          </Link>
          <Link
            href="#projects"
            scroll={false}
            className="block py-4 text-4xl font-thickPoppins text-white/80 hover:text-white transition-all duration-200"
            onClick={() => {
              setHash("#projects");
              setIsOpen(false);

              const element = document.getElementById("projects");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            PROJECTS
          </Link>

          {/* <Link
            href="#skills"
            className="block py-4 text-4xl font-thickPoppins text-white/80 hover:text-white transition-all duration-200"
            onClick={() => {
              setHash("#skills");
              setIsOpen(false);
            }}
          >
            SKILLS
          </Link> */}
          <Link
            href="#contact"
            scroll={false}
            className="block py-4 text-4xl font-thickPoppins text-white/80 hover:text-white transition-all duration-200"
            onClick={() => {
              setHash("#contact");
              setIsOpen(false);

              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            CONTACT
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
