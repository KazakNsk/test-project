import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

import { Tag } from "src/tags/tags.model";
import { UserTag } from "./users-tags.model";

export interface IUserCreationAttrs {
    readonly email: string;
    readonly password: string;
    readonly nickname: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, IUserCreationAttrs> {
    @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000', description: 'Уникальный идентификатор'})
    @Column({type: DataType.UUID, primaryKey:true, defaultValue: DataType.UUIDV4})
    id: string;
    
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый ящик'})
    @Column({type: DataType.STRING(100), allowNull: false, unique:true})
    email: string;
    
    @ApiProperty({example: '1234qwerty', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING(100), allowNull: false})
    password: string;
    
    @ApiProperty({example: 'example', description: 'Никнейм'})
    @Column({type: DataType.STRING(30), allowNull: false, unique:true})
    nickname: string;

    @BelongsToMany(() => Tag, () => UserTag)
    tags: Tag[];
}