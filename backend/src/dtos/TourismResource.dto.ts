import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, Max, Min, IsEmail, IsUrl, IsArray } from 'class-validator';
import { TourismResourceCategory } from '../entities/TourismResource.entity';
import { Type } from 'class-transformer';

export class CreateTourismResourceDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    description!: string;

    @IsEnum(TourismResourceCategory)
    category!: TourismResourceCategory;

    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude!: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude!: number;

    @IsString()
    address!: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsUrl()
    website?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    media?: {
        images?: string[];
        videos?: string[];
        videos360?: string[];
    };
}

export class UpdateTourismResourceDto { // Partial of Create would be better but explicit for now
    @IsOptional() @IsString() name?: string;
    @IsOptional() @IsString() description?: string;
    @IsOptional() @IsEnum(TourismResourceCategory) category?: TourismResourceCategory;
    @IsOptional() @IsNumber() latitude?: number;
    @IsOptional() @IsNumber() longitude?: number;
    @IsOptional() @IsString() address?: string;
    @IsOptional() @IsString() phone?: string;
    @IsOptional() @IsUrl() website?: string;
    @IsOptional() @IsEmail() email?: string;
    @IsOptional() media?: {
        images?: string[];
        videos?: string[];
        videos360?: string[];
    };
    @IsOptional() isActive?: boolean;
}
