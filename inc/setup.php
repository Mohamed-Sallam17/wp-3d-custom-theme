<?php 
/**
 * Theme Setup and Configuration
 *
 * @package Wameed
 */

if ( ! function_exists( 'wameed_theme_setup' ) ) {

    function wameed_theme_setup(){
        // Theme Supports
        add_theme_support("title-tag");
        add_theme_support( 'post-thumbnails' );

        // Register Navigation Menus
        register_nav_menus( array(
            'HeaderLocation' => __( 'Header', 'wameed' ),
            'footerLocation' => __( 'Footer', 'wameed' ),
            'mobileLocation' => __( 'Mobile', 'wameed' ),
        ) );
    }
}

add_action( 'after_setup_theme', 'wameed_theme_setup' );


?>