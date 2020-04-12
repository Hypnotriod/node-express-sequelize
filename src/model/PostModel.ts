import { Table, Column, Model } from 'sequelize-typescript';

/**
 *
 * @author Ilya Pikin
 */

@Table({ tableName: 'post' })
export class PostModel extends Model<PostModel> {

    @Column
    name: string;

    @Column
    text: string;
}
