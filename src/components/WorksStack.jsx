import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../styles/css/worksStack.css";
import { worksData } from "../data/worksStack";

gsap.registerPlugin(ScrollTrigger);

function WorksStack() {
  const sectionRef = useRef(null);

  return (
    <section
      className="works-stack"
      ref={sectionRef}
    >
      <div className="works-stack__container container">
        <div className="block__title">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            أعمالنا
          </h2>
        </div>
        <div className="works-stack__cards flex items-center justify-center">
          <div className="work-stacks__wrapper w-full sm:max-w-[85%] md:max-w-full lg:max-w-5xl space-y-5 flex flex-col gap-8">

            {worksData.map((card, index) => {
              const topOffset = 100 + index * 30;

              return (
                <article
                  key={card.number}
                  className="works-card sticky gradient-bg relative flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 p-6 md:p-8 bg-[var(--second-bg-color)] border rounded-3xl"
                  style={{
                    top: `${topOffset}px`,
                  }}
                >
                  <div className="works-card__right flex items-center gap-3 z-10">
                      <div className="hidden md:inline-flex md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-linear-to-br from-[#5999FF] via-[#A55CFF] to-[#F25DEA] flex items-center justify-center text-purple-300">
                          <img src={card.icon} alt="icon" width={24} height={24}  />
                      </div>
                      <span className="gradient-text text-4xl md:text-5xl lg:text-5xl font-bold">
                          0{card.number}
                      </span>
                  </div>
                  <div className="works-card__content flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {card.title}
                      </h3>
                      <p className="text-gray-400 text-base md:text-sm mb-3 max-w-lg">
                          {card.description}
                      </p>
                  </div>
                  <div className="works-card__cta w-full md:w-auto flex-none">
                      <button className="w-full h-[48px] md:w-[96px] md:h-[96px] rounded-full font-bold bg-[var(--dark-btn-color)] border-[var(--border-color)] md:bg-transparent flex justify-center items-center border-1 border-[#A55CFF66] hover:bg-[#7C3AED]">
                         {card.cta}
                      </button>
                  </div>
                </article>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}

export default WorksStack;