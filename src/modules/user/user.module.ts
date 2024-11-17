import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

@Module({
  imports: [DatabaseModule],
  exports: ['USER_REPOSITORY'],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'], // Inject the custom DataSource
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
