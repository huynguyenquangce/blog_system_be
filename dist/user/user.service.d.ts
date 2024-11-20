import { HttpStatus } from '@nestjs/common';
import { UserDto, SignInResponse, UserUpdate, DeleteUserResponse, UpdateUserResponse } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    emailExist: (email: string) => Promise<UserEntity>;
    emailNotExist: (email: string) => Promise<boolean>;
    signup(user: UserDto): Promise<{
        id: any;
        statusCode: HttpStatus;
        message: string;
    }>;
    deleteuser(id: string): Promise<DeleteUserResponse>;
    finduserbyid(id: string): Promise<SignInResponse>;
    updateuserbyid(id: string, updateUserInformation: UserUpdate): Promise<UpdateUserResponse>;
    findAll(query: string, take: number, page: number): Promise<{
        statusCode: string;
        data: any[];
        count: any;
        currentPage: any;
        nextPage: any;
        prevPage: number;
        totalPage: number;
    }>;
}
