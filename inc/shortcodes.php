<?php
/**
 * Shortcodes Registration File
 */


function wameed_slider_shortcode( $atts ) {
    
    $atts = shortcode_atts( array(
        'title'    => 'خدمات تسويقية ذكية',
        'limit'    => '10',
        'category' => 'all',
    ), $atts, 'horizintal_slider' );

    return sprintf(
        '<div id="react-horizontal-slider" data-title="%s" data-limit="%s" data-category="%s">
            <div class="animate-pulse flex space-x-4 p-4">
                <div class="rounded-lg bg-gray-900 h-96 w-full"></div>
            </div>
        </div>',
        esc_attr( $atts['title'] ),
        esc_attr( $atts['limit'] ),
        esc_attr( $atts['category'] )
    );
}
add_shortcode( 'horizintal_slider', 'wameed_slider_shortcode' );
