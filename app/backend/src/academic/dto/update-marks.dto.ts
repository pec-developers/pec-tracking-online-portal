import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SubjectMarkItemDto {
  @IsString()
  subjectCode: string;

  @IsString()
  subjectName: string;

  @IsNumber()
  @IsOptional()
  iat1?: number;

  @IsNumber()
  @IsOptional()
  iat2?: number;

  @IsNumber()
  @IsOptional()
  model?: number;

  @IsNumber()
  @IsOptional()
  internalMark?: number;
}

export class UpdateMarksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectMarkItemDto)
  subjectMarks: SubjectMarkItemDto[];
}

