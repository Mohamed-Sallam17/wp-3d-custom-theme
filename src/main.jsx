import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from './components/CustomCursor.jsx';
import lazyComponent from './utils/lazyComponent.js';
import { initPageTransitions } from './utils/pageTransitions.js';

import ServicePage from './components/service/ServicePage.jsx';
import MovingStar from './components/MovingStar.jsx';
import AboutHero from './components/innerPages/AboutHero.jsx';
import HeroParticles from './components/HeroParticles.jsx';

import '../styles/css/index.css';
import '../styles/css/tailwind.css';
import '../styles/css/fixed.css';
import '../styles/css/HorizontalSlider.css';
import '../styles/css/main.css';
import '../styles/css/pageTransition.css';
import '../styles/css/servicePage.css';
import '../styles/css/worksStack.css';

// خريطة لتخزين الـ Roots المفعلة لتنظيفها لاحقاً
const activeRoots = new Map();

const componentsRegistry = {
  'horizontal-slider': lazyComponent('HorizintalSlider'),
  'works-stack': lazyComponent('WorksStack'),
  'faq': lazyComponent('Faq'),
  'moving-star': MovingStar,
  'countries-list': lazyComponent('CountriesList'),
  'vision': lazyComponent('Vision'),
  'platforms': lazyComponent('Platforms'),
  'Testimonials': lazyComponent('Testimonials'),
  'gallery-services': lazyComponent('ServicesGallery'),
  'why-us': lazyComponent('WhyUs'),
  'support-notice': lazyComponent('SupportNotice'),
  'about-hero': AboutHero,
  'global-particles': HeroParticles,
  'service-page': ServicePage,
};



gsap.registerPlugin(ScrollTrigger);

// Footer Logo Animation & Mouse Tilt Effect
const initFooterLogoAnimation = () => {
  const footerLogoImg = document.querySelector('.footer-logo img');
  const footer = document.querySelector('footer');

  if (!footerLogoImg || !footer) return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1280px)", () => {
    gsap.set(footerLogoImg, {
      transformOrigin: "center center",
    });

    // Scroll Animation
    const scrollTween = gsap.to(footerLogoImg, {
      yPercent: -140,
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
      },
    });

    // Mouse Tilt
    const skewXTo = gsap.quickTo(footerLogoImg, "skewX", {
      duration: 0.4,
      ease: "power2.out",
    });

    const skewYTo = gsap.quickTo(footerLogoImg, "skewY", {
      duration: 0.4,
      ease: "power2.out",
    });

    const rotateTo = gsap.quickTo(footerLogoImg, "rotateY", {
      duration: 0.4,
      ease: "power2.out",
    });

    const rotateXTo = gsap.quickTo(footerLogoImg, "rotateX", {
      duration: 0.4,
      ease: "power2.out",
    });

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();

      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

      skewXTo(mouseX * 15);
      skewYTo(mouseY * -10);

      rotateTo(mouseX * 20);
      rotateXTo(mouseY * -20);
    };

    const handleMouseLeave = () => {
      skewXTo(0);
      skewYTo(0);
      rotateTo(0);
      rotateXTo(0);
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);

    // -----------------------------------------
    // Refresh ScrollTrigger after layout settles
    // -----------------------------------------

    const refreshScrollTrigger = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    // Browser may restore the previous scroll position
    window.addEventListener("load", refreshScrollTrigger);

    // Important when refreshing while already at the footer
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // -----------------------------------------
    // Cleanup
    // -----------------------------------------

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("load", refreshScrollTrigger);

      clearTimeout(refreshTimeout);

      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  });

  return () => {
    mm.revert();
  };
};

// ----------------------------------------------------
// الحلول الأساسية لتضمين الاستقرار المريح (Troubleshooting)
// ----------------------------------------------------

// أ. التأكد من اكتمال تحميل الصورة المحددة نفسها قبل البدء
const logoImg = document.querySelector('.footer-logo img');
if (logoImg) {
  if (logoImg.complete) {
    initFooterLogoAnimation();
  } else {
    logoImg.addEventListener('load', () => {
      initFooterLogoAnimation();
      ScrollTrigger.refresh();
    });
  }
} else {
  document.addEventListener('DOMContentLoaded', initFooterLogoAnimation);
}

// ب. تحديث مجدد عند اكتمال تحميل الصفحة بالكامل
window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});

// ⚠️ السطرين الأهم لضمان استقرار العمل دائماً ⚠️
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});


// =====================================================
// Unmount Old Components
// =====================================================
export const unmountComponents = (container = document) => {
  activeRoots.forEach((root, el) => {
    if (container.contains(el) || container === el) {
      root.unmount();
      activeRoots.delete(el);
      delete el.dataset.reactMounted;
      console.log(`🧹 UNMOUNTED REACT COMPONENT`);
    }
  });
};

// =====================================================
// Mount React Components
// =====================================================
const mountComponents = (root = document) => {
  console.log('=================================');
  console.log('MOUNT COMPONENTS | ROOT:', root);

  Object.entries(componentsRegistry).forEach(([id, Component]) => {
    const container =
      root?.querySelector?.(`#${id}`) ||
      (root?.id === id ? root : null);

    if (!container) return;

    if (container.dataset.reactMounted === 'true') {
      console.log(`⚠️ ${id} ALREADY MOUNTED`);
      return;
    }

    container.dataset.reactMounted = 'true';
    const props = { ...container.dataset };
    delete props.reactMounted;

    console.log(`🚀 MOUNTING ${id}`, props);

    // إنشاء الـ Root وحفظه في الـ Map
    const reactRoot = ReactDOM.createRoot(container);
    reactRoot.render(
      <React.StrictMode>
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>
      </React.StrictMode>
    );

    activeRoots.set(container, reactRoot);
  });

};

// =====================================================
// DOM Ready
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM READY');

  mountComponents(document);


  // 2. تشغيل انيميشن الفوتر مرة واحدة فقط
  initFooterLogoAnimation();

  // Cursor Root (بيفضل شغال مستمر ومش بيتأثر بـ Barba)
  if (!document.getElementById('react-cursor-root')) {
    const cursorContainer = document.createElement('div');
    cursorContainer.id = 'react-cursor-root';
    document.body.appendChild(cursorContainer);

    ReactDOM.createRoot(cursorContainer).render(
      <React.StrictMode>
        <CustomCursor />
      </React.StrictMode>
    );
  }


  // التمرير لدالة Mount و Unmount لـ Barba
  // initPageTransitions(mountComponents, unmountComponents);
});