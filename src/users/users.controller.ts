import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards, Put, Req, UsePipes, Delete, Res, HttpStatus } from '@nestjs/common';

import { ValidationPipe } from './../pipes/validation.pipe';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user-dto';
import { AddTagDto } from './dto/add-tag-dto';

@ApiTags('Пользователи')
@Controller('user')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Изменить пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Put()
    update(@Body() userDto:UpdateUserDto, @Req() req: Request) {
        return this.usersService.updateUser(userDto, req);
    }

    @ApiOperation({summary: 'Удалить залогиненного пользователя'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Req() req: Request, @Res() res: Response) {      
        this.usersService.deleteUser(req);
        return res.status(200).send('Пользователь успешно удален')
    }

    @ApiOperation({summary: 'Добавить тэг к текущему юзеру'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Post('/tag')
    addTag( @Body() addTagDto: AddTagDto, @Req() req: Request) {
        return this.usersService.addTag(addTagDto, req)
    }
}