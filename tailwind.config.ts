import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
        // Vinci4 semantic colors
        tree: {
          trunk: "hsl(var(--tree-trunk))",
          green: "hsl(var(--tree-green))",
          glow: "hsl(var(--tree-glow))",
        },
        category: {
          finance: "hsl(var(--finance))",
          physical: "hsl(var(--physical))",
          mental: "hsl(var(--mental))",
          diet: "hsl(var(--diet))",
        },
      },
      backgroundImage: {
        'gradient-warm': 'var(--gradient-warm)',
        'gradient-golden': 'var(--gradient-golden)',
        'gradient-tree': 'var(--gradient-tree)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'glow-soft': 'var(--glow-soft) hsl(var(--primary-glow) / 0.3)',
        'glow-medium': 'var(--glow-medium) hsl(var(--primary-glow) / 0.4)',
        'glow-strong': 'var(--glow-strong) hsl(var(--primary-glow) / 0.5)',
        'tree-glow': 'var(--glow-medium) hsl(var(--tree-glow) / 0.4)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "tree-grow": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "leaf-appear": {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "50%": { transform: "scale(1.2) rotate(5deg)", opacity: "0.8" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "var(--glow-soft) hsl(var(--primary-glow) / 0.3)" },
          "50%": { boxShadow: "var(--glow-medium) hsl(var(--primary-glow) / 0.5)" }
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "tree-grow": "tree-grow 1s ease-out",
        "leaf-appear": "leaf-appear 0.6s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
