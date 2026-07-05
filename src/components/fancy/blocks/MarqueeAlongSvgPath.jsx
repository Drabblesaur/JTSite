import React, { useCallback, useEffect, useRef } from 'react';
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from 'motion/react';

import { usePrefersReducedMotion } from '../../../lib/ui.jsx';

// from fancycomponents.dev, ported to JS.
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export default function MarqueeAlongSvgPath({
  children,
  className,
  style,
  path,
  pathId,
  preserveAspectRatio = 'xMidYMid meet',
  showPath = false,
  width = '100%',
  height = '100%',
  viewBox = '0 0 100 100',
  baseVelocity = 5,
  direction = 'normal',
  easing,
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
  grabCursor = false,
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,
  cssVariableInterpolation = [],
  responsive = false,
}) {
  const reduced = usePrefersReducedMotion();
  const container = useRef(null);
  const marqueeContainerRef = useRef(null);
  const baseOffset = useMotionValue(0);
  const pathRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    if (!responsive) return undefined;
    const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);
    const originalWidth = vbWidth || 100;
    const originalHeight = vbHeight || 100;

    const updateScale = () => {
      const wrapper = container.current;
      const mc = marqueeContainerRef.current;
      if (!wrapper || !mc) return;
      const wrapperWidth = wrapper.clientWidth;
      const wrapperHeight = wrapper.clientHeight;
      const scale = Math.min(wrapperWidth / originalWidth, wrapperHeight / originalHeight);
      const scaledWidth = originalWidth * scale;
      const scaledHeight = originalHeight * scale;
      const offsetX = (wrapperWidth - scaledWidth) / 2;
      const offsetY = (wrapperHeight - scaledHeight) / 2;
      mc.style.width = `${originalWidth}px`;
      mc.style.height = `${originalHeight}px`;
      mc.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      mc.style.transformOrigin = 'top left';
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [responsive, viewBox]);

  const items = React.useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex;
        return { child, childIndex, repeatIndex, itemIndex, key: `${childIndex}-${repeatIndex}` };
      })
    );
  }, [children, repeat]);

  const calculateZIndex = useCallback(
    (offsetDistance) => {
      if (!enableRollingZIndex) return undefined;
      return Math.floor(zIndexBase + (offsetDistance / 100) * zIndexRange);
    },
    [enableRollingZIndex, zIndexBase, zIndexRange]
  );

  const id = pathId || `marquee-path-${Math.random().toString(36).substring(7)}`;

  const { scrollY } = useScroll({ container: scrollContainer || container });
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const dragVelocity = useRef(0);
  const directionFactor = useRef(direction === 'normal' ? 1 : -1);

  const hoverFactorValue = useMotionValue(1);
  const defaultVelocity = useMotionValue(1);
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity, [0, 1000], [0, 5], { clamp: false }
  );

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    if (isDragging.current && draggable) {
      baseOffset.set(baseOffset.get() + dragVelocity.current);
      dragVelocity.current *= 0.9;
      if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      return;
    }

    if (isHovered.current) hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1);
    else hoverFactorValue.set(1);

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * smoothHoverFactor.get();

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

    baseOffset.set(baseOffset.get() + moveBy);
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
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const projectedDelta = deltaX > 0 ? delta : -delta;
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
    <div
      ref={container}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={className}
      style={{ position: 'relative', ...style }}
    >
      <div ref={marqueeContainerRef} style={{ position: 'relative', contain: 'layout style' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          style={{ width: '100%', height: '100%' }}
        >
          <path id={id} d={path} stroke={showPath ? 'currentColor' : 'none'} fill="none" ref={pathRef} />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const itemOffset = useTransform(baseOffset, (v) => {
            const position = (itemIndex * 100) / items.length;
            const wrappedValue = wrap(0, 100, v + position);
            return `${easing ? easing(wrappedValue / 100) * 100 : wrappedValue}%`;
          });

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const currentOffsetDistance = useMotionValue(0);

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const zIndex = useTransform(currentOffsetDistance, (value) => calculateZIndex(value));

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const unsub = itemOffset.on('change', (value) => {
              const match = value.match(/^([\d.]+)%$/);
              if (match && match[1]) currentOffsetDistance.set(parseFloat(match[1]));
            });
            return unsub;
          }, [itemOffset, currentOffsetDistance]);

          const cssVariables = Object.fromEntries(
            (cssVariableInterpolation || []).map(({ property, from, to }) => [
              property,
              // eslint-disable-next-line react-hooks/rules-of-hooks
              useTransform(currentOffsetDistance, [0, 100], [from, to]),
            ])
          );

          return (
            <motion.div
              key={key}
              ref={(el) => { if (el) itemRefs.current.set(key, el); }}
              style={{
                position: 'absolute', top: 0, left: 0,
                offsetPath: `path('${path}')`,
                offsetDistance: itemOffset,
                zIndex: enableRollingZIndex ? zIndex : undefined,
                willChange: 'offset-distance',
                backfaceVisibility: 'hidden',
                cursor: draggable && grabCursor ? 'grab' : undefined,
                ...cssVariables,
              }}
              aria-hidden={repeatIndex > 0}
              onMouseEnter={() => (isHovered.current = true)}
              onMouseLeave={() => (isHovered.current = false)}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
