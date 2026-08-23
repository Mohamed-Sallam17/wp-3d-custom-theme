<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


function wameed_route_pages_from_pages_folder( $template ) {

    if ( is_page() ) {

        global $post;


        /*
         * =========================
         * Service Pages
         * =========================
         */

        if ( $post->post_parent ) {

            $parent_slug = get_post_field(
                'post_name',
                $post->post_parent
            );

            if ( $parent_slug === 'services' ) {

                $service_template =
                    get_template_directory() . '/pages/page-service.php';

                if ( file_exists( $service_template ) ) {
                    return $service_template;
                }
            }
        }


        /*
         * =========================
         * Normal Pages
         * =========================
         */

        $slug = $post->post_name;

        $custom_page_template =
            get_template_directory() . "/pages/page-{$slug}.php";

        if ( file_exists( $custom_page_template ) ) {
            return $custom_page_template;
        }
    }


    return $template;
}


add_filter(
    'page_template',
    'wameed_route_pages_from_pages_folder'
);