#!/usr/bin/env bash
#
# install.sh — build and install the Appearance plugin into Kepler.
#
#   ./install.sh
#
# Requires Node + pnpm (the Kepler SDK CLI can't run in a sandbox).

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "→ Installing dependencies"
pnpm install

echo "→ Building and installing into ~/Library/Application Support/Kepler/Plugins/"
pnpm build

echo "✓ Done. Reload Kepler, then use  /ui"
