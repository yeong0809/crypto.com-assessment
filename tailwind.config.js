const { hairlineWidth } = require(`nativewind/theme`);

const { light } = require(`./src/hooks/useTheme`);
const plugin = require(`tailwindcss`);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: `class`,
  content: [`./src/**/*.{js,jsx,ts,tsx}`],
  presets: [require(`nativewind/preset`)],
  theme: {
    extend: {
      colors: {
        border: light.text,
        input: light.text,
        ring: light.text,
        background: light.background,
        foreground: light.text,
        primary: {
          DEFAULT: light.primary,
          foreground: light.onPrimary,
        },
        secondary: {
          DEFAULT: light.secondary,
          foreground: light.onSecondary,
        },
        tertiary: {
          DEFAULT: light.tertiary,
          foreground: light.onTertiary,
        },
        quaternary: {
          DEFAULT: light.quaternary,
          foreground: light.onQuaternary,
        },
        destructive: {
          DEFAULT: light.error,
          foreground: light.onError,
        },
        muted: {
          DEFAULT: light.hint,
          foreground: light.hint,
        },
        accent: {
          DEFAULT: light.overlayWhite,
          foreground: light.overlayWhite,
        },
        disabled: { DEFAULT: light.disabled, foreground: light.onDisabled },
        popover: {
          DEFAULT: light.background,
          foreground: light.text,
        },
        card: {
          DEFAULT: light.background,
          foreground: light.onBackground,
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [plugin(({ addBase }) => {})],
};
