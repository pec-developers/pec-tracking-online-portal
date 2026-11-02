import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateExitContactDto {
  @IsString()
  @IsNotEmpty()
  exitAddress: string;

  @IsOptional()
  @IsString()
  exitCity?: string;

  @IsOptional()
  @IsString()
  exitState?: string;

  @IsOptional()
  @IsString()
  exitPincode?: string;

  @IsString()
  @IsNotEmpty()
  exitMobile: string;

  @IsString()
  @IsNotEmpty()
  exitEmail: string;

  @IsOptional()
  higherStudiesDetails?: {
    exam?: string;
    score?: string;
    university?: string;
    course?: string;
  };
}

