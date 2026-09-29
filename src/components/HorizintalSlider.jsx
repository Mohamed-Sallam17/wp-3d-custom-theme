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
  const isHorizontalDrag = useRef(false);

  const startX = useRef(0);
  const startY = useRef(0);

  const dragStartX = useRef(0);

  const animationFrame = useRef(null);



  const measureSlider = () => {
    if (!trackRef.current) return;

    const firstSet =
      trackRef.current.querySelector(
        '.horizontal-slider__set'
      );

    if (!firstSet) return;

    setWidth.current =
      firstSet.offsetWidth;

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


  const getVisualPosition = (position) => {
    const width = setWidth.current;

    if (!width) {
      return position;
    }

    const normalized =
      ((position + width) % width + width) %
      width;

    return -width - normalized;
  };


  const animate = () => {
    if (!trackRef.current) return;


    currentX.current +=
      (targetX.current - currentX.current) * 0.12;

    const visualX =
      getVisualPosition(
        currentX.current
      );

    trackRef.current.style.transform =
      `translate3d(${visualX}px, 0, 0)`;


    animationFrame.current =
      requestAnimationFrame(
        animate
      );
  };



  const handlePointerDown = (event) => {

    isDragging.current = true;
    isHorizontalDrag.current = false;


    startX.current =
      event.clientX;

    startY.current =
      event.clientY;

    dragStartX.current =
      targetX.current;



    sliderRef.current?.setPointerCapture?.(
      event.pointerId
    );


    sliderRef.current?.classList.add(
      'is-dragging'
    );
  };


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

    if (!isHorizontalDrag.current) {

      if (
        Math.abs(deltaX) < 8 &&
        Math.abs(deltaY) < 8
      ) {
        return;
      }

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

      isHorizontalDrag.current = true;
    }

    event.preventDefault();


    const DRAG_SPEED = 2.5;
    targetX.current = dragStartX.current - deltaX * DRAG_SPEED;
  };



  const handlePointerUp = (event) => {

    if (!isDragging.current) {
      return;
    }


    isDragging.current = false;
    isHorizontalDrag.current = false;


    sliderRef.current?.releasePointerCapture?.(
      event.pointerId
    );


    sliderRef.current?.classList.remove(
      'is-dragging'
    );
  };


  useEffect(() => {

    measureSlider();


    const handleResize = () => {

      const oldWidth =
        setWidth.current;


      measureSlider();


      const newWidth =
        setWidth.current;

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



  return (
    <>
    <div className="block__title container mb-4">
      <h2 className="text-3xl lg:text-5xl font-bold mb-8">خدمات تسويقية ذكية</h2>
    </div>
    <div
      ref={sliderRef}
      className="horizontal-slider"


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
        className="horizontal-slider__track" 
      >



        {[0, 1, 2].map(
          (setIndex) => (

            <div
              className="horizontal-slider__set"
              key={setIndex}
            >

              {horizontalSliderData.map(
                (item, index) => (

                  <div
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

                  </div>
                )
              )}

            </div>
          )
        )}

      </div>

    </div>
    </>
  );
};

export default HorizintalSlider;