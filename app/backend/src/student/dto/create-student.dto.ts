import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AdmissionType } from '@prisma/client';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  registerNumber: string;

  @IsString()
  @IsNotEmpty()
  admissionNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  branch: string; // e.g. CSE, ECE, MECH

  @IsInt()
  @IsNotEmpty()
  batchStart: number; // e.g. 2022

  @IsInt()
  @IsNotEmpty()
  batchEnd: number; // e.g. 2026

  @IsString()
  @IsNotEmpty()
  section: string; // e.g. A, B

  @IsEnum(AdmissionType)
  @IsOptional()
  admissionType?: AdmissionType = AdmissionType.COUNSELING;

  @IsBoolean()
  @IsOptional()
  lateralEntry?: boolean = false;

  @IsString()
  @IsOptional()
  studentPhotoUrl?: string;

  @IsString()
  @IsOptional()
  fatherPhotoUrl?: string;

  @IsString()
  @IsOptional()
  motherPhotoUrl?: string;

  @IsString()
  @IsOptional()
  passoutPhotoUrl?: string;
}

