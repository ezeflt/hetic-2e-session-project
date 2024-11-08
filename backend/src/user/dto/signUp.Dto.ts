import {IsString, Matches, MinLength, MaxLength, IsEmail} from 'class-validator';

/**
 * signup data transfer object :
 * check if the signup's data from inputs is valid
 */
export class signUp {

    // check if the value of usenrame input is valid
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    username: string;

    // check if the value of email input is valid
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @IsEmail()
    email: string;

    // check if the value of password input is valid
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}