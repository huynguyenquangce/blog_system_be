import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { updatePassword } from './dto/updatePassword.dto';

@Controller('update-password')
export class updatePasswordController {
  @Post()
  @UsePipes(new ValidationPipe())
  updatepassword(@Body() data: updatePassword) {
    console.log(data);
  }
}
