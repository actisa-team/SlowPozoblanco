import { IsEmail, IsString, MinLength, IsOptional, IsInt, IsBoolean, IsEnum } from 'class-validator';
import { UserRole } from '../types';

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

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

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
