import { BaseCommon } from 'src/common/base.common';
export declare class UserDto extends BaseCommon {
    email: string;
    lastName: string;
    firstName: string;
    fullName: string;
    password: string;
    accountType: string;
    imageURL: string;
}
export declare class UserSignInDto {
    id: string;
    email: string;
    password: string;
    fullName: string;
    imageURL: string;
    firstName: string;
    lastName: string;
}
export declare class UserUpdate {
    email: string;
    lastName: string;
    firstName: string;
}
