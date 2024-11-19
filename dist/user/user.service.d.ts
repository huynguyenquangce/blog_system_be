import { UserDto, SignInResponse, UserUpdate, SignUpResponse, UserSignIn, DeleteUserResponse, UpdateUserResponse } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    signup(user: UserDto): Promise<SignUpResponse>;
    signin(user: UserSignIn): Promise<SignInResponse>;
    deleteuser(id: string): Promise<DeleteUserResponse>;
    finduserbyid(id: string): Promise<SignInResponse>;
    updateuserbyid(id: string, updateUserInformation: UserUpdate): Promise<UpdateUserResponse>;
}
