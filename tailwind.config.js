/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        coursehub: {
          primary: "#007BFF",        // Deep Blue - Main brand
          "primary-content": "#ffffff",
          secondary: "#28A745",      // Success Green
          "secondary-content": "#ffffff",
          accent: "#FFC107",         // Yellow accent for highlights
          neutral: "#333333",
          "base-100": "#F8F9FA",     // Light background
          "base-200": "#ffffff",
          "base-300": "#DEE2E6",
          info: "#0dcaf0",
          success: "#28A745",
          warning: "#FFC107",
          error: "#DC3545",
        },
      },
    ],
    darkTheme: "dark", // optional if you add dark mode later
    base: true,
    styled: true,
    utils: true,
  },
  plugins: [require("daisyui")],
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
// }

