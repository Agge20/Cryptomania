module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme_gray: "#E2E2E2",
        theme_dark_gray: "#D1D5DB",
        theme_white: "#F8F8F8",
        theme_dark_purple: "#0C0216",
        theme_gold: "#FFBA49",
        theme_red: "#F63659",
        theme_green: "#38C242",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
        roboto: ["Roboto"],
      },
      width: { 128: "32rem" },
      screens: {},
      animation: {
        fadeInFast: "fadeIn 0.5s ease-in",
        fadeInMedium: "fadeIn 1s ease-in",
        fadeInSlow: "fadeIn 1.5s ease-in",
      },

      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
};
