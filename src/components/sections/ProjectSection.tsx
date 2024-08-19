import React from 'react';

interface ProjectSectionProps {
    source: string;
    title: string;
    description: string;
    link: string;
    preview: string;
    date: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ 
    source,
    title,
    description,
    link,
    preview,
    date
}) => {    
    return (
        <div className="ProjectSection container-xl border-b-[1px] lg:pb-20 mb-20">
            <a className="Overlink" href={link}>
                <div className="relative lg:h-[500px] flex items-start justify-center flex-col">
                    <div className="lazyload lg:w-3/5 h-full lg:ml-auto">
                        <video className="Video object-cover" autoPlay muted loop>
                            <source src={source} type="video/mp4"/>
                            Sorry, your browser doesn't support videos.
                        </video>
                    </div>
                    <div className="flex flex-col py-4 lg:absolute lg:right-[55%] z-10">
                        <a className="Link-Alt lg:px-8" href={link}><h2>{title}</h2></a>
                        <p className="font-secondary lg:px-10">{date}</p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ProjectSection;
