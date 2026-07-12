#!/usr/bin/env bash
#
# Publish the v2 Next.js static export to the live GitHub Pages site.
#
# Builds v2 with the Pages base path, copies the export over docs/v2, verifies
# the asset paths, then commits + pushes — but only on `main` (the live site
# serves docs/ from main). If docs/v2 is byte-identical to what's committed, it
# does nothing. Safe to run while `npm run dev` is up: the Pages build uses a
# separate distDir (v2/out-pages), so it never touches the dev server's .next.
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

echo "publish-v2: building v2 static export…"
( cd "$REPO/v2" && rm -rf out-pages && GITHUB_PAGES=true npm run build >/dev/null )

echo "publish-v2: copying export to docs/v2…"
rm -rf docs/v2
cp -R v2/out-pages docs/v2

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
