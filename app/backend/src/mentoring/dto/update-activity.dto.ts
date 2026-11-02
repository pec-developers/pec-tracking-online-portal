import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateActivityDto {
  @IsString()
  @IsOptional()
  fieldOfInterest?: string;

  @IsString()
  @IsOptional()
  favoriteSubject?: string;

  @IsString()
  @IsOptional()
  favoriteSubjectReason?: string;

  @IsString()
  @IsOptional()
  favoriteTeacher?: string;

  @IsString()
  @IsOptional()
  favoriteTeacherReason?: string;

  @IsString()
  @IsOptional()
  easiestSubject?: string;

  @IsString()
  @IsOptional()
  easiestSubjectReason?: string;

  @IsString()
  @IsOptional()
  hardestSubject?: string;

  @IsString()
  @IsOptional()
  hardestSubjectReason?: string;

  @IsArray()
  @IsOptional()
  subjectProblems?: string[];

  @IsString()
  @IsOptional()
  specialCoachingRequired?: string;

  @IsString()
  @IsOptional()
  specialAttentionRequired?: string;

  @IsString()
  @IsOptional()
  distractions?: string;

  @IsObject()
  @IsOptional()
  laboratoryUnderstanding?: {
    theoryBeforeLab?: boolean;
    experimentsCompletion?: string;
    recordSubmissionPunctual?: boolean;
  };

  @IsString()
  @IsOptional()
  arrearsExplanation?: string;

  @IsObject()
  @IsOptional()
  libraryDetails?: {
    visitFrequency?: string;
    booksBorrowed?: string[];
    otherTitlesBorrowed?: string[];
    dailiesRead?: string[];
  };

  @IsString()
  @IsOptional()
  communicationEfforts?: string;

  @IsString()
  @IsOptional()
  improvedOverTime?: string;
}

