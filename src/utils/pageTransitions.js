import barba from '@barba/core';

import { gsap } from 'gsap';

import '../../styles/css/pageTransition.css';

// =====================================================
// State
// =====================================================

let currentAbortController = null;
let coverPromise = null;


// =====================================================
// Update Active Menu
// =====================================================

const updateActiveMenu = (nextPath) => {
    const rawPath = nextPath || window.location.pathname;

    const currentPath = decodeURIComponent(rawPath)
        .replace(/\/$/, '')
        .toLowerCase();

    const menuItems = document.querySelectorAll(
        '#menu-header-menu li'
    );

    menuItems.forEach((item) => {
        const link = item.querySelector('a');

        if (!link) return;

        const linkPath = decodeURIComponent(
            new URL(
                link.href,
                window.location.origin
            ).pathname
        )
            .replace(/\/$/, '')
            .toLowerCase();

        item.classList.remove(
            'current-menu-item',
            'current_page_item',
            'current-menu-parent',
            'current-menu-ancestor',
            'active'
        );

        if (
            linkPath === currentPath &&
            linkPath !== ''
        ) {
            item.classList.add(
                'current-menu-item',
                'current_page_item',
                'active'
            );

            const parentLi =
                item.closest('.sub-menu')?.parentElement;

            if (parentLi) {
                parentLi.classList.add(
                    'current-menu-ancestor',
                    'active'
                );
            }
        }
    });
};


// =====================================================
// Page Transitions
// =====================================================

export const initPageTransitions = (
    mountComponents,
    unmountComponents
) => {

    const wrapper = document.querySelector(
        '[data-barba="wrapper"]'
    );

    if (!wrapper) return;


    // =================================================
    // Barba
    // =================================================

    barba.init({

        /*
         * نخلي leave و enter يشتغلوا مع بعض
         * عشان نقدر نجهز الصفحة الجديدة والـ overlay مغطي الشاشة.
         */
        sync: true,


        // =============================================
        // Prevent
        // =============================================

        prevent: ({ el }) => {

            if (!el || !el.href) {
                return false;
            }

            return (
                el.href === window.location.href
            );
        },


        // =============================================
        // Request Error
        // =============================================

        requestError: (
            trigger,
            action,
            url,
            response
        ) => {

            if (
                response &&
                (
                    response.status === 500 ||
                    response.status === 502
                )
            ) {
                window.location.href = url;
                return;
            }

            if (!response) {
                window.location.href = url;
            }
        },


        // =============================================
        // Transitions
        // =============================================

        transitions: [

            {

                name: 'clean-transition',


                // =====================================
                // LEAVE
                // =====================================

                async leave(data) {

                    document.body.classList.add(
                        'is-transitioning'
                    );


                    // ---------------------------------
                    // Abort previous controller
                    // ---------------------------------

                    if (currentAbortController) {
                        currentAbortController.abort();
                    }

                    currentAbortController =
                        new AbortController();


                    // ---------------------------------
                    // Get transition element
                    // ---------------------------------

                    const transition =
                        document.querySelector(
                            '.page-transition'
                        );

                    if (!transition) {
                        return;
                    }


                    // ---------------------------------
                    // Kill previous animation
                    // ---------------------------------

                    gsap.killTweensOf(
                        transition
                    );


                    // ---------------------------------
                    // Reset position
                    // ---------------------------------

                    gsap.set(transition, {
                        yPercent: 100
                    });


                    // ---------------------------------
                    // Cover animation
                    // ---------------------------------

                    coverPromise = gsap.to(
                        transition,
                        {
                            duration: 0.6,

                            yPercent: 0,

                            ease: 'power3.inOut'
                        }
                    );


                    // ---------------------------------
                    // Wait until screen is covered
                    // ---------------------------------

                    await coverPromise;


                    // ---------------------------------
                    // Unmount OLD React components
                    //
                    // مهم:
                    // ده يحصل بعد ما الـ overlay
                    // يغطي الشاشة بالكامل.
                    // ---------------------------------

                    if (
                        typeof unmountComponents ===
                        'function'
                    ) {

                        unmountComponents(
                            data.current.container
                        );
                    }
                },


                // =====================================
                // ENTER
                // =====================================

                async enter(data) {

                    // ---------------------------------
                    // Update menu immediately
                    // ---------------------------------

                    updateActiveMenu(
                        data.next.url.path
                    );


                    // ---------------------------------
                    // Make sure cover is complete
                    // ---------------------------------

                    if (coverPromise) {
                        await coverPromise;
                    }


                    // ---------------------------------
                    // Mount NEW React components
                    //
                    // الـ overlay بالفعل مغطي الشاشة
                    // هنا، لذلك المستخدم مش هيشوف
                    // عملية الـ mount.
                    // ---------------------------------

                    if (
                        typeof mountComponents ===
                        'function'
                    ) {

                        mountComponents(
                            data.next.container
                        );
                    }


                    // ---------------------------------
                    // Give React / DOM two frames
                    // ---------------------------------

                    await new Promise(
                        requestAnimationFrame
                    );

                    await new Promise(
                        requestAnimationFrame
                    );


                    // ---------------------------------
                    // Get transition element
                    // ---------------------------------

                    const transition =
                        document.querySelector(
                            '.page-transition'
                        );


                    if (!transition) {

                        document.body.classList.remove(
                            'is-transitioning'
                        );

                        return;
                    }


                    // ---------------------------------
                    // Reveal NEW page
                    // ---------------------------------

                    await gsap.to(
                        transition,
                        {
                            duration: 0.6,

                            yPercent: -100,

                            ease: 'power3.inOut'
                        }
                    );


                    // ---------------------------------
                    // Reset transition
                    // ---------------------------------

                    gsap.set(
                        transition,
                        {
                            yPercent: 100
                        }
                    );


                    // ---------------------------------
                    // Unlock page
                    // ---------------------------------

                    document.body.classList.remove(
                        'is-transitioning'
                    );


                    // ---------------------------------
                    // Clear promise
                    // ---------------------------------

                    coverPromise = null;
                },


                // =====================================
                // AFTER LEAVE
                // =====================================

                async afterLeave() {

                    /*
                     * Nothing here intentionally.
                     *
                     * Barba handles the container swap.
                     *
                     * الـ unmount حصل بالفعل بعد
                     * اكتمال الـ cover.
                     */
                }
            }
        ]
    });
};