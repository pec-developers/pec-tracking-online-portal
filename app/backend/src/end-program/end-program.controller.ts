import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EndProgramService } from './end-program.service.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { Role } from '../auth/roles.enum.js';
import {
  AddMiniProjectDto,
  AddPlacementDto,
  SignOffDto,
  UpdateExitContactDto,
  UpdateSummaryDto,
} from './dto/index.js';

@Controller('end-program')
@UseGuards(AuthGuard, RolesGuard)
export class EndProgramController {
  constructor(private readonly endProgramService: EndProgramService) {}

  // 1. View 8-semester summary, projects, placements & exit contact (Page 35)
  @Get(':studentId')
  @Roles(
    Role.STUDENT,
    Role.PARENT,
    Role.FACULTY,
    Role.MENTOR,
    Role.CLASS_COORDINATOR,
    Role.HOD,
    Role.PRINCIPAL,
    Role.ADMIN,
  )
  getEndProgramSummary(
    @Param('studentId') studentId: string,
    @CurrentUser() user: any,
  ) {
    return this.endProgramService.getEndProgramSummary(studentId, user);
  }

  // 2. Mentor / Coordinator / Admin updates consolidated 8-semester summary
  @Put('summary/:studentId')
  @Roles(Role.MENTOR, Role.CLASS_COORDINATOR, Role.ADMIN)
  updateSummary(
    @Param('studentId') studentId: string,
    @Body() dto: UpdateSummaryDto,
    @CurrentUser() user: any,
  ) {
    return this.endProgramService.updateSummary(studentId, dto, user);
  }

  // 3. Student / Mentor / Admin files mini-project or outside paper presentation
  @Post('projects/:studentId')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  addMiniProject(
    @Param('studentId') studentId: string,
    @Body() dto: AddMiniProjectDto,
    @CurrentUser() user: any,
  ) {
    return this.endProgramService.addMiniProject(studentId, dto, user);
  }

  // 4. Student / Mentor / Admin files placement result or higher studies offer
  @Post('placements/:studentId')
  @Roles(Role.STUDENT, Role.MENTOR, Role.ADMIN)
  addPlacement(
    @Param('studentId') studentId: string,
    @Body() dto: AddPlacementDto,
    @CurrentUser() user: any,
  ) {
    return this.endProgramService.addPlacement(studentId, dto, user);
  }

  // 5. Student / Parent / Admin updates permanent exit contact & alumni details
  @Put('exit-contact/:studentId')
  @Roles(Role.STUDENT, Role.PARENT, Role.ADMIN)
  updateExitContact(
    @Param('studentId') studentId: string,
    @Body() dto: UpdateExitContactDto,
    @CurrentUser() user: any,
  ) {
    return this.endProgramService.updateExitContact(studentId, dto, user);
  }

  // 6. Mentor / HOD / Admin signs off program completion
  @Post('sign-off/:studentId')
  @Roles(Role.MENTOR, Role.HOD, Role.ADMIN)
  signOff(
    @Param('studentId') studentId: string,
    @Body() dto: SignOffDto,
    @CurrentUser() user: any,
  ) {
    return this.endProgramService.signOff(studentId, dto, user);
  }
}
