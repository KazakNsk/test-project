import { Request } from 'express';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user);
    }

    async signUp(userDto: CreateUserDto) {
        this.usersService.validateByEmail(userDto.email);
        this.usersService.validateByNickname(userDto.nickname);
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user);
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (user == null) {
            throw new BadRequestException({message:'Такого емайла нет в базе емайл'})    
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new BadRequestException({message:'Неверный пароль'})
    }
    
    private async generateToken(user : User) {
        const payload = {email: user.email, id: user.id, nickname: user.nickname }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
