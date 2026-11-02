import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddMiniProjectDto {
  @IsNumber()
  year: number; // 1 to 4

  @IsNumber()
  semester: number; // 1 to 8

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  guideName: string;

  @IsOptional()
  @IsString()
  guideId?: string;

  @IsOptional()
  @IsString()
  presentationOutside?: string;

  @IsOptional()
  @IsString()
  recognitionReceived?: string;

  @IsOptional()
  @IsString()
  institutionalSupport?: string;
}

