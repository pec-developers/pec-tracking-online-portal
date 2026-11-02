import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateAttendanceDto {
  @IsInt()
  @Min(0)
  workingDays: number;

  @IsInt()
  @Min(0)
  daysPresent: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  daysAbsent?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  leaveDays?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  medicalLeave?: number;

  @IsNumber()
  @IsOptional()
  attendancePercentage?: number;
}

