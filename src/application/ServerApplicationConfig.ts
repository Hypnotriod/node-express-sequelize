import { Dialect } from 'sequelize/types';

/**
 *
 * @author Ilya Pikin
 */

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