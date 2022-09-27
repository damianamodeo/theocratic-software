/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primaryLightest": "#bdb6c9",
        "primaryLighter": "#744cae",
        "primaryLight": "#744cae",
        "primary": "#5b3c88",
        "primaryD": "#d1b7f2",
        "primaryDark": "#51357b",
        "secondaryLight": "#5a85cd",
        "secondary": "#4a6da7",
        "secondaryD": "#7f9fd3",
        "secondaryDark": "#43639a",
        "bgLightest": "#f1f1f1",
        "bgLight": "#f0eeea",
        "bg": "#d8d8d8",
        "bgD": "#2a2a2a",
        "bgDark": "#c0c0c0",
        "bgDarkD": "#393939",
        "button": "#6d6d6d",
        "buttonD": "#888888",
        "jwGrey": "#626262",
        "jwYellow": "#c48430",
        "jwYellowDark": "#c48430",
        "jwYellowDarkD": "#ecb368",
        "jwMaroon": "#942926",
        "jwBlack": "#121212",
      },
      fontFamily: {
        noto: "'Noto Sans', sans-serif",
      },
      fontSize: {
        "header": "1.05rem",
        "navbar": "0.6rem"
      },
      spacing: {
        "navHeight": "3.1rem",
      }
    },
  },
  plugins: [],
}