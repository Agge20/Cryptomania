module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                theme_light_gray: "#ECECEC",
                theme_gray: "#E2E2E2",
                theme_dark_gray: "#D1D5DB",
                theme_white: "#F8F8F8",
                theme_dark_purple: "#0C0216",
                theme_gold: "#FFBA49",
                theme_red: "#F63659",
                theme_green: "#38C242",
            },
            minHeight: {
                xs: "20rem",
                sm: "24rem",
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
                "2xl": "42rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "5xl": "64rem",
                "6xl": "72rem",
            },
            minWidth: {
                0: "0",
                full: "100%",
                xs: "20rem",
                sm: "24rem",
                md: "28rem",
                lg: "32rem",
                xl: "36rem",
                "2xl": "42rem",
                "3xl": "48rem",
                "4xl": "56rem",
                "5xl": "64rem",
                "6xl": "72rem",
            },
            maxWidth: (theme, { breakpoints }) => ({
                "1/4": "25%",
                "1/3": "33%",
                "1/2": "50%",
                "3/4": "75%",
                xxs: "10rem",
            }),

            fontFamily: {
                montserrat: ["Montserrat"],
                roboto: ["Roboto"],
            },
            lineHeight: {
                11: "2.75rem",
                12: "3rem",
            },
            width: { 128: "32rem" },
            screens: {},
            animation: {
                fadeInFast: "fadeIn 0.5s ease-in",
                fadeInMedium: "fadeIn 1s ease-in",
                fadeInSlow: "fadeIn 1.5s ease-in",
            },
            scale: {
                98: ".98",
                99: ".99",
            },
            boxShadow: {
                cryptomania: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
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
