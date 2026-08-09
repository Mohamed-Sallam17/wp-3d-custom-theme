<?php
/**
 * Enqueue Theme Scripts and Styles
 *
 * @package Wameed
 */

if ( ! function_exists( 'wameed_enqueue_assets' ) ) {
    function wameed_enqueue_assets() {
        // CSS Styles
        wp_enqueue_style( 'wameed-index-css', get_theme_file_uri( '/styles/css/index.css' ), array(), WAMEED_VERSION );
        wp_enqueue_style( 'wameed-main-css', get_theme_file_uri( '/styles/css/main.css' ), array(), WAMEED_VERSION );
        wp_enqueue_style( 'wameed-fixed-css', get_theme_file_uri( '/styles/css/fixed.css' ), array(), WAMEED_VERSION );

        // JS Scripts
        wp_enqueue_script( 'wameed-main-js', get_theme_file_uri( '/styles/js/script.js' ), array(), '1.0', true );
    }
}
add_action( 'wp_enqueue_scripts', 'wameed_enqueue_assets' );

?>