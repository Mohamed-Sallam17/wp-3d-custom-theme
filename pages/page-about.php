<?php

get_header();
?>

<h2> about-page.php </h2>

<?php 
// عرض سلايدر React بداخل القالب المباشر
echo do_shortcode('[wameed_slider]'); 
?>

<?php  
while(have_posts()){
    the_post(); ?> 
    <a href="<?php the_permalink(); ?>">
        <h1> <?php the_title(); ?> </h1>
    </a>
    <div> <?php the_content(); ?> </div>
    <hr>
<?php } 

?>

<?php get_footer() ?>