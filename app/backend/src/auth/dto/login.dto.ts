import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string; // Register number (student) or Staff ID / Email (faculty)

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

