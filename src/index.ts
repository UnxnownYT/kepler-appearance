import {
  definePlugin,
  Command,
  Icon,
  Action,
} from "@kepler-app/plugin-sdk";

/**
 * Appearance plugin for Kepler.
 *
 * One search mode, /ui, that flips macOS Dark / Light appearance. Kepler is a
 * native macOS app, so it follows whatever system appearance you set here.
 *
 * Runs through the "appleScript" permission — the only route a JavaScriptCore
 * plugin has to touch the OS. The scripts are static (no user input), so
 * there's nothing to escape.
 *
 * Note: macOS accent color isn't reliably scriptable, so it's omitted.
 */

// ┌─ CUSTOMIZE ─────────────────────────────────────────────────────────────┐
// │ Activation prefix (typed after "/"). Change and rebuild to taste. This    │
// │ is baked into manifest.json at build time — see README.                   │
// └──────────────────────────────────────────────────────────────────────────┘
const APPEARANCE_PREFIX = "ui";

interface Cmd {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  script: string;
  keywords: string[];
}

// Case-insensitive filter over title + keywords.
function filterCmds(cmds: Cmd[], raw: string): Cmd[] {
  const q = raw.trim().toLowerCase();
  if (!q) return cmds;
  return cmds.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}

function toItems(cmds: Cmd[]) {
  return cmds.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: c.subtitle,
    icon: Icon.sfSymbol(c.icon),
    action: Action.appleScript(c.script),
  }));
}

const APPEARANCE_CMDS: Cmd[] = [
  {
    id: "toggle",
    title: "Toggle Dark / Light",
    subtitle: "Flip the system appearance",
    icon: "circle.lefthalf.filled",
    keywords: ["toggle", "switch", "flip", "theme", "appearance"],
    script:
      'tell application "System Events" to tell appearance preferences to set dark mode to not dark mode',
  },
  {
    id: "dark",
    title: "Dark Mode",
    subtitle: "Switch the system to Dark",
    icon: "moon.fill",
    keywords: ["dark", "night", "theme"],
    script:
      'tell application "System Events" to tell appearance preferences to set dark mode to true',
  },
  {
    id: "light",
    title: "Light Mode",
    subtitle: "Switch the system to Light",
    icon: "sun.max.fill",
    keywords: ["light", "day", "theme"],
    script:
      'tell application "System Events" to tell appearance preferences to set dark mode to false',
  },
];

export default definePlugin({
  metadata: {
    id: "com.dyandeepu.appearance",
    name: "Appearance",
    version: "1.0.3",
    author: "dyandeepu",
    description: "Flip macOS Dark / Light appearance from Kepler.",
    icon: Icon.sfSymbol("circle.lefthalf.filled"),
    permissions: ["appleScript"],
  },

  searchModes: [
    Command.search({
      id: "appearance",
      title: "Appearance",
      keywords: ["appearance", "theme", "dark", "light", "mode", "ui", "look"],
      shortcutPrefix: APPEARANCE_PREFIX,
      placeholder: "dark · light · toggle",
      run(query) {
        const matches = filterCmds(APPEARANCE_CMDS, query.raw);
        if (matches.length === 0) {
          return [
            {
              id: "none",
              title: "No matching appearance command",
              subtitle: "Try: dark, light, toggle",
              icon: Icon.sfSymbol("magnifyingglass"),
            },
          ];
        }
        return toItems(matches);
      },
    }),
  ],
});
