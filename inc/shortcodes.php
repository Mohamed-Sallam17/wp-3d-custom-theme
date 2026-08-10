<?php
// 1. شورت كود السلايدر
function wameed_slider_shortcode() {
    return '
    <div id="react-horizontal-slider">
        <div class="animate-pulse flex space-x-4 p-4">
            <div class="rounded-lg bg-gray-200 h-48 w-full"></div>
        </div>
    </div>';
}
add_shortcode( 'react_slider', 'wameed_slider_shortcode' );

// 2. شورت كود صفحة About
function wameed_about_shortcode() {
    return '<div id="react-about-section"></div>';
}
add_shortcode( 'react_about', 'wameed_about_shortcode' );

// 3. شورت كود صفحة Services
function wameed_services_shortcode() {
    return '<div id="react-services-section"></div>';
}
add_shortcode( 'react_services', 'wameed_services_shortcode' );