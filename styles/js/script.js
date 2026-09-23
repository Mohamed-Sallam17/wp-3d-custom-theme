/* header sub menu toggle  */

document.addEventListener('click', function (e) {
    const toggleBtn = e.target.closest('.mobile-submenu-toggle');
    if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentLi = toggleBtn.closest('li');
        const subMenu = parentLi.querySelector('.mobile-sub-menu');
        const svgIcon = toggleBtn.querySelector('svg');

        if (subMenu) {
            subMenu.classList.toggle('hidden');
            if (svgIcon) {
                svgIcon.classList.toggle('rotate-180');
            }
        }
    }
});