import { gsap } from "gsap";

let cleanupFooter = null;

export const initFooterLogoAnimation = () => {
const footer = document.querySelector("footer");
const footerLogoImg = document.querySelector(".footer-logo img");

if (!footer || !footerLogoImg) return;

if (cleanupFooter) {
cleanupFooter();
cleanupFooter = null;
}

const mm = gsap.matchMedia();

mm.add("(min-width: 1280px)", () => {
gsap.set(footerLogoImg, {
yPercent: 0,
skewX: 0,
skewY: 0,
rotationX: 0,
rotationY: 0,
transformOrigin: "center center",
});

const skewXTo = gsap.quickTo(footerLogoImg, "skewX", {
  duration: 0.4,
  ease: "power2.out",
});

const skewYTo = gsap.quickTo(footerLogoImg, "skewY", {
  duration: 0.4,
  ease: "power2.out",
});

const rotateTo = gsap.quickTo(footerLogoImg, "rotationY", {
  duration: 0.4,
  ease: "power2.out",
});

const rotateXTo = gsap.quickTo(footerLogoImg, "rotationX", {
  duration: 0.4,
  ease: "power2.out",
});

const updateLogoPosition = () => {
  const rect = footer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const progress = gsap.utils.clamp(
    0,
    1,
    (viewportHeight - rect.top) / rect.height
  );

  gsap.set(footerLogoImg, {
    yPercent: -140 * progress,
  });
};

const handleMouseMove = (e) => {
  const rect = footer.getBoundingClientRect();

  if (!rect.width || !rect.height) return;

  const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
  const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

  skewXTo(mouseX * 15);
  skewYTo(mouseY * -10);
  rotateTo(mouseX * 20);
  rotateXTo(mouseY * -20);
};

const handleMouseLeave = () => {
  skewXTo(0);
  skewYTo(0);
  rotateTo(0);
  rotateXTo(0);
};

window.addEventListener("scroll", updateLogoPosition, {
  passive: true,
});

window.addEventListener("resize", updateLogoPosition);

footer.addEventListener("mousemove", handleMouseMove);
footer.addEventListener("mouseleave", handleMouseLeave);

requestAnimationFrame(updateLogoPosition);

return () => {
  window.removeEventListener("scroll", updateLogoPosition);
  window.removeEventListener("resize", updateLogoPosition);

  footer.removeEventListener("mousemove", handleMouseMove);
  footer.removeEventListener("mouseleave", handleMouseLeave);

  gsap.set(footerLogoImg, {
    clearProps: "transform",
  });
};

});

cleanupFooter = () => {
mm.revert();
};
};

export const cleanupFooterLogoAnimation = () => {
if (cleanupFooter) {
cleanupFooter();
cleanupFooter = null;
}
};