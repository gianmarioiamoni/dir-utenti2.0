import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentazione",
      version: "1.0.0",
      description: "Documentazione delle API per la gestione utenti.",
      contact: {
        name: "Gianmario Iamoni",
        email: "gianmarioiamoni1@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api", // Modifica in base al tuo setup
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Percorso ai tuoi file di routes con commenti Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
