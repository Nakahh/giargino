import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        headline: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "hero-title": ["4rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "section-title": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "card-title": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-large": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "small": ["0.875rem", { lineHeight: "1.5" }],
        "tiny": ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.10)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.10)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.10)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.10)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        elevation: "0 20px 40px -10px rgba(31, 59, 94, 0.20), 0 0 0 1px rgba(244, 196, 48, 0.12)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #1F3B5E 0%, #2D5A8C 50%, #F4C430 100%)",
        "card-gradient": "linear-gradient(180deg, rgba(31, 59, 94, 0.05) 0%, rgba(31, 59, 94, 0) 100%)",
        "glow-bg": "radial-gradient(circle at center, rgba(244, 196, 48, 0.10) 0%, transparent 70%)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
        cinematic: "900ms",
      },
      transitionTimingFunction: {
        "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
        "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
