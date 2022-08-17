import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({example: 'example@mail.ru', description: 'Почта пользователя'})
    readonly email: string;

    @ApiProperty({example: '1234qwerty', description: 'пароль пользователя'})
    readonly password: string;
}