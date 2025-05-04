/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "light-mode": "linear-gradient(180deg, #d8e7fb 0%, #fff8fb 100%)",
        "dark-mode":
          "linear-gradient(144deg, #343c3a 5%, #78807d 70%, #cbd1cf 100%)",
      },
      shadowBox: {
        "light-shadow": "var(--shadowBox)",
      },
      colors: {
        // پالت اصلی
        primary: {
          DEFAULT: "#273c75",
          dark: "#192a56",
        },
        warrning: {
          DEFAULT: "#fbc531",
          dark: "#e1b12c",
        },
        secondary: {
          DEFAULT: "#d1d8e0",
          dark: "#a5b1c2",
        },
        success: {
          DEFAULT: "#05c46b",
          dark: "#218c74",
        },
        error: "#c23616",
        dark: {
          DEFAULT: "#343c3a",
          text: "#d8e7fb",
        },
        light: {
          DEFAULT: "#d8e7fb",
          text: "#343c3a",
        },
        highlight: "#FFD700",
      },
    },
  },
  plugins: [],
};
