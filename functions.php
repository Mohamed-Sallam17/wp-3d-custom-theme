<?php

function fileTheme(){
    // wp_enqueue_style("mainCss", get_theme_file_uri("./style.css"));
    wp_enqueue_style("indexCss", get_theme_file_uri("./styles/css/index.css"));
    wp_enqueue_style("mainCss", get_theme_file_uri("./styles/css/main.css"));
    wp_enqueue_style("fixedCss", get_theme_file_uri("./styles/css/fixed.css"));
    wp_enqueue_script("mainJs", get_theme_file_uri("./styles/js/script.js"), Null , "1.0" , true);
}

add_action("wp_enqueue_scripts", "fileTheme");

function supportTheme(){
    add_theme_support("title-tag");
}
function theme_regestration_nav_menu(){
    register_nav_menu("HeaderLocation", "Header");
    register_nav_menu("footerLocation", "Footer");
    register_nav_menu("mobileLocation", "Mobile");
}

add_action("after_setup_theme","supportTheme");
add_action("after_setup_theme","theme_regestration_nav_menu");
  
?>