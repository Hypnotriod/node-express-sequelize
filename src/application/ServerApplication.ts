import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { Server } from '@overnightjs/core';
import { container } from 'tsyringe';
import PostModel from '../model/PostModel';
import ServerApplicationConfig from './ServerApplicationConfig';
import RootController from '../controller/RootController';
import ReadPostController from '../controller/ReadPostController';
import SavePostController from '../controller/SavePostController';

/**
 *
 * @author Ilya Pikin
 */

export default class ServerApplication extends Server {
    private sequelize: Sequelize;

    constructor(config: ServerApplicationConfig) {
        super(config.production === false);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.launch(config);
    }

    private async launch(config: ServerApplicationConfig): Promise<void> {
        this.initializeDatabase(config);
        this.initializeModels();
        await this.establishDBConnection();
        await this.syncModels(config.syncModelsForce);
        this.initControllers();
        this.startServer(config);
    }

    private initializeDatabase(config: ServerApplicationConfig): void {
        this.sequelize = new Sequelize({
            database: config.dbName,
            username: config.dbUserName,
            password: config.dbPassword,
            host: config.dbHost,
            port: config.dbPort,
            dialect: config.dbDialect,
        });
    }

    private initializeModels(): void {
        this.sequelize.addModels([
            PostModel
        ]);
    }

    private async establishDBConnection(): Promise<void> {
        try {
            return this.sequelize.authenticate();
        } catch (err) {
            console.error('Unable to connect to the database: ', err);
            throw err;
        }
    }

    private async syncModels(force: boolean): Promise<Sequelize> {
        return this.sequelize.sync({ force });
    }

    private initControllers(): void {
        super.addControllers([
            container.resolve(RootController),
            container.resolve(ReadPostController),
            container.resolve(SavePostController),
        ]);
    }

    private startServer(config: ServerApplicationConfig): void {
        this.app.listen(config.serverPort);
    }
}
