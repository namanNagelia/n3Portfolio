"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/../public/logo.svg";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-black text-white p-4 z-250">
      <div className="container mx-auto flex justify-between items-center">
        <img src={Logo} alt="Logo" className="h-10" />
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="hover:text-red-500">
            About
          </a>
          <a href="#skills" className="hover:text-red-500">
            Skills
          </a>
          <a href="#projects" className="hover:text-red-500">
            Projects
          </a>
          <a href="#contact" className="hover:text-red-500">
            Contact
          </a>
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
