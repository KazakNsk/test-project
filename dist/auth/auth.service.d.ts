import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(userDto: LoginUserDto): Promise<{
        token: string;
    }>;
    signUp(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private validateUser;
    private generateToken;
    getUserIdFromRequest(request: Request): any;
}
