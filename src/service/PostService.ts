
import { injectable, singleton } from "tsyringe";
import { PostRepository } from "../repository/PostRepository";
import { PostModel } from "../model/PostModel";

@injectable()
@singleton()
export class PostService {
    constructor(private pagerepository: PostRepository) { }

    public async create(name: string, text: string): Promise<PostModel | null> {
        if (name && text) {
            return this.pagerepository.create(name, text);
        }
        return null;
    }

    public async findAllByName(name: string): Promise<PostModel[]> {
        return this.pagerepository.findAllByName(name);
    }

    public async findById(id: number): Promise<PostModel | null> {
        if (!isNaN(id)) {
            return this.pagerepository.findById(id);
        }
        return null;
    }
}
