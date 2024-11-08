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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require('bcryptjs');
const uid2 = require("uid2");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findUser(userToken) {
        const User = await this.userModel.findOne({ token: userToken })
            .populate('courses')
            .populate('guides')
            .exec();
        return User ? User : 'this user doesn\'t exist';
    }
    async signup(userData) {
        const UserExists = await this.checkIfUserAlreadyExists(userData.email);
        if (!UserExists) {
            const hash = await bcrypt.hash(userData.password, 10);
            const newUser = new this.userModel({
                username: userData.username,
                email: userData.email,
                password: hash,
                token: uid2(32),
                role: "user",
            });
            await newUser.save();
            return true;
        }
        else {
            return false;
        }
    }
    async signIn(userData) {
        const UserExists = await this.checkIfUserAlreadyExists(userData.email);
        if (UserExists) {
            const User = await this.userModel.findOne({ email: userData.email });
            const verifiedPassword = await bcrypt.compare(userData.password, User.password);
            return verifiedPassword ? await User : await "the passwords is not the same";
        }
        else {
            return "the user does't exist";
        }
    }
    async checkIfUserAlreadyExists(email) {
        const response = await this.userModel.findOne({ email });
        return response ? true : false;
    }
    async checkUserAdmin(email) {
        const User = await this.userModel.findOne({ email: email });
        await console.log(User);
        if (!User)
            return false;
        return User.role === 'admin' ? true : false;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map