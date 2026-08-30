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
    <section className="relative min-h-screen bg-[#080511] text-white p-6 md:p-12 flex flex-col items-center justify-center dir-rtl">
      {/* قائمة كروت الدول */}
      <div className="w-full max-w-4xl space-y-5">
        {countriesData.map((country) => (
          <div
            key={country.id}
            onMouseEnter={() => handleMouseEnterCard(country.id)}
            onMouseLeave={() => handleMouseLeaveCard(country.id)}
            className="group relative flex items-center justify-between p-6 md:p-8 bg-[#120d24] border border-white/10 rounded-3xl hover:border-purple-500/50 transition-colors duration-300 cursor-pointer overflow-visible"
          >
            {/* الصورة الثابتة على الشمال والمُمالة بزاوية */}
            <div
              ref={(el) => (imageRefs.current[country.id] = el)}
              className="pointer-events-none absolute left-0 md:left-0 top-1/2 -translate-y-1/2 -translate-x-full z-30 w-44 h-56 md:w-52 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/20 opacity-0 scale-75"
            >
              <img
                src={country.image}
                alt={country.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* زر "ابدأ الآن" الجانبي */}
            <div className="flex items-center gap-4 z-10">
              <button className="px-5 py-2.5 rounded-full border border-white/20 text-xs text-white/80 group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all duration-300">
                ابدأ الآن
              </button>
            </div>

            {/* تفاصيل الدولة */}
            <div className="flex-1 text-right px-6 z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                {country.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mb-3 max-w-lg">
                {country.desc}
              </p>

              {/* التاجات الفرعية */}
              {country.tags && country.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {country.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* الرقم والأيقونة */}
            <div className="flex items-center gap-3 z-10">
              <span className="text-3xl font-extrabold text-purple-400">
                0{country.id}
              </span>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                ✦
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CountriesList;