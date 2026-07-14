#!/usr/bin/env bash
#
# Publish the v2 Next.js static export to the live GitHub Pages site.
#
# Builds v2 with the Pages base path, copies the export over docs/v2, verifies
# the asset paths, then commits + pushes — but only on `main` (the live site
# serves docs/ from main). If docs/v2 is byte-identical to what's committed, it
# does nothing.
#
# Safe to run while `npm run dev` is up. IMPORTANT: `next build` always writes a
# full .next/ (the distDir setting does NOT isolate it), so building inside v2/
# would clobber the dev server's .next and 500 it. To avoid that, we build in a
# throwaway temp copy of the source (node_modules symlinked in, so it's cheap)
# whose .next is entirely separate from the live v2/.next. Nothing the dev
# server watches or uses is touched.
#
# Used two ways:
#   - manually:      ./publish-v2.sh
#   - automatically: the PostToolUse "git push" hook in .claude/settings.local.json
#
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$REPO"

branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$branch" != "main" ]; then
  echo "publish-v2: on '$branch', not main — skipping publish."
  exit 0
fi

# Build in an isolated copy so `next build` never touches v2/.next (which a
# running `npm run dev` owns). Copy the source tree minus the heavy/generated
# dirs, then symlink node_modules to reuse the installed deps without copying.
#
# The build dir path is STABLE (not a random mktemp dir): Next bakes the project
# path into chunk content hashes, so a changing path makes every build differ
# and defeats the "docs/v2 unchanged -> no-op" property. A fixed path keeps the
# export byte-reproducible for identical source (BUILD_ID is pinned too). Kept
# between runs so its .next cache stays warm; rsync --delete re-syncs the source.
build_dir="${TMPDIR:-/tmp}/flx-v2-publish"
mkdir -p "$build_dir"

echo "publish-v2: staging isolated build in ${build_dir} ..."
rsync -a --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude out-pages \
  --exclude .git \
  "$REPO/v2/" "$build_dir/"
ln -sfn "$REPO/v2/node_modules" "$build_dir/node_modules"

echo "publish-v2: building v2 static export…"
( cd "$build_dir" && GITHUB_PAGES=true npm run build >/dev/null )

echo "publish-v2: copying export to docs/v2…"
rm -rf docs/v2
cp -R "$build_dir/out-pages" docs/v2

# sanity: assets must resolve under the Pages subpath, else Pages 404s them
if ! grep -q '/flx_landing_explo/v2/_next/' docs/v2/index.html; then
  echo "publish-v2: ERROR — built asset paths are not under /flx_landing_explo/v2/; aborting." >&2
  exit 1
fi

if git diff --quiet -- docs/v2 && git diff --cached --quiet -- docs/v2; then
  echo "publish-v2: docs/v2 unchanged — live site already current, nothing to publish."
  exit 0
fi

git add docs/v2
git commit -q -m "Publish v2 build to live site

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
git push -q origin main
echo "publish-v2: published — live at https://bogdandraghici.github.io/flx_landing_explo/v2/"
