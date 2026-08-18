<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div
    id="react-service-page"
    data-service-slug="<?php echo esc_attr( get_post_field( 'post_name', get_the_ID() ) ); ?>"
></div>