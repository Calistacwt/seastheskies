/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nbsdev/naini-react/dist/esm/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003784",
          dark: "#002c6a",
          light: "#E6EBF3",
          text: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E6EBF3",
          dark: "#D9DDE3",
          text: "#003784",
        },
        success: {
          DEFAULT: "#027A48",
          dark: "#026e41",
          light: "#ECFDF3",
          text: "#027A48",
        },
        outline: {
          DEFAULT: "#EBEBEB",
          dark: "#d9dde3",
          light: "#F8F8F8",
          text: "#262626",
        },
        error: {
          DEFAULT: "#D7382D",
          dark: "#96271f",
          light: "#FBEBEA",
          text: "#D7382D",
        },
        warning: {
          DEFAULT: "#F68B27",
          light: "#FEF3E9",
          text: "#F68B27",
        },
        info: {
          DEFAULT: "#359BFF",
          light: "#EBF5FF",
          text: "#359BFF",
        },
        dark: {
          1: "#262626",
          3: "#7D7D7D",
        },
      },
      boxShadow: {
        sm: "4px 4px 12px 0 rgba(18, 18, 18, 0.04);",
      },
    },
  },
  plugins: [
    require('@nbsdev/naini-tailwindcss'),
  ],
}
