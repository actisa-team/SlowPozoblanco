import { IsEmail, IsString, MinLength, IsOptional, IsInt } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    postalCode?: string;

    @IsInt()
    @IsOptional()
    age?: number;

    @IsString()
    @IsOptional()
    gender?: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    password!: string;
}
