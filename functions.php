<?php
/**
 * Wameed Theme functions and definitions
 *
 * @package Wameed
 */

define( 'WAMEED_VERSION', '1.0.0' );
define( 'WAMEED_DIR', get_template_directory() );
define( 'WAMEED_URI', get_template_directory_uri() );


require_once WAMEED_DIR . '/inc/setup.php';
require_once WAMEED_DIR . '/inc/menus.php';
require_once WAMEED_DIR . '/inc/enqueue.php';
require_once WAMEED_DIR . '/inc/customizer.php';
// require_once WAMEED_DIR . '/inc/routing.php';
// require_once WAMEED_DIR . '/inc/react-shortcodes.php';


require_once get_template_directory() . '/inc/shortcodes.php';



  

?>