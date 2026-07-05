import React, { useEffect, useState } from 'react';

import { cn } from '../../../lib/utils.js';
import { usePrefersReducedMotion } from '../../../lib/ui.jsx';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

/**
 * ScrambleIn — from fancycomponents.dev, ported to JS.
 * Reveals the text left-to-right with a scrambled "edge" of random characters
 * in front of the revealed portion. Plays once on mount (and re-plays whenever
 * `text` changes).
 */
export default function ScrambleIn({
  text,
  scrambleSpeed = 50,
  scrambledLetterCount = 2,
  characters = DEFAULT_CHARS,
  className = '',
  scrambledClassName = '',
  autoStart = true,
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  // tick just forces a re-render so the scrambled edge re-randomizes each step
  const [, setTick] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!autoStart || reduced) { setDone(true); return undefined; }
    setVisibleCount(0);
    setDone(false);
    let revealed = 0;
    const id = setInterval(() => {
      revealed += 1;
      setVisibleCount(revealed);
      setTick((t) => t + 1);
      if (revealed >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, scrambleSpeed);
    return () => clearInterval(id);
  }, [text, scrambleSpeed, autoStart, reduced]);

  return (
    <span className={cn('inline-block whitespace-pre-wrap', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split('').map((ch, i) => {
          if (done || i < visibleCount) {
            return <span key={i} className={className}>{ch}</span>;
          }
          if (i < visibleCount + scrambledLetterCount && ch !== ' ') {
            const rnd = characters[Math.floor(Math.random() * characters.length)];
            return <span key={i} className={scrambledClassName}>{rnd}</span>;
          }
          // Not yet reached — keep its space so the heading doesn't reflow.
          return <span key={i} style={{ visibility: 'hidden' }}>{ch}</span>;
        })}
      </span>
    </span>
  );
}
