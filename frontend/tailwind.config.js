/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: { backgroundImage: {
      'hero-pattern': "url('/assets/demo.webp')",
      'footer-texture': "url('/img/footer-texture.png')",
    }
  }
  }
}

