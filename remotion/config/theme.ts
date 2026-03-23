// Dark theme hex colors — mirrors app/globals.css dark mode tokens
export const THEME = {
  background: "#181921",
  card: "#1d1e29",
  surface: "#1a1b27",
  border: "#2d2f40",
  foreground: "#e5e7ee",
  muted: "#767a96",
  mutedFg: "#9097b8",
  primary: "#4f9de0",
  bull: "#23c475",
  bear: "#e05c22",
  simmering: "#d4a32a",
  cooling: "#6487d4",
  heat: {
    breakout: "#23c475",
    boiling: "#e05c22",
    simmering: "#d4a32a",
    warming: "#6487d4",
  },
} as const;

// Light theme — matches app's :root CSS variables exactly
export const LIGHT = {
  background: "#f9f8f5",
  card: "#fefefe",
  surface: "#f2f2f7",
  border: "#dcdce8",
  foreground: "#1d2038",
  muted: "#eaeaef",
  mutedFg: "#6e7194",
  primary: "#2a73cc",
  bull: "#1d8f52",
  bear: "#c44a1d",
  simmering: "#8f6e0a",
  cooling: "#4a68b0",
  sidebar: "#f5f5f9",
  sidebarBorder: "#e4e4ec",
  heat: {
    breakout: "#1d8f52",
    boiling: "#c44a1d",
    simmering: "#8f6e0a",
    cooling: "#4a68b0",
  },
} as const;
