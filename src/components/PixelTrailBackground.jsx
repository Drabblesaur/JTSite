import React from 'react';
import PixelTrail from './fancy/background/PixelTrail.jsx';
import { usePrefersReducedMotion } from '../lib/ui.jsx';

/**
 * Fixed, full-viewport pixel-trail background layer. Sits behind page content
 * (pointer-events: none, low z-index) and tracks the pointer at the window
 * level. Configured for the site's "no fade" trail in brand green.
 *
 * Place it as a sibling of the page content, and give the content wrapper
 * `position: relative; z-index: 1` with a transparent background so the trail
 * shows through.
 */
export default function PixelTrailBackground({ color = '#A7C098', pixelSize = 26 }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <PixelTrail pixelSize={pixelSize} fadeDuration={0} delay={130} color={color} style={{ pointerEvents: 'none' }} />
    </div>
  );
}
