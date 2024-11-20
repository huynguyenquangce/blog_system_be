import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UserDto,
  SignInResponse,
  UserUpdate,
  SignUpResponse,
  UserSignIn,
  DeleteUserResponse,
  UpdateUserResponse,
} from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { hashPassword, comparePass, paginateResponse } from 'src/ultils/helper';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  emailExist = async (email: string): Promise<UserEntity> => {
    const existEmail = await this.userRepository.findOneBy({
      email: email,
    });
    if (!existEmail) {
      throw new NotFoundException('Email not exist');
    }
    return existEmail;
  };

  emailNotExist = async (email: string): Promise<boolean> => {
    const existEmail = await this.userRepository.findOneBy({
      email: email,
    });
    if (!existEmail) {
      return false;
    }
    return true;
  };
  async signup(user: UserDto) {
    try {
      user.password = await hashPassword(user.password);
      const existEmail = await this.emailNotExist(user.email);
      if (existEmail) {
        throw new HttpException(
          `Email ${user.email} is already in use`,
          HttpStatus.CONFLICT,
        );
      }
      const saveUser = await this.userRepository.insert(user);
      if (saveUser) {
        return {
          id: saveUser.identifiers[0].id,
          statusCode: HttpStatus.OK,
          message: 'User Sign Up Successfully',
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // async signin(user: UserSignIn): Promise<SignInResponse> {
  //   try {
  //     const userValid = await this.userRepository.findOne({
  //       where: { email: user.email, isActive: true },
  //     });
  //     if (!userValid) {
  //       throw new NotFoundException('Email not found or being delete before');
  //     }

  //     const isMatch = await comparePass(user.password, userValid.password);

  //     if (isMatch) {
  //       return plainToInstance(SignInResponse, userValid, {
  //         excludeExtraneousValues: true,
  //       });
  //     }
  //     throw new HttpException('Password Wrong', HttpStatus.UNAUTHORIZED);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async deleteuser(id: string): Promise<DeleteUserResponse> {
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
      if (response) {
        return {
          statusCode: HttpStatus.OK,
          message: `Delete user by id ${id} successfully`,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async finduserbyid(id: string): Promise<SignInResponse> {
    try {
      const response = this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (response) {
        return response.then((result) => {
          if (result) {
            return plainToInstance(SignInResponse, result, {
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
    id: string,
    updateUserInformation: UserUpdate,
  ): Promise<UpdateUserResponse> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          `Cannot find user with id: ${id} `,
          HttpStatus.NOT_FOUND,
        );
      }
      if (updateUserInformation.password) {
        updateUserInformation.password = await hashPassword(
          updateUserInformation.password,
        );
      }
      const updatedUser = { ...user, ...updateUserInformation };
      // Update User
      updatedUser.updatedAt = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
      });
      const response = await this.userRepository.update(id, updatedUser);
      if (response) {
        return {
          statusCode: HttpStatus.OK,
          message: `Update user by id ${id} successfully `,
        };
      }
    } catch (error) {}
  }

  async findAll(query: string, take: number, page: number) {
    const take_param = take || 5;
    const page_param = page || 1;
    const skip = (page_param - 1) * take_param;
    const data = await this.userRepository.findAndCount({
      take: take,
      skip: skip,
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'imageURL'],
    });

    return paginateResponse(data, page_param, take_param);
  }
}
