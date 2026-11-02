import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  overallRemarks?: string;

  @IsString()
  @IsOptional()
  disciplinaryIssues?: string;

  @IsBoolean()
  @IsOptional()
  requiresLeadershipFollowup?: boolean;

  @IsString()
  @IsOptional()
  leadershipFollowupTarget?: string; // HOD, PRINCIPAL, MANAGEMENT

  @IsString()
  @IsOptional()
  leadershipFollowupDetails?: string;

  // Analysis Sheet
  @IsObject()
  @IsOptional()
  strengths?: {
    attendance?: string;
    discipline?: string;
    academic?: string;
    coCurricular?: string;
  };

  @IsObject()
  @IsOptional()
  weaknesses?: {
    attendance?: string;
    discipline?: string;
    academic?: string;
    coCurricular?: string;
  };

  @IsObject()
  @IsOptional()
  improvementsObserved?: {
    attendance?: string;
    discipline?: string;
    studies?: string;
    coCurricular?: string;
  };
}

