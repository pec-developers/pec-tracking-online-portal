import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MapClassSubjectDto {
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @IsString()
  @IsOptional()
  facultyId?: string; // Teacher assigned to handle this subject for the class
}

