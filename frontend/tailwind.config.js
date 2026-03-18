/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#218084', // Teal - Naturaleza
                    light: '#32B8C6',
                    dark: '#1A6A73',
                },
                secondary: {
                    DEFAULT: '#A85230', // Marrón - Tierra
                    light: '#D6956A',
                    dark: '#5E5240',
                },
                background: '#FCFCF9', // Crema claro
                surface: '#FFFFF5',
                text: {
                    DEFAULT: '#134252', // Azul oscuro
                    secondary: '#626C7C',
                },
                success: '#218084',
                warning: '#E6814A',
                error: '#C0152F',
                info: '#626C7C',
                // Toslem Specific
                app: 'var(--bg-app)',
                'surface-totem': 'var(--surface-totem)',
                main: 'var(--text-main)',
                muted: 'var(--text-muted)',
                'primary-totem': 'var(--primary-totem)',
                'accent-totem': 'var(--accent-totem)',
                'danger-totem': 'var(--danger-totem)',
                'success-totem': 'var(--success-totem)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
