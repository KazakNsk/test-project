import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user-dto';
import { AddTagDto } from './dto/add-tag-dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    update(userDto: UpdateUserDto, req: Request): Promise<User>;
    delete(req: Request, res: Response): Response<any, Record<string, any>>;
    addTag(addTagDto: AddTagDto, req: Request): Promise<import("@nestjs/common").HttpException | AddTagDto>;
}
