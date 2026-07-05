import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Returns true when the viewport is at or below `bp` px wide. Use it to swap
 * grid/layout styles for mobile (inline styles can't hold media queries).
 */
export function useIsMobile(bp = 760) {
  const [m, setM] = useState(typeof window !== 'undefined' ? window.innerWidth <= bp : false);
  useEffect(() => {
    const onResize = () => setM(window.innerWidth <= bp);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, [bp]);
  return m;
}

/**
 * True when the user has requested reduced motion. Use it to disable the
 * pixel trail, scramble, screensaver, and other decorative animations.
 */
export function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Parse an inline-CSS string ("color:red;font-size:12px") into a React style
 * object with camelCased property names. This lets the page components keep
 * their styles as readable CSS strings instead of hand-written objects.
 * Custom properties (--foo) are preserved as-is.
 */
export function css(str) {
  if (!str) return {};
  const out = {};
  for (const decl of str.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const rawKey = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!rawKey) continue;
    if (rawKey.startsWith('--')) { out[rawKey] = value; continue; }
    const key = rawKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = value;
  }
  return out;
}

/**
 * A styled element with an optional hover style.
 *   <Box as="section" sx="padding:20px" hx="background:#000">…</Box>
 * `sx` is the base CSS string, `hx` is merged in on hover.
 */
export function Box({ as = 'div', sx, hx, style, children, ...rest }) {
  const [hover, setHover] = useState(false);
  const merged = { ...css(sx), ...(hx && hover ? css(hx) : {}), ...style };
  const hoverHandlers = hx
    ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) }
    : {};
  const Tag = as;
  return <Tag style={merged} {...hoverHandlers} {...rest}>{children}</Tag>;
}

/**
 * A link with optional hover style. Use `to` for in-app routes (renders a
 * react-router <Link>) or `href` for external URLs (renders <a>).
 */
export function A({ to, href, sx, hx, style, children, ...rest }) {
  const [hover, setHover] = useState(false);
  const merged = { ...css(sx), ...(hx && hover ? css(hx) : {}), ...style };
  const hoverHandlers = hx
    ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) }
    : {};
  if (to) {
    return <Link to={to} style={merged} {...hoverHandlers} {...rest}>{children}</Link>;
  }
  return <a href={href} style={merged} {...hoverHandlers} {...rest}>{children}</a>;
}
