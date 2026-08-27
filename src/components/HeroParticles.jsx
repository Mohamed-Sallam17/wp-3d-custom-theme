import { useEffect, useRef } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import particlesConfig from "../../assets/particlesjs-config.json";

export default function HeroParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function initParticles() {
      // تحميل المحرك الخفيف
      await loadSlim(tsParticles);

      if (!isMounted) return;

      // تنظيف أي Instance قديمة
      if (containerRef.current) {
        containerRef.current.destroy();
      }

      // تشغيل الجزيئات مباشرة داخل الـ ID المحدد
      containerRef.current = await tsParticles.load({
        id: "hero-particles-canvas",
        options: particlesConfig
      });
    }

    initParticles();

    return () => {
      isMounted = false;
      if (containerRef.current) {
        containerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div 
      id="hero-particles-canvas" 
      className="absolute inset-0 z-0 w-full  pointer-events-none"
    />
  );
}