"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-white p-8 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between py-2 px-10 backdrop-blur-md bg-[#1D2D49]/40 rounded-[3rem] items-center">
        <nav className="hidden md:flex w-full justify-between items-center">
          <div className="flex space-x-24">
            <a
              href="#about"
              className="font-poppins text-2xl hover:text-red-500"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-red-500 font-poppins text-2xl"
            >
              Skills
            </a>
          </div>

          <Image src={Logo} alt="Logo" width={50} height={50} />

          <div className="flex space-x-24">
            <a
              href="#projects"
              className="hover:text-red-500 font-poppins text-2xl"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-red-500 font-poppins text-2xl"
            >
              Contact
            </a>
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
          <a href="#about" className="block py-2">
            About
          </a>
          <a href="#skills" className="block py-2">
            Skills
          </a>
          <a href="#projects" className="block py-2">
            Projects
          </a>
          <a href="#contact" className="block py-2">
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
