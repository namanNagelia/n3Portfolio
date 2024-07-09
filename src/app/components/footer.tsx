import React from "react";
import Github from "@/../public/Github.svg";
import LinkedIn from "@/../public/LinkedIn.svg";
import Image from "next/image";
import Logo from "@/../public/logo.svg";

export default function Footer() {
  return (
    <footer className="text-white w-full">
      <div className="container mx-auto flex justify-between py-2 md:px-10 md:backdrop-blur-md md:bg-[#1D2D49]/40 rounded-[3rem] items-center">
        <div className="text-sm text-white/80 font-thickPoppins">
          © 2024-2024 Naman Nagelia
        </div>
        <Image
          src={Logo}
          alt="Logo"
          width={40}
          height={40}
          className="hover:scale-125 cursor-pointer transition-all ease-in-out duration-200"
        />
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/naman-nagelia/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-all ease-in-out duration-200"
          >
            <Image src={LinkedIn} alt="LinkedIn" width={24} height={24} />
          </a>
          <a
            href="https://github.com/your-github-username" // Replace with your GitHub profile link
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-all ease-in-out duration-200"
          >
            <Image src={Github} alt="GitHub" width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
