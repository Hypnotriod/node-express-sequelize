import { Table, Column, Model } from 'sequelize-typescript';

@Table({tableName: 'post'})
export class PostModel extends Model<PostModel> {
    @Column
    name: string;

    @Column
    text: string;
}
