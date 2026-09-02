<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function wameed_enqueue_slider_scripts() {
    $vite_server     = 'http://localhost:5173';
    $is_dev_running  = false;

    // فحص بيئة التطوير المحلي (Localhost) فقط لتقليل البطء على السيرفر الحي
    if ( in_array( $_SERVER['REMOTE_ADDR'] ?? '', array( '127.0.0.1', '::1' ), true ) ) {
        $connection = @fsockopen( 'localhost', 5173, $errno, $errstr, 0.1 );
        if ( $connection ) {
            $is_dev_running = true;
            fclose( $connection );
        }
    }

    $handle = 'wameed-horizontal-slider';

    if ( $is_dev_running ) {
        // --- وضع التطوير المباشر (HMR Dev Mode) ---
        wp_enqueue_script( 'vite-client', $vite_server . '/@vite/client', array(), null, false );
        wp_enqueue_script( $handle, $vite_server . '/src/main.jsx', array( 'vite-client' ), null, true );
    } else {
        // --- وضع الإنتاج والرفع (Production Build Mode) ---
        $dist_js  = get_theme_file_uri( '/dist/assets/main.js' );
        $dist_css = get_theme_file_uri( '/dist/assets/main.css' );
        $css_path = get_theme_file_path( '/dist/assets/main.css' );

        // استدعاء ملف الـ JS الرئيسي الخاص بالـ Build
        wp_enqueue_script(
            $handle,
            $dist_js,
            array(),
            '1.0.0',
            true
        );

        // استدعاء ملف الـ CSS إذا تم إنشاؤه أثناء الـ Build
        if ( file_exists( $css_path ) ) {
            wp_enqueue_style(
                'wameed-main-style',
                $dist_css,
                array(),
                '1.0.0'
            );
        }
    }

    // تمرير البيانات الديناميكية إلى React
    wp_localize_script( $handle, 'appLocalData', array(
        'apiUrl'   => esc_url_raw( rest_url( 'wp/v2/' ) ),
        'baseUrl'  => esc_url_raw( site_url( '/' ) ),
        'themeUrl' => get_template_directory_uri(),
        'nonce'    => wp_create_nonce( 'wp_rest' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'wameed_enqueue_slider_scripts' );

/**
 * حقن الـ Preamble الخاص بـ React Fast Refresh في بيئة التطوير المحلي فقط
 */
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

/**
 * إضافة type="module" لملفات الـ JS الخاصة بـ Vite
 */
add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {
    if ( in_array( $handle, array( 'vite-client', 'wameed-horizontal-slider' ), true ) ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>';
    }
    return $tag;
}, 10, 3 );