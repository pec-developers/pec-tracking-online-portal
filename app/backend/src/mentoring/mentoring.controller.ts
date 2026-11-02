import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MentoringService } from './mentoring.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { Role } from '../auth/roles.enum.js';
import { AssignMenteeDto } from './dto/assign-mentee.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';
import { UpdateChartDto } from './dto/update-chart.dto.js';
import { CreateSessionDto } from './dto/create-session.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';

@Controller('mentoring')
@UseGuards(AuthGuard, RolesGuard)
export class MentoringController {
  constructor(private readonly mentoringService: MentoringService) {}

  // 1. Mentor-Mentee Allocation
  @Post('assignments')
  @Roles(Role.ADMIN, Role.HOD)
  assignMentees(@Body() dto: AssignMenteeDto) {
    return this.mentoringService.assignMentees(dto);
  }

  @Get('mentees')
  @Roles(Role.MENTOR, Role.HOD, Role.PRINCIPAL, Role.ADMIN)
  getMentees(@CurrentUser() user: any) {
    return this.mentoringService.getMentees(user);
  }

  // 2. Page A: Semester Mentoring Activity (Student Self-Assessment)
  @Get('activity/:studentId/semester/:semester')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getActivity(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
  ) {
    return this.mentoringService.getActivity(studentId, semester);
  }

  @Put('activity/:studentId/semester/:semester')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  updateActivity(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateActivityDto,
    @CurrentUser() user: any,
  ) {
    return this.mentoringService.updateActivity(studentId, semester, dto, user);
  }

  // 3. Page B: Mentoring Chart (Time Management & Routine Ratings)
  @Get('chart/:studentId/semester/:semester')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getChart(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
  ) {
    return this.mentoringService.getChart(studentId, semester);
  }

  @Put('chart/:studentId/semester/:semester')
  @Roles(Role.FACULTY, Role.MENTOR, Role.CLASS_COORDINATOR, Role.ADMIN)
  updateChart(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateChartDto,
    @CurrentUser() user: any,
  ) {
    return this.mentoringService.updateChart(studentId, semester, dto, user);
  }

  // 4. Page C Bottom: Periodic 1-on-1 Mentoring Sessions
  @Get('sessions/:studentId/semester/:semester')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getSessions(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
  ) {
    return this.mentoringService.getSessions(studentId, semester);
  }

  @Post('sessions/:studentId/semester/:semester')
  @Roles(Role.MENTOR, Role.ADMIN)
  recordSession(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: CreateSessionDto,
    @CurrentUser() user: any,
  ) {
    return this.mentoringService.recordSession(studentId, semester, dto, user);
  }

  @Post('sessions/:sessionId/sign')
  @Roles(Role.STUDENT, Role.ADMIN)
  signSession(
    @Param('sessionId') sessionId: string,
    @CurrentUser() user: any,
  ) {
    return this.mentoringService.signSession(sessionId, user);
  }

  // 5. Page D: Review, Analysis Sheet & 4-Tier Sign-Off Chain
  @Get('review/:studentId/semester/:semester')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getReview(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
  ) {
    return this.mentoringService.getReview(studentId, semester);
  }

  @Put('review/:studentId/semester/:semester')
  @Roles(Role.MENTOR, Role.ADMIN)
  updateReview(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() dto: UpdateReviewDto,
    @CurrentUser() user: any,
  ) {
    return this.mentoringService.updateReview(studentId, semester, dto, user);
  }

  @Post('review/:studentId/semester/:semester/sign-off')
  @Roles(
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  signOffReview(
    @Param('studentId') studentId: string,
    @Param('semester', ParseIntPipe) semester: number,
    @CurrentUser() user: any,
  ) {
    return this.mentoringService.signOffReview(studentId, semester, user);
  }
}
