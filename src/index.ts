import ServerApplication from './application/ServerApplication';
import { Dialect } from 'sequelize/types';

/**
 *
 * @author Ilya Pikin
 */

new ServerApplication({
  production: (process.env.NODE_ENV === 'production'),
  serverPort: Number(process.env.PORT) || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbDialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
  dbName: process.env.DB_NAME || 'node_db',
  dbUserName: process.env.DB_USER_NAME || 'node_user',
  dbUserPassword: process.env.DB_USER_PASSWORD || '1234',
  syncModelsForce: false
});
