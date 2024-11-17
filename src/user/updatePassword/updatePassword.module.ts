import { Module } from '@nestjs/common';
import { updatePasswordController } from './updatePassword.controller';
import { updatePasswordService } from './updatePassword.service';

@Module({
  controllers: [updatePasswordController],
  providers: [updatePasswordService],
  exports: [updatePasswordService],
})
export class updatePasswordModule {}
