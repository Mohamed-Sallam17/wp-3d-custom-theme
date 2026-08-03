<? get_header(); ?>

<h1>page.php</h1>

<?php while(have_posts()){
    the_post();?>
    <h1><?php the_title(); ?></h1>
    <div><?php the_content(); ?></div>

<?php }

?>

<?php get_footer(); ?>