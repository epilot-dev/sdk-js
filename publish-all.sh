#!/usr/bin/env bash
#
# Publish every publishable @epilot SDK package + API client in this monorepo
# to npm. Used for repo-wide releases (e.g. shipping the MIT LICENSE fix across
# all packages).
#
# The package list is derived from the pnpm workspace at runtime, so it never
# goes stale: every non-private package under clients/* and packages/* is
# included. `epilot` (the cli-wrapper) is published last because it depends on
# @epilot/cli via `workspace:^`.
#
# Each package is built and then published with a FRESHLY generated npm OTP, so
# the one-time 2FA code can't expire midway through a long run.
#
# Prerequisites:
#   - Logged into npm with publish rights:           npm whoami
#   - TOTP helper configured for the npm 2FA secret: totp npm
#   - pnpm publish (NOT npm publish) — required to rewrite `workspace:^` deps.
#
# Usage:
#   ./publish-all.sh            # build + publish everything
#   ./publish-all.sh --dry-run  # build + pack, but don't actually publish

set -uo pipefail

DRY_RUN=""
if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN="--dry-run"
fi

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if ! npm whoami >/dev/null 2>&1; then
  echo "✗ Not logged into npm. Run 'npm login' first." >&2
  exit 1
fi
if ! command -v totp >/dev/null 2>&1; then
  echo "✗ 'totp' not found — needed to generate npm OTP codes." >&2
  exit 1
fi

# Build the ordered, publishable package list (dir<TAB>name), epilot last.
PKG_LINES=$(node -e '
const fs = require("fs");
const dirs = [
  ...fs.readdirSync("clients").map((d) => "clients/" + d),
  ...fs.readdirSync("packages").map((d) => "packages/" + d),
].filter((d) => fs.existsSync(d + "/package.json"));
const items = dirs
  .map((d) => ({ d, p: JSON.parse(fs.readFileSync(d + "/package.json", "utf8")) }))
  .filter((x) => !x.p.private)
  .sort((a, b) => (a.p.name === "epilot") - (b.p.name === "epilot"));
for (const x of items) console.log(x.d + "\t" + x.p.name + "\t" + x.p.version);
')

TOTAL=0
SUCCESS=0
FAILED_PACKAGES=()

while IFS=$'\t' read -r dir name version; do
  [ -n "$dir" ] || continue
  TOTAL=$((TOTAL + 1))
  echo "=================================================="
  echo "Publishing $name@$version  ($dir)"
  echo "=================================================="

  if ! pnpm --filter "$name" build; then
    echo "✗ Build failed for $name"
    FAILED_PACKAGES+=("$name (build)")
    continue
  fi

  OTP=$(totp npm)
  if [ -z "$OTP" ]; then
    echo "✗ Failed to generate OTP for $name"
    FAILED_PACKAGES+=("$name (otp)")
    continue
  fi

  if ( cd "$dir" && pnpm publish --no-git-checks --ignore-scripts $DRY_RUN --otp "$OTP" ); then
    echo "✓ Published $name@$version"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "✗ Failed to publish $name (already published? check output above)"
    FAILED_PACKAGES+=("$name")
  fi

  sleep 1
done < <(echo "$PKG_LINES")

echo "=================================================="
echo "Publishing summary"
echo "=================================================="
echo "Total:     $TOTAL"
echo "Published: $SUCCESS"
echo "Failed:    ${#FAILED_PACKAGES[@]}"
if [ "${#FAILED_PACKAGES[@]}" -gt 0 ]; then
  echo ""
  echo "Failed packages:"
  for pkg in "${FAILED_PACKAGES[@]}"; do
    echo "  - $pkg"
  done
  exit 1
fi
echo ""
echo "✓ All packages published successfully!"
