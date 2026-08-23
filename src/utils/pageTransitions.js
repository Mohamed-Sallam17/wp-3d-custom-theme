import barba from '@barba/core';

import { gsap } from 'gsap';

import '../../styles/css/pageTransition.css';


// =====================================================
// Update Active Menu
// =====================================================

const updateActiveMenu = () => {

    const currentPath = window.location.pathname.replace(/\/$/, '');

    const menuItems = document.querySelectorAll(
        '#menu-header-menu li'
    );

    menuItems.forEach((item) => {

        const link = item.querySelector('a');

        if (!link) return;

        const linkPath = new URL(
            link.href,
            window.location.origin
        ).pathname.replace(/\/$/, '');

        item.classList.remove(
            'current-menu-item',
            'current_page_item',
            'active'
        );

        if (linkPath === currentPath) {

            item.classList.add(
                'current-menu-item',
                'current_page_item',
                'active'
            );

        }

    });

};


// =====================================================
// Page Transitions
// =====================================================

export const initPageTransitions = (onPageChanged) => {

    const wrapper = document.querySelector(
        '[data-barba="wrapper"]'
    );

    if (!wrapper) return;


    // =================================================
    // Barba Init
    // =================================================

    barba.init({

        sync: false,

        transitions: [

            {

                name: 'clean-transition',


                // =========================================
                // LEAVE
                // =========================================

                async leave() {

                    const transition = document.querySelector(
                        '.page-transition'
                    );

                    if (!transition) return;

                    await gsap.to(transition, {

                        duration: 0.6,

                        yPercent: -100,

                        ease: 'power3.inOut',

                    });


                    window.scrollTo(0, 0);

                },


                // =========================================
                // ENTER
                // =========================================

                async enter(data) {

                    const transition = document.querySelector(
                        '.page-transition'
                    );


                    // =====================================
                    // Update Active Menu
                    // =====================================

                    updateActiveMenu();


                    // =====================================
                    // Mount React Components
                    // =====================================

                    if (
                        typeof onPageChanged === 'function'
                    ) {

                        onPageChanged(
                            data.next.container
                        );

                    }


                    // =====================================
                    // No Transition Element
                    // =====================================

                    if (!transition) return;


                    // =====================================
                    // Page Transition Animation
                    // =====================================

                    await gsap.to(transition, {

                        duration: 0.6,

                        yPercent: -200,

                        ease: 'power3.inOut',

                    });


                    // =====================================
                    // Reset Transition
                    // =====================================

                    gsap.set(transition, {

                        yPercent: 100

                    });


                    // =====================================
                    // Main Animation
                    // =====================================

                    if (
                        typeof window.mainAnimation === 'function'
                    ) {

                        window.mainAnimation();

                    }

                }

            }

        ]

    });

};