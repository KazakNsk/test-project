import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(userDto: LoginUserDto): Promise<{
        token: string;
    }>;
}
