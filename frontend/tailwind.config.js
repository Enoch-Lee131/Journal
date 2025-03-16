/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: {
          500: "#3b82f6"
        }
      },
      // Add these new extensions for gradients and shadows
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4f46e5, #3b82f6)',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 6px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    }
  },
  plugins: [
    require("daisyui"),
    // Add forms plugin if you don't have it
    require('@tailwindcss/forms')
  ],
  daisyui: {
    themes: ["light", "dark"]
  }
}