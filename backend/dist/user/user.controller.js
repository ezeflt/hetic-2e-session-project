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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const signUp_Dto_1 = require("./dto/signUp.Dto");
const user_service_1 = require("./user.service");
const signIn_Dto_1 = require("./dto/signIn.Dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async userData(userToken) {
        try {
            const UserResponse = await this.userService.findUser(userToken);
            return typeof UserResponse === 'string' ? { response: false, message: UserResponse } : { response: true, User: UserResponse };
        }
        catch (error) {
            return { response: false, message: ["the user has a problem"], error: error };
        }
    }
    async signUp(bodyChecked) {
        try {
            const responseSignUp = await this.userService.signup(bodyChecked);
            return responseSignUp ? { response: true, message: ["this user has been successfully created"] } : { response: false, message: ["the user already exists"] };
        }
        catch (error) {
            return { response: false, message: ["this user cannot be created"], error: error };
        }
    }
    async signIn(bodyChecked) {
        try {
            const responseSignIn = await this.userService.signIn(bodyChecked);
            return typeof responseSignIn === "string" ? { response: false, message: [responseSignIn] } : { response: true, message: ['welcome to G&C'], User: responseSignIn };
        }
        catch (error) {
            return { response: false, message: ["there's a connection problem"], error: error };
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("/:userToken"),
    __param(0, (0, common_1.Param)('userToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userData", null);
__decorate([
    (0, common_1.Post)("/signUp"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_Dto_1.signUp]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("/signIn"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_Dto_1.signInDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map