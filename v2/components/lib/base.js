// Prefix root-absolute internal paths with the deploy basePath (e.g. /fx-main on
// GitHub Pages). External (http...), hash (#...) and other links pass through.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function bp(path) {
  return typeof path === 'string' && path.startsWith('/') ? BASE + path : path;
}
