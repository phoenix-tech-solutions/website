import { useEffect, useRef, useState } from "react";
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (inView || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView, options]);
  return { ref, inView };
}
