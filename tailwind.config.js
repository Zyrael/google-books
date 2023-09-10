/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    gridTemplateColumns: {
      'auto-fill': 'repeat(auto-fill, 250px)',
    },
    // screens: {
    //   md: '800px',
    // },
  },
  plugins: [],
};
