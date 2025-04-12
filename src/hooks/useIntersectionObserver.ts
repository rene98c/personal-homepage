// src/hooks/useIntersectionObserver.ts
import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

// Change the return type to include null
export const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
}: UseIntersectionObserverProps = {}): [RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once we've seen it, no need to keep observing
          observer.unobserve(node);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [root, rootMargin, threshold]);

  return [ref, isVisible];
};

export default useIntersectionObserver;