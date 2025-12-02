/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "sans-serif"],
      },
      colors: {
        "white-color": "#fff",
        "primary-color": "#4169E1",
        "secondary-color": "#2E4BA0",
        "tertiary-color": "#1B2C5F",
        "quartenary-color": "#1B2C5F",
        "primary-accent-color": "#777777",
        "secondary-accent-color": "#5C5C5C",
        "tertiary-accent-color": "#E4E4E4",
        "card-bg": "#F8F8F8",
        "screen-bg": "#F6F6F6",
        "form-text-color": "#B9B9B9",
        orange: "#FFA500",
        "border-color": "#D7D7D7",
      },
      screens: {
        xsm: "400px",
      },

      display: {
        'none': 'none',
      },
    },
  },
  plugins: [],
};
