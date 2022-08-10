import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
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
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с такой почтой существует', HttpStatus.BAD_REQUEST);
        }
        const nicknameCandidate = await  this.usersService.getUserByNickname(userDto.nickname);
        if (nicknameCandidate) {
            throw new HttpException('Пользователь с таким никнеймом уже существует', HttpStatus.BAD_REQUEST);
        }
        const validateEmailCondition = this.usersService.validateEmail(userDto.email)
        if (!validateEmailCondition) {
            throw new HttpException('Инвалидный емайл', HttpStatus.BAD_REQUEST);
        }
        const validatePasswordCondition = this.usersService.validatePassword(userDto.password)
        if (!validatePasswordCondition) {
            throw new HttpException('Пароль должен содержать как минимум одну цифру, одну заглавную и одну строчную буквы, минимум 4 символа', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user);
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (user == null) {
            throw new UnauthorizedException({message:'Некорректный емайл'})    
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message:'Некорректный пароль'})
    }
    
    private async generateToken(user : User) {
        const payload = {email: user.email, id: user.id, nickname: user.nickname }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    getUserIdFromRequest(request:Request) {
        const token = request.headers.authorization.split(' ')[1];
        let decodeObj : {[key: string]: any} = this.jwtService.decode(token) as {[key: string]: any};
        let {id} = decodeObj
        return id;
    }
}
