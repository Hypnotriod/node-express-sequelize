import ServerApplication from './application/ServerApplication';

new ServerApplication({
  production: false,
  serverPort: 3000,
  dbHost: 'localhost',
  dbPort: 5432,
  dbDialect: 'postgres',
  dbName: 'node_db',
  dbUserName: 'node_user',
  dbPassword: '1234'
});
