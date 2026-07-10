import { useEffect, useState } from 'react';

// Animated 3x3 grid spinner.
const FRAMES = [
  [0, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0],
  [0, 0, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0],
];

export function GridSpinner({ size = 72, gap = 0, speed = 200, color = '#000000' }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), speed);
    return () => clearInterval(id);
  }, [speed]);

  const cellSize = (size - gap * 2) / 3;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(3, ${cellSize}px)`,
        gridTemplateRows: `repeat(3, ${cellSize}px)`,
        gap,
        width: size,
        height: size,
      }}
    >
      {FRAMES[frame].map((on, i) => (
        <div
          key={i}
          style={{
            background: on ? color : 'transparent',
            width: cellSize,
            height: cellSize,
            transition: 'background 60ms linear',
          }}
        />
      ))}
    </div>
  );
}

export default GridSpinner;
