import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", sm: "2rem", lg: "3rem", xl: "4rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        brand: {
          gold: {
            50: "#FBF7ED",
            100: "#F5EDD5",
            200: "#ECDAAB",
            300: "#DFC27B",
            400: "#D4AB56",
            500: "#C5A14E", // ← PRIMARY — logo gold
            600: "#B08C3A",
            700: "#8B6E2E",
            800: "#6B5424",
            900: "#4A3A19",
            950: "#2D2310",
          },
          black: {
            50: "#F5F5F5",
            100: "#E5E5E5",
            200: "#CCCCCC",
            300: "#999999",
            400: "#666666",
            500: "#333333",
            600: "#1A1A1A", // ← text primary
            700: "#111111",
            800: "#0A0A0A",
            900: "#050505",
            950: "#000000", // ← pure black (logo background)
          },
          cream: {
            50: "#FAF7F2",
            100: "#FEFCF0",
            200: "#FDF8E1",
            300: "#FAF7F2", // ← background accent
            400: "#F5EDD5",
            500: "#EDE0BF",
          },
        },
        primary: "var(--color-brand-gold-500, #C5A14E)",
        secondary: "var(--color-brand-black-950, #000000)",
        background: "var(--color-brand-cream-50, #FAF7F2)",
        surface: "#FFFFFF",
        error: "#C53030",
        success: "#2F855A",
        warning: "#D69E2E",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-montserrat)", "Helvetica Neue", "sans-serif"],
        accent: ["var(--font-montserrat)", "Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "300" }],
        "display-2": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "300" }],
        "heading-1": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-2": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "0em", fontWeight: "600" }],
        "heading-3": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3", letterSpacing: "0em", fontWeight: "600" }],
        subtitle: ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.03em", fontWeight: "500" }],
        overline: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      spacing: {
        section: "clamp(4rem, 8vw, 8rem)",
        "section-sm": "clamp(2rem, 4vw, 4rem)",
        container: "1.5rem",
        "container-lg": "2rem",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "8px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
        medium: "0 4px 25px -5px rgba(0,0,0,0.1), 0 10px 40px -5px rgba(0,0,0,0.04)",
        elevated: "0 10px 50px -12px rgba(0,0,0,0.15)",
        gold: "0 4px 20px -4px rgba(200,165,88,0.3)",
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
        'diamond-pulse': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.15) rotate(45deg)', opacity: '0.7' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Part 4.3 — CTA idle breathing pulse
        'cta-breathe': {
          '0%':   { boxShadow: '0 0 0 0px rgba(197,161,78,0.35)', borderColor: 'rgba(197,161,78,1.0)' },
          '50%':  { boxShadow: '0 0 0 8px rgba(197,161,78,0.00)', borderColor: 'rgba(197,161,78,0.80)' },
          '100%': { boxShadow: '0 0 0 0px rgba(197,161,78,0.00)', borderColor: 'rgba(197,161,78,1.0)' },
        },
        // Part 4.2 — decorative gold line draw-on
        'gold-line-draw': {
          '0%':   { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '0.7' },
        },
        // Part 4.5 — scroll indicator shimmer
        'scroll-shimmer': {
          '0%':   { backgroundPosition: '0% -100%' },
          '100%': { backgroundPosition: '0% 200%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 8s linear infinite alternate',
        'diamond-pulse': 'diamond-pulse 3.6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        // Hero animations
        'cta-breathe': 'cta-breathe 3.2s ease-in-out infinite',
        'gold-line-draw': 'gold-line-draw 600ms cubic-bezier(0.65,0,0.35,1) forwards',
        'scroll-shimmer': 'scroll-shimmer 2.4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 500ms ease-out forwards',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'bounce-luxury': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
