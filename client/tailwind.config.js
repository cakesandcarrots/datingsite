/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        blitzwing: ['Blitzwing', 'sans-serif'],
        rockoflf: ['rockoflf', 'sans-serif'],
        truenorg: ['truenorg', 'sans-serif'],
        aileron: ['aileron', 'sans-serif']
      },
      height: {
        '120': '30rem',
      },
      keyframes: {
        popAnimation: {
          '0%': { height: '0', opacity: '0' },
          '60%': { height: '24rem', opacity: '1' },
          '100%': { height: '25rem', opacity: '1' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        popAnimation: 'popAnimation 2s ease-out forwards',
        heartBeat: 'heartBeat 1s ease-in-out infinite',
        combined: 'popAnimation 2s ease-out forwards, heartBeat 1s ease-in-out infinite',
      },
      spacing: {
        '80': '20rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
