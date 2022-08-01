import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: '1234qwerty', description: 'пароль пользователя'})
    readonly email: string;
    @ApiProperty({example: '1234qwerty', description: 'пароль пользователя'})
    readonly password: string;
    @ApiProperty({example: 'User_user', description: 'Никнейм'})
    readonly nickname: string;
}