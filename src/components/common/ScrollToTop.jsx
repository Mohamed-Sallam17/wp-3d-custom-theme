import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // استخدام window.pageYOffset كـ Fallback للتوافق مع المتصفحات القديمة
      if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-to-top fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className="scroll-btn cursor-pointer w-10 h-10 p-1 bg-[var(--second-bg-color)] border border-[var(--second-border-color)] transition-all duration-300"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;