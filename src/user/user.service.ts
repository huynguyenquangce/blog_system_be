import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto, UserSignInDto, UserUpdate } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signup(user: UserDto): Promise<UserDto> {
    const saltRound = 10;
    try {
      const salt = await bcrypt.genSalt(saltRound);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash.toString();
      const existingUser = await this.userRepository.findOneBy({
        email: user.email,
      });
      if (existingUser) {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }
      const saveUser = await this.userRepository.insert(user);
      return plainToInstance(UserDto, saveUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async signin(user: UserSignInDto): Promise<UserSignInDto> {
    try {
      const userValid = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!userValid) {
        throw new NotFoundException('Email not found');
      }

      const isMatch = await bcrypt.compare(user.password, userValid.password);

      if (isMatch) {
        return plainToInstance(UserSignInDto, userValid, {
          excludeExtraneousValues: true,
        });
      }
      throw new HttpException('Password Wrong', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw error;
    }
  }

  async deleteuser(id: number) {
    try {
      const updateActive = await this.userRepository.findOneBy({ id: id });
      if (!updateActive) {
        throw new NotFoundException(`User with id ${id} not found `);
      }
      updateActive.isActive = false;
      // const response = await this.userRepository.delete({ id: id });
      // if (response.affected === 0) {
      //   throw new NotFoundException(`User with id ${id} not found`);
      // }
      const response = this.userRepository.update(id, updateActive);
      console.log(response);
      throw new HttpException(`Successfully delete user ${id}`, HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }

  async finduserbyid(id: number): Promise<UserDto> {
    try {
      const response = this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (response) {
        return response.then((result) => {
          if (result) {
            return plainToInstance(UserDto, result, {
              excludeExtraneousValues: true,
            });
          }
          throw new NotFoundException(`User with id ${id} not found`);
        });
      }
      throw new HttpException(
        `Unable to find user by id: ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      throw error;
    }
  }

  async updateuserbyid(
    id: number,
    updateUserInformation: UserUpdate,
  ): Promise<UserUpdate> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        `Cannot find user with id: ${id} `,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedUser = { ...user, ...updateUserInformation };
    // Update User
    updatedUser.updatedAt = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });
    const response = await this.userRepository.update(id, updatedUser);
    return updatedUser;
  }
}
