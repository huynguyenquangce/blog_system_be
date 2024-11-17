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
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async signup(user) {
        const saltRound = 10;
        try {
            const salt = await bcrypt.genSalt(saltRound);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash.toString();
            const existingUser = await this.userRepository.findOneBy({
                email: user.email,
            });
            if (existingUser) {
                throw new common_1.HttpException('Email is already in use', common_1.HttpStatus.CONFLICT);
            }
            const saveUser = await this.userRepository.insert(user);
            return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, saveUser, {
                excludeExtraneousValues: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async signin(user) {
        try {
            const userValid = await this.userRepository.findOne({
                where: { email: user.email },
            });
            if (!userValid) {
                throw new common_1.NotFoundException('Email not found');
            }
            const isMatch = await bcrypt.compare(user.password, userValid.password);
            if (isMatch) {
                return (0, class_transformer_1.plainToInstance)(user_dto_1.UserSignInDto, userValid, {
                    excludeExtraneousValues: true,
                });
            }
            throw new common_1.HttpException('Password Wrong', common_1.HttpStatus.UNAUTHORIZED);
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
            console.log(response);
            throw new common_1.HttpException(`Successfully delete user ${id}`, common_1.HttpStatus.OK);
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
                        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, result, {
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
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.HttpException(`Cannot find user with id: ${id} `, common_1.HttpStatus.NOT_FOUND);
        }
        const updatedUser = { ...user, ...updateUserInformation };
        updatedUser.updatedAt = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh',
        });
        const response = await this.userRepository.update(id, updatedUser);
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map