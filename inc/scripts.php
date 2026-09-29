<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function wameed_enqueue_slider_scripts() {
    $vite_server     = 'http://localhost:5173';
    $is_dev_running  = false;

    if ( in_array( $_SERVER['REMOTE_ADDR'] ?? '', array( '127.0.0.1', '::1' ), true ) ) {
        $connection = @fsockopen( 'localhost', 5173, $errno, $errstr, 0.1 );
        if ( $connection ) {
            $is_dev_running = true;
            fclose( $connection );
        }
    }

    $handle = 'wameed-horizontal-slider';

    if ( $is_dev_running ) {
        wp_enqueue_script( 'vite-client', $vite_server . '/@vite/client', array(), null, false );
        wp_enqueue_script( $handle, $vite_server . '/src/main.jsx', array( 'vite-client' ), null, true );
    } else {
        $dist_js  = get_theme_file_uri( '/dist/assets/main.js' );
        $dist_css = get_theme_file_uri( '/dist/assets/main.css' );
        $css_path = get_theme_file_path( '/dist/assets/main.css' );

        wp_enqueue_script(
            $handle,
            $dist_js,
            array(),
            '1.0.0',
            true
        );

        if ( file_exists( $css_path ) ) {
            wp_enqueue_style(
                'wameed-main-style',
                $dist_css,
                array(),
                '1.0.0'
            );
        }
    }

    wp_localize_script( $handle, 'appLocalData', array(
        'apiUrl'   => esc_url_raw( rest_url( 'wp/v2/' ) ),
        'baseUrl'  => esc_url_raw( site_url( '/' ) ),
        'themeUrl' => get_template_directory_uri(),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'wameed_enqueue_slider_scripts' );


add_action( 'wp_head', function() {
    if ( in_array( $_SERVER['REMOTE_ADDR'] ?? '', array( '127.0.0.1', '::1' ), true ) ) {
        $connection = @fsockopen( 'localhost', 5173, $errno, $errstr, 0.1 );
        if ( $connection ) {
            fclose( $connection );
            echo '<script type="module">
                import RefreshRuntime from "http://localhost:5173/@react-refresh";
                RefreshRuntime.injectIntoGlobalHook(window);
                window.$RefreshReg$ = () => {};
                window.$RefreshSig$ = () => (type) => type;
                window.__vite_plugin_react_preamble_installed__ = true;
            </script>';
        }
    }
}, 1 );


add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {
    if ( in_array( $handle, array( 'vite-client', 'wameed-horizontal-slider' ), true ) ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>';
    }
    return $tag;
}, 10, 3 );