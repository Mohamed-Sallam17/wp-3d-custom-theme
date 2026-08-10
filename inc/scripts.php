<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function wameed_enqueue_slider_scripts() {
    $vite_server = 'http://localhost:5173';
    $is_dev_running = false;

    // فحص تشغيل سيرفر ViteDev محلياً
    $connection = @fsockopen( 'localhost', 5173, $errno, $errstr, 1 );
    if ( $connection ) {
        $is_dev_running = true;
        fclose( $connection );
    }

    if ( $is_dev_running ) {
        // بيئة التطوير
        wp_enqueue_script( 'vite-client', $vite_server . '/@vite/client', array(), null, false );
        wp_enqueue_script( 'wameed-horizontal-slider', $vite_server . '/src/main.jsx', array( 'vite-client' ), null, true );
    } else {
        // بيئة الإنتاج والـ Build
        wp_enqueue_script(
            'wameed-horizontal-slider',
            get_theme_file_uri( '/dist/assets/main.js' ),
            array(),
            '1.0.0',
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'wameed_enqueue_slider_scripts' );

/**
 * حقن الـ Preamble الصحيح لـ React Fast Refresh
 */
add_action( 'wp_head', function() {
    $connection = @fsockopen( 'localhost', 5173, $errno, $errstr, 1 );
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
}, 1 );

/**
 * إضافة type="module"
 */
add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {
    if ( in_array( $handle, array( 'vite-client', 'wameed-horizontal-slider' ), true ) ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>';
    }
    return $tag;
}, 10, 3 );