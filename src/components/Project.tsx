import React, { useState } from 'react';

interface ProjectProps {
  project: {
    source: string[];
    title: string;
    description: string;
    link: string;
    preview: string;
    date: string;
  };
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const handleVideoClick = (index: number) => {
    setFullscreenIndex(index === fullscreenIndex ? null : index);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center container-xl gap-6 lg:gap-20 pb-6 lg:pb-20">
      <div className="lg:w-1/2 h-fit relative border border-text p-8">
        <h3 className="absolute bottom-full left-8 translate-y-3">{project.title}</h3>
        <p>{project.description}</p>
        <a href={project.link} className="Link inline-flex items-center justify-end p-0.5 w-full">
          <span className="p-2">Youtube</span>
          <img className="Arrow" src="/arrow.svg" width="32px" alt="arrow" />
        </a>
      </div>
      <div className="lg:w-1/2 flex flex-col gap-6">
        {project.source.map((source, index) => (
          <div
            key={index}
            className={`cursor-hover cursor-fullscreen transition-all duration-500 ${
              fullscreenIndex === index ? 'fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-text z-50 flex items-center justify-center' : 'lazyload h-[200px] lg:h-[400px]'
            }`}
            onClick={fullscreenIndex === index ? undefined : () => handleVideoClick(index)}
          >
            <video 
            controls={fullscreenIndex === index} autoPlay muted loop>
              <source src={source} type="video/mp4" />
              Sorry, your browser doesn't support videos.
            </video>
            <div className={`text-background Link-Alt ${fullscreenIndex === index ? 'fixed top-10 right-10 z-50' : 'hidden'}`} onClick={() => handleVideoClick(index)}>
              Chiudi
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
