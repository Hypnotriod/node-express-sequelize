import { Dialect } from 'sequelize/types';

/**
 *
 * @author Ilya Pikin
 */

export default interface ServerApplicationConfig {
    production: boolean;
    serverPort: number;
    dbHost: string;
    dbPort: number;
    dbDialect: Dialect;
    dbName: string;
    dbUserName: string;
    dbUserPassword: string;
    syncModelsForce: boolean;
}