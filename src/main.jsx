import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import CustomCursor from './components/CustomCursor.jsx';
import lazyComponent from './utils/lazyComponent.js';
import { initPageTransitions } from './utils/pageTransitions.js';

import ServicePage from './components/service/ServicePage.jsx';
import MovingStar from './components/MovingStar.jsx';
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
  'platforms': lazyComponent('Platforms'),
  'global-particles': HeroParticles,
  'service-page': ServicePage,
};

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
  initPageTransitions(mountComponents, unmountComponents);
});