import { SignUpResponse, UpdateUserResponse, UserDto, UserSignIn, UserUpdate } from './dto/user.dto';
import { SignInResponse } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(user: UserDto): Promise<SignUpResponse>;
    signin(user: UserSignIn): Promise<SignInResponse>;
    deleteuser(id: string): Promise<import("./dto/user.dto").DeleteUserResponse>;
    finduserbyid(id: string): Promise<SignInResponse>;
    updateuserbyid(id: string, updateUserInformation: UserUpdate): Promise<UpdateUserResponse>;
}
