import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from './components/CustomCursor.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import ServicePortfolio from './components/service/ServicePortfolio.jsx';

import { initFooterLogoAnimation } from './utils/footerAnimation.js';
import { mountComponents, unmountComponents } from './utils/componentsMount.jsx';

import '../styles/css/index.css';
import '../styles/css/tailwind.css';
import '../styles/css/fixed.css';
import '../styles/css/HorizontalSlider.css';
import '../styles/css/main.css';
import '../styles/css/pageTransition.css';
import '../styles/css/servicePage.css';
import '../styles/css/worksStack.css';

// إيقاف إرجاع موضع السكرول
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

gsap.registerPlugin(ScrollTrigger);

// دالة مساعدة لإنشاء الـ Permanent Roots (الcursor والـ scroll-to-top)
const mountGlobalRoot = (id, Component) => {
  if (!document.getElementById(id)) {
    const container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);

    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM READY');

  mountComponents(document);
  initFooterLogoAnimation();

  mountGlobalRoot('cursor-root', CustomCursor);
  mountGlobalRoot('scroll-to-top', ScrollToTop);
  mountGlobalRoot('service-gallery', ServicePortfolio);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});