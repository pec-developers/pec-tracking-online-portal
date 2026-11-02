import { IsObject, IsOptional } from 'class-validator';

export class UpdateChartDto {
  // Weekly hours: Academic, Training, Knowledge updating, Recreation, Personal
  // Daily hours: Subject reading, Light reading, Other prep, Browsing, Social, Sports
  @IsObject()
  @IsOptional()
  timeManagement?: {
    weekly?: {
      academicHours?: number;
      trainingHours?: number;
      knowledgeUpdatingHours?: number;
      recreationHours?: number;
      personalAttentionHours?: number;
    };
    daily?: {
      subjectReadingHours?: number;
      lightReadingHours?: number;
      otherPreparationHours?: number;
      browsingHours?: number;
      socialNetworksHours?: number;
      physicalSportsHours?: number;
    };
  };

  // Classroom routine: 1 to 5 ratings from subject faculty S1-S6
  @IsObject()
  @IsOptional()
  classroomRoutine?: {
    [subjectCode: string]: {
      attendance?: number;
      attentiveness?: number;
      takingNotes?: number;
      interaction?: number;
      taskCompletion?: number;
    };
  };

  // Lab routine: 1 to 5 ratings
  @IsObject()
  @IsOptional()
  laboratoryRoutine?: {
    [labCode: string]: {
      performingExperiments?: number;
      observation?: number;
      recordCompletion?: number;
    };
  };

  // Exam preparations
  @IsObject()
  @IsOptional()
  examinationPrep?: {
    monthlyTests?: {
      attendance?: string;
      seriousness?: string;
      preparations?: string;
      recordKeeping?: string;
    };
    universityExams?: {
      previousYearQuestions?: boolean;
      questionBank?: boolean;
      notesCollection?: boolean;
      groupStudy?: boolean;
      extraCoaching?: boolean;
    };
  };

  // Other activities: Mini-projects, presentations, sports
  @IsObject()
  @IsOptional()
  otherActivities?: {
    miniProjects?: string;
    presentationsConferenceSeminar?: string;
    culturalSports?: string;
    trainingProgramsAttended?: string;
    otherInterests?: string;
  };

  @IsObject()
  @IsOptional()
  mentorSuggestions?: {
    timeManagementSuggestion?: string;
    classroomRoutineSuggestion?: string;
    examPrepSuggestion?: string;
    generalSuggestions?: string;
  };
}

