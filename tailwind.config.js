/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx, ts, tsx}"
  ],
  theme: {
    screens: {
      sm: "300px",
      md: "400px",
      lg: "880px",
      tablet: "1024px",
    },
    extend: {
      fontFamily: {
        MontserratBlack: "MontserratBlack",
        MontserratBlackItalic : "MontserratBlackItalic",
        MontserratBold : "MontserratBold",
        MontserratBoldItalic : "MontserratBoldItalic",
        MontserratExtraBold : "MontserratExtraBold",
        MontserratExtraBoldItalic : "MontserratExtraBoldItalic",
        MontserratExtraLight : "MontserratExtraLight",
        MontserratItalic : "MontserratItalic",
        MontserratLight : "MontserratLight",
        MontserratLightItalic : "MontserratLightItalic",
        MontserratMedium : "MontserratMedium",
        MontserratRegular : "MontserratRegular",
        MontserratSemiBold : "MontserratSemiBold",
        MontserratSemiBoldItalic: "MontserratSemiBoldItalic",
        MontserratThin : "MontserratThin",
        MontserratThinItalic : "MontserratThinItalic"
      },
      fontSize: {
        headline: ["28px", { lineHeight: "36px" }],
        title: ["24px", { lineHeight: "32px" }],
        subtitle: ["20px", { lineHeight: "28px" }],
        body: ["16px", { lineHeight: "24px" }],
        label: ["14px", { lineHeight: "20px" }],
        caption: ["12px", { lineHeight: "18px" }],
      },
      colors: {
        primary: "#C4ACA4",
        secondary: "#F4F4F4",
        background: "#FFFFFF",
        backgroundAlt: "#FFFAF9",
        textMain: "#303030",
        textSecondary: "#828282",
        success: "#28A745",
        error: "#E63946",
        warning: "#FFCC00",
      },
      
    },
  },
  plugins: [],
};
