import { PostModel } from "../model/PostModel";
import { singleton } from "tsyringe";

@singleton()
export class PostRepository {
    constructor() {
        this.sync();
    }

    public async sync() {
        await PostModel.sync({ force: false });
    }

    public async create(name, text): Promise<PostModel> {
        return PostModel.create({ name, text });
    }

    public async findAllByName(name): Promise<PostModel[]> {
        return PostModel.findAll({
            where: { name }
        });
    }

    public async findById(id): Promise<PostModel | null> {
        return PostModel.findByPk(id);
    }
}
