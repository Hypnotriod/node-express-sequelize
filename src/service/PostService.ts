
import { injectable, singleton } from 'tsyringe';
import { Model } from 'sequelize/types';
import PostModel from '../model/PostModel';

/**
 *
 * @author Ilya Pikin
 */

@injectable()
@singleton()
export class PostService {
    constructor() {
        this.sync();
    }

    public async sync(): Promise<Model<any, any>> {
        return PostModel.sync({ force: false });
    }

    public async create(name: string, text: string): Promise<PostModel | null> {
        if (name && text) {
            return PostModel.create({ name, text });
        }
        return null;
    }

    public async findAllByName(name: string): Promise<PostModel[]> {
        return PostModel.findAll({
            where: { name }
        });
    }

    public async findById(id: number): Promise<PostModel | null> {
        if (!isNaN(id)) {
            return PostModel.findByPk(id);
        }
        return null;
    }
}
