import React, { useRef, useState } from "react";
import gsap from "gsap";
import { countriesData } from "../data/countriesList";

function CountriesList() {
  const [activeCardId, setActiveCardId] = useState(null);
  const imageRefs = useRef({});

  const handleMouseEnterCard = (id) => {
    setActiveCardId(id);
    const targetImage = imageRefs.current[id];

    if (targetImage) {
      gsap.to(targetImage, {
        autoAlpha: 1,
        scale: 1,
        rotation: 8,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeaveCard = (id) => {
    const targetImage = imageRefs.current[id];

    if (targetImage) {
      gsap.to(targetImage, {
        autoAlpha: 0,
        scale: 0.8,
        rotation: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
    setActiveCardId(null);
  };

  return (
    <div className="container">
        <div className="block__title">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            نصل إليك أينما كنت
          </h2>
        </div>
        <div className="relative min-h-screen text-white flex flex-col items-center justify-center">
            <div className="w-full sm:max-w-[85%] md:max-w-full lg:max-w-5xl space-y-5">
                {countriesData.map((country, index) => {
                  const topOffset = 100 + index * 30;

                  return (
                    <div
                        key={country.id}
                        onMouseEnter={() => handleMouseEnterCard(country.id)}
                        onMouseLeave={() => handleMouseLeaveCard(country.id)}
                        className="sticky gradient-bg relative flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 py-6 px-6 lg:px-10 md:p-8 bg-[var(--second-bg-color)] border rounded-3xl"
                        style={{
                          top: `${topOffset}px`,
                        }}
                    >
                        {/* الصورة الثابتة على الشمال والمُمالة بزاوية */}
                        <div
                        ref={(el) => (imageRefs.current[country.id] = el)}
                        className="hidden xl:block pointer-events-none absolute left-0 md:left-0 top-1/2 -translate-y-1/2 -translate-x-3/5 z-30 md:w-52 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/20 opacity-0 scale-75 lg:max-w-4/5 z-30"
                        >
                            <img
                                src={country.image}
                                alt={country.title}
                                className="w-full h-full object-cover "
                            />
                        </div>

                        <div className="flex items-center gap-3 z-10">
                            <div className="hidden md:inline-flex md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-linear-to-br from-[#5999FF] via-[#A55CFF] to-[#F25DEA] flex items-center justify-center text-purple-300">
                                <img src={country.icon} alt="icon" width={24} height={24}  />
                            </div>
                            <span className="gradient-text text-4xl md:text-5xl lg:text-5xl font-bold">
                                0{country.id}
                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold mb-2">
                                {country.title}
                            </h3>
                            <p className="text-gray-400 text-base md:text-sm mb-3 max-w-lg">
                                {country.desc}
                            </p>

                            {country.tags && country.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {country.tags.map((tag, idx) => (
                                        <span
                                        key={idx}
                                        className="px-3 py-1 bg-transparent border border-[#F8F7FF1F] rounded-full text-[12px] text-gray-400 lg:mt-2"
                                        >
                                        {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-auto flex-none">
                            <button className="w-full h-[48px] md:w-[96px] md:h-[96px] rounded-full font-bold flex justify-center items-center border-1 border-[#A55CFF66] hover:bg-[#7C3AED]">
                                ابدأ الآن
                            </button>
                        </div>
                    </div>
                  );
                })}
            </div>
        </div>
    </div>
  );
}

export default CountriesList;