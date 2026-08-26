<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header();


$service_slug = get_post_field(
    'post_name',
    get_the_ID()
);
?>

<div class="loader">
    <div class="page-transition"></div>
</div>


<div data-barba="wrapper">

<main data-barba="container" data-barba-namespace="<?php echo sanitize_title(get_post_field('post_name')); ?>">

    <div id="service-page" data-service-slug="<?php echo esc_attr( $service_slug ); ?>"></div>

</main>

</div>

<?php

get_footer();