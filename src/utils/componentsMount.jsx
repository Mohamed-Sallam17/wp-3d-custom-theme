import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import lazyComponent from './lazyComponent.js';

import MovingStar from '../components/MovingStar.jsx';
import AboutHero from '../components/innerPages/AboutHero.jsx';
import HeroParticles from '../components/HeroParticles.jsx';
import ServicePage from '../components/service/ServicePage.jsx';
import NotFound from '../components/NotFound.jsx';

const activeRoots = new Map();

export const componentsRegistry = {
  'horizontal-slider': lazyComponent('HorizintalSlider'),
  'works-stack': lazyComponent('WorksStack'),
  'faq': lazyComponent('Faq'),
  'moving-star': MovingStar,
  'countries-list': lazyComponent('CountriesList'),
  'vision': lazyComponent('Vision'),
  'platforms': lazyComponent('Platforms'),
  'Testimonials': lazyComponent('Testimonials'),
  'gallery-services': lazyComponent('ServicesGallery'),
  'company-values': lazyComponent('CompanyValues'),
  'why-us': lazyComponent('WhyUs'),
  'contact-notice': lazyComponent('ContactNotice'),
  'about-notice': lazyComponent('AboutNotice'),
  'contact-us': lazyComponent('ContactUs'),
  'scroll-to-top': lazyComponent('ScrollToTop'),
  'about-hero': AboutHero,
  'global-particles': HeroParticles,
  'service-page': ServicePage,
  'not-found-page': NotFound,
};

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

export const mountComponents = (root = document) => {
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