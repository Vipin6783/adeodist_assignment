import { format, createLogger, transports } from "winston";
import "winston-daily-rotate-file"
const { combine, timestamp, label, printf } = format;

const CATEGORY = "Log Rotation";
const fileRotateTransport = new transports.DailyRotateFile({
    filename: "./logs/logs-%DATE%.log",
    datePattern: 'YYYY-MM-DD-HH-mm',
    frequency: "5m",
    maxFiles: "6m",
  });
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [fileRotateTransport, new transports.Console()],
});

logger.log = (...params) => {
    const message = params.map(param => {
      if (typeof param === 'object') {
        return JSON.stringify(param);
      }
      return param;
    }).join(' ');
  
    logger.info(message);
  };

export default logger;
