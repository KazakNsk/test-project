import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private UsersService:UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status:200, type: User})
    @Post()
    create(@Body() userDto:CreateUserDto) {
        return this.UsersService.createUser(userDto);
    }
}
