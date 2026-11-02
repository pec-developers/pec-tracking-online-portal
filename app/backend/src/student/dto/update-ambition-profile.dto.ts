import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAmbitionAndProfileDto {
  @IsString()
  @IsOptional()
  personalAimOrGoal?: string;

  @IsString()
  @IsOptional()
  objectives?: string;

  @IsString()
  @IsOptional()
  plansToAchieveAim?: string;

  @IsString()
  @IsOptional()
  careerOption?: string; // JOB, HIGHER_STUDIES, ENTREPRENEUR

  @IsString()
  @IsOptional()
  preparationDetails?: string;

  @IsString()
  @IsOptional()
  extraCoaching?: string;

  @IsString()
  @IsOptional()
  collegeHelpRequired?: string;

  @IsString()
  @IsOptional()
  prizesAndAwards?: string;

  // Living style
  @IsString()
  @IsOptional()
  stayType?: string; // HOSTELLER, DAYSCHOLAR, OWN_OUTSIDE

  @IsObject()
  @IsOptional()
  hostellerDetails?: {
    roommates?: string;
    hostelEnvironment?: string;
  };

  @IsString()
  @IsOptional()
  dayscholarStayWith?: string; // PARENTS, GUARDIAN, FRIENDS, ON_MY_OWN

  @IsString()
  @IsOptional()
  parentCommFrequencyStudent?: string;

  @IsString()
  @IsOptional()
  parentCommFrequencyParent?: string;

  @IsString()
  @IsOptional()
  holidayAndWeekendRoutine?: string;

  @IsString()
  @IsOptional()
  outsideStayFellowMates?: string;

  // SWOT Analysis
  @IsString()
  @IsOptional()
  strengthsAcademic?: string;

  @IsString()
  @IsOptional()
  strengthsGeneral?: string;

  @IsString()
  @IsOptional()
  weaknesses?: string;

  // Academic / Co-Curricular matters
  @IsBoolean()
  @IsOptional()
  likesBranch?: boolean;

  @IsString()
  @IsOptional()
  branchDislikeReason?: string;

  @IsString()
  @IsOptional()
  mathFundamentalsRating?: string;

  @IsString()
  @IsOptional()
  coreEngineeringRating?: string;

  @IsBoolean()
  @IsOptional()
  capableRaisingQuestions?: boolean;

  @IsArray()
  @IsOptional()
  sportsAndGames?: {
    game: string;
    levelOfParticipation: string;
    prizesWon: string;
  }[];
}

