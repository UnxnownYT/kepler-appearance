import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("published package declares the Kepler bundle and matching version", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.equal(pkg.kepler?.apiVersion, 1);
  assert.equal(pkg.kepler.manifest, "dist/kepler-appearance.keplugin/manifest.json");
  assert.equal(pkg.kepler.entry, "dist/kepler-appearance.keplugin/index.js");

  const [archive] = JSON.parse(
    execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], {
      encoding: "utf8",
    }),
  );
  const paths = new Set(archive.files.map((file) => file.path));
  assert.ok(paths.has(pkg.kepler.manifest), "published manifest is missing");
  assert.ok(paths.has(pkg.kepler.entry), "published entry is missing");

  const manifest = JSON.parse(readFileSync(pkg.kepler.manifest, "utf8"));
  assert.equal(manifest.version, pkg.version);
  assert.equal(manifest.id, "com.dyandeepu.appearance");
});
