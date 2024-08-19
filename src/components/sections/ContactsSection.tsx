import React from 'react';

const ContactsSection = () => {
    return (
        <div className="container-xl pb-20">
            <div className="relative flex items-start justify-center gap-4 lg:gap-20">
                <div className="Staggered relative flex flex-col lg:w-1/2 p-4 lg:p-8 bg-background border border-text">
                    <h4 className="">Guarda tutti i progetti</h4>
                    <a className="Link inline-flex items-center justify-center p-0.5 ml-auto" href="/portfolio">
                        <span className="p-2">
                            Portfolio
                        </span>
                        <img className="Arrow" src="/arrow.svg" width="32px"></img>
                    </a>
                </div>
                <div className="Staggered relative flex flex-col lg:w-1/2 p-4 lg:p-8 bg-background border border-text">
                    <h4 className="">Contattami</h4>
                    <a className="Link inline-flex items-center justify-center p-0.5 ml-auto" href="/contact">
                        <span className="p-2">
                            Contatti
                        </span>
                        <img className="Arrow" src="/arrow.svg" width="32px"></img>
                    </a>
                </div>
            </div>
        </div>

    );
};

export default ContactsSection;
