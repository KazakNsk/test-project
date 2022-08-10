import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tag } from "src/tags/tags.model";
import { User } from "./users.model";

@Table({tableName: 'user-tag', createdAt: false, updatedAt: false})
export class UserTag extends Model<UserTag> {

    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id: number;
    
    @ForeignKey(() => User)
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    userId: string;
    
    @ForeignKey(() => Tag)
    @Column({type: DataType.INTEGER})
    tagId: number;
}