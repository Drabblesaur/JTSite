import { useState, useEffect } from 'react';

// Tracks the pixel dimensions of a ref'd element (used by PixelTrail).
export function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    measure();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    if (ref.current) ro.observe(ref.current);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [ref]);

  return dimensions;
}

export default useDimensions;
