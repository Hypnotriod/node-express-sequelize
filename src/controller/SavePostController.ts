import { injectable, singleton } from 'tsyringe';
import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { PostService } from '../service/PostService';
import PostModel from '../model/PostModel';

/**
 *
 * @author Ilya Pikin
 */

@injectable()
@singleton()
@Controller('save_post')
export default class SavePostController {
    constructor(private pageService: PostService) { }

    @Get(':postName')
    private async savePost(req: Request, res: Response): Promise<void> {
        const postModel: PostModel = await this.pageService.create(req.params.postName, req.query.text as string);
        res.send(postModel
            ? JSON.stringify(postModel)
            : 'Operation failed!');
    }
}
