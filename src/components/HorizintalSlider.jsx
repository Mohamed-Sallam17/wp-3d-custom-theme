import React, { useEffect, useRef } from 'react';
import { horizontalSliderData } from '../data/horizontalSliderData';
import '../../styles/css/HorizontalSlider.css';

const HorizintalSlider = () => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  /*
  |--------------------------------------------------------------------------
  | Slider Position
  |--------------------------------------------------------------------------
  */

  const currentX = useRef(0);
  const targetX = useRef(0);

  /*
  |--------------------------------------------------------------------------
  | Width of one complete set
  |--------------------------------------------------------------------------
  */

  const setWidth = useRef(0);

  /*
  |--------------------------------------------------------------------------
  | Drag
  |--------------------------------------------------------------------------
  */

  const isDragging = useRef(false);
  const isHorizontalDrag = useRef(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const dragStartX = useRef(0);

  /*
  |--------------------------------------------------------------------------
  | Animation
  |--------------------------------------------------------------------------
  */

  const animationFrame = useRef(null);


  /* =========================================================
     Measure Slider
  ========================================================= */

  const measureSlider = () => {
    if (!trackRef.current) return;

    const firstSet =
      trackRef.current.querySelector(
        '.horizontal-slider__set'
      );

    if (!firstSet) return;

    setWidth.current =
      firstSet.offsetWidth;

    /*
     * Start from the middle copy.
     *
     * [ SET 1 ][ SET 2 ][ SET 3 ]
     */

    if (
      currentX.current === 0 &&
      targetX.current === 0
    ) {
      currentX.current =
        -setWidth.current;

      targetX.current =
        -setWidth.current;
    }
  };


  /* =========================================================
     Convert unlimited position
     to visual position
  ========================================================= */

  const getVisualPosition = (position) => {
    const width = setWidth.current;

    if (!width) {
      return position;
    }

    /*
     * Keep the visual position inside
     * the middle copy range.
     *
     * The actual position is never reset.
     */

    const normalized =
      ((position + width) % width + width) %
      width;

    return -width - normalized;
  };


  /* =========================================================
     Smooth Animation
  ========================================================= */

  const animate = () => {
    if (!trackRef.current) return;

    /*
     * Smooth movement
     */

    currentX.current +=
      (targetX.current - currentX.current) * 0.12;


    /*
     * Calculate only the visual position.
     *
     * We NEVER reset currentX or targetX.
     */

    const visualX =
      getVisualPosition(
        currentX.current
      );


    /*
     * Apply transform
     */

    trackRef.current.style.transform =
      `translate3d(${visualX}px, 0, 0)`;


    /*
     * Continue animation
     */

    animationFrame.current =
      requestAnimationFrame(
        animate
      );
  };


  /* =========================================================
     Pointer Down
  ========================================================= */

  const handlePointerDown = (event) => {

    isDragging.current = true;
    isHorizontalDrag.current = false;


    startX.current =
      event.clientX;

    startY.current =
      event.clientY;


    /*
     * Start dragging from current position
     */

    dragStartX.current =
      targetX.current;


    /*
     * Capture pointer
     */

    sliderRef.current?.setPointerCapture?.(
      event.pointerId
    );


    sliderRef.current?.classList.add(
      'is-dragging'
    );
  };


  /* =========================================================
     Pointer Move
  ========================================================= */

  const handlePointerMove = (event) => {

    if (!isDragging.current) {
      return;
    }


    const deltaX =
      event.clientX -
      startX.current;


    const deltaY =
      event.clientY -
      startY.current;


    /*
     * Determine horizontal / vertical gesture
     */

    if (!isHorizontalDrag.current) {

      /*
       * Ignore tiny movement
       */

      if (
        Math.abs(deltaX) < 8 &&
        Math.abs(deltaY) < 8
      ) {
        return;
      }


      /*
       * Vertical movement
       *
       * Let the page scroll normally.
       */

      if (
        Math.abs(deltaY) >
        Math.abs(deltaX)
      ) {

        isDragging.current = false;


        sliderRef.current?.releasePointerCapture?.(
          event.pointerId
        );


        sliderRef.current?.classList.remove(
          'is-dragging'
        );


        return;
      }


      /*
       * Horizontal movement
       */

      isHorizontalDrag.current = true;
    }


    /*
     * Prevent browser behavior
     * during horizontal dragging.
     */

    event.preventDefault();


    /*
     * IMPORTANT:
     *
     * No normalize.
     * No reset.
     *
     * Drag direction:
     *
     * Mouse → Right
     * Cards → Right
     *
     * Mouse ← Left
     * Cards ← Left
     */

    const DRAG_SPEED = 2.5;
    targetX.current = dragStartX.current - deltaX * DRAG_SPEED;
  };


  /* =========================================================
     Pointer Up
  ========================================================= */

  const handlePointerUp = (event) => {

    if (!isDragging.current) {
      return;
    }


    isDragging.current = false;
    isHorizontalDrag.current = false;


    /*
     * Release pointer
     */

    sliderRef.current?.releasePointerCapture?.(
      event.pointerId
    );


    sliderRef.current?.classList.remove(
      'is-dragging'
    );
  };


  /* =========================================================
     Resize
  ========================================================= */

  useEffect(() => {

    measureSlider();


    const handleResize = () => {

      const oldWidth =
        setWidth.current;


      measureSlider();


      const newWidth =
        setWidth.current;


      /*
       * Keep position proportional
       * after resize.
       */

      if (
        oldWidth &&
        newWidth &&
        oldWidth !== newWidth
      ) {

        const widthRatio =
          newWidth / oldWidth;


        currentX.current *=
          widthRatio;


        targetX.current *=
          widthRatio;
      }
    };


    window.addEventListener(
      'resize',
      handleResize
    );


    /*
     * Start animation
     */

    animationFrame.current =
      requestAnimationFrame(
        animate
      );


    return () => {

      window.removeEventListener(
        'resize',
        handleResize
      );


      if (
        animationFrame.current
      ) {

        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };

  }, []);


  /* =========================================================
     Render
  ========================================================= */

  return (
    <section
      ref={sliderRef}
      className="horizontal-slider "

      /*
       * Wheel intentionally disabled.
       */

      onPointerDown={
        handlePointerDown
      }

      onPointerMove={
        handlePointerMove
      }

      onPointerUp={
        handlePointerUp
      }

      onPointerCancel={
        handlePointerUp
      }
    >

      <div
        ref={trackRef}
        className="horizontal-slider__track py-6" 
      >

        {/*
         * Three copies for
         * infinite visual loop.
         */}

        {[0, 1, 2].map(
          (setIndex) => (

            <div
              className="horizontal-slider__set"
              key={setIndex}
            >

              {horizontalSliderData.map(
                (item, index) => (

                  <article
                    className="horizontal-slider__card"
                    key={`${setIndex}-${index}`}
                  >

                    <div
                      className="horizontal-slider__image-wrapper"
                    >
                      <a href={item.link}>

                        <img
                          src={item.image}
                          alt={item.title}
                          draggable="false"
                        />
                      </a>

                    </div>


                    <div
                      className="horizontal-slider__overlay"
                    >

                      <h3>
                        {item.title}
                      </h3>

                    </div>

                  </article>
                )
              )}

            </div>
          )
        )}

      </div>

    </section>
  );
};

export default HorizintalSlider;