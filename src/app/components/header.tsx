"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-white p-8 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between py-2 px-10 backdrop-blur-md bg-[#1D2D49]/40 rounded-[3rem] items-center">
        <nav className="hidden md:flex w-full justify-between items-center">
          <div className="flex space-x-24">
            <Link
              href="#projects"
              scroll={false}
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                hash == "#projects"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
              onClick={() => {
                setHash("#projects");
              }}
            >
              PROJECTS
            </Link>
            <Link
              href="#resume"
              onClick={() => {
                setHash("#resume");
              }}
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                hash == "#resume"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
            >
              RÉSUMÉ
            </Link>
          </div>

          <Link href="/" onClick={() => setHash("")}>
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
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                hash == "#skills"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
              onClick={() => {
                setHash("#skills");
              }}
            >
              SKILLS
            </Link>
            <Link
              href="#contact"
              className={`font-thickPoppins text-2xl hover:text-3xl transition-all ease-in-out duration-200 ${
                hash == "#contact"
                  ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FA8578] to-[#DB5366]"
                  : "text-white/80"
              }`}
              onClick={() => {
                setHash("#contact");
              }}
            >
              CONTACT
            </Link>
          </div>
        </nav>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden mt-4">
          <Link
            href="#about"
            className="block py-2"
            onClick={() => {
              setHash("#about");
            }}
          >
            About
          </Link>
          <Link
            href="#skills"
            className="block py-2"
            onClick={() => {
              setHash("#skills");
            }}
          >
            Skills
          </Link>
          <Link
            href="#projects"
            className="block py-2"
            onClick={() => {
              setHash("#projects");
            }}
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="block py-2"
            onClick={() => {
              setHash("#contact");
            }}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
