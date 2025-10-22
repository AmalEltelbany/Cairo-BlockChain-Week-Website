// tailwind.config.js (theme.extend)
module.exports = {
  theme: {
    extend: {
      colors: {
        cbcw: {
          teal: '#00E3D8',
          purple: '#C400FF',
          blue:  '#3C6EFF',
          black: '#0A0A0A',
          grey:  '#B0B0B0'
        }
      },
      fontFamily: {
        heading: ['Oswald', 'system-ui', 'sans-serif'],
        display: ['ETHONCENTRIC', 'Oswald', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      keyframes: {
        'cbw-gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      },
      animation: {
        'cbw-gradient': 'cbw-gradient 8s linear infinite'
      }
    }
  }
}
