# Kepler — Appearance

One Kepler search mode, `/ui `, that flips your macOS appearance. Kepler is a
native macOS app, so it follows the system appearance you set here.

## `/ui ` commands
| Command | Does |
| --- | --- |
| Toggle Dark / Light | Flip the system appearance |
| Dark Mode | Force Dark |
| Light Mode | Force Light |

Type to filter, e.g. `/ui dark`. (macOS **accent color** isn't reliably
scriptable, so it's intentionally left out.)

## Install

One command — no build tools needed:

```bash
npx kepler-appearance
```

This drops a prebuilt bundle into `~/Library/Application Support/Kepler/Plugins/`.
Reload Kepler and you're done. (macOS only.)

## Permissions

First run shows a macOS Automation prompt to let Kepler control System Events.
Approve it once and it's done.

## Customizing the prefix

**In the app (no rebuild):** open Kepler → Settings → Shortcuts and edit the
**Appearance** search prefix. This works for anyone who installs the plugin.

**Default in source:** the starting prefix is the constant at the top of
`src/index.ts`:

```ts
const APPEARANCE_PREFIX = "ui";
```

Change it and rebuild to ship a different default. Keep it unique across your
installed plugins.

## Build from source

If you'd rather build it yourself (or you're developing it):

```bash
pnpm install
pnpm build          # bundles into Kepler's Plugins folder
# or: chmod +x install.sh && ./install.sh
```

Then reload Kepler and try `/ui `.

## Publishing (maintainer notes)

`npm publish` runs `prepublishOnly`, which builds `dist/kepler-appearance.keplugin`.
That prebuilt bundle is what `npx kepler-appearance` copies into place, so end
users never need the SDK or a build step. The `bin/install.mjs` script uses only
Node built-ins, so the package has no runtime dependencies.
