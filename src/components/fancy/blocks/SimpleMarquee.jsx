import React, { useRef } from 'react';
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from 'motion/react';

import { usePrefersReducedMotion } from '../../../lib/ui.jsx';

// from fancycomponents.dev, ported to JS.
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export default function SimpleMarquee({
  children,
  className,
  style,
  direction = 'right',
  baseVelocity = 5,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,
  repeat = 3,
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  dragAngle = 0,
  grabCursor = false,
  easing,
}) {
  const reduced = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const baseY = useMotionValue(0);

  const { scrollY } = useScroll({ ...(scrollContainer && { container: scrollContainer }) });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

  const hoverFactorValue = useMotionValue(1);
  const defaultVelocity = useMotionValue(1);
  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity, [0, 1000], [0, 5], { clamp: false }
  );

  const isHorizontal = direction === 'left' || direction === 'right';
  const actualBaseVelocity = direction === 'left' || direction === 'up' ? -baseVelocity : baseVelocity;

  const isHovered = useRef(false);
  const directionFactor = useRef(1);

  const x = useTransform(baseX, (v) => {
    const w = wrap(0, -100, v);
    return `${easing ? easing(w / -100) * -100 : w}%`;
  });
  const y = useTransform(baseY, (v) => {
    const w = wrap(0, -100, v);
    return `${easing ? easing(w / -100) * -100 : w}%`;
  });

  useAnimationFrame((t, delta) => {
    if (reduced) return;
    if (isDragging.current && draggable) {
      if (isHorizontal) baseX.set(baseX.get() + dragVelocity.current);
      else baseY.set(baseY.get() + dragVelocity.current);
      dragVelocity.current *= 0.9;
      if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      return;
    }

    if (isHovered.current) hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1);
    else hoverFactorValue.set(1);

    let moveBy = directionFactor.current * actualBaseVelocity * (delta / 1000) * smoothHoverFactor.get();

    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) directionFactor.current = -1;
      else if (velocityFactor.get() > 0) directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    if (draggable) {
      moveBy += dragVelocity.current;
      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current);
      }
      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) dragVelocity.current *= dragVelocityDecay;
      else if (!isDragging.current) dragVelocity.current = 0;
    }

    if (isHorizontal) baseX.set(baseX.get() + moveBy);
    else baseY.set(baseY.get() + moveBy);
  });

  const lastPointerPosition = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (!draggable) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (grabCursor) e.currentTarget.style.cursor = 'grabbing';
    isDragging.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = 0;
  };
  const handlePointerMove = (e) => {
    if (!draggable || !isDragging.current) return;
    const cur = { x: e.clientX, y: e.clientY };
    const deltaX = cur.x - lastPointerPosition.current.x;
    const deltaY = cur.y - lastPointerPosition.current.y;
    const a = (dragAngle * Math.PI) / 180;
    const projectedDelta = deltaX * Math.cos(a) + deltaY * Math.sin(a);
    dragVelocity.current = projectedDelta * dragSensitivity;
    lastPointerPosition.current = cur;
  };
  const handlePointerUp = (e) => {
    if (!draggable) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDragging.current = false;
    if (grabCursor) e.currentTarget.style.cursor = 'grab';
  };

  return (
    <motion.div
      className={className}
      style={{ display: 'flex', flexDirection: isHorizontal ? 'row' : 'column', ...style }}
      onHoverStart={() => (isHovered.current = true)}
      onHoverEnd={() => (isHovered.current = false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {Array.from({ length: repeat }, (_, i) => i).map((i) => (
        <motion.div
          key={i}
          style={{ flexShrink: 0, ...(isHorizontal ? { display: 'flex' } : {}), ...(isHorizontal ? { x } : { y }), cursor: draggable && grabCursor ? 'grab' : undefined }}
          aria-hidden={i > 0}
        >
          {children}
        </motion.div>
      ))}
    </motion.div>
  );
}
