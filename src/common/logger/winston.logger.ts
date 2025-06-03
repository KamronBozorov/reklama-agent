import * as winston from 'winston';
import { utilities } from 'nest-winston';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        // winston.format.label({ label: 'AddAgency' }),
        winston.format.timestamp(),
        utilities.format.nestLike('AddAgency'),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};
