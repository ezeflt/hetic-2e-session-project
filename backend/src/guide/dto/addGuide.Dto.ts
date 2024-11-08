import {IsString, Matches, MinLength, MaxLength, IsEmail, IsOptional, IsNumber, IsNumberString} from 'class-validator';

export class addGuideDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    title : string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    author : string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    resume : string;

    @IsNumberString()
    note : number;

    @IsOptional()
    course : string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    email : string;

}