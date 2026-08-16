import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import CustomCursor from './components/CustomCursor.jsx';

import lazyComponent from './utils/lazyComponent.js';
import { initPageTransitions } from './utils/pageTransitions.js';

import '../styles/css/index.css';


// =====================================================
// Lazy Components Registry
// =====================================================

const componentsRegistry = {
  'react-horizontal-slider': lazyComponent('HorizintalSlider'),
  'react-works-stack': lazyComponent('WorksStack'),
};


// =====================================================
// Mount React Components
// =====================================================

const mountComponents = () => {

  Object.entries(componentsRegistry).forEach(([id, Component]) => {

    const container = document.getElementById(id);

    // التأكد إن العنصر موجود
    // وإن الـComponent لم يتم عمل mount له مسبقًا
    if (container && !container.dataset.reactMounted) {

      container.dataset.reactMounted = 'true';

      // تحويل data-* attributes إلى Props
      const props = { ...container.dataset };

      // حذف الخاصية الداخلية
      delete props.reactMounted;

      ReactDOM.createRoot(container).render(
        <React.StrictMode>
             <Suspense fallback={null}>
                <Component {...props} />
            </Suspense>
        </React.StrictMode>
    );
    }
  });
};


// =====================================================
// DOM Ready
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

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

  initPageTransitions();


  // ---------------------------------------------------
  // Page Components
  // ---------------------------------------------------

  mountComponents();

});


// =====================================================
// Barba Page Transition
// =====================================================

window.addEventListener('barba:page-changed', () => {

  mountComponents();

});