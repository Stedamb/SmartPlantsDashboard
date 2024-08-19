import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MovingTextSection: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $textContainer = textContainerRef.current;
    if (!$textContainer) return;

    const $scrollingText = $textContainer.children[0] as HTMLElement;
    if (!$scrollingText) return;

    const textWidth = $scrollingText.offsetWidth;
    const clonesNeeded = Math.ceil(window.innerWidth / textWidth) + 1;

    for (let i = 0; i < clonesNeeded; i++) {
      $textContainer.appendChild($scrollingText.cloneNode(true));
    }

    const createAnimation = () =>
      gsap.to($textContainer, {
        x: -textWidth,
        duration: 10,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % textWidth),
        },
      });

    let animation = createAnimation();

    const handleResize = () => {
      animation.kill();
      gsap.set($textContainer, { x: 0 });
      animation = createAnimation();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      animation.kill();
    };
  }, []);

  return (
    <div className="scrolling-banner py-16">
      <div className="text-container" ref={textContainerRef}>
        <div className="scrolling-text">
          <div className="flex">
            <span className="flex gap-5 pl-5">
              Santarcangelo Festival <img src="/asterisk.svg" className="w-3" alt="asterisk" />
            </span>
            <span className="flex gap-5 pl-5">
              Motus <img src="/asterisk.svg" className="w-3" alt="asterisk" />
            </span>
            <span className="flex gap-5 pl-5">
              Supernova <img src="/asterisk.svg" className="w-3" alt="asterisk" />
            </span>
            <span className="flex gap-5 pl-5">
              Lorem ipsum <img src="/asterisk.svg" className="w-3" alt="asterisk" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingTextSection;
