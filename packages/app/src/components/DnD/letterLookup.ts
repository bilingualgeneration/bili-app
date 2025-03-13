const fontSizeBase = 16;
const fontSizeCurrent = parseFloat(
  getComputedStyle(document.documentElement).fontSize,
);

const ratio = fontSizeCurrent / fontSizeBase;

type LetterLookup = Record<
  string,
  {
    width: number;
    height: number;
  }
>;

export const letterLookup: LetterLookup = {
  " ": { width: 51.7833 * ratio, height: 120 },
  _: { width: 51.7833 * ratio, height: 120 },
  a: { width: 57.5833 * ratio, height: 120 },
  á: { width: 57.5834 * ratio, height: 120 },
  b: { width: 56.4833 * ratio, height: 120 },
  c: { width: 49.0834 * ratio, height: 120 },
  d: { width: 56.4833 * ratio, height: 120 },
  e: { width: 54.3833 * ratio, height: 120 },
  é: { width: 54.3833 * ratio, height: 120 },
  f: { width: 41.5834 * ratio, height: 120 },
  g: { width: 54.5834 * ratio, height: 120 },
  h: { width: 52.3833 * ratio, height: 120 },
  i: { width: 24.1833 * ratio, height: 120 },
  í: { width: 30.5834 * ratio, height: 120 },
  j: { width: 30.6833 * ratio, height: 120 },
  k: { width: 53.0834 * ratio, height: 120 },
  l: { width: 25.1833 * ratio, height: 120 },
  m: { width: 79.9834 * ratio, height: 120 },
  n: { width: 52.3833 * ratio, height: 120 },
  ñ: { width: 52.3833 * ratio, height: 120 },
  o: { width: 55.4834 * ratio, height: 120 },
  ó: { width: 55.4834 * ratio, height: 120 },
  p: { width: 55.4834 * ratio, height: 120 },
  q: { width: 55.6833 * ratio, height: 120 },
  r: { width: 41.0833 * ratio, height: 120 },
  s: { width: 50.7834 * ratio, height: 120 },
  t: { width: 49.9834 * ratio, height: 120 },
  u: { width: 51.1833 * ratio, height: 120 },
  ú: { width: 51.1833 * ratio, height: 120 },
  ü: { width: 51.1833 * ratio, height: 120 },
  v: { width: 50.8833 * ratio, height: 120 },
  w: { width: 67.0833 * ratio, height: 120 },
  x: { width: 56.5833 * ratio, height: 120 },
  y: { width: 51.5833 * ratio, height: 120 },
  z: { width: 47.4834 * ratio, height: 120 },
};
