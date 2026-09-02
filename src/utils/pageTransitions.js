import barba from '@barba/core';

import { gsap } from 'gsap';

import '../../styles/css/pageTransition.css';

// =====================================================
// State
// =====================================================

let currentAbortController = null;

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

        // ---------------------------------------------
        // Prevent same URL
        // ---------------------------------------------

        prevent: ({ el }) => {

            if (!el || !el.href) {
                return false;
            }

            return (
                el.href === window.location.href
            );
        },

        // ---------------------------------------------
        // 500 / 502 fallback
        // ---------------------------------------------

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

            // لو حصل request error لأي سبب
            // نقدر نرجع للـ browser navigation
            if (!response) {

                window.location.href = url;

            }
        },

        // =================================================
        // Transitions
        // =================================================

        transitions: [

            {

                name: 'clean-transition',

                // =============================================
                // LEAVE
                // =============================================

                async leave(data) {

                    document.body.classList.add(
                        'is-transitioning'
                    );

                    // -----------------------------------------
                    // Abort previous controller
                    // -----------------------------------------

                    if (currentAbortController) {
                        currentAbortController.abort();
                    }

                    currentAbortController =
                        new AbortController();

                    const transition =
                        document.querySelector(
                            '.page-transition'
                        );

                    if (!transition) {
                        return;
                    }

                    // -----------------------------------------
                    // Kill any previous animation
                    // -----------------------------------------

                    gsap.killTweensOf(transition);

                    // -----------------------------------------
                    // Make sure layer starts below viewport
                    // -----------------------------------------

                    gsap.set(transition, {
                        yPercent: 100
                    });

                    // -----------------------------------------
                    // Cover current page
                    // -----------------------------------------

                    await gsap.to(transition, {

                        duration: 0.6,

                        yPercent: 0,

                        ease: 'power3.inOut'

                    });
                },

                // =============================================
                // ENTER
                // =============================================

                async enter(data) {

                    // -----------------------------------------
                    // Update menu using NEXT URL
                    // -----------------------------------------

                    updateActiveMenu(
                        data.next.url.path
                    );

                    // -----------------------------------------
                    // Mount React
                    // -----------------------------------------

                    if (
                        typeof onPageChanged === 'function'
                    ) {

                        onPageChanged(
                            data.next.container
                        );

                    }

                    // -----------------------------------------
                    // Wait for React mount
                    // -----------------------------------------

                    await new Promise(
                        requestAnimationFrame
                    );

                    // -----------------------------------------
                    // Give browser one frame to paint
                    // -----------------------------------------

                    await new Promise(
                        requestAnimationFrame
                    );

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

                    // -----------------------------------------
                    // Reveal new page
                    // -----------------------------------------

                    await gsap.to(transition, {

                        duration: 0.6,

                        yPercent: -100,

                        ease: 'power3.inOut'

                    });

                    // -----------------------------------------
                    // Reset layer for next navigation
                    // -----------------------------------------

                    gsap.set(transition, {
                        yPercent: 100
                    });

                    // -----------------------------------------
                    // End transition
                    // -----------------------------------------

                    document.body.classList.remove(
                        'is-transitioning'
                    );
                },

                // =============================================
                // CANCEL
                // =============================================

                async afterLeave() {

                    // Nothing here intentionally.
                    // Barba handles the container swap.
                }
            }
        ]
    });
};