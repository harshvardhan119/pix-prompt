/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#FF7A59',
        'orange-dark': '#FF6A40',
        'orange-light': '#FFE8DC',
        'gray-50': '#F9FAFB',
        'gray-100': '#F3F4F6',
        'gray-300': '#D1D5DB',
        'gray-500': '#9CA3AF',
        'gray-700': '#374151',
        'gray-900': '#111827',
        'success': '#10B981',
        'error': '#EF4444',
        'info': '#3B82F6',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'monaco': ['Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}

