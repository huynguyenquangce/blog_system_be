import { AuthService } from './auth.service';
import { UserSignIn } from 'src/user/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(user: UserSignIn): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        statusCode?: undefined;
        message?: undefined;
    }>;
}
