import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let footerMatchMedia = null;

export const initFooterLogoAnimation = () => {
  const footerLogoImg = document.querySelector('.footer-logo img');
  const footer = document.querySelector('footer');

  if (!footerLogoImg || !footer) return;

  if (footerMatchMedia) {
    footerMatchMedia.revert();
  }

  footerMatchMedia = gsap.matchMedia();

  footerMatchMedia.add("(min-width: 1280px)", () => {
    gsap.set(footerLogoImg, {
      transformOrigin: "center center",
      clearProps: "transform"
    });

    const scrollTween = gsap.fromTo(
      footerLogoImg,
      { yPercent: 0 },
      {
        yPercent: -140,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      }
    );

    const skewXTo = gsap.quickTo(footerLogoImg, "skewX", { duration: 0.4, ease: "power2.out" });
    const skewYTo = gsap.quickTo(footerLogoImg, "skewY", { duration: 0.4, ease: "power2.out" });
    const rotateTo = gsap.quickTo(footerLogoImg, "rotateY", { duration: 0.4, ease: "power2.out" });
    const rotateXTo = gsap.quickTo(footerLogoImg, "rotateX", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();
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

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  });
};