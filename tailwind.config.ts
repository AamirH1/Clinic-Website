import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F4EF",
        ivory2: "#F1ECE3",
        charcoal: "#181614",
        charcoal2: "#26221F",
        stone: "#8A8378",
        stoneLight: "#B8B2A6",
        clinical: "#5C7A72",
        clinicalDeep: "#3F5A53",
        gold: "#B79A6B"
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "sans-serif"]
      },
      maxWidth: {
        wrap: "1280px"
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        marquee: "marquee 30s linear infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
