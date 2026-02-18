/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"DM Sans"', 'sans-serif'],
            },
            colors: {
                navy: {
                    DEFAULT: '#1B2A4A',
                    light: '#2A3B5E',
                },
                orange: {
                    DEFAULT: '#E8722A',
                    dark: '#D4651F',
                    light: '#FF8A47',
                },
                bg: '#F7F8FA',
                surface: '#FFFFFF',
                border: '#E5E7EB', // Gray-200 for better visibility than 100 on white
                text: {
                    main: '#1B2A4A',
                    muted: '#9CA3AF', // Gray-400
                    light: '#D1D5DB', // Gray-300
                },
            },
            borderRadius: {
                lg: '0.5rem', // 8px for buttons/inputs
                xl: '0.75rem', // 12px for cards
            },
            boxShadow: {
                sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }
        },
    },
    plugins: [],
}
