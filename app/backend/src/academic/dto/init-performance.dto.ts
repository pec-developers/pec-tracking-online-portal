import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class InitPerformanceDto {
  @IsString()
  @IsNotEmpty()
  studentId: string; // ID or register number

  @IsInt()
  @Min(1)
  @Max(8)
  semester: number;

  @IsInt()
  @Min(1)
  @Max(4)
  year: number;

  @IsString()
  @IsOptional()
  classId?: string;
}

