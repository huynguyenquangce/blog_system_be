import { UserDto, UserUpdate } from './dto/user.dto';
import { UserSignInDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(user: UserDto): Promise<UserDto>;
    signin(user: UserSignInDto): Promise<UserSignInDto>;
    deleteuser(id: number): Promise<void>;
    finduserbyid(id: number): Promise<UserSignInDto>;
    updateuserbyid(id: number, updateUserInformation: UserUpdate): Promise<UserUpdate>;
}
