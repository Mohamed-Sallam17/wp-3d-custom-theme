// Intro Loader 
function initIntroLoader() {
  const loader = document.getElementById("intro-loader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.remove();
    }, 400);
  }, 2000);
}



// Header Sub Menu Toggle 
function initHeaderSubMenuToggle() {
  document.addEventListener("click", function (e) {
    const toggleBtn = e.target.closest(".mobile-submenu-toggle");

    if (!toggleBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const parentLi = toggleBtn.closest("li");
    const subMenu = parentLi.querySelector(".mobile-sub-menu");
    const svgIcon = toggleBtn.querySelector("svg");

    if (subMenu) {
      subMenu.classList.toggle("hidden");

      if (svgIcon) {
        svgIcon.classList.toggle("rotate-180");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initIntroLoader();
  initHeaderSubMenuToggle();
});
