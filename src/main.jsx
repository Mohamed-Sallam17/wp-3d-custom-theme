import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import CustomCursor from './components/CustomCursor.jsx';
import lazyComponent from './utils/lazyComponent.js';
import { initPageTransitions } from './utils/pageTransitions.js';

import ServicePage from './components/service/ServicePage.jsx';
import MovingStar from './components/MovingStar.jsx';

import '../styles/css/index.css';


// =====================================================
// Lazy Components Registry
// =====================================================

const componentsRegistry = {
  'horizontal-slider': lazyComponent('HorizintalSlider'),
  'works-stack': lazyComponent('WorksStack'),
  'moving-star': MovingStar,
  'service-page': ServicePage,
};


// =====================================================
// Mount React Components
// =====================================================

const mountComponents = (root = document) => {

  console.log('=================================');
  console.log('MOUNT COMPONENTS');
  console.log('ROOT:', root);

  Object.entries(componentsRegistry).forEach(([id, Component]) => {

    const container =
      root?.querySelector?.(`#${id}`) ||
      (root?.id === id ? root : null);

    if (!container) {
      console.log(`❌ ${id} NOT FOUND`);
      return;
    }

    console.log(`✅ ${id} FOUND`);

    // Prevent mounting the same element twice
    if (container.dataset.reactMounted === 'true') {
      console.log(`⚠️ ${id} ALREADY MOUNTED`);
      return;
    }

    // Mark as mounted
    container.dataset.reactMounted = 'true';

    // Convert data-* attributes to props
    const props = { ...container.dataset };

    delete props.reactMounted;

    console.log(`🚀 MOUNTING ${id}`, props);

    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Suspense fallback={null}>
          <Component {...props} />
        </Suspense>
      </React.StrictMode>
    );

  });
};


// =====================================================
// DOM Ready
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM READY');


  // ---------------------------------------------------
  // Initial React Components
  // ---------------------------------------------------

  mountComponents(document);


  // ---------------------------------------------------
  // Global Custom Cursor
  // ---------------------------------------------------

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


  // ---------------------------------------------------
  // Page Transitions
  // ---------------------------------------------------

  initPageTransitions(mountComponents);

});