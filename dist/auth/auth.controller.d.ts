import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handlesignin(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
