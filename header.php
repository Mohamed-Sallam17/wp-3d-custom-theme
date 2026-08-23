<!DOCTYPE html >
<html <?php language_attributes(); ?> >
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <title>Document</title>
</head>
<script>
    window.wameedTheme = {
        themeUrl: "<?php echo esc_url(get_theme_file_uri()); ?>"
    };
</script>
<body <?php body_class(); ?> data-barba="wrapper">

<header class="sticky top-0 px-4 z-20">
  <nav aria-label="Global" class="mx-auto flex max-w-6xl items-center justify-between py-2 px-4 lg:px-8 bg-gray-900 rounded-[40rem] h-20">
    <div class="flex">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Company</span>
        <img src="<?php echo get_theme_file_uri("/assets/logo.png") ?>" alt="" class="h-14 w-auto" />
      </a>
    </div>
    <div class="flex lg:hidden">
      <button type="button" command="show-modal" commandfor="mobile-menu" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 cursor-pointer">
        <span class="sr-only">Open main menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <el-popover-group class="hidden lg:flex lg:gap-x-12 main-menu">
        <?php 
            wp_nav_menu(array(
              'theme_location' => 'HeaderLocation',
              'container'      => false, 
              'menu_class'     => 'flex items-center gap-6 list-none m-0 p-0', 
            ));
        ?>
    </el-popover-group>
    <div class="hidden lg:block contact-us-btn gradient-cta w-23.75 p-2 rounded-4xl text-center ">
      <a href="#" class="text-sm font-bold text-white"> تواصل معنا </a>
    </div>
  </nav>
  <el-dialog>
    <dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
      <div tabindex="0" class="fixed inset-0 focus:outline-none">
        <el-dialog-panel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--bg-color)] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img src="<?php echo get_theme_file_uri("./assets/logo.png") ?>" alt="" class="h-14 w-auto" />
            </a>
            <button type="button" command="close" commandfor="mobile-menu" class="-m-2.5 rounded-md p-2.5 text-gray-400">
              <span class="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
                <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-white/10">
              <div class="space-y-2 py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">الرئيسية</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">خدماتنا</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">من نحن</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">المدونة</a>
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5">تواصل معنا </a>
              </div>
              <div class="contact-us-btn w-23.75 p-2 rounded-4xl text-center my-6">
                <a href="#" class="text-sm font-bold text-white"> تواصل معنا </a>
              </div>
            </div>
          </div>
        </el-dialog-panel>
      </div>
    </dialog>
  </el-dialog>
</header>
