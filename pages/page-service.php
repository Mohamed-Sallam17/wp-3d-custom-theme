<?php

/**
 * Template Name: Single Service Page
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();


$service_slug = get_post_field(
    'post_name',
    get_the_ID()
);
?>

    <div id="service-page" data-service-slug="<?php echo esc_attr( $service_slug ); ?>"></div>

</div>

<?php

get_footer();