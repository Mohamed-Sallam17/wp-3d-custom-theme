
</div> 

<footer 
  style="
    --bg-mobile: url('<?php echo get_theme_file_uri('/assets/footer/footerbg-small.png'); ?>');
    --bg-tablet: url('<?php echo get_theme_file_uri('/assets/footer/footerbg-md.png'); ?>');
    --bg-tablet-lg: url('<?php echo get_theme_file_uri('/assets/footer/footerbg-lg.png'); ?>');
    --bg-laptob-xl: url('<?php echo get_theme_file_uri('/assets/footer/footerbg-xl-1.png'); ?>');
    --bg-desktop: url('<?php echo get_theme_file_uri('/assets/footer/footerbg-2xl.png'); ?>');
  "
  class="bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-tablet)] lg:bg-[image:var(--bg-tablet-lg)] xl:bg-[image:var(--bg-laptob-xl)] 2xl:bg-[image:var(--bg-desktop)] bg-cover bg-center rounded-base mt-50">
  <div class="footer-logo-mobile xl:hidden! -translate-y-[60%]">
      <img src="<?php echo get_theme_file_uri("/assets/footer/footer-logo.png") ?>" alt="footer logo" class="w-full h-full max-w-[25%] m-auto" />
  </div>
    <div class="container">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 py-10 xl:pt-60 mt-16 sm:mt-0">
            <div class="flex flex-1 gap-4 w-full lg:flex-row justify-evenly">
                <div class="font-bold text-center lg:text-center">
                    <h4 class="gradient-text text-2xl xl:text-3xl mb-6">الصفحات</h4>
                    <ul class="flex flex-col space-y-4">
                        <li class="text-lg xl:text-xl">
                            <a href="/">
                                <span>الرئيسية</span>
                            </a>
                        </li>
                        <li class="text-lg xl:text-xl">
                            <a href="/">
                                <span>من نحن</span>
                            </a>
                        </li>
                        <li class="text-lg xl:text-xl">
                            <a href="/">
                                <span>تواصل معنا</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="font-bold text-center lg:text-center">
                    <h4 class="gradient-text text-2xl xl:text-3xl mb-6">اتصل بنا</h4>
                    <ul class="flex flex-col space-y-4">
                        <li class="text-lg xl:text-xl">
                            <a href="https://wa.me/+966558001950">
                                <span>966558001950+</span>
                            </a>
                        </li>
                        <li class="text-lg xl:text-xl">
                            <a href="https://wa.me/+966530958659">
                                <span>966530958659+</span>
                            </a>
                        </li>
                        <li class="text-lg xl:text-xl">
                            <a href="mailto:info@wameedagency.sa">
                                <span>info@wameedagency.sa</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-logo flex-2 hidden xl:flex!">
                <img src="<?php echo get_theme_file_uri("/assets/footer/footer-logo.png") ?>" alt="footer logo" class="w-full h-full max-w-1/2 m-auto" />
            </div>
            <div class="flex flex-1 flex-col lg:flex-row w-full justify-center">
                <div class="newsletter"></div>
                <div class="action-links">
                    <div class="flex w-full gap-4 justify-center">
                        <a href="#"  class="inline-block max-w-[120px]">
                            <img src="<?php echo get_theme_file_uri("/assets/footer/footer-1.png") ?>" width="99" height="100" alt="" class="w-full lg:max-w-full object-contain" />
                        </a>
                        <a href="#" class="inline-block max-w-[120px] lg:max-w">
                            <img src="<?php echo get_theme_file_uri("/assets/footer/footer-2.png") ?>" width="99" height="100" alt="" class="w-full lg:max-w-full object-contain" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyrights py-4 text-center font-bold">
            <p>© 2026 وميض. جميع الحقوق محفوظة. powered by ART.Ahmed Hamed</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>