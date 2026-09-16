#!/usr/bin/env node
// Copies the prebuilt kepler-appearance.keplugin bundle (shipped in this
// package's dist/) into Kepler's Plugins folder. Uses only Node built-ins, so
// `npx` pulls no dependencies — it's a fast, build-free install.

import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const BUNDLE = "kepler-appearance.keplugin";

if (platform() !== "darwin") {
  console.error("✗ Kepler is macOS-only; this installer only runs on macOS.");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "..", "dist", BUNDLE);
const pluginsDir = join(
  homedir(),
  "Library",
  "Application Support",
  "Kepler",
  "Plugins",
);
const dest = join(pluginsDir, BUNDLE);

if (!existsSync(src)) {
  console.error(`✗ Prebuilt bundle missing at ${src}`);
  console.error("  This package looks broken — please report it.");
  process.exit(1);
}

try {
  await mkdir(pluginsDir, { recursive: true });
  await cp(src, dest, { recursive: true, force: true });
} catch (err) {
  console.error(`✗ Failed to install: ${err.message}`);
  process.exit(1);
}

console.log(`✓ Installed to ${dest}`);
console.log("  Reload Kepler, then use /ui (dark · light · toggle)");
