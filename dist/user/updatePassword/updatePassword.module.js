"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordModule = void 0;
const common_1 = require("@nestjs/common");
const updatePassword_controller_1 = require("./updatePassword.controller");
const updatePassword_service_1 = require("./updatePassword.service");
let updatePasswordModule = class updatePasswordModule {
};
exports.updatePasswordModule = updatePasswordModule;
exports.updatePasswordModule = updatePasswordModule = __decorate([
    (0, common_1.Module)({
        controllers: [updatePassword_controller_1.updatePasswordController],
        providers: [updatePassword_service_1.updatePasswordService],
        exports: [updatePassword_service_1.updatePasswordService],
    })
], updatePasswordModule);
//# sourceMappingURL=updatePassword.module.js.map