import { CreateUserDto } from './dto/create-user-dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel (User) private readonly userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getUserByEmail(email:string) {
        const user = await this.userRepository.findOne({where:{email}})
        return user;
    }

    async getUserByNickname(nickname:string) {
        const user = await this.userRepository.findOne({where:{nickname}})
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    validatePassword(password:string) {
        const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,100}$/
        return regexp.test(password);
    }

    validateEmail(email:string) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexp.test(email);
    }
}