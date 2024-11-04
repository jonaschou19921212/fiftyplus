const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,pug}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: '20px'
    },
    screens: {
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '1440px': '1440px',
      '1600px': '1600px',
    },
    breakpoints: {
      xs: '424px',
      sm: '639px',
      md: '767px',
      lg: '1023px',
      xl: '1279px',
      '1440px': '1439px',
      '1600px': '1599px',
    }
  },
  plugins: [
    plugin(function ({
      addVariant
    }) {
      addVariant('hover', '@media (hover: hover) and (pointer: fine) { &:hover }')
      addVariant('group-hover', '@media (hover: hover) and (pointer: fine) { :merge(.group):hover &}')
      addVariant('peer-hover', '@media (hover: hover) and (pointer: fine) { :merge(.peer):hover ~ & }')
    })
  ],
}