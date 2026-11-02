import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SubjectResultItemDto {
  @IsString()
  subjectCode: string;

  @IsNumber()
  credits: number;

  @IsString()
  univGrade: string; // e.g. "O", "A+", "A", "B+", "B", "RA"

  @IsString()
  result: string; // "PASS" | "FAIL" | "ABSENT"
}

export class UpdateUniversityResultsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectResultItemDto)
  subjectResults: SubjectResultItemDto[];

  @IsNumber()
  @IsOptional()
  gpa?: number;

  @IsNumber()
  @IsOptional()
  cgpa?: number;
}

