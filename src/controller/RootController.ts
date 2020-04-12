import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
@Controller('/')
export default class RootController {
    constructor() { }

    @Get()
    private getRootPage(req: Request, res: Response): void {
        res.send('Root page');
    }
}
