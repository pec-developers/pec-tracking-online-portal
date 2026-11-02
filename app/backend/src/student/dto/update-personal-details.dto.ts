import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePersonalDetailsDto {
  @IsDateString()
  @IsOptional()
  dob?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  sex?: string; // MALE, FEMALE, OTHER

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  religion?: string;

  @IsString()
  @IsOptional()
  community?: string; // OC, BC, MBC, SC, ST

  @IsString()
  @IsOptional()
  caste?: string;

  @IsString()
  @IsOptional()
  contactLandline?: string;

  @IsString()
  @IsOptional()
  contactMobile?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @IsString()
  @IsOptional()
  foodHabit?: string; // VEG, NON_VEG

  @IsString()
  @IsOptional()
  motherTongue?: string;

  @IsArray()
  @IsOptional()
  otherLanguages?: string[];

  @IsString()
  @IsOptional()
  chronicIllness?: string;

  @IsBoolean()
  @IsOptional()
  visionProblem?: boolean;

  @IsArray()
  @IsOptional()
  siblings?: {
    name: string;
    age: number;
    sex: string;
    educationOrProfession: string;
  }[];
}

