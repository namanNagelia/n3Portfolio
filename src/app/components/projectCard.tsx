import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  technologies: string[];
  image: string;
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
  return (
    <div className="default-glass rounded-xl p-5 w-[60%] h-auto">
      <div className="absolute inset-0 style_2"></div>
      <div className="relative z-10">
        <Image src={image} alt={title} width={200} height={200} />
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          {technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div>
          <button
            className="rounded-full bg-red-600 px-2 w-full hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => window.open(link, "_blank")}
          >
            Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
