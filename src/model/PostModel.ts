import { Table, Column, Model } from 'sequelize-typescript';

/**
 *
 * @author Ilya Pikin
 */

@Table({ tableName: 'post' })
export default class PostModel extends Model<PostModel> {

    @Column
    name: string;

    @Column
    text: string;
}
