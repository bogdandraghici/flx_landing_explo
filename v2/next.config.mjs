// Static export for GitHub Pages when GITHUB_PAGES=true.
// The repo is PUBLIC, so Pages serves at the project subpath
// bogdandraghici.github.io/flx_landing_explo/v2/ — basePath/assetPrefix are
// required so /_next assets and internal links resolve under that subpath.
// NEXT_PUBLIC_BASE_PATH feeds the bp() helper (components/lib/base.js) that
// prefixes root-absolute <a href>/<img src> in the app. Local dev/build is
// unchanged (BASE_PATH is '' unless GITHUB_PAGES=true).
const isPages = process.env.GITHUB_PAGES === 'true';
const BASE_PATH = isPages ? '/flx_landing_explo/v2' : '';

/** @type {import('next').NextConfig} */
const nextConfig = isPages
  ? {
      output: 'export',
      // Separate output dir so a Pages/publish build never clobbers the dev
      // server's default `.next` (dev doesn't set GITHUB_PAGES). With a custom
      // distDir, `output: 'export'` writes the static site straight into it, so
      // out-pages/ IS the export to copy to docs/v2. Lets us publish while
      // `npm run dev` is running.
      distDir: 'out-pages',
      trailingSlash: true,
      images: { unoptimized: true },
      basePath: BASE_PATH,
      assetPrefix: BASE_PATH,
      env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
    }
  : {};

export default nextConfig;
