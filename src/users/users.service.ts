import { AddTagDto } from './dto/add-tag-dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class UsersService {

    constructor(
            @InjectModel (User) private userRepository: typeof User,
            private jwtService: JwtService, private tagsService: TagsService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async updateUser(dto: UpdateUserDto , req: Request) {
        const userId = this.getUserIdFromRequest(req);
        if (dto.email) {
            this.validateByEmail(dto.email);
        }
        if (dto.nickname) {
            this.validateByNickname(dto.nickname);
        }
        if(dto.password) {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            dto = {...dto, password: hashPassword}
        }
        const user = await this.userRepository.update(dto, {where: {id:userId}, returning:true})
        .then(function (result) {
            return result[1]
          });
        return user[0];  
    }

    async deleteUser(req) {
        const userId = this.getUserIdFromRequest(req);
        const count = await this.userRepository.destroy({where: {id:userId}}).then((result) => result);
        if (count === 1) {
            return
        }
        else throw new HttpException('Вам нужно удалить токен на фронте:)', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    async getUserByEmail(email:string) {
        const user = await this.userRepository.findOne({where:{email}})
        return user;
    }

    async getUserByNickname(nickname:string) {
        const user = await this.userRepository.findOne({where:{nickname}})
        return user;
    }

    async addTag(dto: AddTagDto, req: Request) {
        const userId = this.getUserIdFromRequest(req);
        try {
            const user = await this.userRepository.findByPk(userId);
            const tags = await this.tagsService.getTagsByIds(dto.tags);
            if (user && tags) {
                await user.$add('tags', tags);
                return dto
            }
            throw new HttpException('Пользователь или тэги не найдены', HttpStatus.NOT_FOUND); 
        }
        catch (e) {
            return new HttpException({message: e.message}, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateByEmail(email:string) {
        const candidate = await this.getUserByEmail(email);
        if (candidate) {
            throw new BadRequestException('Пользователь с такой почтой существует');
        }
    }

    async validateByNickname(nickname: string) {
        const candidate = await this.getUserByNickname(nickname);
        if (candidate) {
            throw new BadRequestException('Пользователь с таким никнеймом уже существует');
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    getUserIdFromRequest(request:Request) {
        const token = request.headers.authorization.split(' ')[1];
        const decodeObj : {[key: string]: any} = this.jwtService.decode(token) as {[key: string]: any};
        const {id} = decodeObj
        return id
    }
}