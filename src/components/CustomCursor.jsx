import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const positionRef = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) return;

    const updateCursor = () => {
      const { x, y } = positionRef.current;

      cursor.style.transform = `
        translate3d(${x}px, ${y}px, 0)
        translate(-50%, -50%)
      `;

      rafRef.current = null;
    };

    const handleMouseMove = (e) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;

      if (!cursor.classList.contains('active')) {
        cursor.classList.add('active');
      }

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateCursor);
      }
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('active');
    };

    const handleWindowBlur = () => {
      cursor.classList.remove('active');
    };

    const handleWindowFocus = () => {
      // نستنى أول حركة ماوس قبل ما نظهره تاني
      cursor.classList.remove('active');
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    document.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);

      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-wrapper"
      aria-hidden="true"
    >
      <div className="cursor-outer-circle" />
      <div className="cursor-inner-dot" />
    </div>
  );
};

export default CustomCursor;