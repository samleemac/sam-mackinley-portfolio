#!/usr/bin/env bash
# Re-syncs portal/ with the latest code from the client-portal-pro repo.
# The portal is developed in Lovable, which commits to that repo — this copy
# does not update automatically, so run this script whenever you want to pull
# the latest portal changes into the portfolio repo, then commit and push.
#
# Usage: ./sync-portal.sh
set -euo pipefail

REPO_URL="https://github.com/samleemac/client-portal-pro.git"
ROOT="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Cloning latest client-portal-pro..."
git clone --depth 1 "$REPO_URL" "$TMP/portal" >/dev/null 2>&1
COMMIT="$(git -C "$TMP/portal" rev-parse HEAD)"

echo "Syncing into portal/ (source commit $COMMIT)..."
# --delete keeps the copy exact; local-only files we keep are excluded below.
rsync -a --delete \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.output' \
  --exclude='.nitro' \
  --exclude='.tanstack' \
  "$TMP/portal/" "$ROOT/portal/"

echo "$COMMIT" > "$ROOT/portal/.source-commit"

echo "Done. Review with 'git status', then commit and push to deploy."
