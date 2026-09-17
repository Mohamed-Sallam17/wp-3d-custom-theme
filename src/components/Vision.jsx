import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

// بيانات الكاردات والصور المقابلة لها
const valuesData = [
  {
    id: 1,
    title: 'قيمنا',
    description: 'في عالم تتسابق فيه العلامات التجارية على الظهور، نحن من يمهد لك الطريق - من تصميم الهوية إلى بناء المتاجر وإطلاق حملاتك التسويقية.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop', // صورة الميزان / العدل
  },
  {
    id: 2,
    title: 'رؤيتنا',
    description: 'أن نكون الشريك التكنولوجي والإبداعي الأول للشركات والمتاجر الإلكترونية في المنطقة العربية، ونقود التحول الرقمي بأعلى معايير الجودة.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop', // صورة الرؤية والتكنولوجيا
  },
  {
    id: 3,
    title: 'أهدافنا',
    description: 'مساعدة عملائنا على تحقيق أقصى معدلات النمو والتوسع من خلال حلول برمجة وتسويق مبتكرة ومخصصة لاهتمامات جمهورهم.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop', // صورة الأهداف والنمو
  },
];

const ValuesSection = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  return (
    <section className="min-h-screen py-20 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* قسم الكاردات (يمين في RTL - السلايدر الرئيسي) */}
        <div className="w-full max-w-md mx-auto">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Controller]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            className="w-full h-[320px]"
          >
            {valuesData.map((item) => (
              <SwiperSlide 
                key={item.id} 
                className="bg-linear-to-bl from-[#050308] to-[#45296E] rounded-2xl p-8 flex flex-col justify-center shadow-2xl relative overflow-hidden"
              >
                {/* نجمة زينة / أيقونة */}
                <div className="absolute top-6 right-6 text-[#A855F7] text-xl">✦</div>
                
                <div className="inline-block bg-[#241747] border border-[#4C2A96] px-5 py-2 rounded-xl text-lg font-semibold mb-6 w-fit">
                  {item.title} <span className="text-[#A855F7] mr-2">|</span>
                </div>
                
                <p className="text-gray-300 text-base leading-relaxed">
                  {item.description}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* قسم الصور التوضيحية (شمال في RTL - السلايدر المرتبط) */}
        <div className="w-full flex justify-center items-center">
          <Swiper
            modules={[Controller]}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            allowTouchMove={false} // منع السحب اليدوي من جهة الصورة ليكون الاعتماد على الكاردات
            className="w-full max-w-md h-[380px] rounded-3xl"
          >
            {valuesData.map((item) => (
              <SwiperSlide key={item.id} className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 transition-all duration-500"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default ValuesSection;