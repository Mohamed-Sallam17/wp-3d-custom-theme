<? get_header(); ?>

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
    <main class="site-main">
<h2>page.php</h2>
    <!-- مكان ظهور السلايدر المخصص -->
    <div id="react-horizontal-slider-root">
        <!-- هيكل تحميل مؤقت ينتهي فور اشتغال React -->
        <div class="animate-pulse flex space-x-4 p-4">
            <div class="rounded-lg bg-gray-200 h-48 w-full"></div>
        </div>
    </div>

</main>

<?php }

?>

<?php get_footer(); ?>