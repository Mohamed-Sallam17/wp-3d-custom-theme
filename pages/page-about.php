<?php get_header(); ?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<div data-barba="wrapper">
<main data-barba="container" data-barba-namespace="<?php echo sanitize_title(get_post_field('post_name')); ?>">

    <h1>About page run </h1>
<h2><?php the_title(); ?></h2>



</main>
</div>

<?php get_footer() ?>