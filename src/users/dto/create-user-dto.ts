import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'example@mail.ru', description: 'почтовый адрес пользователя'})
    @IsString({message: 'Введите корректный емайл'})
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({example: '1234Qwerty', description: 'пароль пользователя'})
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 
        {message: 'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную буквы'})
    @MinLength(4, {message: 'Длина пароля должна быть не меньше 4 символов'})
    readonly password: string;

    @ApiProperty({example: 'User_user', description: 'Никнейм'})
    @IsString({message: 'Введите корректный никнейм'})
    readonly nickname: string;
}