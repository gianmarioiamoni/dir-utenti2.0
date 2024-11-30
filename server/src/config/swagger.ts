import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Utenti",
      version: "1.0.0",
      description: "Documentazione dell'API per la gestione degli utenti",
    },
    servers: [
      {
        url: "http://localhost:5000/api", // Base URL dell'API
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Percorso dei file contenenti i routes con annotazioni
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
