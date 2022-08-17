import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength, NotEquals, ValidateIf } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: '1234qwerty', description: 'почтовый адрес пользователя'})
    @IsString({message: 'Поле должно быть строкой'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @IsEmail({}, {message: "Некорректный email"})
    readonly email?: string;

    @ApiProperty({example: '1234qwerty', description: 'пароль пользователя'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 
    {message: 'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную буквы'})
    @MinLength(4, {message: 'Длина пароля должна быть не меньше 4 символов'})
    readonly password?: string;

    @ApiProperty({example: 'User_user', description: 'Никнейм'})
    @NotEquals(null)
    @ValidateIf((_object, value) => value !== undefined)
    @IsString({message: 'Поле должно быть строкой'})
    readonly nickname?: string;
}