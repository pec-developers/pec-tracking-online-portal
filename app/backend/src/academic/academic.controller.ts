import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AcademicService } from './academic.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { Role } from '../auth/roles.enum.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { MapClassSubjectDto } from './dto/map-class-subject.dto.js';
import { InitPerformanceDto } from './dto/init-performance.dto.js';
import { UpdateMarksDto } from './dto/update-marks.dto.js';
import { UpdateUniversityResultsDto } from './dto/update-university-results.dto.js';
import { UpdateAttendanceDto } from './dto/update-attendance.dto.js';
import { UpdateArrearsDto } from './dto/update-arrears.dto.js';

@Controller('academic')
@UseGuards(AuthGuard, RolesGuard)
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  // 1. Classes
  @Post('classes')
  @Roles(Role.ADMIN, Role.HOD, Role.CLASS_COORDINATOR)
  createClass(@Body() dto: CreateClassDto) {
    return this.academicService.createClass(dto);
  }

  @Get('classes')
  @Roles(
    Role.FACULTY,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  listClasses(
    @Query('department') department?: string,
    @Query('academicYear') academicYear?: string,
  ) {
    return this.academicService.listClasses(department, academicYear);
  }

  // 2. Subjects
  @Post('subjects')
  @Roles(Role.ADMIN, Role.HOD)
  createSubject(@Body() dto: CreateSubjectDto) {
    return this.academicService.createSubject(dto);
  }

  @Get('subjects')
  @Roles(
    Role.FACULTY,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  listSubjects(
    @Query('department') department?: string,
    @Query('search') search?: string,
  ) {
    return this.academicService.listSubjects(department, search);
  }

  @Post('classes/:classId/subjects')
  @Roles(Role.ADMIN, Role.HOD, Role.CLASS_COORDINATOR)
  mapSubjectToClass(
    @Param('classId') classId: string,
    @Body() dto: MapClassSubjectDto,
  ) {
    return this.academicService.mapSubjectToClass(classId, dto);
  }

  @Get('classes/:classId/subjects')
  @Roles(
    Role.FACULTY,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getClassSubjects(@Param('classId') classId: string) {
    return this.academicService.getClassSubjects(classId);
  }

  // 3. Performance Initialization (Page C)
  @Post('performance/init')
  @Roles(Role.CLASS_COORDINATOR, Role.MENTOR, Role.ADMIN)
  initSemesterPerformance(@Body() dto: InitPerformanceDto) {
    return this.academicService.initSemesterPerformance(dto);
  }

  // 4. Test Marks Entry: IAT 1, IAT 2, Model, Internal marks (Page C)
  @Put('performance/:studentId/semester/:semester/marks')
  @Roles(Role.FACULTY, Role.MENTOR, Role.CLASS_COORDINATOR, Role.ADMIN)
  updateMarks(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateMarksDto,
    @CurrentUser() user: any,
  ) {
    return this.academicService.updateMarks(studentId, semester, dto, user);
  }

  // 5. University Examination Results: Grade, Credits, GPA, CGPA (Page C)
  @Put('performance/:studentId/semester/:semester/university-results')
  @Roles(Role.MENTOR, Role.CLASS_COORDINATOR, Role.HOD, Role.ADMIN)
  updateUniversityResults(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateUniversityResultsDto,
    @CurrentUser() user: any,
  ) {
    return this.academicService.updateUniversityResults(studentId, semester, dto, user);
  }

  // 6. Semester Attendance Tracking (Page C)
  @Put('performance/:studentId/semester/:semester/attendance')
  @Roles(Role.CLASS_COORDINATOR, Role.MENTOR, Role.ADMIN)
  updateAttendance(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateAttendanceDto,
    @CurrentUser() user: any,
  ) {
    return this.academicService.updateAttendance(studentId, semester, dto, user);
  }

  // 7. Arrears Tracking & Clearance (Page C)
  @Put('performance/:studentId/semester/:semester/arrears')
  @Roles(Role.MENTOR, Role.CLASS_COORDINATOR, Role.ADMIN)
  updateArrears(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateArrearsDto,
    @CurrentUser() user: any,
  ) {
    return this.academicService.updateArrears(studentId, semester, dto, user);
  }

  // 8. Digital Sign-off by Student / Parent (Page C)
  @Post('performance/:studentId/semester/:semester/sign')
  @Roles(Role.STUDENT, Role.PARENT)
  signPerformance(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @CurrentUser() user: any,
  ) {
    return this.academicService.signPerformance(studentId, semester, user);
  }

  // 9. Student / Parent viewing their academic scorecard
  @Get('my-performance')
  @Roles(Role.STUDENT, Role.PARENT)
  getMyPerformance(@CurrentUser() user: any) {
    return this.academicService.getMyPerformance(user);
  }

  // 10. Staff viewing all semesters for a student
  @Get('students/:studentId/performance')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getStudentPerformance(@Param('studentId') studentId: string) {
    return this.academicService.getStudentPerformance(studentId);
  }

  // 11. Staff viewing specific semester for a student
  @Get('students/:studentId/semester/:semester')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getStudentSemesterPerformance(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
  ) {
    return this.academicService.getStudentSemesterPerformance(studentId, semester);
  }
}
