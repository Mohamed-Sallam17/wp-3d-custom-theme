import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import themeUrl from "../utils/themeUrl";

const cards = [
  {
    id: 1,
    title: "قيمنا",
    description:
      "نلتزم بتقديم أعلى مستويات الجودة والابتكار في تقديم جميع الخدمات، من التخطيط المبدئي حتى التنفيذ الكامل.",
    image: `${themeUrl}/assets/home/cards/justice-scale.webp`,
  },
  {
    id: 2,
    title: "رؤيتنا",
    description:
      "أن نكون الشريك الأكثر موثوقية في التحول الرقمي وتمكين الشركات من النمو والانتشار بشكل مستدام.",
    image: `${themeUrl}/assets/home/cards/vision.webp`,
  },
  {
    id: 3,
    title: "أهدافنا",
    description:
      "بناء تجارب مستخدم ممتازة وتوفير حلول برمجية مبتكرة تتناسب مع تطلعات كل مشروع وتلبي احتياجات السوق.",
    image: `${themeUrl}/assets/home/cards/goals.webp`,
  },
];

export default function StackedCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  const imageRef = useRef(null);
  const topCardRef = useRef(null);

  const isAnimating = useRef(false);

  const startY = useRef(0);
  const dragDistance = useRef(0);

  const [isDragging, setIsDragging] = useState(false);

  const activeCard = cards[activeIndex];

  // ---------------------------------------------
  // Image animation
  // ---------------------------------------------

useEffect(() => {
  if (!topCardRef.current) return;

  // الكارد الجديد يبدأ مخفي
  gsap.set(topCardRef.current, {
    y: 10,
    opacity: 0,
  });

  // يظهر تدريجيًا
  gsap.to(topCardRef.current, {
    y: 0,
    opacity: 1,
    duration: 0.35,
    ease: "power2.out",

    onComplete: () => {
      isAnimating.current = false;
    },
  });
}, [activeIndex]);

  // ---------------------------------------------
  // Next card
  // ---------------------------------------------

const nextCard = () => {
  if (isAnimating.current) return;

  isAnimating.current = true;

  const currentCard = topCardRef.current;

  if (!currentCard) return;

  // خروج الكارد الحالي
  gsap.to(currentCard, {
    y: -60,
    opacity: 0,
    duration: 0.35,
    ease: "power2.inOut",

    onComplete: () => {
      // نغير الكارد النشط
      setActiveIndex((prev) => (prev + 1) % cards.length);
    },
  });
};

  // ---------------------------------------------
  // Drag start
  // ---------------------------------------------

  const handleStart = (e) => {
    if (isAnimating.current) return;

    const clientY =
      e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    startY.current = clientY;
    dragDistance.current = 0;

    setIsDragging(true);
  };

  // ---------------------------------------------
  // Drag move / end
  // ---------------------------------------------

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientY =
        e.clientY ?? e.touches?.[0]?.clientY ?? 0;

      dragDistance.current = startY.current - clientY;
    };

    const handleEnd = () => {
      setIsDragging(false);

      if (dragDistance.current > 40) {
        nextCard();
      }

      dragDistance.current = 0;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    window.addEventListener("touchmove", handleMove, {
      passive: true,
    });

    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);

      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // ---------------------------------------------
  // Wheel
  // ---------------------------------------------

  const handleWheel = (e) => {
    if (e.deltaY > 30) {
      nextCard();
    }
  };

  // ---------------------------------------------
  // Render
  // ---------------------------------------------

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 select-none">
      <div
        onWheel={handleWheel}
        className="bg-[#0f0a1c] border border-purple-900/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[380px]">

          {/* Cards */}
          <div className="relative h-[280px] sm:h-[300px] w-full flex items-center justify-center">

            {cards.map((card, index) => {
              /*
               * ترتيب الكروت حسب الـ activeIndex
               */

              const position =
                (index - activeIndex + cards.length) %
                cards.length;

              const scale = 1 - position * 0.05;
              const translateY = position * 18;

              const opacity =
                position === 0
                  ? 1
                  : 0.8 - position * 0.2;

              return (
                <div
                  key={card.id}
                  ref={
                    position === 0
                      ? topCardRef
                      : undefined
                  }
                  onMouseDown={
                    position === 0
                      ? handleStart
                      : undefined
                  }
                  onTouchStart={
                    position === 0
                      ? handleStart
                      : undefined
                  }
                  style={{
                    zIndex: cards.length - position,

                    transform: `
                      translateY(${translateY}px)
                      scale(${scale})
                    `,

                    opacity,

                    // مهم:
                    // مفيش transition هنا
                  }}
                  className={`
                    absolute
                    w-full
                    max-w-[420px]
                    p-6
                    sm:p-8
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#21133b]
                    to-[#120a22]
                    border
                    border-purple-500/20
                    shadow-2xl

                    ${
                      position === 0
                        ? "cursor-grab active:cursor-grabbing"
                        : "pointer-events-none"
                    }
                  `}
                >
                  <div className="inline-block px-4 py-1 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-200 text-sm font-semibold mb-4">
                    {card.title}
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Image */}
          <div className="flex justify-center items-center h-[280px] sm:h-[320px]">
            <img
              ref={imageRef}
              src={activeCard.image}
              alt={activeCard.title}
              className="
                max-h-full
                w-auto
                object-contain
                drop-shadow-[0_10px_25px_rgba(168,85,247,0.2)]
                pointer-events-none
              "
            />
          </div>

        </div>
      </div>
    </div>
  );
}