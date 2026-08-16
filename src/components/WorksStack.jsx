import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/css/worksStack.css";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    number: "01",
    title: "تصميمات واجهات المستخدم",
    description:
      "تصميم واجهات المستخدم (UI Design) هو بناء الموقع أو تطبيق بشكل احترافي يركز على تجربة المستخدم.",
    cta: "ابدأ الآن",
    icon: "▣",
  },
  {
    number: "02",
    title: "نتائج محركات البحث",
    description:
      "تصميمات إبداعية تعكس هوية علامتك وتلفت انتباه جمهورك عبر مختلف منصات التواصل الاجتماعي.",
    cta: "ابدأ الآن",
    icon: "⌘",
  },
  {
    number: "03",
    title: "تصميمات السوشيال ميديا",
    description:
      "منشورات احترافية بتصميمات متنوعة وألوان متناسقة تعبر عن علامتك وتتكامل لكافة المنصات.",
    cta: "ابدأ الآن",
    icon: "◉",
  },
  {
    number: "04",
    title: "إدارة الحملات الإعلانية",
    description:
      "خبرة متكاملة تدير عن جمهور علامتك، اختيار الأدوات، التخطيط والنشاط بأسلوب فريد ومناسب.",
    cta: "ابدأ الآن",
    icon: "▣",
  },
];

function WorksStack() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards = gsap.utils.toArray(
      section.querySelectorAll(".works-card")
    );

    if (cards.length < 2) return;

    const ctx = gsap.context(() => {
      const stackOffset = 24;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          // بداية تحكم GSAP
          start: "top 150px",

          // مدة الـ stacking بالكامل
          end: "+=1800",

          scrub: 3,

          markers: true,

          invalidateOnRefresh: true,
        },
      });

      // Card 2 فوق Card 1
      tl.to(cards[1], {
        y: -stackOffset,
        ease: "none",
      });

      // Card 3 فوق Card 2
      tl.to(cards[2], {
        y: -stackOffset * 2,
        ease: "none",
      });

      // Card 4 فوق Card 3
      tl.to(cards[3], {
        y: -stackOffset * 3,
        ease: "none",
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="works-stack mt-[8rem]"
      ref={sectionRef}
    >
      <div className="works-stack__container container">

        <h2 className="works-stack__title lg:text-5xl font-bold mb-8">
          أعمالنا
        </h2>

        <div className="works-stack__cards">
          <div className="work-stacks__wrapper flex flex-col gap-8">

            {cardsData.map((card) => (
              <article
                key={card.number}
                className="works-card lg:px-12 py-4 bg-[#1B1428] rounded-2xl flex justify-between items-center lg:h-[200px]"
              >

                <div className="works-card__right flex justify-center items-center gap-4">

                  <div className="works-card__icon lg:w-[56px] lg:h-[56px] bg-linear-to-br from-[#5999FF] via-[#A55CFF] to-[#F25DEA] rounded-full flex justify-center items-center text-3xl">
                    {card.icon}
                  </div>

                  <span className="works-card__number gradient-text text-6xl font-bold">
                    {card.number}
                  </span>

                </div>

                <div className="works-card__content space-y-4">

                  <h3 className="text-3xl font-bold">
                    {card.title}
                  </h3>

                  <p className="text-xl text-(--description-color)">
                    {card.description}
                  </p>

                </div>

                <div className="works-card__cta lg:w-[96px] lg:h-[96px] rounded-full flex justify-center items-center border-1 border-[#A55CFF66] hover:bg-[#7C3AED]">
                  {card.cta}
                </div>

              </article>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

export default WorksStack;