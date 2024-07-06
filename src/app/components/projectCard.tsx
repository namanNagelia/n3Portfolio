import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  technologies: string[];
  image: any;
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
    <div className="default-glass rounded-md p-5 w-[80%] lg:w-[60%] h-auto text-center">
      <h3 className="font-georgia font-bold text-3xl">{title}</h3>
      <div className="flex flex-col items-center mb-3">
        <Image
          src={image}
          alt={title}
          width={900}
          height={900}
          className="rounded-2xl"
        />
      </div>
      <p>{description}</p>
      <div>
        {technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div>
        <button
          className="rounded-full bg-red-600 px-2 py-1 w-full hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          onClick={() => window.open(link, "_blank")}
        >
          Link
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
