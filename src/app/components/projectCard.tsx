import React from "react";
import Image from "next/image";
import NextJs from "@/../public/stackIcons/next.png";
import PythonImage from "@/../public/stackIcons/python.png";
import reactJs from "@/../public/stackIcons/React.svg";
import Supabase from "@/../public/stackIcons/Supabase.png";
import FlaskLogo from "@/../public/stackIcons/flask.svg";
import hyperLedgerLogo from "@/../public/stackIcons/hyperledger.svg";
import mySQL from "@/../public/stackIcons/mysql.svg";
import fastApi from "@/../public/stackIcons/fastApi.svg";

interface Props {
  title: string;
  description: string;
  technologies: string[];
  image: any[];
  link: string;
  github?: string;
  demo?: string;
  isMobile?: boolean;
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
  };
  return (
    <div className="default-glass rounded-md p-5 w-[80%] lg:w-[60%] h-auto text-center">
      <h3 className="font-georgia font-bold md:text-5xl text-3xl mb-4">{title}</h3>
      <div className="flex flex-col items-center mb-3">
        <Image
          src={image[0]}
          alt={title}
          width={900}
          height={900}
          className="rounded-2xl"
        />
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
                <span className="text-white text-sm font-poppins">{tech}</span>
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
          className="rounded-full bg-[#98002E] px-2 py-1 w-full hover:-translate-y-1 transition-transform duration-300 ease-in-out font-georgia font-bold text-2xl"
          onClick={() => window.open(link, "_blank")}
        >
          Website
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
