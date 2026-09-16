import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife"],
  globalName: "KeplerPlugin",
  outDir: `${process.env.HOME}/Library/Application Support/Kepler/Plugins/kepler-appearance.keplugin`,
  dts: false,
  clean: true,
  bundle: true,
  noExternal: [/@kepler-app\/plugin-sdk/],
});
