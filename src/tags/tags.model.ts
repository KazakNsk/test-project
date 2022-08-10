import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

import { UserTag } from "src/users/users-tags.model";
import { User } from "src/users/users.model";

export interface ITagCreationAttrs {
    readonly name: string;
    readonly creator: string;
    readonly sortOrder: number;
}

@Table({tableName: 'tags'})
export class Tag extends Model<Tag, ITagCreationAttrs> {
    
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id: number;
    
    @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000', description: 'id пользователя создавшего тэг'})
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    creator: string;
    
    @ApiProperty({example: 'example', description: 'название тэга'})
    @Column({type: DataType.STRING(40), allowNull: false})
    name: string;
    
    @ApiProperty({example: '4', description: 'порядковый номер для сортировки'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    sortOrder: number;

    @BelongsToMany(() => User, () => UserTag)
    users: User[];
}