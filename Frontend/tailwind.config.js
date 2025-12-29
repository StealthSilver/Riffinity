/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-wave": "gradient-wave 16s ease-in-out infinite",
        "ripple-drift": "ripple-drift 18s linear infinite",
        "overlay-pulse": "overlay-pulse 10s ease-in-out infinite",
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
      },
      backdropBlur: {
        xs: "4px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
    },
  },
  plugins: [],
};
