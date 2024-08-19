import React from 'react';

interface ContentSectionProps {
    isRight: boolean;
    source: string;
    title: string;
    description: string;
    link: string;
    preview: string;
  }

  const ContentSection: React.FC<ContentSectionProps> = ({ 
    isRight, 
    source,
    title,
    description,
    link,
    preview
}) => {
    return (
        <div className="ContentSection container-xl lg:pb-32">
            <div className="relative flex items-start justify-center flex-col">
                <video className={`Video lg:w-3/4 object-cover h-full ${!isRight && 'lg:ml-auto' }`} autoPlay muted loop>
                    <source src={source} type="video/mp4"/>
                    Sorry, your browser doesn't support videos.
                </video>
                <div className={`Staggered flex flex-col w-5/6 mx-auto lg-max:translate-y-[-50%] lg:absolute lg:w-1/3 p-4 lg:p-8 bg-background border border-text ${isRight ? 'lg:right-0' : 'lg:left-0'}`}>
                    <h4 className="">{title}</h4>
                    <p className="">{preview} </p>
                    <a href={link} className="Link inline-flex items-center justify-center p-0.5 ml-auto">
                        <span className="p-2">
                            Scopri di più
                        </span>
                        <img className="Arrow" src="/arrow.svg" width="32px"></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContentSection;
