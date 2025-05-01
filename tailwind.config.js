/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px"
      },
      backgroundImage: {
        "light-mode": "linear-gradient(180deg, #d8e7fb 0%, #fff8fb 100%)",
        "dark-mode":
          "linear-gradient(144deg, #343c3a 5%, #78807d 70%, #cbd1cf 100%)"
      },
      colors: {
        // پالت اصلی
        primary: {
          DEFAULT: "#FF5A1F",
          dark: "#E04A1A"
        },
        secondary: {
          DEFAULT: "#003B5C",
          dark: "#002A41"
        },
        success: "#00C853",
        error: "#D32F2F",
        dark: {
          DEFAULT: "#cbd1cf",
          text: "#d8e7fb"
        },
        light: {
          DEFAULT: "#d8e7fb",
          text: "#343c3a"
        },
        highlight: "#FFD700"
      }
    }
  },
  plugins: [require("tailwindcss-rtl")]
};
