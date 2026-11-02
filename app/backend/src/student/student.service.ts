import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdatePersonalDetailsDto } from './dto/update-personal-details.dto.js';
import { UpdateFamilyDetailsDto } from './dto/update-family-details.dto.js';
import { UpdateAcademicHistoryDto } from './dto/update-academic-history.dto.js';
import { UpdateAmbitionAndProfileDto } from './dto/update-ambition-profile.dto.js';
import { Role } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async onboardStudent(dto: CreateStudentDto, creator: any) {
    const existing = await this.prisma.student.findFirst({
      where: {
        OR: [
          { registerNumber: dto.registerNumber },
          { admissionNumber: dto.admissionNumber },
        ],
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Student with register number '${dto.registerNumber}' or admission number '${dto.admissionNumber}' already exists`,
      );
    }

    // Atomic transaction: create student, child profile tables, and user login account
    return this.prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          registerNumber: dto.registerNumber,
          admissionNumber: dto.admissionNumber,
          name: dto.name,
          branch: dto.branch,
          batchStart: dto.batchStart,
          batchEnd: dto.batchEnd,
          section: dto.section,
          admissionType: dto.admissionType,
          lateralEntry: dto.lateralEntry ?? false,
          studentPhotoUrl: dto.studentPhotoUrl,
          fatherPhotoUrl: dto.fatherPhotoUrl,
          motherPhotoUrl: dto.motherPhotoUrl,
          passoutPhotoUrl: dto.passoutPhotoUrl,
          personalDetails: { create: {} },
          familyDetails: { create: {} },
          academicHistory: { create: {} },
          ambitionAndProfile: { create: {} },
        },
        include: {
          personalDetails: true,
          familyDetails: true,
          academicHistory: true,
          ambitionAndProfile: true,
        },
      });

      // Automatically create corresponding student user account if it doesn't already exist
      const existingUser = await tx.user.findUnique({
        where: { username: dto.registerNumber },
      });

      if (!existingUser) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync('password123', salt);
        await tx.user.create({
          data: {
            username: dto.registerNumber,
            name: dto.name,
            passwordHash: hash,
            role: Role.STUDENT,
            department: dto.branch,
          },
        });
      }

      return {
        message: `Student '${student.name}' onboarded successfully by ${creator.name} (${creator.role})`,
        student,
      };
    });
  }

  async findStudent(idOrRegNo: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        OR: [{ id: idOrRegNo }, { registerNumber: idOrRegNo }],
      },
      include: {
        personalDetails: true,
        familyDetails: true,
        academicHistory: true,
        ambitionAndProfile: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student '${idOrRegNo}' not found`);
    }

    return student;
  }

  async getStudentMe(user: any) {
    const student = await this.findStudent(user.username);
    return {
      message: 'Student personal dossier retrieved',
      student,
    };
  }

  async getStudentProfile(idOrRegNo: string, requester: any) {
    const student = await this.findStudent(idOrRegNo);
    return {
      message: `Student dossier accessed by ${requester.name} (${requester.role})`,
      student,
    };
  }

  async updatePersonalDetails(
    idOrRegNo: string,
    dto: UpdatePersonalDetailsDto,
    editor: any,
  ) {
    const student = await this.findStudent(idOrRegNo);

    const updated = await this.prisma.studentPersonalDetails.upsert({
      where: { studentId: student.id },
      update: {
        dob: dto.dob ? new Date(dto.dob) : undefined,
        age: dto.age,
        sex: dto.sex,
        state: dto.state,
        nationality: dto.nationality,
        religion: dto.religion,
        community: dto.community,
        caste: dto.caste,
        contactLandline: dto.contactLandline,
        contactMobile: dto.contactMobile,
        email: dto.email,
        bloodGroup: dto.bloodGroup,
        foodHabit: dto.foodHabit,
        motherTongue: dto.motherTongue,
        otherLanguages: dto.otherLanguages as any,
        chronicIllness: dto.chronicIllness,
        visionProblem: dto.visionProblem,
        siblings: dto.siblings as any,
      },
      create: {
        studentId: student.id,
        dob: dto.dob ? new Date(dto.dob) : undefined,
        age: dto.age,
        sex: dto.sex,
        state: dto.state,
        nationality: dto.nationality,
        religion: dto.religion,
        community: dto.community,
        caste: dto.caste,
        contactLandline: dto.contactLandline,
        contactMobile: dto.contactMobile,
        email: dto.email,
        bloodGroup: dto.bloodGroup,
        foodHabit: dto.foodHabit,
        motherTongue: dto.motherTongue,
        otherLanguages: dto.otherLanguages as any,
        chronicIllness: dto.chronicIllness,
        visionProblem: dto.visionProblem ?? false,
        siblings: dto.siblings as any,
      },
    });

    return {
      message: `Personal details updated by ${editor.name} (${editor.role})`,
      personalDetails: updated,
    };
  }

  async updateFamilyDetails(
    idOrRegNo: string,
    dto: UpdateFamilyDetailsDto,
    editor: any,
  ) {
    const student = await this.findStudent(idOrRegNo);

    const updated = await this.prisma.studentFamilyDetails.upsert({
      where: { studentId: student.id },
      update: {
        fatherName: dto.fatherName,
        fatherEducation: dto.fatherEducation,
        fatherOccupation: dto.fatherOccupation,
        fatherMobile: dto.fatherMobile,
        fatherAnnualIncome: dto.fatherAnnualIncome,
        motherName: dto.motherName,
        motherEducation: dto.motherEducation,
        motherOccupation: dto.motherOccupation,
        motherMobile: dto.motherMobile,
        motherAnnualIncome: dto.motherAnnualIncome,
        otherIncomeSource: dto.otherIncomeSource,
        parentCommunicationAddress: dto.parentCommunicationAddress,
        studentPermanentAddress: dto.studentPermanentAddress,
        presentAddresses: dto.presentAddresses as any,
        localGuardian: dto.localGuardian as any,
        undertakePartTimeJob: dto.undertakePartTimeJob,
        scholarshipDetails: dto.scholarshipDetails,
        otherFinancialAssistance: dto.otherFinancialAssistance,
      },
      create: {
        studentId: student.id,
        fatherName: dto.fatherName,
        fatherEducation: dto.fatherEducation,
        fatherOccupation: dto.fatherOccupation,
        fatherMobile: dto.fatherMobile,
        fatherAnnualIncome: dto.fatherAnnualIncome,
        motherName: dto.motherName,
        motherEducation: dto.motherEducation,
        motherOccupation: dto.motherOccupation,
        motherMobile: dto.motherMobile,
        motherAnnualIncome: dto.motherAnnualIncome,
        otherIncomeSource: dto.otherIncomeSource,
        parentCommunicationAddress: dto.parentCommunicationAddress,
        studentPermanentAddress: dto.studentPermanentAddress,
        presentAddresses: dto.presentAddresses as any,
        localGuardian: dto.localGuardian as any,
        undertakePartTimeJob: dto.undertakePartTimeJob,
        scholarshipDetails: dto.scholarshipDetails,
        otherFinancialAssistance: dto.otherFinancialAssistance,
      },
    });

    return {
      message: `Family & stay details updated by ${editor.name} (${editor.role})`,
      familyDetails: updated,
    };
  }

  async updateAcademicHistory(
    idOrRegNo: string,
    dto: UpdateAcademicHistoryDto,
    editor: any,
  ) {
    const student = await this.findStudent(idOrRegNo);

    const updated = await this.prisma.studentAcademicHistory.upsert({
      where: { studentId: student.id },
      update: {
        sslcSchoolName: dto.sslcSchoolName,
        sslcBoard: dto.sslcBoard,
        sslcMedium: dto.sslcMedium,
        sslcMarks: dto.sslcMarks,
        sslcPercentage: dto.sslcPercentage,
        sslcYearOfPassing: dto.sslcYearOfPassing,
        hscSchoolName: dto.hscSchoolName,
        hscBoard: dto.hscBoard,
        hscMathsMark: dto.hscMathsMark,
        hscPhysicsMark: dto.hscPhysicsMark,
        hscChemistryMark: dto.hscChemistryMark,
        hscBiologyOrCsMark: dto.hscBiologyOrCsMark,
        hscCutoff: dto.hscCutoff,
        hscPercentage: dto.hscPercentage,
        hscClass: dto.hscClass,
        diplomaInstitution: dto.diplomaInstitution,
        diplomaBranch: dto.diplomaBranch,
        diplomaPercentage: dto.diplomaPercentage,
      },
      create: {
        studentId: student.id,
        sslcSchoolName: dto.sslcSchoolName,
        sslcBoard: dto.sslcBoard,
        sslcMedium: dto.sslcMedium,
        sslcMarks: dto.sslcMarks,
        sslcPercentage: dto.sslcPercentage,
        sslcYearOfPassing: dto.sslcYearOfPassing,
        hscSchoolName: dto.hscSchoolName,
        hscBoard: dto.hscBoard,
        hscMathsMark: dto.hscMathsMark,
        hscPhysicsMark: dto.hscPhysicsMark,
        hscChemistryMark: dto.hscChemistryMark,
        hscBiologyOrCsMark: dto.hscBiologyOrCsMark,
        hscCutoff: dto.hscCutoff,
        hscPercentage: dto.hscPercentage,
        hscClass: dto.hscClass,
        diplomaInstitution: dto.diplomaInstitution,
        diplomaBranch: dto.diplomaBranch,
        diplomaPercentage: dto.diplomaPercentage,
      },
    });

    return {
      message: `Academic history (10th/12th/Diploma) updated by ${editor.name} (${editor.role})`,
      academicHistory: updated,
    };
  }

  async updateAmbitionAndProfile(
    idOrRegNo: string,
    dto: UpdateAmbitionAndProfileDto,
    editor: any,
  ) {
    const student = await this.findStudent(idOrRegNo);

    const updated = await this.prisma.studentAmbitionAndProfile.upsert({
      where: { studentId: student.id },
      update: {
        personalAimOrGoal: dto.personalAimOrGoal,
        objectives: dto.objectives,
        plansToAchieveAim: dto.plansToAchieveAim,
        careerOption: dto.careerOption,
        preparationDetails: dto.preparationDetails,
        extraCoaching: dto.extraCoaching,
        collegeHelpRequired: dto.collegeHelpRequired,
        prizesAndAwards: dto.prizesAndAwards,
        stayType: dto.stayType,
        hostellerDetails: dto.hostellerDetails as any,
        dayscholarStayWith: dto.dayscholarStayWith,
        parentCommFrequencyStudent: dto.parentCommFrequencyStudent,
        parentCommFrequencyParent: dto.parentCommFrequencyParent,
        holidayAndWeekendRoutine: dto.holidayAndWeekendRoutine,
        outsideStayFellowMates: dto.outsideStayFellowMates,
        strengthsAcademic: dto.strengthsAcademic,
        strengthsGeneral: dto.strengthsGeneral,
        weaknesses: dto.weaknesses,
        likesBranch: dto.likesBranch,
        branchDislikeReason: dto.branchDislikeReason,
        mathFundamentalsRating: dto.mathFundamentalsRating,
        coreEngineeringRating: dto.coreEngineeringRating,
        capableRaisingQuestions: dto.capableRaisingQuestions,
        sportsAndGames: dto.sportsAndGames as any,
      },
      create: {
        studentId: student.id,
        personalAimOrGoal: dto.personalAimOrGoal,
        objectives: dto.objectives,
        plansToAchieveAim: dto.plansToAchieveAim,
        careerOption: dto.careerOption,
        preparationDetails: dto.preparationDetails,
        extraCoaching: dto.extraCoaching,
        collegeHelpRequired: dto.collegeHelpRequired,
        prizesAndAwards: dto.prizesAndAwards,
        stayType: dto.stayType,
        hostellerDetails: dto.hostellerDetails as any,
        dayscholarStayWith: dto.dayscholarStayWith,
        parentCommFrequencyStudent: dto.parentCommFrequencyStudent,
        parentCommFrequencyParent: dto.parentCommFrequencyParent,
        holidayAndWeekendRoutine: dto.holidayAndWeekendRoutine,
        outsideStayFellowMates: dto.outsideStayFellowMates,
        strengthsAcademic: dto.strengthsAcademic,
        strengthsGeneral: dto.strengthsGeneral,
        weaknesses: dto.weaknesses,
        likesBranch: dto.likesBranch ?? true,
        branchDislikeReason: dto.branchDislikeReason,
        mathFundamentalsRating: dto.mathFundamentalsRating,
        coreEngineeringRating: dto.coreEngineeringRating,
        capableRaisingQuestions: dto.capableRaisingQuestions ?? true,
        sportsAndGames: dto.sportsAndGames as any,
      },
    });

    return {
      message: `Ambition, Living Style & SWOT profile updated by ${editor.name} (${editor.role})`,
      ambitionAndProfile: updated,
    };
  }

  async listStudents(params?: {
    branch?: string;
    section?: string;
    batchStart?: number;
    search?: string;
  }) {
    const where: any = {};
    if (params?.branch) where.branch = params.branch;
    if (params?.section) where.section = params.section;
    if (params?.batchStart) where.batchStart = Number(params.batchStart);
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { registerNumber: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const students = await this.prisma.student.findMany({
      where,
      orderBy: { registerNumber: 'asc' },
    });

    return {
      count: students.length,
      students,
    };
  }
}
