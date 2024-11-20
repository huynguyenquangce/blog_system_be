import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignIn } from 'src/user/dto/user.dto';
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
  async handlesignin(@Request() req) {
    return this.authService.signin(req.user);
  }

  // Guard có nhiệm vụ check access_token trong bearer token truyền lên, nếu chưa có trả lỗi, có rồi thì trả về user @Request() req, sau đó xử lí tiếp endpoint
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

// After signin, req will be guarded and go to local.strategy.ts to handle to validate user
