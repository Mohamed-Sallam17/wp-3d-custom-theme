import themeUrl from "../utils/themeUrl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const valuesData = [
  {
    id: 1,
    title: "قيمنا",
    description:
      "نؤمن بالابتكار والجودة والشفافية والالتزام ونعمل بروح الشراكة مع عملائنا لنقدم حلولا تسويقية احترافية مبنية على الثقة والتطوير المستمر وتحقيق أفضل النتائج",
    image: `${themeUrl}/assets/home/vision/values.webp`,
  },
  {
    id: 2,
    title: "رؤيتنا",
    description:
      "أن نكون شريكا تسويقيا موثوقا للعلامات التجارية في المملكة والخليج ونساهم في تحويل الأفكار والمشاريع إلى علامات قوية ومؤثرة من خلال حلول مبتكرة واستراتيجيات تحقق نموا حقيقيا ومستداما",
    image: `${themeUrl}/assets/home/vision/visions.webp`,
  },
  {
    id: 3,
    title: "أهدافنا",
    description:
      "نساعد العلامات التجارية على بناء حضور رقمي قوي ومميز نرفع مستوى الوعي بالعلامة التجارية ونوصلها إلى الجمهور المناسب نطور تجربة العميل ونحول المتابعين والزوار إلى عملاء فعليين",
    image: `${themeUrl}/assets/home/vision/goals.webp`,
  },
];

const ValuesSection = () => {
  const containerRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions;

        const cards = gsap.utils.toArray(".gsap-card", containerRef.current);
        const images = gsap.utils.toArray(
          ".gsap-image",
          containerRef.current
        );

        if (!cards.length) return;

        currentIndexRef.current = 0;
        isAnimatingRef.current = false;

        // =====================================================
        // Stack Positions
        // =====================================================

        const updateStackPositions = (activeIndex, animate = true) => {
          cards.forEach((card, index) => {
            const relativeIndex =
              (index - activeIndex + cards.length) % cards.length;

            const zIndex = cards.length - relativeIndex;

            let x;
            let y;
            let scale;
            let opacity;

            if (isDesktop) {
              x = relativeIndex * -20;
              y = relativeIndex * -14;
              scale = 1 - relativeIndex * 0.05;
              opacity = relativeIndex > 2 ? 0 : 1;
            } else {
              const offsets = [0, 20, -20];

              x =
                relativeIndex < offsets.length
                  ? offsets[relativeIndex]
                  : 0;

              y = relativeIndex * -4;
              scale = 1 - relativeIndex * 0.02;
              opacity = relativeIndex > 2 ? 0 : 1;
            }

            card.style.zIndex = zIndex;

            gsap.killTweensOf(card);

            if (animate) {
              gsap.to(card, {
                x,
                y,
                scale,
                opacity,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true,
              });
            } else {
              gsap.set(card, {
                x,
                y,
                scale,
                opacity,
              });
            }
          });
        };

        // =====================================================
        // Enable / Disable Drag
        // =====================================================

        const updateDraggableState = (activeIndex) => {
          cards.forEach((card, index) => {
            const draggable = Draggable.get(card);

            if (!draggable) return;

            if (index === activeIndex) {
              draggable.enable();
            } else {
              draggable.disable();
            }
          });
        };

        // =====================================================
        // Go To Next Slide
        // =====================================================

        const goToNextSlide = (dragDirection = -1) => {
          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;

          const currentIndex = currentIndexRef.current;
          const nextIndex = (currentIndex + 1) % cards.length;
          const currentCard = cards[currentIndex];

          const flyX = dragDirection * (isDesktop ? 300 : 260);

          // إيقاف أي حركة قديمة على الكارت
          gsap.killTweensOf(currentCard);

          // تغيير الصورة الحالية والقادمة
          images.forEach((image, index) => {
            if (index !== currentIndex && index !== nextIndex) return;

            gsap.killTweensOf(image);

            gsap.to(image, {
              opacity: index === nextIndex ? 1 : 0,
              duration: 0.25,
              ease: "power1.inOut",
              overwrite: true,
            });
          });

          // إخراج الكارت الحالي
          gsap.to(currentCard, {
            x: flyX,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: true,

            onComplete: () => {
              currentIndexRef.current = nextIndex;

              updateStackPositions(nextIndex, true);
              updateDraggableState(nextIndex);

              isAnimatingRef.current = false;
            },
          });
        };

        // =====================================================
        // Autoplay
        // =====================================================

        const stopAutoplay = () => {
          if (autoplayTimerRef.current) {
            autoplayTimerRef.current.kill();
            autoplayTimerRef.current = null;
          }
        };

        const startAutoplay = () => {
          stopAutoplay();

          autoplayTimerRef.current = gsap.delayedCall(3.5, () => {
            goToNextSlide(-1);

            if (!isAnimatingRef.current) {
              startAutoplay();
            } else {
              gsap.delayedCall(0.4, startAutoplay);
            }
          });
        };

        // =====================================================
        // Initial Setup
        // =====================================================

        updateStackPositions(0, false);
        updateDraggableState(0);

        // =====================================================
        // Draggable
        // =====================================================

        cards.forEach((card, index) => {
          const draggable = Draggable.create(card, {
            type: "x",
            edgeResistance: 0.65,
            cursor: "grab",
            activeCursor: "grabbing",

            onPress: () => {
              stopAutoplay();
            },

            onDrag: function () {
              gsap.set(card, {
                rotation: 0,
              });
            },

            onDragEnd: function () {
              const threshold = 50;

              if (Math.abs(this.x) > threshold) {
                const direction = this.x > 0 ? 1 : -1;

                goToNextSlide(direction);
              } else {
                updateStackPositions(
                  currentIndexRef.current,
                  true
                );
              }

              startAutoplay();
            },
          })[0];

          if (index !== 0) {
            draggable.disable();
          }
        });

        // =====================================================
        // Start Autoplay
        // =====================================================

        startAutoplay();

        // =====================================================
        // Cleanup
        // =====================================================

        return () => {
          stopAutoplay();

          cards.forEach((card) => {
            const draggable = Draggable.get(card);

            if (draggable) {
              draggable.kill();
            }

            gsap.killTweensOf(card);
          });

          images.forEach((image) => {
            gsap.killTweensOf(image);
          });
        };
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center relative z-10 overflow-hidden select-none py-6"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row gap-12 items-center justify-between mx-auto">
          {/* Images - Desktop */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center h-[380px] relative">
            {valuesData.map((item, index) => (
              <div
                key={item.id}
                className={`gsap-image absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative w-full h-full max-w-md rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="500"
                    height="380"
                    decoding="async"
                    className="w-full h-full max-w-full object-contain p-4 rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 justify-items-center items-center relative px-4 sm:px-0">
            {valuesData.map((item) => (
              <div
                key={item.id}
                style={{ gridArea: "1 / 1" }}
                className="gsap-card w-full max-w-[310px] sm:max-w-[380px] md:max-w-lg gradient-bg bg-gradient-to-bl from-[#050308] to-[#45296E] rounded-3xl p-4 md:p-8 flex flex-col justify-between shadow-2xl border border-white/10 touch-none cursor-grab active:cursor-grabbing h-auto"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="gradient-bg bg-[var(--second-bg-color)] text-[#F5F4FC] px-6 sm:px-8 py-3 sm:py-4 rounded-3xl text-lg md:text-3xl font-bold w-fit">
                    {item.title}
                  </h2>

                  <img
                    src={`${themeUrl}/assets/star.webp`}
                    alt="star icon"
                    width="40"
                    height="40"
                    decoding="async"
                    loading="lazy"
                  />
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base lg:text-xl leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Mobile Image */}
                <div className="block lg:hidden w-full h-52 sm:h-72 rounded-2xl overflow-hidden p-2 mt-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    width="500"
                    height="380"
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;


