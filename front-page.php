<?php 

/**
 * Template Name: Home
 */


get_header(); 

?>

<div 
    id="intro-loader" 
    style=" 
        position: fixed;
        inset: 0;
        z-index: 999999;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        opacity: 1;
        visibility: visible;
        transition: opacity 400ms ease, visibility 400ms ease; 
">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo-intro.gif'); ?>" alt="logo-intro" width="600" height="100" >
</div>

<!-- <div id="intro-loader"></div> -->
<section id="moving-star" class="md:mt-20 lg:mt-0"></section>
<section id="horizontal-slider" class="py-8 mt-20 overflow-hidden"></section>
<section id="works-stack" class="py-8 mt-20"></section>
<section id="vision" class="py-8 mt-20"></section>
<section id="platforms" class="py-8 mt-20"></section>
<section id="Testimonials" class="py-8 mt-20"></section>
<section id="faq" class="py-8 mt-20"></section>
<section id="countries-list" class="py-8 mt-20"></section>
<section id="contact-us" class="py-8 mt-20"></section>


<?php get_footer(); ?>




