import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { AssignMenteeDto } from './dto/assign-mentee.dto.js';
import { UpdateActivityDto } from './dto/update-activity.dto.js';
import { UpdateChartDto } from './dto/update-chart.dto.js';
import { CreateSessionDto } from './dto/create-session.dto.js';
import { UpdateReviewDto } from './dto/update-review.dto.js';
import { Role } from '../auth/roles.enum.js';

@Injectable()
export class MentoringService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper: resolve student by ID or Register Number
  private async resolveStudent(idOrReg: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        OR: [{ id: idOrReg }, { registerNumber: idOrReg }],
      },
    });
    if (!student) {
      throw new NotFoundException(`Student '${idOrReg}' not found`);
    }
    return student;
  }

  // Helper: resolve user (mentor)
  private async resolveMentor(idOrUsername: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: idOrUsername }, { username: idOrUsername }],
      },
    });
    if (!user) {
      throw new NotFoundException(`Mentor '${idOrUsername}' not found`);
    }
    return user;
  }

  // 1. Mentor-Mentee Allocation
  async assignMentees(dto: AssignMenteeDto) {
    const mentor = await this.resolveMentor(dto.mentorId);

    const assignments = [];
    for (const studentIdOrReg of dto.studentIds) {
      const student = await this.resolveStudent(studentIdOrReg);
      const mapping = await this.prisma.mentorMenteeMapping.upsert({
        where: {
          studentId_semester_academicYear: {
            studentId: student.id,
            semester: dto.semester,
            academicYear: dto.academicYear,
          },
        },
        update: { mentorId: mentor.id },
        create: {
          mentorId: mentor.id,
          studentId: student.id,
          semester: dto.semester,
          academicYear: dto.academicYear,
        },
        include: {
          student: {
            select: { id: true, registerNumber: true, name: true, branch: true, section: true },
          },
        },
      });
      assignments.push(mapping);
    }

    return {
      message: `Assigned ${assignments.length} student(s) to mentor ${mentor.name}`,
      mentor: { id: mentor.id, name: mentor.name },
      assignments,
    };
  }

  async getMentees(user: any) {
    const where: any = {};
    if (user.role === Role.MENTOR) {
      where.mentorId = user.sub;
    }

    const mappings = await this.prisma.mentorMenteeMapping.findMany({
      where,
      include: {
        mentor: { select: { id: true, name: true, username: true } },
        student: {
          select: {
            id: true,
            registerNumber: true,
            name: true,
            branch: true,
            section: true,
            mentoringActivities: true,
            mentoringSessions: true,
            mentorReviews: true,
            academicPerformances: true,
          },
        },
      },
      orderBy: [{ semester: 'desc' }],
    });

    return {
      count: mappings.length,
      mentees: mappings.map((m) => {
        const student = m.student;
        const currentSem = m.semester;
        const semPerf = student.academicPerformances.find((p) => p.semester === currentSem);
        const semSessions = student.mentoringSessions.filter((s) => s.semester === currentSem);
        const semReview = student.mentorReviews.find((r) => r.semester === currentSem);

        return {
          studentId: student.id,
          registerNumber: student.registerNumber,
          name: student.name,
          branch: student.branch,
          section: student.section,
          semester: currentSem,
          academicYear: m.academicYear,
          mentor: m.mentor,
          gpa: semPerf?.gpa ?? null,
          attendancePercentage: semPerf?.attendancePercentage ?? null,
          sessionsLoggedCount: semSessions.length,
          reviewSignedOff: !!semReview?.principalSignedAt,
        };
      }),
    };
  }

  // 2. Page A: Semester Mentoring Activity (Student Self-Assessment)
  async getActivity(studentIdOrReg: string, semester: number) {
    const student = await this.resolveStudent(studentIdOrReg);
    const activity = await this.prisma.semesterMentoringActivity.findUnique({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
    });

    return {
      student: { id: student.id, registerNumber: student.registerNumber, name: student.name },
      semester,
      activity: activity || {},
    };
  }

  async updateActivity(
    studentIdOrReg: string,
    semester: number,
    dto: UpdateActivityDto,
    user: any,
  ) {
    const student = await this.resolveStudent(studentIdOrReg);
    const year = Math.ceil(semester / 2);

    const activity = await this.prisma.semesterMentoringActivity.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        ...dto,
        subjectProblems: dto.subjectProblems as any,
        laboratoryUnderstanding: dto.laboratoryUnderstanding as any,
        libraryDetails: dto.libraryDetails as any,
      },
      create: {
        studentId: student.id,
        semester,
        year,
        ...dto,
        subjectProblems: dto.subjectProblems as any,
        laboratoryUnderstanding: dto.laboratoryUnderstanding as any,
        libraryDetails: dto.libraryDetails as any,
      },
    });

    return {
      message: `Semester ${semester} mentoring activity (Page A) updated by ${user.name}`,
      activity,
    };
  }

  // 3. Page B: Mentoring Chart
  async getChart(studentIdOrReg: string, semester: number) {
    const student = await this.resolveStudent(studentIdOrReg);
    const chart = await this.prisma.semesterMentoringChart.findUnique({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
    });

    return {
      student: { id: student.id, registerNumber: student.registerNumber, name: student.name },
      semester,
      chart: chart || {},
    };
  }

  async updateChart(studentIdOrReg: string, semester: number, dto: UpdateChartDto, user: any) {
    const student = await this.resolveStudent(studentIdOrReg);
    const year = Math.ceil(semester / 2);

    const chart = await this.prisma.semesterMentoringChart.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        timeManagement: dto.timeManagement as any,
        classroomRoutine: dto.classroomRoutine as any,
        laboratoryRoutine: dto.laboratoryRoutine as any,
        examinationPrep: dto.examinationPrep as any,
        otherActivities: dto.otherActivities as any,
        mentorSuggestions: dto.mentorSuggestions as any,
      },
      create: {
        studentId: student.id,
        semester,
        year,
        timeManagement: dto.timeManagement as any,
        classroomRoutine: dto.classroomRoutine as any,
        laboratoryRoutine: dto.laboratoryRoutine as any,
        examinationPrep: dto.examinationPrep as any,
        otherActivities: dto.otherActivities as any,
        mentorSuggestions: dto.mentorSuggestions as any,
      },
    });

    return {
      message: `Semester ${semester} mentoring chart (Page B) updated by ${user.name}`,
      chart,
    };
  }

  // 4. Page C Bottom: Periodic Mentoring Sessions (5 per semester)
  async getSessions(studentIdOrReg: string, semester: number) {
    const student = await this.resolveStudent(studentIdOrReg);

    const sessions = await this.prisma.mentoringSession.findMany({
      where: {
        studentId: student.id,
        semester,
      },
      include: {
        mentor: { select: { id: true, name: true } },
      },
      orderBy: { sessionNumber: 'asc' },
    });

    return {
      student: { id: student.id, registerNumber: student.registerNumber, name: student.name },
      semester,
      count: sessions.length,
      sessions,
    };
  }

  async recordSession(
    studentIdOrReg: string,
    semester: number,
    dto: CreateSessionDto,
    mentorUser: any,
  ) {
    const student = await this.resolveStudent(studentIdOrReg);
    const total =
      dto.asPerson +
      dto.studies +
      dto.behaviour +
      dto.characterAndContact +
      dto.knowledge;

    const session = await this.prisma.mentoringSession.upsert({
      where: {
        studentId_semester_sessionNumber: {
          studentId: student.id,
          semester,
          sessionNumber: dto.sessionNumber,
        },
      },
      update: {
        mentorId: mentorUser.sub,
        date: new Date(dto.date),
        asPerson: dto.asPerson,
        studies: dto.studies,
        behaviour: dto.behaviour,
        characterAndContact: dto.characterAndContact,
        knowledge: dto.knowledge,
        total,
        remarks: dto.remarks,
      },
      create: {
        studentId: student.id,
        mentorId: mentorUser.sub,
        semester,
        sessionNumber: dto.sessionNumber,
        date: new Date(dto.date),
        asPerson: dto.asPerson,
        studies: dto.studies,
        behaviour: dto.behaviour,
        characterAndContact: dto.characterAndContact,
        knowledge: dto.knowledge,
        total,
        remarks: dto.remarks,
      },
    });

    return {
      message: `Mentoring Session #${dto.sessionNumber} logged for ${student.name} (Score: ${total}/50)`,
      session,
    };
  }

  async signSession(sessionId: string, studentUser: any) {
    const session = await this.prisma.mentoringSession.findUnique({
      where: { id: sessionId },
      include: { student: true },
    });

    if (!session) {
      throw new NotFoundException(`Mentoring session '${sessionId}' not found`);
    }

    if (session.student.registerNumber !== studentUser.username && studentUser.role !== Role.ADMIN) {
      throw new ForbiddenException('You can only sign your own mentoring sessions');
    }

    const updated = await this.prisma.mentoringSession.update({
      where: { id: sessionId },
      data: {
        studentSignature: true,
        studentSignedAt: new Date(),
      },
    });

    return {
      message: `Session #${session.sessionNumber} digitally acknowledged and signed by student`,
      session: updated,
    };
  }

  // 5. Page D: Review, Analysis Sheet & 4-Tier Sign-Off Chain
  async getReview(studentIdOrReg: string, semester: number) {
    const student = await this.resolveStudent(studentIdOrReg);

    const review = await this.prisma.semesterMentorReview.findUnique({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
    });

    return {
      student: { id: student.id, registerNumber: student.registerNumber, name: student.name },
      semester,
      review: review || {},
    };
  }

  async updateReview(
    studentIdOrReg: string,
    semester: number,
    dto: UpdateReviewDto,
    user: any,
  ) {
    const student = await this.resolveStudent(studentIdOrReg);
    const year = Math.ceil(semester / 2);

    const review = await this.prisma.semesterMentorReview.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        overallRemarks: dto.overallRemarks,
        disciplinaryIssues: dto.disciplinaryIssues,
        requiresLeadershipFollowup: dto.requiresLeadershipFollowup,
        leadershipFollowupTarget: dto.leadershipFollowupTarget,
        leadershipFollowupDetails: dto.leadershipFollowupDetails,
        strengths: dto.strengths as any,
        weaknesses: dto.weaknesses as any,
        improvementsObserved: dto.improvementsObserved as any,
      },
      create: {
        studentId: student.id,
        semester,
        year,
        overallRemarks: dto.overallRemarks,
        disciplinaryIssues: dto.disciplinaryIssues,
        requiresLeadershipFollowup: dto.requiresLeadershipFollowup ?? false,
        leadershipFollowupTarget: dto.leadershipFollowupTarget,
        leadershipFollowupDetails: dto.leadershipFollowupDetails,
        strengths: dto.strengths as any,
        weaknesses: dto.weaknesses as any,
        improvementsObserved: dto.improvementsObserved as any,
      },
    });

    return {
      message: `Semester Review & Analysis Sheet (Page D) updated by ${user.name}`,
      review,
    };
  }

  async signOffReview(studentIdOrReg: string, semester: number, user: any) {
    const student = await this.resolveStudent(studentIdOrReg);
    const year = Math.ceil(semester / 2);

    const updateData: any = {};
    const now = new Date();

    if (user.role === Role.MENTOR) {
      updateData.mentorSignedAt = now;
    } else if (user.role === Role.CLASS_COORDINATOR) {
      updateData.coordinatorSignedAt = now;
    } else if (user.role === Role.HOD) {
      updateData.hodSignedAt = now;
    } else if (user.role === Role.PRINCIPAL) {
      updateData.principalSignedAt = now;
    } else if (user.role === Role.ADMIN) {
      updateData.mentorSignedAt = now;
      updateData.coordinatorSignedAt = now;
      updateData.hodSignedAt = now;
      updateData.principalSignedAt = now;
    } else {
      throw new ForbiddenException('Your role cannot execute semester leadership sign-offs');
    }

    const review = await this.prisma.semesterMentorReview.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: updateData,
      create: {
        studentId: student.id,
        semester,
        year,
        ...updateData,
      },
    });

    return {
      message: `Semester ${semester} review signed off by ${user.name} (${user.role})`,
      signOffChain: {
        mentorSignedAt: review.mentorSignedAt,
        coordinatorSignedAt: review.coordinatorSignedAt,
        hodSignedAt: review.hodSignedAt,
        principalSignedAt: review.principalSignedAt,
      },
      review,
    };
  }
}
