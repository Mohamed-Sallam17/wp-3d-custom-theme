<?php

function fileTheme(){
    // wp_enqueue_style("mainCss", get_theme_file_uri("./style.css"));
    wp_enqueue_style("indexCss", get_theme_file_uri("./styles/css/index.css"));
    wp_enqueue_script("mainJs", get_theme_file_uri("./styles/js/script.js"), Null , "1.0" , true);
}


add_action("wp_enqueue_scripts", "fileTheme");
  
?>