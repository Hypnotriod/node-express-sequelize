import * as bodyParser from 'body-parser';
import { Sequelize } from 'sequelize-typescript';
import { Server } from '@overnightjs/core';
import { container } from 'tsyringe';
import { Logger } from '@overnightjs/logger';
import http from 'http';
import PostModel from '../model/PostModel';
import ServerApplicationConfig from './ServerApplicationConfig';
import RootController from '../controller/RootController';
import ReadPostController from '../controller/ReadPostController';
import SavePostController from '../controller/SavePostController';
import FaviconController from '../controller/FaviconController';

/**
 *
 * @author Ilya Pikin
 */

export default class ServerApplication extends Server {
    private sequelize: Sequelize;

    constructor(config: ServerApplicationConfig) {
        super(config.production === false);
        this.launch(config);
    }

    private async launch(config: ServerApplicationConfig): Promise<void> {
        this.initializeRouterHandles();
        this.initializeDatabase(config);
        this.initializeModels();
        await this.establishDBConnection();
        await this.syncModels(config);
        this.initControllers();
        this.startServer(config);
    }

    private initializeRouterHandles(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeDatabase(config: ServerApplicationConfig): void {
        this.sequelize = new Sequelize({
            database: config.dbName,
            username: config.dbUserName,
            password: config.dbPassword,
            host: config.dbHost,
            port: config.dbPort,
            dialect: config.dbDialect,
            logging: !config.production,
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
            Logger.Err('Unable to connect to the database.');
            Logger.Err(err, true);
            throw err;
        }
    }

    private async syncModels(config: ServerApplicationConfig): Promise<Sequelize> {
        return this.sequelize.sync({ force: config.syncModelsForce });
    }

    private initControllers(): void {
        super.addControllers([
            container.resolve(FaviconController),
            container.resolve(RootController),
            container.resolve(ReadPostController),
            container.resolve(SavePostController),
        ]);
    }

    private startServer(config: ServerApplicationConfig): void {
        http.createServer(this.app).listen(config.serverPort);
    }
}
