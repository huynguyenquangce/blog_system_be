"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const helper_1 = require("../ultils/helper");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.emailExist = async (email) => {
            const existEmail = await this.userRepository.findOneBy({
                email: email,
            });
            if (!existEmail) {
                throw new common_1.NotFoundException('Email not exist');
            }
            return existEmail;
        };
        this.emailNotExist = async (email) => {
            const existEmail = await this.userRepository.findOneBy({
                email: email,
            });
            if (!existEmail) {
                return false;
            }
            return true;
        };
    }
    async signup(user) {
        try {
            user.password = await (0, helper_1.hashPassword)(user.password);
            const existEmail = await this.emailNotExist(user.email);
            if (existEmail) {
                throw new common_1.HttpException(`Email ${user.email} is already in use`, common_1.HttpStatus.CONFLICT);
            }
            const saveUser = await this.userRepository.insert(user);
            if (saveUser) {
                return {
                    id: saveUser.identifiers[0].id,
                    statusCode: common_1.HttpStatus.OK,
                    message: 'User Sign Up Successfully',
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteuser(id) {
        try {
            const updateActive = await this.userRepository.findOneBy({ id: id });
            if (!updateActive) {
                throw new common_1.NotFoundException(`User with id ${id} not found `);
            }
            updateActive.isActive = false;
            const response = this.userRepository.update(id, updateActive);
            if (response) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: `Delete user by id ${id} successfully`,
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async finduserbyid(id) {
        try {
            const response = this.userRepository.findOne({
                where: {
                    id: id,
                },
            });
            if (response) {
                return response.then((result) => {
                    if (result) {
                        return (0, class_transformer_1.plainToInstance)(user_dto_1.SignInResponse, result, {
                            excludeExtraneousValues: true,
                        });
                    }
                    throw new common_1.NotFoundException(`User with id ${id} not found`);
                });
            }
            throw new common_1.HttpException(`Unable to find user by id: ${id}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            throw error;
        }
    }
    async updateuserbyid(id, updateUserInformation) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new common_1.HttpException(`Cannot find user with id: ${id} `, common_1.HttpStatus.NOT_FOUND);
            }
            if (updateUserInformation.password) {
                updateUserInformation.password = await (0, helper_1.hashPassword)(updateUserInformation.password);
            }
            const updatedUser = { ...user, ...updateUserInformation };
            updatedUser.updatedAt = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Ho_Chi_Minh',
            });
            const response = await this.userRepository.update(id, updatedUser);
            if (response) {
                return {
                    statusCode: common_1.HttpStatus.OK,
                    message: `Update user by id ${id} successfully `,
                };
            }
        }
        catch (error) { }
    }
    async findAll(query, take, page) {
        const take_param = take || 5;
        const page_param = page || 1;
        const skip = (page_param - 1) * take_param;
        const data = await this.userRepository.findAndCount({
            take: take,
            skip: skip,
            select: ['id', 'email', 'firstName', 'lastName', 'role', 'imageURL'],
        });
        return (0, helper_1.paginateResponse)(data, page_param, take_param);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map