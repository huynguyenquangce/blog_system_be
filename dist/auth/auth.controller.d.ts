import { AuthService } from './auth.service';
import { ActivateDto, UserDto } from 'src/user/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(req: any): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
    getProfile(req: any): any;
    signup(user: UserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    activate(data: ActivateDto): Promise<"Account already activated" | "Verify account successfully" | "Wrongs activate code, please retry" | "Code has been expired, please click button to resend a activate code">;
}
