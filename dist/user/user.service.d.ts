import { UserDto, UserSignInDto, UserUpdate } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    signup(user: UserDto): Promise<UserDto>;
    signin(user: UserSignInDto): Promise<UserSignInDto>;
    deleteuser(id: number): Promise<void>;
    finduserbyid(id: number): Promise<UserSignInDto>;
    updateuserbyid(id: number, updateUserInformation: UserUpdate): Promise<UserUpdate>;
}
