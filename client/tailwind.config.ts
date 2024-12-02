/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        // Aggiunta delle tonalità di grigio intermedio
        "gray-light": "var(--gray-light)",
        "gray-dark": "var(--gray-dark)",
      },
      // Estensioni per i bottoni
      buttonColors: {
        primary: {
          light: "var(--primary)", // Tema chiaro
          dark: "var(--primary)", // Tema scuro
        },
        secondary: {
          light: "var(--secondary)", // Tema chiaro
          dark: "var(--secondary)", // Tema scuro
        },
      },
    },
  },
  plugins: [
    // Puoi aggiungere altri plugin se necessario
  ],
};
