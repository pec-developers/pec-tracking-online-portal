import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../roles.enum.js';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string; // Register number or employee ID

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.STUDENT;

  @IsString()
  @IsOptional()
  department?: string;
}

