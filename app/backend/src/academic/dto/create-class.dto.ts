import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  department: string; // e.g. CSE, ECE, MECH

  @IsInt()
  @Min(1)
  @Max(4)
  year: number; // 1 to 4

  @IsInt()
  @Min(1)
  @Max(8)
  semester: number; // 1 to 8

  @IsString()
  @IsNotEmpty()
  section: string; // A, B, C

  @IsString()
  @IsNotEmpty()
  academicYear: string; // e.g. "2024-2025"

  @IsString()
  @IsOptional()
  coordinatorId?: string; // User ID of Class Coordinator
}

