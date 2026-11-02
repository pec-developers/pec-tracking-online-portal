import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { CreateSubjectDto } from './dto/create-subject.dto.js';
import { MapClassSubjectDto } from './dto/map-class-subject.dto.js';
import { InitPerformanceDto } from './dto/init-performance.dto.js';
import { UpdateMarksDto } from './dto/update-marks.dto.js';
import { UpdateUniversityResultsDto } from './dto/update-university-results.dto.js';
import { UpdateAttendanceDto } from './dto/update-attendance.dto.js';
import { UpdateArrearsDto } from './dto/update-arrears.dto.js';
import { Role } from '../auth/roles.enum.js';

@Injectable()
export class AcademicService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Classes
  async createClass(dto: CreateClassDto) {
    const existing = await this.prisma.class.findFirst({
      where: {
        department: dto.department,
        academicYear: dto.academicYear,
        semester: dto.semester,
        section: dto.section,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Class for ${dto.department} Sem ${dto.semester} Sec ${dto.section} (${dto.academicYear}) already exists`,
      );
    }

    return this.prisma.class.create({
      data: dto,
      include: {
        coordinator: {
          select: { id: true, name: true, username: true, role: true },
        },
      },
    });
  }

  async listClasses(department?: string, academicYear?: string) {
    const where: any = {};
    if (department) where.department = department;
    if (academicYear) where.academicYear = academicYear;

    return this.prisma.class.findMany({
      where,
      include: {
        coordinator: {
          select: { id: true, name: true, username: true },
        },
        subjectMappings: {
          include: {
            subject: true,
            faculty: { select: { id: true, name: true, username: true } },
          },
        },
      },
      orderBy: [{ academicYear: 'desc' }, { semester: 'asc' }, { section: 'asc' }],
    });
  }

  // 2. Subjects
  async createSubject(dto: CreateSubjectDto) {
    const existing = await this.prisma.subject.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new BadRequestException(`Subject with code '${dto.code}' already exists`);
    }

    return this.prisma.subject.create({ data: dto });
  }

  async listSubjects(department?: string, search?: string) {
    const where: any = {};
    if (department) where.department = department;
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.subject.findMany({
      where,
      orderBy: { code: 'asc' },
    });
  }

  async mapSubjectToClass(classId: string, dto: MapClassSubjectDto) {
    const classExists = await this.prisma.class.findUnique({ where: { id: classId } });
    if (!classExists) {
      throw new NotFoundException(`Class with ID '${classId}' not found`);
    }

    const subjectExists = await this.prisma.subject.findUnique({ where: { id: dto.subjectId } });
    if (!subjectExists) {
      throw new NotFoundException(`Subject with ID '${dto.subjectId}' not found`);
    }

    return this.prisma.subjectClassMapping.upsert({
      where: {
        classId_subjectId: {
          classId,
          subjectId: dto.subjectId,
        },
      },
      update: { facultyId: dto.facultyId },
      create: {
        classId,
        subjectId: dto.subjectId,
        facultyId: dto.facultyId,
      },
      include: {
        subject: true,
        faculty: { select: { id: true, name: true, username: true } },
      },
    });
  }

  async getClassSubjects(classId: string) {
    return this.prisma.subjectClassMapping.findMany({
      where: { classId },
      include: {
        subject: true,
        faculty: { select: { id: true, name: true, username: true } },
      },
    });
  }

  // 3. Helper to resolve student
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

  // 4. Performance Initialization & Management
  async initSemesterPerformance(dto: InitPerformanceDto) {
    const student = await this.resolveStudent(dto.studentId);

    return this.prisma.semesterAcademicPerformance.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester: dto.semester,
        },
      },
      update: {
        year: dto.year,
        classId: dto.classId,
      },
      create: {
        studentId: student.id,
        semester: dto.semester,
        year: dto.year,
        classId: dto.classId,
      },
    });
  }

  async updateMarks(studentIdOrReg: string, semester: number, dto: UpdateMarksDto, user: any) {
    const student = await this.resolveStudent(studentIdOrReg);

    // Merge marks into existing subjectMarks array
    const perf = await this.prisma.semesterAcademicPerformance.findUnique({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
    });

    const existingMarks = (perf?.subjectMarks as any[]) || [];
    const updatedMarksMap = new Map<string, any>();

    for (const m of existingMarks) {
      updatedMarksMap.set(m.subjectCode, m);
    }

    for (const m of dto.subjectMarks) {
      const prev = updatedMarksMap.get(m.subjectCode) || {};
      updatedMarksMap.set(m.subjectCode, { ...prev, ...m });
    }

    const merged = Array.from(updatedMarksMap.values());

    const result = await this.prisma.semesterAcademicPerformance.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        subjectMarks: merged,
      },
      create: {
        studentId: student.id,
        semester,
        year: Math.ceil(semester / 2),
        subjectMarks: merged,
      },
    });

    return {
      message: `Marks updated for ${student.name} (Semester ${semester}) by ${user.name} (${user.role})`,
      performance: result,
    };
  }

  async updateUniversityResults(
    studentIdOrReg: string,
    semester: number,
    dto: UpdateUniversityResultsDto,
    user: any,
  ) {
    const student = await this.resolveStudent(studentIdOrReg);

    const perf = await this.prisma.semesterAcademicPerformance.findUnique({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
    });

    const existingMarks = (perf?.subjectMarks as any[]) || [];
    const updatedMarksMap = new Map<string, any>();

    for (const m of existingMarks) {
      updatedMarksMap.set(m.subjectCode, m);
    }

    for (const res of dto.subjectResults) {
      const prev = updatedMarksMap.get(res.subjectCode) || {
        subjectCode: res.subjectCode,
        subjectName: res.subjectCode,
      };
      updatedMarksMap.set(res.subjectCode, {
        ...prev,
        credits: res.credits,
        univGrade: res.univGrade,
        result: res.result,
      });
    }

    const merged = Array.from(updatedMarksMap.values());

    const result = await this.prisma.semesterAcademicPerformance.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        subjectMarks: merged,
        gpa: dto.gpa,
        cgpa: dto.cgpa,
      },
      create: {
        studentId: student.id,
        semester,
        year: Math.ceil(semester / 2),
        subjectMarks: merged,
        gpa: dto.gpa,
        cgpa: dto.cgpa,
      },
    });

    return {
      message: `University examination results recorded for ${student.name} (Semester ${semester}) by ${user.name}`,
      performance: result,
    };
  }

  async updateAttendance(
    studentIdOrReg: string,
    semester: number,
    dto: UpdateAttendanceDto,
    user: any,
  ) {
    const student = await this.resolveStudent(studentIdOrReg);

    const attendancePercentage =
      dto.attendancePercentage !== undefined
        ? dto.attendancePercentage
        : dto.workingDays > 0
          ? Number(((dto.daysPresent / dto.workingDays) * 100).toFixed(2))
          : 0;

    const result = await this.prisma.semesterAcademicPerformance.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        workingDays: dto.workingDays,
        daysPresent: dto.daysPresent,
        daysAbsent: dto.daysAbsent ?? dto.workingDays - dto.daysPresent,
        leaveDays: dto.leaveDays ?? 0,
        medicalLeave: dto.medicalLeave ?? 0,
        attendancePercentage,
      },
      create: {
        studentId: student.id,
        semester,
        year: Math.ceil(semester / 2),
        workingDays: dto.workingDays,
        daysPresent: dto.daysPresent,
        daysAbsent: dto.daysAbsent ?? dto.workingDays - dto.daysPresent,
        leaveDays: dto.leaveDays ?? 0,
        medicalLeave: dto.medicalLeave ?? 0,
        attendancePercentage,
      },
    });

    return {
      message: `Attendance updated for ${student.name} (Semester ${semester}) by ${user.name}`,
      performance: result,
    };
  }

  async updateArrears(studentIdOrReg: string, semester: number, dto: UpdateArrearsDto, user: any) {
    const student = await this.resolveStudent(studentIdOrReg);

    const result = await this.prisma.semesterAcademicPerformance.upsert({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      update: {
        arrearsTracking: dto.arrears as any,
      },
      create: {
        studentId: student.id,
        semester,
        year: Math.ceil(semester / 2),
        arrearsTracking: dto.arrears as any,
      },
    });

    return {
      message: `Arrears record updated for ${student.name} by ${user.name}`,
      performance: result,
    };
  }

  async signPerformance(studentIdOrReg: string, semester: number, user: any) {
    const student = await this.resolveStudent(studentIdOrReg);

    const updateData: any = {};
    if (user.role === Role.STUDENT) {
      updateData.studentSignedAt = new Date();
    } else if (user.role === Role.PARENT) {
      updateData.parentSignedAt = new Date();
    } else {
      updateData.studentSignedAt = new Date(); // fallback
    }

    const result = await this.prisma.semesterAcademicPerformance.update({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      data: updateData,
    });

    return {
      message: `Semester ${semester} performance scorecard signed off by ${user.name} (${user.role})`,
      performance: result,
    };
  }

  // 5. Performance Queries
  async getStudentPerformance(studentIdOrReg: string) {
    const student = await this.resolveStudent(studentIdOrReg);

    const records = await this.prisma.semesterAcademicPerformance.findMany({
      where: { studentId: student.id },
      include: {
        class: true,
      },
      orderBy: { semester: 'asc' },
    });

    return {
      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        name: student.name,
        branch: student.branch,
        batchStart: student.batchStart,
        batchEnd: student.batchEnd,
      },
      semesters: records,
    };
  }

  async getStudentSemesterPerformance(studentIdOrReg: string, semester: number) {
    const student = await this.resolveStudent(studentIdOrReg);

    const record = await this.prisma.semesterAcademicPerformance.findUnique({
      where: {
        studentId_semester: {
          studentId: student.id,
          semester,
        },
      },
      include: { class: true },
    });

    if (!record) {
      throw new NotFoundException(
        `Academic performance record for ${student.name} (Semester ${semester}) not found`,
      );
    }

    return {
      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        name: student.name,
      },
      performance: record,
    };
  }

  async getMyPerformance(studentUser: any) {
    return this.getStudentPerformance(studentUser.username);
  }
}
