import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseCommon } from 'src/common/base.common';

export class UserDto extends BaseCommon {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullName: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Expose()
  accountType: string;

  imageURL: string;
}

export class UserSignInDto {
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullName: string;

  @Expose()
  imageURL: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}

export class UserUpdate {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;
}
