import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { horizontalSliderData } from '../data/horizontalSliderData';
import '../../styles/css/HorizontalSlider.css';

const HorizintalSlider = () => {
    const sliderRef = useRef(null);

    const [cardsPerView, setCardsPerView] = useState(3);
    const [containerWidth, setContainerWidth] = useState(0);

    const positionRef = useRef(0);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startPositionRef = useRef(0);
    const animationFrameRef = useRef(null);
    const targetPositionRef = useRef(0);
    const isWheelAnimatingRef = useRef(false);
    const wheelPositionRef = useRef({ value: 0 });
    const wheelTweenRef = useRef(null);

    const [, forceRender] = useState(0);

    /*
    |--------------------------------------------------------------------------
    | Responsive Cards Per View
    |--------------------------------------------------------------------------
    */

    const updateDimensions = () => {
        if (!sliderRef.current) return;

        const width = sliderRef.current.offsetWidth;

        setContainerWidth(width);

        if (width <= 767) {
            setCardsPerView(1);
        } else if (width <= 1024) {
            setCardsPerView(2);
        } else {
            setCardsPerView(3);
        }
    };

    useEffect(() => {
        updateDimensions();

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Card Dimensions
    |--------------------------------------------------------------------------
    */

    const GAP = 24;

    const cardWidth =
        cardsPerView > 0
            ? (containerWidth - GAP * (cardsPerView - 1)) / cardsPerView
            : 0;

    const step = cardWidth + GAP;

    /*
    |--------------------------------------------------------------------------
    | Infinite Positioning
    |--------------------------------------------------------------------------
    */

    const getCardPosition = (index) => {
        if (!containerWidth || !cardWidth) {
            return 0;
        }

        let x = index * step - positionRef.current;

        const totalWidth = horizontalSliderData.length * step;

        /*
         * Wrap card to the right
         */
        while (x < -step) {
            x += totalWidth;
        }

        /*
         * Wrap card to the left
         */
        while (x > containerWidth) {
            x -= totalWidth;
        }

        return x;
    };

    /*
    |--------------------------------------------------------------------------
    | Mouse Drag
    |--------------------------------------------------------------------------
    */
const handlePointerDown = (e) => {

    if (wheelTweenRef.current) {
        wheelTweenRef.current.kill();
        wheelTweenRef.current = null;
    }

    wheelPositionRef.current.value =
        positionRef.current;

    isDraggingRef.current = true;

    startXRef.current = e.clientX;

    startPositionRef.current =
        positionRef.current;

    sliderRef.current?.setPointerCapture?.(
        e.pointerId
    );

    document.body.classList.add(
        'horizontal-slider-dragging'
    );
};

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current) return;

        const delta = e.clientX - startXRef.current;

        positionRef.current = startPositionRef.current - delta;

        forceRender((value) => value + 1);
    };

    const handlePointerUp = () => {
        if (!isDraggingRef.current) return;

        isDraggingRef.current = false;

        document.body.classList.remove('horizontal-slider-dragging');
    };

/*
|--------------------------------------------------------------------------
| Smooth Slide-by-Slide Wheel
|--------------------------------------------------------------------------
*/

useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    let wheelLocked = false;

    const handleWheel = (e) => {
        e.preventDefault();

        if (wheelLocked) return;

        const delta =
            Math.abs(e.deltaX) > Math.abs(e.deltaY)
                ? e.deltaX
                : e.deltaY;

        if (!delta) return;

        const direction = delta > 0 ? 1 : -1;

        const currentPosition =
            positionRef.current;

        /*
         * أقرب Slide فعلية
         */
        const currentSlide =
            Math.round(currentPosition / step);

        /*
         * Slide واحدة في الاتجاه المطلوب
         */
        const targetPosition =
            (currentSlide + direction) * step;

        wheelLocked = true;

        if (wheelTweenRef.current) {
            wheelTweenRef.current.kill();
        }

        wheelPositionRef.current.value =
            currentPosition;

        wheelTweenRef.current = gsap.to(
            wheelPositionRef.current,
            {
                value: targetPosition,

                duration: 0.8,

                ease: 'power3.inOut',

                onUpdate: () => {
                    positionRef.current =
                        wheelPositionRef.current.value;

                    forceRender((value) => value + 1);
                },

                onComplete: () => {
                    positionRef.current =
                        targetPosition;

                    forceRender((value) => value + 1);

                    wheelLocked = false;

                    wheelTweenRef.current = null;
                },
            }
        );
    };

    slider.addEventListener('wheel', handleWheel, {
        passive: false,
    });

    return () => {
        slider.removeEventListener('wheel', handleWheel);

        if (wheelTweenRef.current) {
            wheelTweenRef.current.kill();
        }
    };
}, [step]);

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <section
            ref={sliderRef}
            className={`horizontal-slider ${
                isDraggingRef.current ? 'is-dragging' : ''
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <div className="horizontal-slider-viewport">

                {horizontalSliderData.map((item, index) => {

                    const x = getCardPosition(index);

                    return (
                        <article
                            key={`${item.title}-${index}`}
                            className="horizontal-slider-card"
                            style={{
                                width: `${cardWidth}px`,
                                transform: `translate3d(${x}px, -50%, 0)`,
                            }}
                        >
                            <div className="horizontal-slider-image">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    draggable="false"
                                />
                            </div>

                            <div className="horizontal-slider-overlay">
                                <h3>{item.title}</h3>
                            </div>
                        </article>
                    );
                })}

            </div>
        </section>
    );
};

export default HorizintalSlider;