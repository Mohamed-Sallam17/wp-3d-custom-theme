import React from 'react';
import ReactDOM from 'react-dom/client';
import CustomCursor from './components/CustomCursor.jsx';
import HorizintalSlider from './components/HorizintalSlider.jsx';
import PageTransition from './components/PageTransition.jsx';

import '../styles/css/index.css';

const componentsRegistry = {
  'react-horizontal-slider': HorizintalSlider,
};

document.addEventListener('DOMContentLoaded', () => {

  // Cursor
  const cursorContainer = document.createElement('div');
  cursorContainer.id = 'react-cursor-root';
  document.body.appendChild(cursorContainer);
  ReactDOM.createRoot(cursorContainer).render(<CustomCursor />);

  // Page Transition
  const transitionContainer = document.createElement('div');
  document.body.appendChild(transitionContainer);
  ReactDOM.createRoot(transitionContainer).render(<PageTransition />);


  Object.entries(componentsRegistry).forEach(([id, Component]) => {
    const container = document.getElementById(id);
    if (container) {
      ReactDOM.createRoot(container).render(
        <React.StrictMode>
          <Component />
        </React.StrictMode>
      );
    }
  });
});