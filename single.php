<? get_header(); ?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<div data-barba="wrapper">
<main data-barba="container" data-barba-namespace="<?php echo sanitize_title(get_post_field('post_name')); ?>">

<?php  
while(have_posts()){
    the_post(); ?> 
    <h1> <?php the_title(); ?> </h1>
    <div> <?php the_content(); ?> </div>
<?php } 

?>

</main>
</div>


<?php get_footer(); ?>