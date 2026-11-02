import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAcademicHistoryDto {
  // SSLC / 10th Standard
  @IsString()
  @IsOptional()
  sslcSchoolName?: string;

  @IsString()
  @IsOptional()
  sslcBoard?: string;

  @IsString()
  @IsOptional()
  sslcMedium?: string;

  @IsNumber()
  @IsOptional()
  sslcMarks?: number;

  @IsNumber()
  @IsOptional()
  sslcPercentage?: number;

  @IsInt()
  @IsOptional()
  sslcYearOfPassing?: number;

  // HSC / 12th Standard
  @IsString()
  @IsOptional()
  hscSchoolName?: string;

  @IsString()
  @IsOptional()
  hscBoard?: string;

  @IsNumber()
  @IsOptional()
  hscMathsMark?: number;

  @IsNumber()
  @IsOptional()
  hscPhysicsMark?: number;

  @IsNumber()
  @IsOptional()
  hscChemistryMark?: number;

  @IsNumber()
  @IsOptional()
  hscBiologyOrCsMark?: number;

  @IsNumber()
  @IsOptional()
  hscCutoff?: number;

  @IsNumber()
  @IsOptional()
  hscPercentage?: number;

  @IsString()
  @IsOptional()
  hscClass?: string;

  // Diploma (Lateral Entry)
  @IsString()
  @IsOptional()
  diplomaInstitution?: string;

  @IsString()
  @IsOptional()
  diplomaBranch?: string;

  @IsNumber()
  @IsOptional()
  diplomaPercentage?: number;
}

