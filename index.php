<? get_header(); ?>

<h1><?php blogInfo("name") ?></h1>

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

<?php get_footer(); ?>