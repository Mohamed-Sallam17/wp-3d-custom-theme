import React, { useEffect, useRef } from 'react';
import { horizontalSliderData } from '../data/horizontalSliderData';
import '../../styles/css/HorizontalSlider.css';

const HorizintalSlider = () => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  const currentX = useRef(0);
  const targetX = useRef(0);

  const setWidth = useRef(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartX = useRef(0);

  const animationFrame = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Measure one complete set
  |--------------------------------------------------------------------------
  */

  const measureSlider = () => {
    if (!trackRef.current) return;

    const firstSet = trackRef.current.querySelector(
      '.horizontal-slider__set'
    );

    if (!firstSet) return;

    setWidth.current = firstSet.offsetWidth;

    /*
     * Start from the middle copy.
     * This gives us content before and after the viewport.
     */

    if (currentX.current === 0) {
      currentX.current = -setWidth.current;
      targetX.current = -setWidth.current;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Infinite Loop
  |--------------------------------------------------------------------------
  */

  const normalizePosition = () => {
    const width = setWidth.current;

    if (!width) return;

    /*
     * We have 3 copies:
     *
     * [SET 1] [SET 2] [SET 3]
     *
     * We normally live inside SET 2.
     */

    while (targetX.current <= -width * 2) {
      targetX.current += width;
      currentX.current += width;
    }

    while (targetX.current >= 0) {
      targetX.current -= width;
      currentX.current -= width;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Smooth Animation
  |--------------------------------------------------------------------------
  */

  const animate = () => {
    const track = trackRef.current;

    if (!track) return;

    /*
     * Lower value = smoother/slower.
     * This gives the slider the smooth feeling
     * instead of instantly jumping to wheel position.
     */

    currentX.current +=
      (targetX.current - currentX.current) * 0.085;

    track.style.transform = `translate3d(${currentX.current}px, 0, 0)`;

    animationFrame.current = requestAnimationFrame(animate);
  };

  /*
  |--------------------------------------------------------------------------
  | Mouse Wheel
  |--------------------------------------------------------------------------
  */

  const handleWheel = (event) => {
    /*
     * Convert vertical mouse wheel movement
     * into horizontal movement.
     */

    const delta = event.deltaY || event.deltaX;

    if (!delta) return;

    event.preventDefault();

    /*
     * Speed of horizontal movement.
     *
     * Increase to make it faster.
     * Decrease to make it slower.
     */

    targetX.current -= delta * 1.05;

    normalizePosition();
  };

  /*
  |--------------------------------------------------------------------------
  | Mouse Drag
  |--------------------------------------------------------------------------
  */

  const handlePointerDown = (event) => {
    isDragging.current = true;

    startX.current = event.clientX;
    dragStartX.current = targetX.current;

    sliderRef.current?.setPointerCapture?.(event.pointerId);

    sliderRef.current?.classList.add('is-dragging');
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;

    const distance = event.clientX - startX.current;

    targetX.current = dragStartX.current + distance;

    normalizePosition();
  };

  const handlePointerUp = (event) => {
    if (!isDragging.current) return;

    isDragging.current = false;

    sliderRef.current?.releasePointerCapture?.(event.pointerId);

    sliderRef.current?.classList.remove('is-dragging');
  };

  /*
  |--------------------------------------------------------------------------
  | Resize
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    measureSlider();

    const handleResize = () => {
      /*
       * Recalculate the width after responsive changes.
       */

      const oldWidth = setWidth.current;

      measureSlider();

      const newWidth = setWidth.current;

      if (!oldWidth || !newWidth) return;

      /*
       * Keep us inside the middle copy after resize.
       */

      const ratio = newWidth / oldWidth;

      currentX.current *= ratio;
      targetX.current *= ratio;

      normalizePosition();
    };

    window.addEventListener('resize', handleResize);

    /*
     * Start animation loop.
     */

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <section
      ref={sliderRef}
      className="horizontal-slider"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        ref={trackRef}
        className="horizontal-slider__track"
      >
        {[0, 1, 2].map((setIndex) => (
          <div
            className="horizontal-slider__set"
            key={setIndex}
          >
            {horizontalSliderData.map((item, index) => (
              <article
                className="horizontal-slider__card"
                key={`${setIndex}-${index}`}
              >
                <div className="horizontal-slider__image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable="false"
                  />
                </div>

                <div className="horizontal-slider__overlay">
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizintalSlider;