import themeUrl from '../utils/themeUrl';
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MovingStar() {
  const mainRef = useRef(null);
  const starWrapperRef = useRef(null); // تحريك الـ Wrapper بدلاً من الـ video المباشر
  const targetRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getCoordinates = () => {
          if (!starWrapperRef.current || !targetRef.current) return { x: 0, y: 0 };

          const starRect = starWrapperRef.current.getBoundingClientRect();
          const targetRect = targetRef.current.getBoundingClientRect();

          return {
            x: (targetRect.left + targetRect.width / 2) - (starRect.left + starRect.width / 2),
            y: (targetRect.top + targetRect.height / 2) - (starRect.top + starRect.height / 2)
          };
        };

        let { x, y } = getCoordinates();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5, // تقليل القيمة لـ 0.5 بيخلي الاستجابة أسرع وأخف على المعالج
            onRefresh: () => {
              const coords = getCoordinates();
              x = coords.x;
              y = coords.y;
            }
          }
        });

        // تحريك الـ Wrapper المعزول
        tl.to(starWrapperRef.current, {
          x: () => x,
          y: () => y,
          rotation: 360,
          ease: 'none',
          force3D: true // إجبار التقديم عبر كارت الشاشة GPU
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="container">
      <div className="flex justify-center items-center md:flex-col">
        {/* Section 1 */}
        <div className="relative lg:min-h-screen w-full sm:max-w-[85%] md:max-w-full flex items-center justify-center flex-col md:flex-row gap-8">
          {/* الحاوية (Wrapper) المعزولة لمنع ثقل الفيديو */}
          <div className="relative flex flex-2 justify-center items-center">
            <div 
              ref={starWrapperRef} 
              className="will-change-transform flex justify-center items-center z-[-1] max-w-[80%] xl:max-w-[85%] py-4"
            >
              <video
                src={`${themeUrl}/assets/Hero-star.webm`}
                autoPlay
                loop
                muted
                playsInline
                className="pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-3 justify-center items-center flex-col gap-6 text-center">
            <div className="content space-y-6 max-w-[85%]">
              <h1 className="font-bold text-4xl lg:text-6xl xl:text-8xl leading-normal">
                وميض الفكرة <br />
                <span className="gradient-text">شرارة النجاح</span>
              </h1>
              <p className="text-[var(--description-color)] lg:text-xl leading-normal">
                في عالم تتسابق فيه العلامات التجارية على الظهور، نحن من يُضيء لك الطريق من تصميم الهوية إلى بناء المتجر وإطلاق حملاتك التسويقية.
              </p>
            </div>
            <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full lg:mt-8">
              <button className="dark-btn w-full md:w-auto">اكتشف خدماتنا</button>
              <button className="gradient-btn w-full md:w-auto">ابدأ مشروعك بوميض</button>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="hidden lg:flex gap-8">
          <div className="flex flex-3 justify-center items-center flex-col gap-6 text-center">
            <div className="content space-y-6 max-w-[85%]">
              <h1 className="font-bold text-4xl lg:text-6xl xl:text-8xl leading-normal">
                نصنع حضورك <br />
                <span className="gradient-text">ونقود نموك</span>
              </h1>
              <p className="text-[var(--description-color)] lg:text-xl leading-normal">
                في وميض نحول رؤيتك إلى علامة تجارية مؤثرة من خلال هوية مميزة ومحتوى إبداعي واستراتيجيات مدروسة تساعد مشروعك على الوصول للجمهور المناسب وتحقيق نتائج حقيقية 
              </p>
            </div>
            <div className="flex justify-center items-center flex-col md:flex-row gap-4 w-full lg:mt-8">
              <button className="dark-btn w-full md:w-auto">اكتشف خدماتنا</button>
              <button className="gradient-btn w-full md:w-auto">ابدأ مشروعك بوميض</button>
            </div>
          </div>
          <div className="relative flex flex-2 justify-center items-center">
            <img
              ref={targetRef}
              src={`${themeUrl}/assets/Hero-3D-Star.webp`}
              alt="Star Element"
              className="opacity-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovingStar;