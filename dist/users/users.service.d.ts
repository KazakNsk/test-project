import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    createUser(dto: CreateUserDto): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByNickname(nickname: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    validatePassword(password: string): boolean;
    validateEmail(email: string): boolean;
}
