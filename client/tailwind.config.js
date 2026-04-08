/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#4F46E5",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(31, 38, 135, 0.2)",
      },
      backdropBlur: {
        glass: "10px",
      },
    },
  },
  plugins: [],
};