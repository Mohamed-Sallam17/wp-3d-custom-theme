<?php get_header(); ?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<main data-barba="container" data-barba-namespace="<?php echo sanitize_title(get_post_field('post_name')); ?>">

<h2><?php the_title(); ?></h2>


</main>


<?php get_footer() ?>