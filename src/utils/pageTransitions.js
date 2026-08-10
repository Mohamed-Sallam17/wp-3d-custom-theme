import barba from '@barba/core';
import { gsap } from 'gsap';

// دالة تحديث كلاس النشاط للهيدر بدون Re-render
const updateActiveMenu = () => {
  const currentPath = window.location.pathname.replace(/\/$/, '');
  const menuItems = document.querySelectorAll('#menu-header-menu li');

  menuItems.forEach((item) => {
    const link = item.querySelector('a');
    if (!link) return;

    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
    item.classList.remove('current-menu-item', 'current_page_item', 'active');

    if (linkPath === currentPath) {
      item.classList.add('current-menu-item', 'current_page_item', 'active');
    }
  });
};

export const initPageTransitions = () => {
  const wrapper = document.querySelector('[data-barba="wrapper"]');
  if (!wrapper) return;

  barba.init({
    sync: false,
    prevent: ({ el }) => {
      const href = el.getAttribute('href');
      return (
        el.classList.contains('no-barba') ||
        !href ||
        href.includes('wp-admin') ||
        href.includes('wp-login') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      );
    },
    transitions: [
      {
        name: 'clean-transition',
        async leave() {
          const done = this.async();
          gsap.to(".page-transition", {
            duration: 0.6,
            yPercent: -100,
            ease: "power3.inOut",
            onComplete: () => {
              window.scrollTo(0, 0);
              done();
            }
          });
        },
        async enter() {
          // تحديث رابط القائمة النشط والستارة مغلقة تماماً
          updateActiveMenu();
          
          window.dispatchEvent(new Event('barba:page-changed'));

          gsap.to(".page-transition", {
            duration: 0.6,
            yPercent: -200,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(".page-transition", { yPercent: 100 });
              if (typeof mainAnimation === 'function') mainAnimation();
            }
          });
        }
      }
    ]
  });
};