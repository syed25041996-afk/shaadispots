/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d2da',
          300: '#f4adc0',
          400: '#ec7d9d',
          500: '#de4e78',
          600: '#c83260',
          700: '#a7244c',
          800: '#8c2041',
          900: '#771f3b',
          950: '#460b1e', // deep royal maroon
        },
        gold: {
          50: '#fffef0',
          100: '#fff9c2',
          200: '#ffef85',
          300: '#ffe047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          metallic: '#D4AF37',
        },
        cream: {
          50: '#fefefe',
          100: '#fdfbf7',
          200: '#faf5ef',
          300: '#f5efe6',
          400: '#eee3d5',
          500: '#dfcfbe',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'wedding': '0 10px 25px -5px rgba(119, 31, 59, 0.08), 0 8px 10px -6px rgba(119, 31, 59, 0.04)',
        'wedding-lg': '0 20px 35px -5px rgba(119, 31, 59, 0.12), 0 10px 15px -6px rgba(119, 31, 59, 0.08)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}

