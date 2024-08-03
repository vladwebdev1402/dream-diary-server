import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
