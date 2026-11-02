import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddPlacementDto {
  @IsNumber()
  year: number; // 1 to 4

  @IsNumber()
  semester: number; // 1 to 8

  @IsString()
  @IsNotEmpty()
  date: string; // ISO Date "YYYY-MM-DD"

  @IsString()
  @IsNotEmpty()
  venue: string; // e.g. "College Campus - Placement Cell", "Virtual", "Off-Campus"

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNumber()
  packageLpa: number; // e.g. 7.5

  @IsString()
  @IsNotEmpty()
  outcome: string; // "PLACED", "OFFER_ACCEPTED", "HIGHER_STUDIES", "ENTREPRENEUR", "OPTED_OUT"
}

