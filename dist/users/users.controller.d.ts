import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';
export declare class UsersController {
    private UsersService;
    constructor(UsersService: UsersService);
    create(userDto: CreateUserDto): Promise<User>;
}
