import { HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignIn } from 'src/user/dto/user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signin(user: UserSignIn): Promise<{
        statusCode: HttpStatus;
        message: string;
        access_token?: undefined;
    } | {
        access_token: string;
        statusCode?: undefined;
        message?: undefined;
    }>;
}
