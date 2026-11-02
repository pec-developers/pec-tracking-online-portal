import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ArrearAttemptDto {
  @IsString()
  examSession: string; // e.g. "Nov/Dec 2024"

  @IsString()
  grade: string;

  @IsString()
  result: string; // "PASS" | "FAIL"
}

export class ArrearItemDto {
  @IsString()
  subjectCode: string;

  @IsString()
  subjectName: string;

  @IsInt()
  semesterOccurred: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ArrearAttemptDto)
  attempts?: ArrearAttemptDto[];

  @IsBoolean()
  cleared: boolean;

  @IsString()
  @IsOptional()
  clearanceDate?: string;
}

export class UpdateArrearsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArrearItemDto)
  arrears: ArrearItemDto[];
}

