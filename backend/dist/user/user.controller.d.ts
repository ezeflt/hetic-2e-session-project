import { signUp } from "./dto/signUp.Dto";
import { UserService } from "./user.service";
import { signInDto } from "./dto/signIn.Dto";
import { User } from "./user.schema";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userData(userToken: string): Promise<{
        response: boolean;
        message: string;
        User?: undefined;
        error?: undefined;
    } | {
        response: boolean;
        User: String | User;
        message?: undefined;
        error?: undefined;
    } | {
        response: boolean;
        message: string[];
        error: unknown;
        User?: undefined;
    }>;
    signUp(bodyChecked: signUp): Promise<object>;
    signIn(bodyChecked: signInDto): Promise<object>;
}
