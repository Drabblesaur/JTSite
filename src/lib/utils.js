// Minimal className combiner (no Tailwind dependency needed for this project).
export function cn(...args) {
  return args.flat(Infinity).filter(Boolean).join(' ');
}

export default cn;
