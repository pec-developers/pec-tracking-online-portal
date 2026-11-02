-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'FACULTY', 'MENTOR', 'CLASS_COORDINATOR', 'HOD', 'PRINCIPAL', 'ADMIN', 'PARENT');

-- CreateEnum
CREATE TYPE "AdmissionType" AS ENUM ('COUNSELING', 'MANAGEMENT');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('THEORY', 'PRACTICAL', 'INTEGRATED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "admissionNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "batchStart" INTEGER NOT NULL,
    "batchEnd" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "admissionType" "AdmissionType" NOT NULL DEFAULT 'COUNSELING',
    "lateralEntry" BOOLEAN NOT NULL DEFAULT false,
    "studentPhotoUrl" TEXT,
    "fatherPhotoUrl" TEXT,
    "motherPhotoUrl" TEXT,
    "passoutPhotoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_personal_details" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "age" INTEGER,
    "sex" TEXT,
    "state" TEXT,
    "nationality" TEXT DEFAULT 'Indian',
    "religion" TEXT,
    "community" TEXT,
    "caste" TEXT,
    "contactLandline" TEXT,
    "contactMobile" TEXT,
    "email" TEXT,
    "bloodGroup" TEXT,
    "foodHabit" TEXT,
    "motherTongue" TEXT,
    "otherLanguages" JSONB DEFAULT '[]',
    "chronicIllness" TEXT,
    "visionProblem" BOOLEAN NOT NULL DEFAULT false,
    "siblings" JSONB DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_personal_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_family_details" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "fatherName" TEXT,
    "fatherEducation" TEXT,
    "fatherOccupation" TEXT,
    "fatherMobile" TEXT,
    "fatherAnnualIncome" DOUBLE PRECISION,
    "motherName" TEXT,
    "motherEducation" TEXT,
    "motherOccupation" TEXT,
    "motherMobile" TEXT,
    "motherAnnualIncome" DOUBLE PRECISION,
    "otherIncomeSource" TEXT,
    "parentCommunicationAddress" TEXT,
    "studentPermanentAddress" TEXT,
    "presentAddresses" JSONB DEFAULT '{}',
    "localGuardian" JSONB DEFAULT '{}',
    "undertakePartTimeJob" TEXT,
    "scholarshipDetails" TEXT,
    "otherFinancialAssistance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_family_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_academic_history" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "sslcSchoolName" TEXT,
    "sslcBoard" TEXT,
    "sslcMedium" TEXT,
    "sslcMarks" DOUBLE PRECISION,
    "sslcPercentage" DOUBLE PRECISION,
    "sslcYearOfPassing" INTEGER,
    "hscSchoolName" TEXT,
    "hscBoard" TEXT,
    "hscMathsMark" DOUBLE PRECISION,
    "hscPhysicsMark" DOUBLE PRECISION,
    "hscChemistryMark" DOUBLE PRECISION,
    "hscBiologyOrCsMark" DOUBLE PRECISION,
    "hscCutoff" DOUBLE PRECISION,
    "hscPercentage" DOUBLE PRECISION,
    "hscClass" TEXT,
    "diplomaInstitution" TEXT,
    "diplomaBranch" TEXT,
    "diplomaPercentage" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_academic_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_ambition_and_profile" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "personalAimOrGoal" TEXT,
    "objectives" TEXT,
    "plansToAchieveAim" TEXT,
    "careerOption" TEXT,
    "preparationDetails" TEXT,
    "extraCoaching" TEXT,
    "collegeHelpRequired" TEXT,
    "prizesAndAwards" TEXT,
    "stayType" TEXT,
    "hostellerDetails" JSONB DEFAULT '{}',
    "dayscholarStayWith" TEXT,
    "parentCommFrequencyStudent" TEXT,
    "parentCommFrequencyParent" TEXT,
    "holidayAndWeekendRoutine" TEXT,
    "outsideStayFellowMates" TEXT,
    "strengthsAcademic" TEXT,
    "strengthsGeneral" TEXT,
    "weaknesses" TEXT,
    "likesBranch" BOOLEAN DEFAULT true,
    "branchDislikeReason" TEXT,
    "mathFundamentalsRating" TEXT,
    "coreEngineeringRating" TEXT,
    "capableRaisingQuestions" BOOLEAN DEFAULT true,
    "sportsAndGames" JSONB DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_ambition_and_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "coordinatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "type" "SubjectType" NOT NULL DEFAULT 'THEORY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_class_mappings" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "facultyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_class_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_academic_performance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "classId" TEXT,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "workingDays" INTEGER,
    "daysPresent" INTEGER,
    "daysAbsent" INTEGER,
    "leaveDays" INTEGER,
    "medicalLeave" INTEGER,
    "attendancePercentage" DOUBLE PRECISION,
    "gpa" DOUBLE PRECISION,
    "cgpa" DOUBLE PRECISION,
    "subjectMarks" JSONB DEFAULT '[]',
    "arrearsTracking" JSONB DEFAULT '[]',
    "mentorRemarks" TEXT,
    "studentSignedAt" TIMESTAMP(3),
    "parentSignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semester_academic_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_mentee_mappings" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_mentee_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_mentoring_activities" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "fieldOfInterest" TEXT,
    "favoriteSubject" TEXT,
    "favoriteSubjectReason" TEXT,
    "favoriteTeacher" TEXT,
    "favoriteTeacherReason" TEXT,
    "easiestSubject" TEXT,
    "easiestSubjectReason" TEXT,
    "hardestSubject" TEXT,
    "hardestSubjectReason" TEXT,
    "subjectProblems" JSONB DEFAULT '[]',
    "specialCoachingRequired" TEXT,
    "specialAttentionRequired" TEXT,
    "distractions" TEXT,
    "laboratoryUnderstanding" JSONB DEFAULT '{}',
    "arrearsExplanation" TEXT,
    "libraryDetails" JSONB DEFAULT '{}',
    "communicationEfforts" TEXT,
    "improvedOverTime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semester_mentoring_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_mentoring_charts" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "timeManagement" JSONB DEFAULT '{}',
    "classroomRoutine" JSONB DEFAULT '{}',
    "laboratoryRoutine" JSONB DEFAULT '{}',
    "examinationPrep" JSONB DEFAULT '{}',
    "otherActivities" JSONB DEFAULT '{}',
    "mentorSuggestions" JSONB DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semester_mentoring_charts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentoring_sessions" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "asPerson" INTEGER NOT NULL,
    "studies" INTEGER NOT NULL,
    "behaviour" INTEGER NOT NULL,
    "characterAndContact" INTEGER NOT NULL,
    "knowledge" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "remarks" TEXT,
    "studentSignature" BOOLEAN NOT NULL DEFAULT false,
    "studentSignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentoring_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester_mentor_reviews" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "overallRemarks" TEXT,
    "disciplinaryIssues" TEXT,
    "requiresLeadershipFollowup" BOOLEAN NOT NULL DEFAULT false,
    "leadershipFollowupTarget" TEXT,
    "leadershipFollowupDetails" TEXT,
    "strengths" JSONB DEFAULT '{}',
    "weaknesses" JSONB DEFAULT '{}',
    "improvementsObserved" JSONB DEFAULT '{}',
    "mentorSignedAt" TIMESTAMP(3),
    "coordinatorSignedAt" TIMESTAMP(3),
    "hodSignedAt" TIMESTAMP(3),
    "principalSignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semester_mentor_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "end_program_summaries" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "finalCgpa" DOUBLE PRECISION,
    "totalCreditsEarned" INTEGER,
    "graduationClassification" TEXT,
    "graduationStatus" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "semesterWiseData" JSONB DEFAULT '[]',
    "miniProjects" JSONB DEFAULT '[]',
    "placements" JSONB DEFAULT '[]',
    "exitAddress" TEXT,
    "exitCity" TEXT,
    "exitState" TEXT,
    "exitPincode" TEXT,
    "exitMobile" TEXT,
    "exitEmail" TEXT,
    "higherStudiesDetails" JSONB DEFAULT '{}',
    "mentorRemarks" TEXT,
    "mentorSignedAt" TIMESTAMP(3),
    "hodRemarks" TEXT,
    "hodSignedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "end_program_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "students_registerNumber_key" ON "students"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "students_admissionNumber_key" ON "students"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "student_personal_details_studentId_key" ON "student_personal_details"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_family_details_studentId_key" ON "student_family_details"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_academic_history_studentId_key" ON "student_academic_history"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_ambition_and_profile_studentId_key" ON "student_ambition_and_profile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "classes_department_academicYear_semester_section_key" ON "classes"("department", "academicYear", "semester", "section");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "subject_class_mappings_classId_subjectId_key" ON "subject_class_mappings"("classId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "semester_academic_performance_studentId_semester_key" ON "semester_academic_performance"("studentId", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "mentor_mentee_mappings_studentId_semester_academicYear_key" ON "mentor_mentee_mappings"("studentId", "semester", "academicYear");

-- CreateIndex
CREATE UNIQUE INDEX "semester_mentoring_activities_studentId_semester_key" ON "semester_mentoring_activities"("studentId", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "semester_mentoring_charts_studentId_semester_key" ON "semester_mentoring_charts"("studentId", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "mentoring_sessions_studentId_semester_sessionNumber_key" ON "mentoring_sessions"("studentId", "semester", "sessionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "semester_mentor_reviews_studentId_semester_key" ON "semester_mentor_reviews"("studentId", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "end_program_summaries_studentId_key" ON "end_program_summaries"("studentId");

-- AddForeignKey
ALTER TABLE "student_personal_details" ADD CONSTRAINT "student_personal_details_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_family_details" ADD CONSTRAINT "student_family_details_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_academic_history" ADD CONSTRAINT "student_academic_history_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_ambition_and_profile" ADD CONSTRAINT "student_ambition_and_profile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_class_mappings" ADD CONSTRAINT "subject_class_mappings_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_class_mappings" ADD CONSTRAINT "subject_class_mappings_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_class_mappings" ADD CONSTRAINT "subject_class_mappings_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_academic_performance" ADD CONSTRAINT "semester_academic_performance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_academic_performance" ADD CONSTRAINT "semester_academic_performance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_mentee_mappings" ADD CONSTRAINT "mentor_mentee_mappings_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_mentee_mappings" ADD CONSTRAINT "mentor_mentee_mappings_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_mentoring_activities" ADD CONSTRAINT "semester_mentoring_activities_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_mentoring_charts" ADD CONSTRAINT "semester_mentoring_charts_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring_sessions" ADD CONSTRAINT "mentoring_sessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring_sessions" ADD CONSTRAINT "mentoring_sessions_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semester_mentor_reviews" ADD CONSTRAINT "semester_mentor_reviews_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "end_program_summaries" ADD CONSTRAINT "end_program_summaries_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

