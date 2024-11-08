import { Model } from "mongoose";
import { User } from "./user.schema";
import { signUp } from "./dto/signUp.Dto";
import { signInDto } from "./dto/signIn.Dto";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findUser(userToken: string): Promise<User | string>;
    signup(userData: signUp): Promise<boolean>;
    signIn(userData: signInDto): Promise<User | String>;
    private checkIfUserAlreadyExists;
    checkUserAdmin(email: string): Promise<Boolean>;
}
