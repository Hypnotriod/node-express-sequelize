
import { injectable, singleton } from 'tsyringe';
import PostRepository from '../repository/PostRepository';
import PostModel from '../model/PostModel';

/**
 *
 * @author Ilya Pikin
 */

@injectable()
@singleton()
export class PostService {
    constructor(private readonly postRepository: PostRepository) { }

    public async create(name: string, text: string): Promise<PostModel | null> {
        if (name && text) {
            return this.postRepository.create(name, text);
        }
        return null;
    }

    public async findAllByName(name: string): Promise<PostModel[]> {
        return this.postRepository.findAllByName(name);
    }

    public async findById(id: number): Promise<PostModel | null> {
        if (!isNaN(id)) {
            return this.postRepository.findById(id);
        }
        return null;
    }
}
