import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFamilyDetailsDto {
  @IsString()
  @IsOptional()
  fatherName?: string;

  @IsString()
  @IsOptional()
  fatherEducation?: string;

  @IsString()
  @IsOptional()
  fatherOccupation?: string;

  @IsString()
  @IsOptional()
  fatherMobile?: string;

  @IsNumber()
  @IsOptional()
  fatherAnnualIncome?: number;

  @IsString()
  @IsOptional()
  motherName?: string;

  @IsString()
  @IsOptional()
  motherEducation?: string;

  @IsString()
  @IsOptional()
  motherOccupation?: string;

  @IsString()
  @IsOptional()
  motherMobile?: string;

  @IsNumber()
  @IsOptional()
  motherAnnualIncome?: number;

  @IsString()
  @IsOptional()
  otherIncomeSource?: string;

  @IsString()
  @IsOptional()
  parentCommunicationAddress?: string;

  @IsString()
  @IsOptional()
  studentPermanentAddress?: string;

  @IsObject()
  @IsOptional()
  presentAddresses?: {
    year1?: string;
    year2?: string;
    year3?: string;
    year4?: string;
  };

  @IsObject()
  @IsOptional()
  localGuardian?: {
    name?: string;
    address?: string;
    contactNumber?: string;
  };

  @IsString()
  @IsOptional()
  undertakePartTimeJob?: string;

  @IsString()
  @IsOptional()
  scholarshipDetails?: string;

  @IsString()
  @IsOptional()
  otherFinancialAssistance?: string;
}

