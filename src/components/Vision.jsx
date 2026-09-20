import themeUrl from "../utils/themeUrl";
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, EffectCards, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade'; // استيراد تنسيقات الـ fade

// بيانات الكاردات والصور المقابلة لها
const valuesData = [
  {
    id: 1,
    title: 'قيمنا',
    description: 'في عالم تتسابق فيه العلامات التجارية على الظهور، نحن من يضيء لك الطريق - من تصميم الهوية إلى بناء المتجر وإطلاق حملاتك التسويقية.',
    image: `${themeUrl}/assets/home/vision/values.webp`, 
  },
  {
    id: 2,
    title: 'رؤيتنا',
    description: 'أن نكون الشريك التكنولوجي والإبداعي الأول للشركات والمتاجر الإلكترونية في المنطقة العربية، ونقود التحول الرقمي بأعلى معايير الجودة.',
    image: `${themeUrl}/assets/home/vision/visions.webp`, 
  },
  {
    id: 3,
    title: 'أهدافنا',
    description: 'مساعدة عملائنا على تحقيق أقصى معدلات النمو والتوسع من خلال حلول برمجة وتسويق مبتكرة ومخصصة لاهتمامات جمهورهم.',
    image: `${themeUrl}/assets/home/vision/goals.webp`, 
  },
];

const ValuesSection = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <div className="container flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row gap-12 items-center justify-between py-8">
        
        {/* قسم الصور التوضيحية (شمال في RTL) - يظهر فقط في الشاشات الكبيرة LG */}
        <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center">
          <Swiper
            effect={'fade'} // تفعيل تأثير Fade
            fadeEffect={{ crossFade: true }} // لضمان التلاشي المزدوج السلس بين الصور
            speed={600} // سرعة التحول والتلاشي (بالميلي ثانية)
            modules={[Controller, EffectFade]}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            allowTouchMove={false}
            className="w-full max-w-md rounded-3xl"
          >
            {valuesData.map((item) => (
              <SwiperSlide key={item.id} className="w-full h-full flex items-center justify-center bg-transparent">
                <div className="relative w-full h-[380px] rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full max-w-full object-contain p-4 rounded-2xl transition-all duration-500"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* قسم الكاردات الرئيسية */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            cardsEffect={{
              slideShadows: false,
              perSlideRotate: 0,
              perSlideOffset: 14,
            }}
            modules={[EffectCards, Controller]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            className="w-full max-w-[340px] sm:max-w-md md:max-w-lg"
          >
            {valuesData.map((item) => (
              <SwiperSlide 
                key={item.id} 
                className="lg:gradient-bg bg-linear-to-bl from-[#050308] to-[#45296E] rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative border border-white/10"
              >
                {/* الجزء العلوي: العنوان والنجمة */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-purple-300 text-xl">✦</span>
                  <h2 className="bg-[var(--second-bg-color)] text-[#F5F4FC] px-6 py-2 rounded-xl text-lg md:text-3xl font-bold w-fit">
                    {item.title}
                  </h2>
                </div>

                {/* الوصف */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* الصورة داخل الكارت - تظهر فقط على الموبايل والتابلت */}
                <div className="block lg:hidden w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-black/30 p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default ValuesSection;