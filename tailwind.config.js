/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./app.js",
        "./model/*.js",
        "./view/*.js",
        "./controller/*.js",
        "./data/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                primary: '#e5e7eb',
                'primary-dark': '#1a1a1a',
                accent: '#c9a227',
                'accent-light': '#d4b44a',
                bg: '#1a1a1a',
                'bg-light': '#242424',
                surface: '#242424',
                'surface-light': '#2d2d2d',
                text: '#e5e7eb',
                'text-secondary': '#9ca3af',
                border: '#374151',
                'border-light': '#1f2937',
            }
        }
    },
    plugins: [],
}
