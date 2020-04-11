import { injectable, singleton } from "tsyringe";
import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { PostService } from "../service/PostService";
import { PostModel } from "../model/PostModel";

@injectable()
@singleton()
@Controller('save_post')
export default class SavePostController {
    constructor(private pageService: PostService) { }

    @Get(':postName')
    private async savepost(req: Request, res: Response) {
        const pageModel: PostModel = await this.pageService.create(req.params.postName, req.query.text as string);
        if (pageModel) {
            res.send(JSON.stringify(pageModel));
        } else {
            res.send('Operation failed!');
        }
    }
}
