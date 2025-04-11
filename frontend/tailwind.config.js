// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        colors: {
          muted: '#f5f5f5', // or a more branded value
          'muted-foreground': '#6b7280',
        },
        fontFamily: {
          lora: ['Lora', 'serif'], 
        },
      },
    },
    plugins: [],
}