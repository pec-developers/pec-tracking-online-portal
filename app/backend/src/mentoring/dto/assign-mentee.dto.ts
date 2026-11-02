import { IsArray, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class AssignMenteeDto {
  @IsString()
  @IsNotEmpty()
  mentorId: string; // Mentor User ID or username

  @IsArray()
  @IsNotEmpty()
  studentIds: string[]; // List of Student IDs or register numbers

  @IsString()
  @IsNotEmpty()
  academicYear: string; // e.g. "2024-2025"

  @IsInt()
  @Min(1)
  @Max(8)
  semester: number;
}

