/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "deep-blue": "#001F54",
        "midnight-purple": "#2C003E",
        "electric-blue": "#0576B9",
        violet: "#7C3AED",
        "neon-green": "#39E500",
        "soft-gold": "#FFD700",
        "charcoal-black": "#333333",
        "muted-white": "#F5F5F5",
      },
    },
  },

  plugins: [],
};
