import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info", // min log level (i.e. 'error', 'warn', 'info')
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // Show stacktrace if an error occurs
    format.json() // format logs in JSON
  ),
  transports: [
    new transports.Console({
      // Log on console
      format: format.combine(format.colorize(), format.simple()),
    }),
    // Transports define where to send log messages
    new transports.File({ filename: "logs/errors.log", level: "error" }), // error level logs in a separate file
    new transports.File({ filename: "logs/combined.log" }), // general log, info level
  ],
});

// Log for production
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({ filename: "logs/critical.log", level: "critical" })
  );
}

export default logger;
