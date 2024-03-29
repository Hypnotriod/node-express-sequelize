import { singleton } from 'tsyringe';
import PostModel from '../model/PostModel';

/**
 *
 * @author Ilya Pikin
 */

@singleton()
export default class PostRepository {
    public async create(name: string, text: string): Promise<PostModel> {
        return PostModel.create({ name, text } as PostModel);
    }

    public async findAllByName(name: string): Promise<PostModel[]> {
        return PostModel.findAll({
            where: { name }
        });
    }

    public async findById(id: number): Promise<PostModel | null> {
        return PostModel.findByPk(id);
    }
}