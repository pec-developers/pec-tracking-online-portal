import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  AddMiniProjectDto,
  AddPlacementDto,
  SignOffDto,
  UpdateExitContactDto,
  UpdateSummaryDto,
} from './dto/index.js';
import { randomUUID } from 'crypto';

@Injectable()
export class EndProgramService {
  constructor(private readonly prisma: PrismaService) {}

  private async findStudent(studentIdOrRegNo: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        OR: [{ id: studentIdOrRegNo }, { registerNumber: studentIdOrRegNo }],
      },
      include: {
        personalDetails: true,
        academicPerformances: {
          orderBy: { semester: 'asc' },
        },
      },
    });

    if (!student) {
      throw new NotFoundException(
        `Student not found with identifier: ${studentIdOrRegNo}`,
      );
    }
    return student;
  }

  // 1. Get Page 35 End-of-Program / Passout Dossier
  async getEndProgramSummary(studentId: string, requester: any) {
    const student = await this.findStudent(studentId);

    let summary = await this.prisma.endProgramSummary.findUnique({
      where: { studentId: student.id },
    });

    // Auto-initialize if not yet created
    if (!summary) {
      // Pre-fill semester data from SemesterAcademicPerformance if available
      const semesterWiseData = student.academicPerformances.map((perf) => ({
        semester: perf.semester,
        year: perf.year,
        sgpa: perf.gpa,
        cgpa: perf.cgpa,
        attendancePercentage: perf.attendancePercentage,
        feeReceipts: [],
        scholarships: [],
        detention: null,
        semDrop: null,
      }));

      const latestPerf =
        student.academicPerformances[student.academicPerformances.length - 1];
      const finalCgpa = latestPerf ? latestPerf.cgpa : null;

      summary = await this.prisma.endProgramSummary.create({
        data: {
          studentId: student.id,
          department: student.branch,
          batch: `${student.batchStart}-${student.batchEnd}`,
          finalCgpa: finalCgpa,
          totalCreditsEarned: 160,
          graduationClassification:
            finalCgpa && finalCgpa >= 8.5
              ? 'FIRST_CLASS_WITH_DISTINCTION'
              : finalCgpa && finalCgpa >= 6.5
                ? 'FIRST_CLASS'
                : 'SECOND_CLASS',
          graduationStatus: 'IN_PROGRESS',
          semesterWiseData: semesterWiseData as any,
          miniProjects: [],
          placements: [],
          exitAddress: student.personalDetails?.contactLandline || null,
          exitMobile: student.personalDetails?.contactMobile || null,
          exitEmail: student.personalDetails?.email || null,
        },
      });
    }

    return {
      message: `Final program / passout dossier for student ${student.name} (${student.registerNumber}) accessed by ${requester.username} (${requester.role}) (Page 35)`,
      student: {
        id: student.id,
        registerNumber: student.registerNumber,
        admissionNumber: student.admissionNumber,
        name: student.name,
        branch: student.branch,
        batch: `${student.batchStart}-${student.batchEnd}`,
      },
      summary,
    };
  }

  // 2. Mentor / Coordinator / Admin updates consolidated 8-semester summary
  async updateSummary(studentId: string, dto: UpdateSummaryDto, editor: any) {
    const student = await this.findStudent(studentId);

    const updated = await this.prisma.endProgramSummary.upsert({
      where: { studentId: student.id },
      create: {
        studentId: student.id,
        department: dto.department || student.branch,
        batch: dto.batch || `${student.batchStart}-${student.batchEnd}`,
        finalCgpa: dto.finalCgpa,
        totalCreditsEarned: dto.totalCreditsEarned,
        graduationClassification: dto.graduationClassification,
        graduationStatus: dto.graduationStatus || 'IN_PROGRESS',
        semesterWiseData: dto.semesterWiseData as any,
      },
      update: {
        ...(dto.department && { department: dto.department }),
        ...(dto.batch && { batch: dto.batch }),
        ...(dto.finalCgpa !== undefined && { finalCgpa: dto.finalCgpa }),
        ...(dto.totalCreditsEarned !== undefined && {
          totalCreditsEarned: dto.totalCreditsEarned,
        }),
        ...(dto.graduationClassification && {
          graduationClassification: dto.graduationClassification,
        }),
        ...(dto.graduationStatus && { graduationStatus: dto.graduationStatus }),
        ...(dto.semesterWiseData && {
          semesterWiseData: dto.semesterWiseData as any,
        }),
      },
    });

    return {
      message: `Consolidated 8-semester summary successfully updated for ${student.name} by ${editor.name} (${editor.role})`,
      studentId: student.id,
      summary: updated,
    };
  }

  // 3. Add Mini-Project / Outside Presentation / Recognition
  async addMiniProject(studentId: string, dto: AddMiniProjectDto, submitter: any) {
    const student = await this.findStudent(studentId);

    let summary = await this.prisma.endProgramSummary.findUnique({
      where: { studentId: student.id },
    });

    if (!summary) {
      summary = await this.prisma.endProgramSummary.create({
        data: {
          studentId: student.id,
          department: student.branch,
          batch: `${student.batchStart}-${student.batchEnd}`,
          miniProjects: [],
          placements: [],
        },
      });
    }

    const currentProjects = Array.isArray(summary.miniProjects)
      ? (summary.miniProjects as any[])
      : [];

    const newProject = {
      id: randomUUID(),
      year: dto.year,
      semester: dto.semester,
      title: dto.title,
      guideName: dto.guideName,
      guideId: dto.guideId || null,
      presentationOutside: dto.presentationOutside || null,
      recognitionReceived: dto.recognitionReceived || null,
      institutionalSupport: dto.institutionalSupport || null,
      submittedBy: submitter.name,
      createdAt: new Date().toISOString(),
    };

    const updated = await this.prisma.endProgramSummary.update({
      where: { studentId: student.id },
      data: {
        miniProjects: [...currentProjects, newProject],
      },
    });

    return {
      message: `Mini project "${dto.title}" recorded for ${student.name} by ${submitter.name} (${submitter.role})`,
      studentId: student.id,
      project: newProject,
      totalProjects: (updated.miniProjects as any[]).length,
    };
  }

  // 4. Record Campus Placement / Career Milestone
  async addPlacement(studentId: string, dto: AddPlacementDto, submitter: any) {
    const student = await this.findStudent(studentId);

    let summary = await this.prisma.endProgramSummary.findUnique({
      where: { studentId: student.id },
    });

    if (!summary) {
      summary = await this.prisma.endProgramSummary.create({
        data: {
          studentId: student.id,
          department: student.branch,
          batch: `${student.batchStart}-${student.batchEnd}`,
          miniProjects: [],
          placements: [],
        },
      });
    }

    const currentPlacements = Array.isArray(summary.placements)
      ? (summary.placements as any[])
      : [];

    const newPlacement = {
      id: randomUUID(),
      year: dto.year,
      semester: dto.semester,
      date: dto.date,
      venue: dto.venue,
      companyName: dto.companyName,
      role: dto.role,
      packageLpa: dto.packageLpa,
      outcome: dto.outcome,
      recordedBy: submitter.name,
      createdAt: new Date().toISOString(),
    };

    const updated = await this.prisma.endProgramSummary.update({
      where: { studentId: student.id },
      data: {
        placements: [...currentPlacements, newPlacement],
      },
    });

    return {
      message: `Placement record at "${dto.companyName}" recorded for ${student.name} by ${submitter.name} (${submitter.role})`,
      studentId: student.id,
      placement: newPlacement,
      totalPlacements: (updated.placements as any[]).length,
    };
  }

  // 5. Update Permanent Exit Contact & Alumni Details
  async updateExitContact(
    studentId: string,
    dto: UpdateExitContactDto,
    editor: any,
  ) {
    const student = await this.findStudent(studentId);

    const updated = await this.prisma.endProgramSummary.upsert({
      where: { studentId: student.id },
      create: {
        studentId: student.id,
        department: student.branch,
        batch: `${student.batchStart}-${student.batchEnd}`,
        exitAddress: dto.exitAddress,
        exitCity: dto.exitCity,
        exitState: dto.exitState,
        exitPincode: dto.exitPincode,
        exitMobile: dto.exitMobile,
        exitEmail: dto.exitEmail,
        higherStudiesDetails: (dto.higherStudiesDetails || {}) as any,
      },
      update: {
        exitAddress: dto.exitAddress,
        ...(dto.exitCity && { exitCity: dto.exitCity }),
        ...(dto.exitState && { exitState: dto.exitState }),
        ...(dto.exitPincode && { exitPincode: dto.exitPincode }),
        exitMobile: dto.exitMobile,
        exitEmail: dto.exitEmail,
        ...(dto.higherStudiesDetails && {
          higherStudiesDetails: dto.higherStudiesDetails as any,
        }),
      },
    });

    return {
      message: `Exit contact and alumni details updated for ${student.name} by ${editor.name} (${editor.role})`,
      studentId: student.id,
      exitContact: {
        address: updated.exitAddress,
        city: updated.exitCity,
        state: updated.exitState,
        pincode: updated.exitPincode,
        mobile: updated.exitMobile,
        email: updated.exitEmail,
        higherStudiesDetails: updated.higherStudiesDetails,
      },
    };
  }

  // 6. Mentor & HOD Program Exit Sign-off
  async signOff(studentId: string, dto: SignOffDto, signer: any) {
    const student = await this.findStudent(studentId);

    // Verify signer role authority
    if (dto.role === 'MENTOR' && signer.role !== 'MENTOR' && signer.role !== 'ADMIN') {
      throw new ForbiddenException('Only a designated Mentor or Admin can sign off Mentor review');
    }
    if (dto.role === 'HOD' && signer.role !== 'HOD' && signer.role !== 'ADMIN') {
      throw new ForbiddenException('Only the Head of Department (HOD) or Admin can sign off HOD endorsement');
    }

    let summary = await this.prisma.endProgramSummary.findUnique({
      where: { studentId: student.id },
    });

    if (!summary) {
      throw new BadRequestException('End program summary has not been initialized for this student');
    }

    const now = new Date();
    const updateData: any = {};

    if (dto.role === 'MENTOR') {
      updateData.mentorSignedAt = now;
      if (dto.remarks) updateData.mentorRemarks = dto.remarks;
    } else if (dto.role === 'HOD') {
      updateData.hodSignedAt = now;
      if (dto.remarks) updateData.hodRemarks = dto.remarks;
    }

    // If both mentor and HOD have signed off, mark graduation as GRADUATED
    const isMentorDone = dto.role === 'MENTOR' || summary.mentorSignedAt !== null;
    const isHodDone = dto.role === 'HOD' || summary.hodSignedAt !== null;

    if (isMentorDone && isHodDone) {
      updateData.graduationStatus = 'GRADUATED';
    }

    const updated = await this.prisma.endProgramSummary.update({
      where: { studentId: student.id },
      data: updateData,
    });

    return {
      message: `Program completion sign-off recorded for role ${dto.role} by ${signer.name} (${signer.role})`,
      studentId: student.id,
      signOffRole: dto.role,
      signedAt: now,
      graduationStatus: updated.graduationStatus,
      signatures: {
        mentorSignedAt: updated.mentorSignedAt,
        mentorRemarks: updated.mentorRemarks,
        hodSignedAt: updated.hodSignedAt,
        hodRemarks: updated.hodRemarks,
      },
    };
  }
}
