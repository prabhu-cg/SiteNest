import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

// Lets `bg-primary/60`, `ring-ring/50` etc. work on CSS-variable colors (Tailwind v3 can't parse var())
const token =
  (name: string) =>
  (({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `var(${name})`
      : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`) as unknown as string;

function addVariablesForColors({ addBase, e, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars: Record<string, string> = {};

  Object.entries(allColors).forEach(([key, val]) => {
    // Token entries are functions (see `token`) and are defined in globals.css instead
    if (typeof val === "string") newVars[`--${e(key)}`] = val;
  });
  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutrals: every existing gray-* utility now reads as Assessly's stone/parchment ramp
        gray: colors.stone,
        accent: {
          DEFAULT: "#C74504",
          50: "#FCF4F0",
          100: "#F8E8E0",
          200: "#F0CDBB",
          300: "#E7B196",
          400: "#DD8F68",
          500: "#C74504",
          600: "#B53F04",
          700: "#973403",
          800: "#752902",
          900: "#501C02",
        },
        secondary: {
          DEFAULT: token("--secondary"),
          foreground: token("--secondary-foreground"),
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
        },
        primary: {
          DEFAULT: token("--primary"),
          foreground: token("--primary-foreground"),
          hover: token("--primary-hover"),
          soft: token("--primary-soft"),
          text: token("--primary-text"),
        },
        surface: {
          DEFAULT: token("--surface"),
          raised: token("--surface-raised"),
        },
        "border-strong": token("--border-strong"),
        success: { DEFAULT: token("--success"), soft: token("--success-soft") },
        warning: { DEFAULT: token("--warning"), soft: token("--warning-soft") },
        info: { DEFAULT: token("--info"), soft: token("--info-soft") },
        background: token("--background"),
        foreground: token("--foreground"),
        card: {
          DEFAULT: token("--card"),
          foreground: token("--card-foreground"),
        },
        popover: {
          DEFAULT: token("--popover"),
          foreground: token("--popover-foreground"),
        },
        muted: {
          DEFAULT: token("--muted"),
          foreground: token("--muted-foreground"),
        },
        destructive: {
          DEFAULT: token("--destructive"),
          foreground: token("--destructive-foreground"),
          soft: token("--destructive-soft"),
        },
        border: token("--border"),
        input: token("--input"),
        ring: token("--ring"),
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: token("--sidebar"),
          foreground: token("--sidebar-foreground"),
          border: token("--sidebar-border"),
          accent: token("--sidebar-accent"),
          "accent-foreground": token("--sidebar-accent-foreground"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
        card: "16px",
      },
      boxShadow: {
        card: "0 1px 2px 0 #1010140a, 0 1px 3px 0 #1010140f",
        raised: "0 2px 4px -1px #1010140f, 0 8px 24px -6px #1010141f",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

export default config;
