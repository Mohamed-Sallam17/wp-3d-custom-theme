<?php
get_header(); // يستدعي header.php وبداية data-barba="container"

// جلب ID الصفحة المحددة كصفحة مدونة من الإعدادات
$blog_page_id = get_option('page_for_posts');

// تحديد العنوان والوصف حسب نوع الصفحة (مدونة أم أرشيف تصنيف)
if (is_home()) {
    $page_title   = get_the_title($blog_page_id) ?: 'المدونة';
    $page_content = get_post_field('post_content', $blog_page_id);
} else {
    $page_title   = get_the_archive_title();
    $page_content = get_the_archive_description();
}
?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<div data-barba="wrapper">
<main data-barba="container" data-barba-namespace="<?php echo is_home() ? 'blog' : 'archive'; ?>">

<div class="blog-page-wrapper py-12 px-4 max-w-7xl mx-auto">

    <!-- 1. العنوان والوصف الرئيسي -->
    <div class="text-center mb-10">
        <h1 class="gradient-text text-3xl md:text-5xl leading-normal font-bold mb-4">
            <?php echo esc_html($page_title); ?>
        </h1>
        
        <?php if (!empty($page_content)) : ?>
            <div class="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                <?php 
                if (is_home()) {
                    echo apply_filters('the_content', $page_content);
                } else {
                    echo wp_kses_post($page_content);
                }
                ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- 2. فلتر التصنيفات الديناميكي (Dynamic Categories Filter) -->
    <div class="categories-filter flex flex-wrap justify-center gap-3 mb-12">
        <?php
        $categories = get_categories(array(
            'orderby'    => 'name',
            'parent'     => 0,
            'hide_empty' => true,
        ));
        $blog_page_url = get_permalink($blog_page_id);
        
        // التحقق مما إذا كنا في الصفحة الرئيسية للمدونة
        $is_all_active = is_home();
        ?>
        
        <!-- زر الكل -->
        <a href="<?php echo esc_url($blog_page_url); ?>" 
           class="px-5 py-2 rounded-full text-sm font-medium border transition-all <?php echo $is_all_active ? 'bg-primary border-primary text-white' : 'border-gray-700 text-gray-300 hover:border-primary hover:text-white'; ?>">
           الكل
        </a>

        <!-- أزرار التصنيفات -->
        <?php foreach ($categories as $category) : 
            $is_cat_active = is_category($category->term_id);
        ?>
            <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" 
               class="px-5 py-2 rounded-full text-sm font-medium border transition-all <?php echo $is_cat_active ? 'bg-primary border-primary text-white' : 'border-gray-700 text-gray-300 hover:border-primary hover:text-white'; ?>">
                <?php echo esc_html($category->name); ?>
            </a>
        <?php endforeach; ?>
    </div>

    <!-- 3. شبكة المقالات (Post Cards) -->
    <?php if (have_posts()) : ?>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <?php while (have_posts()) : the_post(); ?>
                <article class=" gradient-bg rounded-2xl overflow-hidden flex flex-col group">
                    
                    <!-- صورة المقال -->
                    <a href="<?php the_permalink(); ?>" class="relative h-52 overflow-hidden block">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('medium_large', [
                                'class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                            ]); ?>
                        <?php else : ?>
                            <div class="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                لا توجد صورة
                            </div>
                        <?php endif; ?>
                    </a>

                    <!-- تفاصيل المقال -->
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex items-center gap-3 text-xs text-gray-400 mb-3">
                            <?php 
                            $cats = get_the_category();
                            if (!empty($cats)) : ?>
                                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                                    <?php echo esc_html($cats[0]->name); ?>
                                </span>
                            <?php endif; ?>
                            <span><?php echo get_the_date('j F Y'); ?></span>
                        </div>

                        <h2 class="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_title(); ?>
                            </a>
                        </h2>

                        <p class="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                            <?php echo get_the_excerpt(); ?>
                        </p>

                        <a href="<?php the_permalink(); ?>" class="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all">
                            اقرأ المزيد 
                            <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </a>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <!-- 4. الباجينيشن (Pagination) مع أزرار التالي والسابق والأرقام -->
        <div class="pagination-wrapper mt-16 flex justify-center">
            <?php
            $pagination_links = paginate_links(array(
                'prev_text' => '<span class="flex items-center gap-1"><svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> السابق</span>',
                'next_text' => '<span class="flex items-center gap-1">التالي <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></span>',
                'type'      => 'array',
            ));

            if (!empty($pagination_links)) : ?>
                <nav class="flex flex-wrap items-center gap-2" aria-label="Pagination">
                    <?php foreach ($pagination_links as $link) : 
                        // تحسين تنسيقات Tailwind للروابط
                        $link = str_replace('page-numbers', 'px-4 py-2 rounded-lg text-sm font-medium border border-gray-800 bg-gray-900/60 text-gray-300 hover:border-primary hover:text-white transition-all', $link);
                        $link = str_replace('current', 'bg-primary border-primary text-white font-bold', $link);
                        echo $link;
                    endforeach; ?>
                </nav>
            <?php endif; ?>
        </div>

    <?php else : ?>
        <div class="text-center py-16 bg-gray-900/30 rounded-2xl border border-gray-800">
            <p class="text-gray-400 text-lg">لا توجد مقالات حالياً في هذا القسم.</p>
        </div>
    <?php endif; ?>

</div>

</main>
</div>

<?php get_footer(); ?>