import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignIn } from 'src/user/dto/user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(user: UserSignIn): Promise<import("../user/user.entity").UserEntity>;
    signin(user: any): Promise<{
        access_token: string;
    }>;
}
