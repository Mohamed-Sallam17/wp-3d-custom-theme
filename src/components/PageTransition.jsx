import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageTransition = () => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const isTransitioning = sessionStorage.getItem('pageTransitioning');

    if (isTransitioning) {
      // الطبقة تغطي الشاشة بالفعل بفضل الـ CSS، الآن نسحبها فوراً للأعلى
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.out',
        onComplete: () => {
          sessionStorage.removeItem('pageTransitioning');
        },
      });
    }

    const handleLinkClick = (e) => {
      const anchor = e.currentTarget;
      const targetUrl = anchor.getAttribute('href');

      if (
        targetUrl &&
        targetUrl.startsWith(window.location.origin) &&
        !targetUrl.includes('#') &&
        anchor.target !== '_blank' &&
        targetUrl !== window.location.href
      ) {
        e.preventDefault();

        sessionStorage.setItem('pageTransitioning', 'true');

        // صعود الطبقة لتغطية الشاشة
        gsap.fromTo(
          overlay,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.in',
            onComplete: () => {
              window.location.href = targetUrl;
            },
          }
        );
      }
    };

    const links = document.querySelectorAll('a');
    links.forEach((link) => link.addEventListener('click', handleLinkClick));

    return () => {
      links.forEach((link) => link.removeEventListener('click', linkClick));
    };
  }, []);

  // فحص ما إذا كنا في نص حالة الانتقال لتحديد الموضع المبدئي
  const isTransitioning = typeof window !== 'undefined' && sessionStorage.getItem('pageTransitioning');

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0d011c',
        zIndex: 999999,
        pointerEvents: 'none',
        willChange: 'transform',
        // لو في حالة انتقال، خسر الـ Layer تغطي الشاشة فوراً (0%) قبل حتى ما GSAP يشتغل
        transform: isTransitioning ? 'translate(0, 0%)' : 'translate(0, -100%)',
      }}
    />
  );
};

export default PageTransition;