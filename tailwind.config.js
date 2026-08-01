/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './public/js/**/*.js'],
  safelist: [
    {
      pattern:
        /^(border|text|bg|shadow|from|to)-(brand-(pink|orange|yellow|green|blue|purple))$/,
    },
    {
      pattern:
        /^(border|text|bg|shadow|from|to)-(brand-(pink|orange|yellow|green|blue|purple))\/(10|15|20|25|30|40|50|60|70|75|80|90)$/,
    },
    {
      pattern:
        /^(bg|border|text)-(brand-(pink|orange|yellow|green|blue|purple))-(light|dark)$/,
    },
    {
      pattern:
        /^(bg|border)-(brand-(pink|orange|yellow|green|blue|purple))-light\/(10|15|20|25|30|40|50|60|70|75|80|90)$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: {
            light: '#FFF0F3',
            DEFAULT: '#FF6B8B',
            dark: '#E05270',
          },
          orange: {
            light: '#FFF5F0',
            DEFAULT: '#FF8E53',
            dark: '#E0753A',
          },
          yellow: {
            light: '#FFFDF0',
            DEFAULT: '#FFD93D',
            dark: '#E0BE2F',
          },
          green: {
            light: '#F0FDF4',
            DEFAULT: '#4ECA64',
            dark: '#3AB24F',
          },
          blue: {
            light: '#EFF6FF',
            DEFAULT: '#4D96FF',
            dark: '#357AE8',
          },
          purple: {
            light: '#F5F3FF',
            DEFAULT: '#6C5DD3',
            dark: '#5646B8',
          },
        },
      },
    },
  },
};
