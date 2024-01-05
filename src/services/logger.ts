import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'server-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${process.cwd()}/logs/emerg.log`, level: 'emerg' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/alert.log`, level: 'alert' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/crit.log`, level: 'crit' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/warning.log`, level: 'warning' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/notice.log`, level: 'notice' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/info.log`, level: 'info' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/debug.log`, level: 'debug' }),
    new winston.transports.File({ filename: `${process.cwd()}/logs/combined.log` }),
  ],
});

export default logger;