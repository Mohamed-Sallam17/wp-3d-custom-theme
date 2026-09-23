<?php
/**
 * Custom Filters for Nav Menus
 *
 * @package Wameed
 */

// 1. إضافة كلاسات للعنصر الرئيسي <li>
function wameed_add_menu_li_classes( $classes, $item, $args ) {
    if ( in_array( 'menu-item-has-children', $classes, true ) ) {
        if ( isset( $args->theme_location ) && $args->theme_location === 'HeaderLocation' ) {
            $classes[] = 'relative group';
        } else {
            $classes[] = 'w-full flex flex-wrap items-center justify-between';
        }
    }
    return $classes;
}
add_filter( 'nav_menu_css_class', 'wameed_add_menu_li_classes', 10, 3 );


// 2. إرجاع السهم للديسكتوب فقط داخل اللينك، وللموبايل يترك فارغاً للزر الخارجي
function wameed_add_menu_arrow( $title, $item, $args, $depth ) {
    if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
        // إضافة السهم داخل اللينك للديسكتوب فقط
        if ( isset( $args->theme_location ) && $args->theme_location === 'HeaderLocation' ) {
            $arrow_icon = '<svg class="w-4 h-4 inline-block ms-1 transition-transform duration-200 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>';
            $title .= $arrow_icon;
        }
    }
    return $title;
}
add_filter( 'nav_menu_item_title', 'wameed_add_menu_arrow', 10, 4 );


// 3. إضافة زر السهم المنفصل تماماً بعد وشم </a> في الموبايل
function wameed_add_mobile_toggle_button( $item_output, $item, $depth, $args ) {
    if ( isset( $args->theme_location ) && $args->theme_location === 'mobileLocation' ) {
        if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
            // زر مستقل بذاته يوضع بعد إغلاق رابط </a>
            $button = '<button type="button" class="mobile-submenu-toggle p-2 text-gray-400 hover:text-white focus:outline-none" aria-label="Toggle Submenu">
                <svg class="w-4 h-4 transition-transform duration-200 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>';
            
            $item_output .= $button;
        }
    }
    return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'wameed_add_mobile_toggle_button', 10, 4 );


// 4. ضبط كلاسات القائمة الفرعية (إجبار hidden في الموبايل افتراضياً)
function wameed_add_submenu_classes( $classes, $args, $depth ) {
    if ( isset( $args->theme_location ) && $args->theme_location === 'HeaderLocation' ) {
        $classes[] = 'sub-menu';
    } elseif ( isset( $args->theme_location ) && $args->theme_location === 'mobileLocation' ) {
        // إضافة hidden لضمان إخفائها افتراضياً عند فتح المنيو
        $classes[] = 'mobile-sub-menu hidden w-full list-none p-0 m-0';
    }
    return $classes;
}
add_filter( 'nav_menu_submenu_css_class', 'wameed_add_submenu_classes', 10, 3 );