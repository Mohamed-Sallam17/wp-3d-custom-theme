<?php
get_header(); // يستدعي header.php وبداية data-barba="container"
?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<div data-barba="wrapper">
<main data-barba="container" data-barba-namespace="single-post">

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <article class="single-post-wrapper py-12 px-4 max-w-5xl mx-auto">
        
        <!-- 1. الهيدر والمسار (Header & Meta) -->
        <header class="text-center mb-10">
            <!-- التصنيف -->
            <div class="flex items-center justify-center gap-2 mb-4">
                <?php 
                $categories = get_the_category();
                if (!empty($categories)) : 
                    foreach ($categories as $category) : ?>
                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" 
                           class="bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-primary hover:text-white transition-all">
                            <?php echo esc_html($category->name); ?>
                        </a>
                    <?php endforeach;
                endif; 
                ?>
            </div>

            <!-- عنوان المقال -->
            <h1 class="gradient-text text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <?php the_title(); ?>
            </h1>

            <!-- بيانات المقال (تاريخ - كاتب) -->
            <div class="flex items-center justify-center gap-6 text-sm text-gray-400 border-y border-gray-800/80 py-4 max-w-xl mx-auto">
                <div class="flex items-center gap-2">
                    <?php echo get_avatar(get_the_author_meta('ID'), 32, '', '', array('class' => 'rounded-full border border-gray-700')); ?>
                    <span><?php the_author(); ?></span>
                </div>
                <span>•</span>
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date('j F Y'); ?></time>
                </div>
            </div>
        </header>

        <!-- 2. صورة المقال الرئيسية (Featured Image) -->
        <?php if (has_post_thumbnail()) : ?>
            <div class="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 border border-gray-800 shadow-2xl">
                <?php the_post_thumbnail('full', [
                    'class' => 'w-full h-full object-cover'
                ]); ?>
            </div>
        <?php endif; ?>

        <!-- 3. محتوى المقال (Post Content) -->
        <div class="post-content text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-16 space-y-6">
            <?php the_content(); ?>
        </div>

        <!-- 4. أزرار التنقل بين المقالات (Next / Prev Navigation) -->
        <div class="border-t border-gray-800 pt-8 mb-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <?php
                $prev_post = get_previous_post();
                $next_post = get_next_post();
                ?>

                <!-- المقال السابق -->
                <div>
                    <?php if (!empty($prev_post)) : ?>
                        <a href="<?php echo esc_url(get_permalink($prev_post->ID)); ?>" 
                           class="group p-5 rounded-2xl gradient-bg  flex flex-col gap-2 transition-all block">
                            <span class="text-xs text-gray-500 flex items-center gap-1 group-hover:text-primary transition-colors">
                                <svg class="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                المقال السابق
                            </span>
                            <span class="text-white font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                                <?php echo esc_html(get_the_title($prev_post->ID)); ?>
                            </span>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- المقال التالي -->
                <div class="text-left">
                    <?php if (!empty($next_post)) : ?>
                        <a href="<?php echo esc_url(get_permalink($next_post->ID)); ?>" 
                           class="group p-5 rounded-2xl gradient-bg flex flex-col gap-2 transition-all block items-end">
                            <span class="text-xs text-gray-500 flex items-center gap-1 group-hover:text-primary transition-colors">
                                المقال التالي
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="text-white font-semibold line-clamp-1 group-hover:text-primary transition-colors text-right">
                                <?php echo esc_html(get_the_title($next_post->ID)); ?>
                            </span>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- 5. قسم المقالات ذات الصلة (Related Posts) -->
        <?php
        $orig_post = $post;
        global $post;
        $tags = wp_get_post_categories($post->ID);

        if ($tags) :
            $args = array(
                'category__in'     => $tags,
                'post__not_in'     => array($post->ID),
                'posts_per_page'   => 3,
                'ignore_sticky_posts' => 1
            );

            $related_query = new WP_Query($args);

            if ($related_query->have_posts()) : ?>
                <section class="related-posts border-t border-gray-800 pt-12">
                    <h3 class="text-2xl font-bold text-white mb-8 text-center md:text-right">مقالات ذات صلة</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <?php while ($related_query->have_posts()) : $related_query->the_post(); ?>
                            <article class="gradient-bg rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col group">
                                <a href="<?php the_permalink(); ?>" class="relative h-40 overflow-hidden block">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <?php the_post_thumbnail('medium', ['class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500']); ?>
                                    <?php else : ?>
                                        <div class="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">لا توجد صورة</div>
                                    <?php endif; ?>
                                </a>

                                <div class="p-5 flex flex-col flex-grow">
                                    <span class="text-xs text-gray-500 mb-2"><?php echo get_the_date('j F Y'); ?></span>
                                    <h4 class="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h4>
                                </div>
                            </article>
                        <?php endwhile; ?>
                    </div>
                </section>
            <?php endif;
            wp_reset_postdata();
        endif;
        $post = $orig_post;
        ?>

    </article>

<?php endwhile; endif; ?>

</main>
</div>

<?php get_footer(); ?>