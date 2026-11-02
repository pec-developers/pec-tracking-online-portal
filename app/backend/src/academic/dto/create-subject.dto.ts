import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { SubjectType } from '@prisma/client';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  code: string; // e.g. "CS8401"

  @IsString()
  @IsNotEmpty()
  name: string; // e.g. "Operating Systems"

  @IsString()
  @IsNotEmpty()
  department: string; // e.g. "CSE"

  @IsInt()
  @Min(1)
  credits: number; // e.g. 3 or 4

  @IsEnum(SubjectType)
  @IsOptional()
  type?: SubjectType = SubjectType.THEORY;
}

