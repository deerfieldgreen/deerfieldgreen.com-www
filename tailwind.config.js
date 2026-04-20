import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        accent: "var(--aw-color-accent)",
        indigo: "var(--aw-color-indigo)",
        default: "var(--aw-color-text-default)",
        muted: "var(--aw-color-text-muted)",
        subtle: "var(--aw-color-text-subtle)",
        surface: "var(--aw-color-bg-surface)",
        sumi: "var(--aw-color-bg-sumi)",
        "on-sumi": "var(--aw-color-text-on-sumi)",
        border: "var(--aw-color-border)",
      },
      fontFamily: {
        sans: [
          "var(--aw-font-sans, ui-sans-serif)",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          "var(--aw-font-serif, ui-serif)",
          ...defaultTheme.fontFamily.serif,
        ],
        heading: [
          "var(--aw-font-heading, ui-serif)",
          ...defaultTheme.fontFamily.serif,
        ],
        mono: [
          "var(--aw-font-mono, ui-monospace)",
          ...defaultTheme.fontFamily.mono,
        ],
      },

      animation: {
        fade: "fadeInUp 1s both",
        "seam-draw": "seamDraw 700ms cubic-bezier(0.2, 0.7, 0.2, 1) both",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        seamDraw: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [
    typographyPlugin({
      className: "prose",
      config: {
        DEFAULT: {
          css: {
            a: { color: "var(--aw-color-primary)" },
            "a:hover": { color: "var(--aw-color-secondary)" },
          },
        },
      },
    }),
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
  darkMode: "class",
};
