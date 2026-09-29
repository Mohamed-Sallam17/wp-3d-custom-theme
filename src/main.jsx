import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from './components/CustomCursor.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import ServicePortfolio from './components/service/ServicePortfolio.jsx';

import { initFooterLogoAnimation } from './utils/footerAnimation.js';
import { mountComponents } from './utils/componentsMount.jsx';

import '../styles/css/index.css';
import '../styles/css/tailwind.css';
import '../styles/css/fixed.css';
import '../styles/css/HorizontalSlider.css';
import '../styles/css/main.css';
import '../styles/css/pageTransition.css';
import '../styles/css/servicePage.css';
import '../styles/css/worksStack.css';

if ("scrollRestoration" in history) {
history.scrollRestoration = "manual";
}

gsap.registerPlugin(ScrollTrigger);

let resizeObserver = null;
let refreshTimeout = null;

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

const waitForImages = () => {
const images = Array.from(document.images);

if (!images.length) {
return Promise.resolve();
}

return Promise.all(
images.map((img) => {
if (img.complete) {
return Promise.resolve();
}

  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
})

);
};

const refreshScrollTrigger = () => {
clearTimeout(refreshTimeout);

refreshTimeout = setTimeout(() => {
requestAnimationFrame(() => {
ScrollTrigger.refresh();
});
}, 100);
};

const observePageResize = () => {
if (resizeObserver) {
resizeObserver.disconnect();
}

resizeObserver = new ResizeObserver(() => {
refreshScrollTrigger();
});

resizeObserver.observe(document.documentElement);
resizeObserver.observe(document.body);
};

const initPage = async () => {
mountComponents(document);

mountGlobalRoot('cursor-root', CustomCursor);
mountGlobalRoot('scroll-to-top', ScrollToTop);
mountGlobalRoot('service-gallery', ServicePortfolio);

await waitForImages();

requestAnimationFrame(() => {
requestAnimationFrame(() => {
initFooterLogoAnimation();
});
});
};

document.addEventListener("DOMContentLoaded", initPage);

window.addEventListener("load", () => {
refreshScrollTrigger();
});

window.addEventListener("resize", () => {
refreshScrollTrigger();
});