/** @type {import('tailwindcss').Config} */
const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: {
    DEFAULT: "#000000",
    100: "#444444",
    200: "#D9D9D9",
    300: "#252525",
  },
  purple: {
    DEFAULT: "#960E79",
  },
  pink: {
    DEFAULT: "#EEA7DF",
    50: "#EEA7DF33",
    80: "#EEA7DF4D",
    100: "#DF8B78",
  },
  green: {
    DEFAULT: "#56E7A8",
  },
  white: {
    DEFAULT: "#fff",
    100: "#F7F7F7",
  },
  blue: {
    DEFAULT: "#7D1E69",
  },
};
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xsm: "450px",
        sm: "640px",
        md: "769px",
        xmd: "860px",
        xlg: "991px",
        lg: "1025px",
        xxl: "1152px",
        xl: "1280px",
        "2xl": "1440px",
      },
      boxShadow: {
        custom: "0px 10px 30px rgba(255, 0, 0, 0.5)",
      },
      keyframes: {
        progress: {
          from: { transform: 'translateY(-50%) rotate(0deg)' },
          to: { transform: 'translateY(-50%) rotate(360deg)' }
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        "load": "spin 10s linear infinite",
        'draw-line': 'draw 4s ease forwards',
      },
      backgroundImage: {
        dots_bg: "url('/media/dots.png')",
        bg_line: "url('/public/media/Layer_1.png')",
        // bg_line2: "url('/public/media/Layer_green.png')",
        // card slider arrow
        prev_left: "url('/public/media/prevarrow.svg')",
        next_arrow: "url('/public/media/Arrownext.svg')",
        // tick_icon: "url('/public/image/tick-svggreen.svg')",
        //pricing-list svg
        close_svg: "url('/public/media/close.svg')",
        notactive_svg: "url('/public/media/not-active.svg')",
        tick_green: "url('/public/media/list-tick.svg')",
        // clipPath
        "clip-pink":
          "polygon(0% 25%, 42% 20%, 42% 5%, 100% 0%, 100% 95%, 51% 100%, 50% 94%, 3% 95%, 3% 95%, 3% 95%)",

        customGradient: "0px 0px 16px 0px #54615426",
      },
      fontFamily: {
        overpass: ["Overpass"],
        inter: ["Inter"],
        ivy: ["Ivy-Mode"],
      },
      colors: {
        ...colors,
      },
      fontSize: {
        h1: [
          "clamp(2.1rem, 2.1rem + 0.75vw, 3rem);", //48px
          { lineHeight: "clamp(2.75rem, 2.6rem + 0.85vw, 3.5rem)" },
        ],
        h2: [
          "clamp(1.75rem, 1.7rem + 0.25vw, 2rem)", //32px
          { lineHeight: "clamp(2.7rem, 1.9rem + 0.3vw, 3rem)" },
        ],
        h3: [
          "clamp(1.5rem, 1.45rem + 0.25vw, 1.75rem)", //28px
          {
            lineHeight: "clamp(2.0625rem, 2.00625rem + 0.28125vw, 2.34375rem)",
          },
        ],
        smtitle: [
          "clamp(1.375rem, 1.325rem + 0.125vw, 1.5rem)", //24px
          { lineHeight: "clamp(2.1875rem, 2.13125rem + 0.1875vw, 2.46875rem)" },
        ],
        h4: [
          "clamp(1.25rem, 1.2125rem + 0.1875vw, 1.4375rem)", //22px
          {
            lineHeight: " clamp(1.875rem, 1.81875rem + 0.28125vw, 2.15625rem)",
          },
        ],
        h5: [
          "clamp(1.125rem, 1.1rem + 0.125vw, 1.25rem)", //20px
          { lineHeight: "clamp(1.6875rem, 1.65rem + 0.1875vw, 1.875rem)" },
        ],
        p: [
          "clamp(1rem, 0.975rem + 0.125vw, 1.125rem)", //18px
          { lineHeight: "clamp(1.5rem, 1.4rem + 0.125vw, 1.6rem)" },
        ],
        body: [
          "clamp(0.9375rem, 0.925rem + 0.0625vw, 1rem)", //16px
          { lineHeight: "clamp(1.5rem, 1.2rem + 0.0625vw, 2rem)" },
        ],
        sm_text: [
          "clamp(0.875rem, 0.875rem + 0vw, 0.875rem)", //14px
          { lineHeight: "clamp(1.125rem, 1.1rem + 0.1vw, 1.25rem)" },
        ],
      },
    },

    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "1520px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
    require('@tailwindcss/typography'),
  ],
};
