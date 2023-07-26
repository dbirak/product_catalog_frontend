/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  important: "#root",
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      // {
      //   dark: {
      //     primary: "#38bdf8",
      //     secondary: "#818CF8",
      //     accent: "#F471B5",
      //     neutral: "#1E293B",
      //     "neutral-focus": "#273449",
      //     "base-100": "#11141c",
      //     info: "#0CA5E9",
      //     success: "#2DD4BF",
      //     warning: "#F4BF50",
      //     error: "#FB7085",
      //   },
      // },
      {
        light: {
          primary: "#ca000c",
          secondary: "#818CF8",
          accent: "#ca000c",
          neutral: "#021431",
          "base-100": "#ffffff",
          "base-200": "#F2F7FF",
          "base-300": "#f6f6f6",
          "base-content": "#777777",
          info: "#0CA5E9",
          success: "#2DD4BF",
          warning: "#F4BF50",
          error: "#FB7085",
        },
      },
    ],
  },
  theme: {
    extend: {},
    fontFamily: {
      // Kanit: ['Palanquin Dark'],
      // Polan: ['Kanit']
    },
  },
  plugins: [require("daisyui")],
};
