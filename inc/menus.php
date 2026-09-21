<?php
/**
 * Custom Filters for Nav Menus
 *
 * @package Wameed
 */

// 1. إضافة كلاسات للعنصر الرئيسي <li> (الديسكتوب والموبايل)
function wameed_add_menu_li_classes( $classes, $item, $args ) {
    if ( in_array( 'menu-item-has-children', $classes, true ) ) {
        // إضافة relative و group للديسكتوب لتفعيل الـ Hover
        $classes[] = 'relative group';
    }

    return $classes;
}
add_filter( 'nav_menu_css_class', 'wameed_add_menu_li_classes', 10, 3 );


// 2. ضبط السهم وتعديل العناوين بناءً على مكان القائمة (Desktop / Mobile)
function wameed_add_menu_arrow( $title, $item, $args, $depth ) {
    $has_children = in_array( 'menu-item-has-children', $item->classes, true );

    if ( $has_children ) {
        // للديسكتوب: سهم بسيط يتفاعل مع الـ Hover
        if ( isset( $args->theme_location ) && $args->theme_location === 'HeaderLocation' ) {
            $arrow_icon = '<svg class="w-4 h-4 inline-block ms-1 transition-transform duration-200 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>';
            $title .= $arrow_icon;
        } 
        // للموبايل: فصل زر السهم تماماً عن اللينك لتجنب فتح الصفحة أثناء النقر
        elseif ( isset( $args->theme_location ) && $args->theme_location === 'mobileLocation' ) {
            $arrow_btn = '</a|><button type="button" class="mobile-submenu-toggle p-2 text-gray-400 hover:text-white focus:outline-none" aria-label="Toggle Submenu">
                <svg class="w-4 h-4 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button><a-fake>';
            $title .= $arrow_btn;
        }
    }

    return $title;
}
add_filter( 'nav_menu_item_title', 'wameed_add_menu_arrow', 10, 4 );


// 3. معالجة إغلاق وفتح الأوسمة لزر الموبايل المنفصل
function wameed_fix_mobile_button_markup( $item_output, $item, $depth, $args ) {
    if ( isset( $args->theme_location ) && $args->theme_location === 'mobileLocation' ) {
        if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
            // إغلاق وشم الـ <a> الأول ليفصل السهم عن الرابط الأصلي
            $item_output = str_replace( '</a|>', '</a>', $item_output );
            $item_output = str_replace( '<a-fake>', '', $item_output );
            $item_output = str_replace( '</a></a|>', '</a>', $item_output );
        }
    }
    return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'wameed_fix_mobile_button_markup', 10, 4 );


// 4. إضافة كلاسات للـ Submenu لتنسيق المنسدلة بدون فجوات (يحل مشكلة الـ Hover)
function wameed_add_submenu_classes( $classes, $args, $depth ) {
    if ( isset( $args->theme_location ) && $args->theme_location === 'HeaderLocation' ) {
        // pt-2 تحمي منطقة الحركة بين الرابط والقائمة المنسدلة لمنع اختفائها
        $classes[] = 'absolute right-0 top-full pt-2 hidden group-hover:block z-50 min-w-[200px] list-none p-0 m-0';
    } elseif ( isset( $args->theme_location ) && $args->theme_location === 'mobileLocation' ) {
        $classes[] = 'mobile-sub-menu hidden pl-4 mt-2 space-y-2 list-none border-r-2 border-gray-700 mr-2';
    }
    return $classes;
}
add_filter( 'nav_menu_submenu_css_class', 'wameed_add_submenu_classes', 10, 3 );