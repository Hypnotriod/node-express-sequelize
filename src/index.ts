import ServerApplication from './application/ServerApplication';

/**
 *
 * @author Ilya Pikin
 */

new ServerApplication({
  production: false,
  serverPort: 3000,
  dbHost: 'localhost',
  dbPort: 5432,
  dbDialect: 'postgres',
  dbName: 'node_db',
  dbUserName: 'node_user',
  dbPassword: '1234',
  syncModelsForce: false
});
