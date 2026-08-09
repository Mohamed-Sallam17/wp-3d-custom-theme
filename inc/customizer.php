<?php
/**
 * Wameed Theme Customizer (Dynamic Google Fonts Fetcher)
 *
 * @package Wameed
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * دالة جلب قائمة جميع خطوط جوجل ديناميكياً
 */
function wameed_get_all_google_fonts() {
    // الفحص في الكاش لعدم تكرار الطلب
    $fonts = get_transient( 'wameed_google_fonts_list' );

    if ( false === $fonts || empty( $fonts ) ) {
        // جلب ملف القائمة الكاملة المحدث لخطوط جوجل
        $url      = 'https://cdn.jsdelivr.net/gh/baianat/google-fonts-arabic/fonts.json';
        $response = wp_remote_get( $url, array( 'timeout' => 15 ) );

        if ( is_wp_error( $response ) ) {
            // رابط بديل شامل لجميع خطوط جوجل بالكامل
            $url      = 'https://raw.githubusercontent.com/jonathantneal/google-fonts-complete/master/google-fonts.json';
            $response = wp_remote_get( $url, array( 'timeout' => 15 ) );
        }

        if ( ! is_wp_error( $response ) ) {
            $body = wp_remote_retrieve_body( $response );
            $data = json_decode( $body, true );

            if ( ! empty( $data ) && is_array( $data ) ) {
                $fonts = array();
                foreach ( $data as $font_key => $font_val ) {
                    // التكيف مع القوالب المختلفة لـ JSON
                    $font_name = is_array( $font_val ) ? ( $font_val['name'] ?? $font_key ) : $font_key;
                    $fonts[ $font_name ] = $font_name;
                }
                ksort( $fonts ); // ترتيب الخطوط أبجدياً
                set_transient( 'wameed_google_fonts_list', $fonts, MONTH_IN_SECONDS );
            }
        }
    }

    // إذا تعثر الجلب تماماً، يرجع قائمة بأهم الخطوط
    return ! empty( $fonts ) ? $fonts : array(
        'Cairo'                => 'Cairo',
        'Tajawal'              => 'Tajawal',
        'Alexandria'           => 'Alexandria',
        'Almarai'              => 'Almarai',
        'Amiri'                => 'Amiri',
        'IBM Plex Sans Arabic' => 'IBM Plex Sans Arabic',
        'Readex Pro'           => 'Readex Pro',
        'Rubik'                => 'Rubik',
        'Noto Kufi Arabic'     => 'Noto Kufi Arabic',
    );
}


function wameed_customize_register( $wp_customize ) {

    // 1. قسم الألوان
    $wp_customize->add_section( 'wameed_colors_section', array(
        'title'    => __( 'الألوان الأساسية', 'wameed' ),
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'wameed_bg_color', array( 'default' => '#0c0816', 'sanitize_callback' => 'sanitize_hex_color' ) );
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'wameed_bg_color', array(
        'label'   => __( 'لون الخلفية الرئيسي', 'wameed' ),
        'section' => 'wameed_colors_section',
    ) ) );

    $wp_customize->add_setting( 'wameed_primary_color', array( 'default' => '#7652d6', 'sanitize_callback' => 'sanitize_hex_color' ) );
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'wameed_primary_color', array(
        'label'   => __( 'اللون الرئيسي (Primary)', 'wameed' ),
        'section' => 'wameed_colors_section',
    ) ) );


    // 2. قسم الخطوط (استدعاء جميع خطوط جوجل بالدالة)
    $wp_customize->add_section( 'wameed_fonts_section', array(
        'title'    => __( 'إعدادات الخطوط', 'wameed' ),
        'priority' => 31,
    ) );

    $wp_customize->add_setting( 'wameed_primary_font', array(
        'default'           => 'Cairo',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'wameed_primary_font', array(
        'label'       => __( 'اختر خط الموقع (من بين جميع خطوط Google)', 'wameed' ),
        'section'     => 'wameed_fonts_section',
        'type'        => 'select',
        'choices'     => wameed_get_all_google_fonts(), // <-- هنا استدعاء الدالة مباشرةً
    ) );
}
add_action( 'customize_register', 'wameed_customize_register' );


/**
 * طباعة الخط المتغير بالـ CSS
 */
function wameed_customizer_css_output() {
    $bg_color      = get_theme_mod( 'wameed_bg_color', '#0c0816' );
    $primary_color = get_theme_mod( 'wameed_primary_color', '#7652d6' );
    $font_family   = get_theme_mod( 'wameed_primary_font', 'Cairo' );

    $font_slug = str_replace( ' ', '+', $font_family );
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=' . esc_attr( $font_slug ) . ':wght@300;400;600;700;800&display=swap">' . "\n";

    ?>
    <style type="text/css" id="wameed-customizer-css">
        :root {
            --color-bg-main: <?php echo esc_html( $bg_color ); ?>;
            --color-primary: <?php echo esc_html( $primary_color ); ?>;
            --font-main: '<?php echo esc_html( $font_family ); ?>', sans-serif;
        }

        body {
            background-color: var(--color-bg-main);
            font-family: var(--font-main);
        }
    </style>
    <?php
}
add_action( 'wp_head', 'wameed_customizer_css_output' );