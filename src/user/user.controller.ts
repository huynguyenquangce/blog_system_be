import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto, UserUpdate } from './dto/user.dto';
import { UserSignInDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() user: UserDto): Promise<UserDto> {
    try {
      const imageURL =
        'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=';
      user.imageURL = imageURL;
      return await this.userService.signup(user);
    } catch (error) {
      throw error;
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('signin')
  async signin(@Body() user: UserSignInDto): Promise<UserSignInDto> {
    try {
      return await this.userService.signin(user);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  async deleteuser(@Param('id') id: number) {
    try {
      return this.userService.deleteuser(id);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async finduserbyid(@Param('id') id: number) {
    try {
      return this.userService.finduserbyid(id);
    } catch (error) {
      throw error;
    }
  }

  @UsePipes(new ValidationPipe())
  @Put('update/:id')
  async updateuserbyid(
    @Param('id') id: number,
    @Body() updateUserInformation: UserUpdate,
  ) {
    try {
      return this.userService.updateuserbyid(id, updateUserInformation);
    } catch (error) {
      throw error;
    }
  }
}
