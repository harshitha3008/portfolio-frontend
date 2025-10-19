// src/hooks/useInView.js
import { useEffect, useRef, useState } from "react";

const useInView = (options = { threshold: 0.3 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const prevScrollY = useRef(window.scrollY);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const currentScrollY = window.scrollY;

      // ✅ If element is visible (intersecting), mark as visible
      if (entry.isIntersecting) {
        setIsVisible(true);
      }

      prevScrollY.current = currentScrollY;
    }, options);

    if (ref.current) observer.observe(ref.current);

    // ✅ If already visible on load (e.g. user refreshed mid-section)
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          setIsVisible(true);
        }
      }
    };

    checkInitialVisibility();

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible];
};

export default useInView;
