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
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        popAnimation: {
          '0%': { height: '0', opacity: '0' },
          '60%': { height: '30rem', opacity: '1' },
          '100%': { height: '28rem', opacity: '1' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 2s ease-in-out',
        'slide-in-right': 'slide-in-right 2s ease-in-out',
        popAnimation: 'popAnimation 2s ease-out forwards',
        heartBeat: 'heartBeat 2s ease-in-out infinite 0.5s',
      },
      spacing: {
        '80': '20rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
