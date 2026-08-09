<?php
/**
 * Custom Filters for Nav Menus
 *
 * @package Wameed
 */


function wameed_add_menu_arrow( $title, $item, $args, $depth ) {
    if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
        $arrow_icon = '<svg class="w-4 h-4 inline-block ms-1 transition-transform duration-200 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>';

        $title .= $arrow_icon;
    }

    return $title;
}
add_filter( 'nav_menu_item_title', 'wameed_add_menu_arrow', 10, 4 );


function wameed_add_menu_li_classes( $classes, $item, $args ) {
    if ( in_array( 'menu-item-has-children', $classes, true ) ) {
        $classes[] = 'relative group';
    }

    return $classes;
}
add_filter( 'nav_menu_css_class', 'wameed_add_menu_li_classes', 10, 3 );