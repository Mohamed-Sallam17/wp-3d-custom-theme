<? get_header(); ?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<div data-barba="wrapper">
<main data-barba="container" data-barba-namespace="<?php echo sanitize_title(get_post_field('post_name')); ?>">


<div id="react-horizontal-slider"></div>
<div id="react-works-stack"></div>
<!-- <div class="next-section-end bg-red-500 h-50"></div> -->

<?php while(have_posts()){
    the_post();?>

    <?php 
    if(wp_get_post_parent_id(get_the_id())){ ?>
            <ol class="flex items-center whitespace-nowrap h-12">
                <li class="inline-flex items-center">
                    <a href="<?php echo get_permalink(wp_get_post_parent_id(get_the_id())) ?>" class="flex items-center text-sm text-muted-foreground-1 hover:text-primary-focus focus:outline-hidden focus:text-primary-focus" >
                    <?php echo get_the_title(wp_get_post_parent_id(get_the_id())); ?>
                    </a>
                    <svg class="shrink-0 mx-2 size-5 text-muted-foreground" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"/></svg>
                </li>
                <li class="inline-flex items-center">
                    <a href="#" class="flex items-center text-sm text-muted-foreground-1 hover:text-primary-focus focus:outline-hidden focus:text-primary-focus" >
                    <?php the_title(); ?>
                    </a>
                </li>
            </ol>
   <?php }
    
    ?>
    <div><?php the_content(); ?></div>





<?php }

?>

</main>


<?php get_footer(); ?>
