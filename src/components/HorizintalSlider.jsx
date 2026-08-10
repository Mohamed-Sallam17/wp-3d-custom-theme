import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import seo from "../../assets/cards-slider/seo.webp";
import mobileApp from "../../assets/cards-slider/mobile-app.webp";
import social from "../../assets/cards-slider/social-media.webp";
import buildWebsite from "../../assets/cards-slider/build-website.webp";
import ui from "../../assets/cards-slider/ui-ux.webp";
import cro from "../../assets/cards-slider/cro.webp";
import branding from "../../assets/cards-slider/branding.webp";
import motion from "../../assets/cards-slider/mobile-app.webp";
import mediaBayer from "../../assets/cards-slider/media-baying.webp";
import content from "../../assets/cards-slider/content-writing.webp";

import '../../styles/css/HorizontalSlider.css';


gsap.registerPlugin(ScrollTrigger);

function HorizontalSlider({ title = "خدمات تسويقية ذكية" }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const cardsData = [
    { id: 1, title: 'SEO', img: seo, link: '#' },
    { id: 2, title: 'Mobile App', img: mobileApp, link: '#' },
    { id: 3, title: 'CRO', img: cro, link: '#' },
    { id: 4, title: 'Social Media', img: social, link: '#' },
    { id: 5, title: 'Build Website', img: buildWebsite, link: '#' },
    { id: 6, title: 'UI / UX', img: ui, link: '#' },
    { id: 7, title: 'Branding', img: branding, link: '#' },
    { id: 8, title: 'Motion Graphics', img: motion, link: '#' },
    { id: 9, title: 'Media Buying', img: mediaBayer, link: '#' },
    { id: 10, title: 'Content Writing', img: content, link: '#' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = track.querySelectorAll('.curved-card');

    if (!section || !track) return;

    // حساب المسافة الكلية للتنقل الأفقية
    const totalScrollAmount = track.scrollWidth - window.innerWidth + 200;

    // 1. تثبيت السكشن وحركة السكرول الأفقي
    const pinTween = gsap.to(track, {
      x: -totalScrollAmount, // التمرير لليسار (أو استخدم قيمة موجبة إذا كان اتجاه الموقع RTL بالكامل)
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScrollAmount}`,
        invalidateOnRefresh: true,
      }
    });

    // 2. تطبيق تأثير الانحناء القوسي (3D Curved Arc Effect) على الكروت أثناء الحركة
    cards.forEach((card) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          containerAnimation: pinTween,
          start: "left center+=300",
          end: "right center-=300",
          scrub: true,
          onUpdate: (self) => {
            // حساب بُعد الكارت عن منتصف الشاشة (من 0 إلى 1)
            const progress = self.progress; 
            // جعل القيمة 0 عند منتصف الشاشة و 1 عند الأطراف
            const distanceFromCenter = Math.abs(progress - 0.5) * 2; 

            // تطبيق الاندفاع للأعلى والدوران 3D لإنشاء شكل القوس
            const rotateZ = (progress - 0.5) * -15; // دوران خفيف يميناً ويساراً
            const translateY = Math.pow(distanceFromCenter, 2) * 50; // نزول الكروت البعيدة لأسفل
            const rotateY = (progress - 0.5) * -25; // دوران 3D محوري

            gsap.set(card, {
              transform: `translateY(${translateY}px) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg)`,
              transformOrigin: "center bottom"
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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
              {/* صورة الكارت الرئيسية */}
              <div className="card-image-wrapper">
                <img src={card.img} alt={card.title} loading="lazy" />
                
                {/* زر ابدأ الآن البنفسجي بداخل الكارت */}
                <a href={card.link} className="action-btn">
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

export default HorizontalSlider;