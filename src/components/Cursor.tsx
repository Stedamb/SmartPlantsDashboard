import {useEffect, useRef} from 'react';

const Cursor = () => {
    const delay = 2;
    const dot = useRef < HTMLDivElement | null > (null);
    const dotOutline = useRef < HTMLDivElement | null > (null);
    const cursorVisible = useRef(true);
    const cursorEnlarged = useRef(false);
    const cursorFullscreen = useRef(false);
    const cursorClicking = useRef(false);
    const isVideoPlaying = useRef(false);
    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);
    const requestRef = useRef < number | null > (null);

    useEffect(() => {
        document.addEventListener('mousedown', toggleClick);
        document.addEventListener('mouseup', toggleClick);
        window.addEventListener('mousemove', mouseMoveEvent);
        window.addEventListener('scroll', updateCursorPosition);
        document.addEventListener('mouseenter', mouseEnterEvent);
        document.addEventListener('mouseleave', mouseLeaveEvent);
        animateDotOutline();

        const hoverElements = document.querySelectorAll('.cursor-hover');
        hoverElements.forEach((e) => {
            if (e.classList.contains('play-pause')) {
            e.addEventListener('mouseover', mouseOverEvent);
            e.addEventListener('mouseout', mouseOutEvent);
                togglePlayPause();
                e.addEventListener('click', togglePlayPause);
            }
            if (e.classList.contains('cursor-fullscreen')) {
                e.addEventListener('mouseover', mouseOverFullscreenEvent);
                e.addEventListener('mouseout', mouseOutFullscreenEvent);
            }
        });

        return() => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseenter', mouseEnterEvent);
            document.removeEventListener('mouseleave', mouseLeaveEvent);
            document.removeEventListener('scroll', updateCursorPosition);

            hoverElements.forEach((e) => {
                e.removeEventListener('mouseover', mouseOverEvent);
                e.removeEventListener('mouseout', mouseOutEvent);
                e.removeEventListener('click', togglePlayPause);
            });

            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    const toggleCursorVisibility = () => {
        if (dot.current && dotOutline.current) {
            if (cursorVisible.current) {
                dot.current.classList.remove("hide");
                dotOutline.current.classList.remove("hide");
            } else {
                dot.current.classList.add("hide");
                dotOutline.current.classList.add("hide");
            }
        }
    };

    const toggleCursorSize = () => {
        if (dot.current && dotOutline.current) {
            if (cursorEnlarged.current) {
                dot.current.classList.add("hovering");
                dotOutline.current.classList.add("hovering");
            } else {
                dot.current.classList.remove("hovering");
                dotOutline.current.classList.remove("hovering");
            }
        }
    };

    const toggleFullscreen = () => {
        if (dot.current) {
            if (cursorFullscreen.current) {
                dot.current.classList.add("fullscreen");
            } else {
                dot.current.classList.remove("fullscreen");
            }
        }
    };

    const togglePlayPause = () => {
        if (dot.current) {
            if (isVideoPlaying.current) {
                dot.current.classList.add("play");
                dot.current.classList.remove("pause");
                isVideoPlaying.current = false;
            } else {
                dot.current.classList.add("pause");
                dot.current.classList.remove("play");
                isVideoPlaying.current = true;
            }
        }
    };

    const toggleClick = () => {
        if (dotOutline.current) {
            if (cursorClicking.current) {
                dotOutline.current.classList.remove("clicking");
                cursorClicking.current = false;
            } else {
                dotOutline.current.classList.add("clicking");
                cursorClicking.current = true;
            }
        }
    };

    const mouseOverEvent = () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
    };

    const mouseOutEvent = () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
    };

    const mouseOverFullscreenEvent = () => {
        cursorFullscreen.current = true;
        toggleFullscreen();
    };

    const mouseOutFullscreenEvent = () => {
        cursorFullscreen.current = false;
        toggleFullscreen();
    };

    const mouseEnterEvent = () => {
        cursorVisible.current = true;
        toggleCursorVisibility();
    };

    const mouseLeaveEvent = () => {
        cursorVisible.current = false;
        toggleCursorVisibility();
    };

    const mouseMoveEvent = (e : MouseEvent) => {
        cursorVisible.current = true;
        toggleCursorVisibility();
        endX.current = e.pageX;
        endY.current = e.pageY;
        updateCursorPosition();
    };

    const updateCursorPosition = () => {
      if (dot.current) {
          dot.current.style.top = endY.current + 'px';
          dot.current.style.left = endX.current + 'px';
      }
  };

    const animateDotOutline = () => {
        _x.current += (endX.current - _x.current) / delay;
        _y.current += (endY.current - _y.current) / delay;
        if (dotOutline.current) {
            dotOutline.current.style.top = _y.current + 'px';
            dotOutline.current.style.left = _x.current + 'px';
        }
        requestRef.current = requestAnimationFrame(animateDotOutline);
    };

    return (
        <>
            <div ref={dotOutline}
                className="cursor-dot-outline"></div>
            <div ref={dot}
                className="cursor-dot"></div>
        </>
    );
};

export default Cursor;
