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

        // JS Scripts العادية
        wp_enqueue_script( 'wameed-main-js', get_theme_file_uri( '/styles/js/script.js' ), array(), '1.0', true );

        // -------------------------------------------------------------
        // إعدادات ربط React + Vite
        // -------------------------------------------------------------
        
        // التحقق مما إذا كنا في وضع التطوير Local / Debug
        $is_development = defined( 'WP_DEBUG' ) && WP_DEBUG;

        if ( $is_development ) {
            // 1. تحميل Vite Client الخاص بالـ Hot Reload
            wp_enqueue_script( 'vite-client', 'http://localhost:5173/@vite/client', array(), null, true );

            // 2. قراءة الكود المباشر من سيرفر Vite للتطوير اللحظي
            wp_enqueue_script( 'wameed-react-app', 'http://localhost:5173/src/main.jsx', array( 'vite-client' ), null, true );
        } else {
            // في وضع الإنتاج (Production): قراءة الملف التجمعي المكتمل من مجلد dist
            wp_enqueue_script(
                'wameed-react-app',
                get_theme_file_uri( '/dist/assets/main.js' ),
                array(),
                WAMEED_VERSION,
                true
            );
        }
    }
}
add_action( 'wp_enqueue_scripts', 'wameed_enqueue_assets' );

/**
 * إضافة خاصية type="module" لسكريبتات Vite لتعمل تقنيات ES Modules المباشرة في المتصفح
 */
add_filter( 'script_loader_tag', function( $tag, $handle, $src ) {
    if ( in_array( $handle, array( 'vite-client', 'wameed-react-app' ), true ) ) {
        return '<script type="module" src="' . esc_url( $src ) . '"></script>';
    }
    return $tag;
}, 10, 3 );