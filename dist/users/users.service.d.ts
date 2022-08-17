import { AddTagDto } from './dto/add-tag-dto';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { User } from './users.model';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { TagsService } from 'src/tags/tags.service';
export declare class UsersService {
    private userRepository;
    private jwtService;
    private tagsService;
    constructor(userRepository: typeof User, jwtService: JwtService, tagsService: TagsService);
    createUser(dto: CreateUserDto): Promise<User>;
    updateUser(dto: UpdateUserDto, req: Request): Promise<User>;
    deleteUser(req: any): Promise<void>;
    getUserByEmail(email: string): Promise<User>;
    getUserByNickname(nickname: string): Promise<User>;
    addTag(dto: AddTagDto, req: Request): Promise<HttpException | AddTagDto>;
    validateByEmail(email: string): Promise<void>;
    validateByNickname(nickname: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUserIdFromRequest(request: Request): any;
}
