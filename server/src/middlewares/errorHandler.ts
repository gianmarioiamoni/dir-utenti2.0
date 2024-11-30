import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { CustomError } from "../utils/CustomError";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  // Gestione degli errori personalizzati
  const statusCode = err instanceof CustomError ? err.status : 500;
  const message =
    err instanceof CustomError ? err.message : "Errore del server.";

  // Log dettagliato
  logger.error({
    message: err.message,
    status: statusCode,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  res.status(statusCode).json({
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
