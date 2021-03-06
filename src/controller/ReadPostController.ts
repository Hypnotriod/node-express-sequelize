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
@Controller('')
export default class ReadPostController {
    constructor(private readonly pageService: PostService) { }

    @Get(':postName')
    private async readPost(req: Request, res: Response): Promise<void> {
        const postModels: PostModel[] = await this.pageService.findAllByName(req.params.postName);
        res.send(postModels.length
            ? JSON.stringify(postModels)
            : 'Post not found');
    }
}
