import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// استيراد الصور
import seoImg from '../../assets/cards-slider/seo.webp';
import mobileAppImg from '../../assets/cards-slider/mobile-app.webp';
import socialImg from '../../assets/cards-slider/social-media.webp';
import buildWebsiteImg from '../../assets/cards-slider/build-website.webp';
import uiImg from '../../assets/cards-slider/ui-ux.webp';
import croImg from '../../assets/cards-slider/cro.webp';
import brandingImg from '../../assets/cards-slider/branding.webp';
import motionImg from '../../assets/cards-slider/mobile-app.webp';
import mediaBayerImg from '../../assets/cards-slider/media-baying.webp';
import contentImg from '../../assets/cards-slider/content-writing.webp';

import '../../styles/css/HorizontalSlider.css';


gsap.registerPlugin(ScrollTrigger);

function HorizintalSlider({ title = "خدمات تسويقية ذكية" }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const cardsData = [
    { id: 1, title: 'SEO', img: seoImg },
    { id: 2, title: 'Mobile App', img: mobileAppImg },
    { id: 3, title: 'CRO', img: croImg },
    { id: 4, title: 'Social Media', img: socialImg },
    { id: 5, title: 'Build Website', img: buildWebsiteImg },
    { id: 6, title: 'UI / UX', img: uiImg },
    { id: 7, title: 'Branding', img: brandingImg },
    { id: 8, title: 'Motion Graphics', img: motionImg },
    { id: 9, title: 'Media Buying', img: mediaBayerImg },
    { id: 10, title: 'Content Writing', img: contentImg },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // حساب مسافة التمرير بحيث يتم إخفاء المسافة الزائدة فقط
      const getScrollAmount = () => track.scrollWidth - track.parentElement.clientWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,        // تثبيت السكشن مؤقتاً لحين استكمال التمرير بين الكروت
          scrub: 1,         // تحريك بسلاسة مثل Swiper
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="curved-slider-section" ref={sectionRef}>
      <div className="slider-header">
        <h2>{title}</h2>
      </div>

      <div className="cards-perspective-container">
        <div className="curved-cards-track" ref={trackRef}>
          {cardsData.map((card) => (
            <div className="curved-card" key={card.id}>
              <div className="card-image-wrapper">
                <img src={card.img} alt={card.title} />
                <a href="#" className="action-btn">
                  <span>ابدأ الآن</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HorizintalSlider;