// Static export for GitHub Pages when GITHUB_PAGES=true.
// The repo is private, so Pages serves at the root of an obfuscated
// *.pages.github.io domain — no basePath needed. Local dev/build is unchanged.
// (bp() helper stays inert at root; flip NEXT_PUBLIC_BASE_PATH here if the site
//  ever moves to a public owner.github.io/<repo> subpath.)
const isPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = isPages
  ? {
      output: 'export',
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
