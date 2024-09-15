const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFB749",
        secondary: "#3C424DFF",
        success: "#559f60",
        warning: "#FF7738",
        error: "#c4515c",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
