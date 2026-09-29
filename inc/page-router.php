<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}


add_filter( 'theme_page_templates', 'wameed_register_custom_pages_templates', 10, 4 );
function wameed_register_custom_pages_templates( $post_templates, $wp_theme, $post, $post_type ) {
    $pages_dir = get_template_directory() . '/pages/';

    if ( is_dir( $pages_dir ) ) {
        $files = glob( $pages_dir . '*.php' );

        foreach ( $files as $file ) {
            $data = get_file_data( $file, array(
                'name' => 'Template Name',
            ) );

            if ( ! empty( $data['name'] ) ) {
                $filename = 'pages/' . basename( $file );
                $post_templates[ $filename ] = $data['name'];
            }
        }
    }

    return $post_templates;
}


add_filter( 'page_template', 'wameed_load_custom_pages_templates' );
function wameed_load_custom_pages_templates( $template ) {
    if ( is_page() ) {
        global $post;

        $custom_template = get_page_template_slug();

        if ( $custom_template && file_exists( get_template_directory() . '/' . $custom_template ) ) {
            return get_template_directory() . '/' . $custom_template;
        }

        if ( isset( $post->post_parent ) && $post->post_parent ) {
            $parent_slug = get_post_field( 'post_name', $post->post_parent );

            if ( 'services' === $parent_slug ) {
                $service_template = get_template_directory() . '/pages/page-service.php';

                if ( file_exists( $service_template ) ) {
                    return $service_template;
                }
            }
        }
    }

    return $template;
}