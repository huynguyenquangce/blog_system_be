import { AuthService } from './auth.service';
import { AuthDto } from './auth.model';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(authDto: AuthDto): Promise<string>;
}
