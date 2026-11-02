import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSessionDto {
  @IsInt()
  @Min(1)
  @Max(5)
  sessionNumber: number; // 1 to 5

  @IsDateString()
  @IsNotEmpty()
  date: string; // Date of mentoring session

  // 10-point rating scale (1: Low, 5: Average, 10: High)
  @IsInt()
  @Min(1)
  @Max(10)
  asPerson: number;

  @IsInt()
  @Min(1)
  @Max(10)
  studies: number;

  @IsInt()
  @Min(1)
  @Max(10)
  behaviour: number;

  @IsInt()
  @Min(1)
  @Max(10)
  characterAndContact: number;

  @IsInt()
  @Min(1)
  @Max(10)
  knowledge: number;

  @IsString()
  @IsOptional()
  remarks?: string;
}

