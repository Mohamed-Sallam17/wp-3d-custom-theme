import barba from '@barba/core';

import { gsap } from 'gsap';

import '../../styles/css/pageTransition.css';

let currentAbortController = null;
let coverPromise = null;


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

export const initPageTransitions = (
    mountComponents,
    unmountComponents
) => {

    const wrapper = document.querySelector(
        '[data-barba="wrapper"]'
    );

    if (!wrapper) return;

    barba.init({
        sync: true,


        prevent: ({ el }) => {

            if (!el || !el.href) {
                return false;
            }

            return (
                el.href === window.location.href
            );
        },

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

        transitions: [

            {

                name: 'clean-transition',

                async leave(data) {

                    document.body.classList.add(
                        'is-transitioning'
                    );

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

                    gsap.killTweensOf(
                        transition
                    );

                    gsap.set(transition, {
                        yPercent: 100
                    });


                    coverPromise = gsap.to(
                        transition,
                        {
                            duration: 0.6,

                            yPercent: 0,

                            ease: 'power3.inOut'
                        }
                    );

                    await coverPromise;

                    if (
                        typeof unmountComponents ===
                        'function'
                    ) {

                        unmountComponents(
                            data.current.container
                        );
                    }
                },

                async enter(data) {

                    updateActiveMenu(
                        data.next.url.path
                    );



                    if (coverPromise) {
                        await coverPromise;
                    }

                    if (
                        typeof mountComponents ===
                        'function'
                    ) {

                        mountComponents(
                            data.next.container
                        );
                    }

                    await new Promise(
                        requestAnimationFrame
                    );

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

                    await gsap.to(
                        transition,
                        {
                            duration: 0.6,

                            yPercent: -100,

                            ease: 'power3.inOut'
                        }
                    );

                    gsap.set(
                        transition,
                        {
                            yPercent: 100
                        }
                    );

                    document.body.classList.remove(
                        'is-transitioning'
                    );
                    coverPromise = null;
                },
                async afterLeave() {
                }
            }
        ]
    });
};