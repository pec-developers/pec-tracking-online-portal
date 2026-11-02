import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignOffDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['MENTOR', 'HOD'])
  role: 'MENTOR' | 'HOD';

  @IsOptional()
  @IsString()
  remarks?: string;
}

