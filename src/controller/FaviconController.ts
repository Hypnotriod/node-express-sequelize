import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { injectable, singleton } from 'tsyringe';

/**
 *
 * @author Ilya Pikin
 */

@injectable()
@singleton()
@Controller('favicon.ico')
export default class FaviconController {
    constructor() { }

    @Get()
    private getFavicon(req: Request, res: Response): void {
        res.status(204);
    }
}
