import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSummaryDto {
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  batch?: string;

  @IsOptional()
  @IsNumber()
  finalCgpa?: number;

  @IsOptional()
  @IsNumber()
  totalCreditsEarned?: number;

  @IsOptional()
  @IsString()
  graduationClassification?: string;

  @IsOptional()
  @IsString()
  graduationStatus?: string;

  @IsOptional()
  @IsArray()
  semesterWiseData?: any[];
}

