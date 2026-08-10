<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; 
}


function wameed_route_pages_from_pages_folder( $template ) {
    if ( is_page() ) {
        global $post;
        $slug = $post->post_name;

        $custom_page_template = get_template_directory() . "/pages/page-{$slug}.php";

        if ( file_exists( $custom_page_template ) ) {
            return $custom_page_template;
        }
    }

    return $template;
}
add_filter( 'page_template', 'wameed_route_pages_from_pages_folder' );