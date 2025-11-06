/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1f1f1f",
        primary: "#00bfb3",
        "primary-foreground": "#ffffff",
        secondary: "#8b3a9c",
        "secondary-foreground": "#ffffff",
        accent: "#c7265e",
        "accent-foreground": "#ffffff",
        muted: "#ececf0",
        "muted-foreground": "#717182",
        border: "rgba(15, 23, 42, 0.08)",
        card: "#ffffff",
        "card-foreground": "#1f1f1f",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        soft: "0 15px 35px rgba(15, 23, 42, 0.08)",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
