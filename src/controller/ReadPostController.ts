import { injectable, singleton } from "tsyringe";
import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { PostService } from "../service/PostService";
import { PostModel } from "../model/PostModel";

@injectable()
@singleton()
@Controller('')
export default class ReadPostController {
    constructor(private pageService: PostService) { }

    @Get(':postName')
    private async readPost(req: Request, res: Response) {
        const postModels: PostModel[] = await this.pageService.findAllByName(req.params.postName);
        res.send(postModels.length
            ? JSON.stringify(postModels[0])
            : "Post not found");
    }
}
