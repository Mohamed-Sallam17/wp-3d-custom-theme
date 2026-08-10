import React from 'react';
import ReactDOM from 'react-dom/client';
import CustomCursor from './components/CustomCursor.jsx';
import HorizintalSlider from './components/HorizintalSlider.jsx';
import { initPageTransitions } from './utils/pageTransitions.js';

import '../styles/css/index.css';

// خريطة مكونات React المربوطة بـ IDs في الـ HTML
const componentsRegistry = {
  'react-horizontal-slider': HorizintalSlider,
};

// دالة لتثبيت مكونات React في الصفحة الحالية
const mountComponents = () => {
  Object.entries(componentsRegistry).forEach(([id, Component]) => {
    const container = document.getElementById(id);

    // التحقق من وجود العنصر وأنه لم يتم رندره مسبقاً لمنع Re-render مزدوج
    if (container && !container.dataset.reactMounted) {
      container.dataset.reactMounted = "true";

      // تحويل جميع data-attributes الموجودة على العنصر إلى Props ديناميكياً
      const props = { ...container.dataset };
      
      // استبعاد خاصية التثبيت لعدم إرسالها كـ Prop غير ضروري
      delete props.reactMounted;

      ReactDOM.createRoot(container).render(
        <React.StrictMode>
          <Component {...props} />
        </React.StrictMode>
      );
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Mouse Cursor
  if (!document.getElementById('react-cursor-root')) {
    const cursorContainer = document.createElement('div');
    cursorContainer.id = 'react-cursor-root';
    document.body.appendChild(cursorContainer);
    ReactDOM.createRoot(cursorContainer).render(<CustomCursor />);
  }

  // Transition Between Pages  
  initPageTransitions();

  // رندر المكونات الخاصة بالصفحة الأولى عند التحميل
  mountComponents();
});

// For Barba Transition 
window.addEventListener('barba:page-changed', () => {
  mountComponents();
});