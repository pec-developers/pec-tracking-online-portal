import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdatePersonalDetailsDto } from './dto/update-personal-details.dto.js';
import { UpdateFamilyDetailsDto } from './dto/update-family-details.dto.js';
import { UpdateAcademicHistoryDto } from './dto/update-academic-history.dto.js';
import { UpdateAmbitionAndProfileDto } from './dto/update-ambition-profile.dto.js';
import { Role } from '../auth/roles.enum.js';

@Controller('students')
@UseGuards(AuthGuard, RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // 1. Student self-view
  @Get('me')
  @Roles(Role.STUDENT)
  getMe(@CurrentUser() user: any) {
    return this.studentService.getStudentMe(user);
  }

  // 2. View full student profile dossier (Front cover, Inside cover, Pages 1 & 2)
  @Get('profile/:idOrRegNo')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getProfile(
    @Param('idOrRegNo') idOrRegNo: string,
    @CurrentUser() user: any,
  ) {
    return this.studentService.getStudentProfile(idOrRegNo, user);
  }

  // 3. List & filter students
  @Get()
  @Roles(
    Role.FACULTY,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  listStudents(
    @Query('branch') branch?: string,
    @Query('section') section?: string,
    @Query('batchStart') batchStart?: number,
    @Query('search') search?: string,
  ) {
    return this.studentService.listStudents({ branch, section, batchStart, search });
  }

  // 4. Initial student onboarding (Front cover data)
  @Post('onboard')
  @Roles(Role.ADMIN, Role.HOD, Role.MENTOR)
  onboardStudent(
    @Body() dto: CreateStudentDto,
    @CurrentUser() user: any,
  ) {
    return this.studentService.onboardStudent(dto, user);
  }

  // 5. Update Inside Cover: Personal details, Blood group, Photos, Siblings
  @Put('personal-details/:idOrRegNo')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  updatePersonalDetails(
    @Param('idOrRegNo') idOrRegNo: string,
    @Body() dto: UpdatePersonalDetailsDto,
    @CurrentUser() user: any,
  ) {
    return this.studentService.updatePersonalDetails(idOrRegNo, dto, user);
  }

  // 6. Update Page 1: Family details, Parents' occupation/income, Stay & Local guardian
  @Put('family-details/:idOrRegNo')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  updateFamilyDetails(
    @Param('idOrRegNo') idOrRegNo: string,
    @Body() dto: UpdateFamilyDetailsDto,
    @CurrentUser() user: any,
  ) {
    return this.studentService.updateFamilyDetails(idOrRegNo, dto, user);
  }

  // 7. Update Page 1: Academic History (SSLC 10th, HSC 12th, Diploma)
  @Put('academic-history/:idOrRegNo')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  updateAcademicHistory(
    @Param('idOrRegNo') idOrRegNo: string,
    @Body() dto: UpdateAcademicHistoryDto,
    @CurrentUser() user: any,
  ) {
    return this.studentService.updateAcademicHistory(idOrRegNo, dto, user);
  }

  // 8. Update Page 2: Ambition, Career choices, Living Style & SWOT Analysis
  @Put('ambition-profile/:idOrRegNo')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  updateAmbitionAndProfile(
    @Param('idOrRegNo') idOrRegNo: string,
    @Body() dto: UpdateAmbitionAndProfileDto,
    @CurrentUser() user: any,
  ) {
    return this.studentService.updateAmbitionAndProfile(idOrRegNo, dto, user);
  }
}
