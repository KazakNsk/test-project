import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    password: string;
    nickname: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '123e4567-e89b-12d3-a456-426614174000', description: 'Уникальный идентификатор'})
    @Column({type: DataType.UUID, primaryKey:true, defaultValue: DataType.UUIDV4})
    id: string;
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый ящик'})
    @Column({type: DataType.STRING(100), allowNull: false, unique:true})
    email: string;
    @ApiProperty({example: '1234qwerty', description: 'пароль пользователя'})
    @Column({type: DataType.STRING(100), allowNull: false})
    password: string;
    @ApiProperty({example: 'User_user', description: 'Никнейм'})
    @Column({type: DataType.STRING(30), allowNull: false, unique:true})
    nickname: string;
}