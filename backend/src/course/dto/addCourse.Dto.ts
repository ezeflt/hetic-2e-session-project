import {IsString, Matches, MinLength, MaxLength, IsEmail, IsOptional, IsNumber, IsDate, IsDateString} from 'class-validator';

export class addCourseDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name : string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    intervenant : string;

    @IsString()
    date : Date;


    @IsOptional()
    @IsString()
    guide : string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    email : string;

}