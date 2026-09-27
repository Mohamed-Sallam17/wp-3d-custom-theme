<?php 

/**
 * Template Name: Contact Us
 */


get_header(); 

?>

<div class="loader">
    <div class="page-transition"></div>
</div>

<div data-barba="wrapper">
<main data-barba="container" data-barba-namespace="<?php echo sanitize_title(get_post_field('post_name')); ?>">


<section id="about-hero" data-page="contactUs" class="mt-10 py-8 xl:mt-0 xl:min-h-[80vh] xl:flex xl:justify-center lg:items-center"></section>
<section id="contact-us" class="py-8 mt-20"></section>
<section id="contact-notice" class="py-8 mt-20"></section>
<section id="platforms" class="py-8 mt-20"></section>
<section id="Testimonials" class="py-8 mt-20"></section>


</main>
</div>

<?php get_footer() ?>

