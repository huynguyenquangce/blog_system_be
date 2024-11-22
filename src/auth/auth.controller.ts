import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpException,
  UnauthorizedException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ActivateDto,
  UpdateUserResponse,
  UserDto,
  UserSignIn,
  UserUpdate,
} from 'src/user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator/publicRoute';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Guard co nhiem vu check user da dang nhap hay chua, neu dang nhap roi thi tra về user @Request() req, sau đó get token bằng cách  return this.authService.signin(req.user);
  @Public()
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(@Request() req) {
    const user = req.user;
    console.log(user);
    if (user && user.isActive === false) {
      throw new HttpException(
        'Please activate your account',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.signin(req.user);
  }

  // Guard có nhiệm vụ check access_token trong bearer token truyền lên, nếu chưa có trả lỗi, có rồi thì trả về user @Request() req, sau đó xử lí tiếp endpoint
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.profile(req.user.id);
  }

  @Public()
  @Post('signup')
  signup(@Body() user: UserDto) {
    return this.authService.signup(user);
  }

  @Public()
  @Post('activate')
  activate(@Body() data: ActivateDto) {
    return this.authService.activate(data);
  }

  @Post('reactivate')
  reactivate(@Request() req) {
    const id = req.user.id;
    console.log(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('update/:id')
  async updateuserbyid(
    @Param('id') id: string,
    @Body() updateUserInformation: UserUpdate,
  ): Promise<UpdateUserResponse> {
    try {
      // return this.userService.updateuserbyid(id, updateUserInformation);
      return this.authService.updateuserbyid(id, updateUserInformation);
    } catch (error) {
      throw error;
    }
  }
}

// After signin, req will be guarded and go to local.strategy.ts to handle to validate user
