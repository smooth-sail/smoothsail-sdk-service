import "dotenv/config";
import appRoot from "app-root-path";
import winston from "winston";
import morgan from "morgan";

const { combine, colorize, timestamp, errors, printf, json } = winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const prettyPrintIfObject = winston.format((info, opts) => {
  if (typeof info.message === "object") {
    info.message = JSON.stringify(info.message, null, 2);
  }
  return info;
});

const options = {
  combined: {
    filename: `${appRoot}/logs/combined.log`,
    handleExceptions: true,
  },
  exception: {
    filename: `${appRoot}/logs/exception.log`,
  },
  error: {
    level: "error",
    filename: `${appRoot}/logs/error.log`,
    format: combine(
      errorFilter(),
      errors({ stack: true }),
      timestamp(),
      json()
    ),
  },
  console: {
    level: process.env.LOGLEVEL || "warn",
    format: combine(
      colorize(),
      timestamp({
        format: "YYYY-MM-DD hh:mm:ss A",
      }),
      prettyPrintIfObject(),
      printf((info) => `[${info.level}] ${info.timestamp}: ${info.message}`)
    ),
    handleExceptions: true,
  },
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.combined),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console),
  ],
  exceptionHandlers: [new winston.transports.File(options.exception)],
});

export const morganMiddleware = morgan(
  ":method :url :status - :response-time ms",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);
