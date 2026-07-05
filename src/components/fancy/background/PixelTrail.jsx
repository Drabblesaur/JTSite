import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { v4 as uuidv4 } from 'uuid';

import { useDimensions } from '../../../hooks/use-dimensions.js';

/**
 * PixelTrail — from fancycomponents.dev, ported to JS.
 * A pixelated trail that recolors grid pixels as the cursor moves.
 * For a "no fade" trail, pass fadeDuration={0} and a delay (e.g. 130).
 *
 * This variant takes a `color` prop (inline) instead of the original
 * `pixelClassName`, so it works without Tailwind.
 */
export default function PixelTrail({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  color = '#ffffff',
  className = '',
  style,
}) {
  const containerRef = useRef(null);
  const dimensions = useDimensions(containerRef);
  const trailId = useRef(uuidv4());

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);
      const el = document.getElementById(`${trailId.current}-pixel-${x}-${y}`);
      if (el && el.__animatePixel) el.__animatePixel();
    },
    [pixelSize]
  );

  // Also track the pointer at the window level, so the trail still works when
  // the container sits BEHIND page content (pointer-events: none).
  useEffect(() => {
    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, [handleMouseMove]);

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize]);
  const rows = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize]);

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              color={color}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const PixelDot = React.memo(({ id, size, fadeDuration, delay, color }) => {
  const controls = useAnimationControls();

  const animatePixel = useCallback(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ref = useCallback(
    (node) => { if (node) node.__animatePixel = animatePixel; },
    [animatePixel]
  );

  return (
    <motion.div
      id={id}
      ref={ref}
      style={{ width: size, height: size, background: color }}
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    />
  );
});

PixelDot.displayName = 'PixelDot';
