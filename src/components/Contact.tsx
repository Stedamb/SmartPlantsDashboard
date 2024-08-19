import React from 'react';

interface ContactProps {
  contacts: {
    name: string;
    bio: string;
    email: string;
    phone: string;
    img: string;
  };
}
const Contact: React.FC<ContactProps> = ({ contacts }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between container-xl gap-6 lg:gap-20 pb-6 lg:pb-20">
        <div className="lg:w-1/2 h-fit relative border border-text p-8">
          <h3 className="absolute bottom-full left-8 translate-y-3">{contacts.name}</h3>
          <p>{contacts.bio}</p>
          <a href={contacts.name} className="Link inline-flex items-center justify-end p-0.5 w-full">
            <span className="p-2">Instagram</span>
            <img className="Arrow" src="/arrow.svg" width="32px" alt="arrow" />
          </a>
        </div>
        <div className="lg:w-1/3">
          <div className="lazyload aspect-square">
            <img src="/contacts.img" alt="Personal Photo" />
          </div>
        </div>
      </div>
      <div className="container-xl pb-20">
        <div className="relative flex items-start justify-between gap-4 lg:gap-20">
          <div className="Staggered relative flex flex-col flex-grow lg:w-1/2 p-4 lg:p-8 bg-background border border-text">
            <h4 className="">E-mail</h4>
            <h3 className="font-secondary pt-4 lg-max:hidden">{contacts.email}</h3>
            <h4 className="font-secondary pt-4 lg:hidden">{contacts.email}</h4>
            <a className="Link inline-flex items-center justify-center p-0.5 ml-auto" href="/portfolio">
              <span className="p-2">
                Scrivimi
              </span>
              <img className="Arrow" src="/arrow.svg" width="32px"></img>
            </a>
          </div>
          <div className="Staggered relative flex flex-col flex-grow lg:w-1/2 p-4 lg:p-8 bg-background border border-text">
            <h4 className="">Telefono</h4>
            <h3 className="font-secondary pt-4 lg-max:hidden">{contacts.phone}</h3>
            <h4 className="font-secondary pt-4 lg:hidden">{contacts.phone}</h4>
            <a className="Link inline-flex items-center justify-center p-0.5 ml-auto" href="/contact">
              <span className="p-2">
                Chiama
              </span>
              <img className="Arrow" src="/arrow.svg" width="32px"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;