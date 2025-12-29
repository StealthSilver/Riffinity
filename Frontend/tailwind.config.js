/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-wave": "gradient-wave 16s ease-in-out infinite",
        "ripple-drift": "ripple-drift 18s linear infinite",
        "overlay-pulse": "overlay-pulse 10s ease-in-out infinite",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "float-slow-reverse": "float-slow-reverse 25s ease-in-out infinite",
        "pulse-slow": "pulse-slow 15s ease-in-out infinite",
      },
      keyframes: {
        "gradient-wave": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "ripple-drift": {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -8px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        "overlay-pulse": {
          "0%": { opacity: "0.15" },
          "50%": { opacity: "0.35" },
          "100%": { opacity: "0.15" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        "float-slow-reverse": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-40px, 30px) scale(0.95)" },
          "66%": { transform: "translate(30px, -25px) scale(1.05)" },
        },
        "pulse-slow": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate(-50%, -50%) scale(1.1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
