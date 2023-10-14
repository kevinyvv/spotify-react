/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 10s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "25%": {
            transform: "translate(50px, -50px) scale(1.1)"
          },
          "50%": {
            transform: "translate(-25px, 25px) scale(0.9)"
          },
          "75%": {
            transform: "translate(-75px, 75px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          }
        }
      }
    },
    fontFamily: {
      'montserrat': ['montserrat', 'sans-serif']
    }
  },
  plugins: [
    require('@codaworks/react-glow/tailwind')
  ],
}

