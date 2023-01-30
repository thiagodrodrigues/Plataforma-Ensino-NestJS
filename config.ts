import { mySqlConfig as configDev } from './src/infrastructure/config/mysql.development.config';
import { mySqlConfig as configProd } from './src/infrastructure/config/mysql.production.config';

export default process.env.NODE_ENV === 'production' ? configProd : configDev;