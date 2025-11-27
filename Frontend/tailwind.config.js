/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5e6ff",
          100: "#e6ccff",
          200: "#d9b3ff",
          300: "#c77dff",
          400: "#9d4edd",
          500: "#7b2cbf",
          600: "#5a189a",
          700: "#3c096c",
          800: "#240046",
          900: "#10002b",
        },
        accent: {
          orange: "#ff6a00",
          yellow: "#ffcc00",
        },
      },
      animation: {
        "slide-down": "slideDown 0.5s ease",
        "slide-up": "slideUp 0.5s ease",
        "slide-in-left": "slideInLeft 0.4s ease",
        "fade-in": "fadeIn 0.5s ease",
        "bounce-in": "bounceIn 0.4s ease",
        "sparkle-float": "sparkleFloat 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        sparkleFloat: {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "0.7",
          },
          "50%": { transform: "translateY(-5px) rotate(180deg)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(123, 44, 191, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(123, 44, 191, 0.8)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
