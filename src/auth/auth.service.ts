import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponse, UserSignIn } from 'src/user/dto/user.dto';
import { comparePass } from 'src/ultils/helper';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signin(user: UserSignIn) {
    try {
      const user_exist = await this.userService.emailExist(user.email);
      const isMatch = await comparePass(user.password, user_exist.password);
      if (!isMatch) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Password incorrect',
        };
      }
      const payload = { sub: user_exist.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        'Error from server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
