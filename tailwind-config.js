window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0f9ff',
          100: '#E0F2FE',
          400: '#38bdf8',
          500: '#0EA5E9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e'
        },
        ink: '#0f172a'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 2px 8px rgba(14,165,233,0.06), 0 12px 32px -12px rgba(15,23,42,0.10)',
        card: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(14,165,233,0.15)'
      }
    }
  }
}
