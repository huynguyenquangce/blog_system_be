import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class updatePassword {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  oldpassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newpassword: string;
}
