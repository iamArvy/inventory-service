import { appConfig, appValidation } from './app.config';
import { dbConfig, dbValidation } from './database.config';
import { winstonConfig, winstonValidation } from './winston.config';

export const config = [appConfig, dbConfig, winstonConfig];

export const validationSchema = appValidation
  .concat(dbValidation)
  .concat(winstonValidation);
