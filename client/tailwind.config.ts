/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Includi tutti i file sorgenti
  ],
  theme: {
    extend: {
      colors: {
        // Tema Scuro
        dark: {
          background: "#1e1e1e", // Grigio scuro
          foreground: "#f0f0f0", // Grigio molto chiaro
          accent: "#ff7f32", // Arancione scuro/brillante
          primary: "#1e90ff", // Azzurro (Primary)
          secondary: "#6c757d", // Verde/Grigio-blu per secondary
        },
        // Tema Chiaro
        light: {
          background: "#f4f4f4", // Grigio chiaro o bianco sporco
          foreground: "#333333", // Grigio scuro o nero morbido
          accent: "#ff9c42", // Arancione caldo/brillante
          primary: "#1e90ff", // Azzurro (Primary)
          secondary: "#6c757d", // Colore sobrio comune a entrambi i temi
        },
      },
      // Aggiungi la configurazione per i bottoni
      extend: {
        // Bottoni
        buttonColors: {
          primary: {
            light: "#1e90ff", // Azzurro (Primary) per tema chiaro
            dark: "#1e90ff", // Azzurro (Primary) per tema scuro
          },
          secondary: {
            light: "#6c757d", // Colore secondario (verde/grigio-blu) per tema chiaro
            dark: "#6c757d", // Colore secondario (verde/grigio-blu) per tema scuro
          },
        },
      },
    },
  },
  plugins: [
    // Plugin per aggiungere le classi personalizzate per i bottoni
    function ({
      addComponents,
      theme,
    }: {
      addComponents: (components: Record<string, any>) => void;
      theme: any;
    }) {
      addComponents({
        ".btn-primary": {
          backgroundColor: theme("colors.buttonColors.primary.light"),
          color: theme("colors.dark.foreground"),
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: theme("colors.buttonColors.primary.dark"),
          },
          "&:focus": {
            outline: "none",
            ringColor: theme("colors.primary"),
          },
        },
        ".btn-secondary": {
          backgroundColor: theme("colors.buttonColors.secondary.light"),
          color: theme("colors.dark.foreground"),
          borderRadius: "0.375rem",
          padding: "0.5rem 1rem",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: theme("colors.buttonColors.secondary.dark"),
          },
          "&:focus": {
            outline: "none",
            ringColor: theme("colors.secondary"),
          },
        },
      });
    },
  ],
};
