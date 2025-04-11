// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        colors: {
          muted: '#f5f5f5',
          'muted-foreground': '#6b7280',
          background: "#ffffff",
          input: "#f1f1f1",
          primary: "#facc15", // yellow-400
          ring: "#a855f7", // purple-500
        },
        fontFamily: {
          lora: ['Lora', 'serif'], 
        },
      },
    },
    plugins: [],
}