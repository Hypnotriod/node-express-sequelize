import { Dialect } from 'sequelize/types';

export interface ServerApplicationConfig {
    production: boolean;
    serverPort: number;
    dbHost: string;
    dbPort: number;
    dbDialect: Dialect;
    dbName: string;
    dbUserName: string;
    dbPassword: string;
}