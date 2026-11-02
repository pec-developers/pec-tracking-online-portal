-- ==============================================================================
-- PECTOP Supabase Initial Seed Data
-- ==============================================================================

-- 1. Insert Default Portal Users (All 8 Roles)
-- Password for all accounts is: password123
INSERT INTO "users" ("id", "username", "name", "passwordHash", "role", "department", "createdAt", "updatedAt")
VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin', 'System Administrator', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'ADMIN', NULL, NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'principal', 'Dr. V. Narayanan (Principal)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'PRINCIPAL', NULL, NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', 'hod_cse', 'Dr. Priya Shankar (HOD)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'HOD', 'CSE', NOW(), NOW()),
    ('44444444-4444-4444-4444-444444444444', 'coordinator1', 'Prof. Anitha R. (Class Coordinator)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'CLASS_COORDINATOR', 'CSE', NOW(), NOW()),
    ('55555555-5555-5555-5555-555555555555', 'mentor1', 'Dr. Ramesh Kumar (Mentor)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'MENTOR', 'CSE', NOW(), NOW()),
    ('66666666-6666-6666-6666-666666666666', 'faculty1', 'Prof. Suresh Balan (Faculty)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'FACULTY', 'CSE', NOW(), NOW()),
    ('77777777-7777-7777-7777-777777777777', '111422104001', 'Aravind Swaminathan (Student)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'STUDENT', 'CSE', NOW(), NOW()),
    ('88888888-8888-8888-8888-888888888888', 'parent1', 'Mr. Swaminathan (Parent)', '$2b$10$8Qtw1ptYKP0C6v/Ww0YYquKb3FQWUcQOl3JavqJtEW/cxKc1S8Ene', 'PARENT', 'CSE', NOW(), NOW())
ON CONFLICT ("username") DO NOTHING;

-- 2. Insert Demo Class
INSERT INTO "classes" ("id", "department", "year", "semester", "section", "academicYear", "coordinatorId", "createdAt", "updatedAt")
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'CSE', 2, 4, 'A', '2024-2025', '44444444-4444-4444-4444-444444444444', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- 3. Insert Demo Subjects
INSERT INTO "subjects" ("id", "code", "name", "department", "credits", "type", "createdAt", "updatedAt")
VALUES
    ('s1111111-1111-1111-1111-111111111111', 'CS8401', 'Operating Systems', 'CSE', 3, 'THEORY', NOW(), NOW()),
    ('s2222222-2222-2222-2222-222222222222', 'CS8402', 'Database Management Systems', 'CSE', 4, 'THEORY', NOW(), NOW()),
    ('s3333333-3333-3333-3333-333333333333', 'CS8403', 'Software Engineering', 'CSE', 3, 'THEORY', NOW(), NOW())
ON CONFLICT ("code") DO NOTHING;

-- 4. Map Subjects to Class & Assign Faculty
INSERT INTO "subject_class_mappings" ("id", "classId", "subjectId", "facultyId", "createdAt", "updatedAt")
VALUES
    ('m1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 's1111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', NOW(), NOW()),
    ('m2222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 's2222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666', NOW(), NOW())
ON CONFLICT ("classId", "subjectId") DO NOTHING;

-- 5. Insert Demo Student
INSERT INTO "students" (
    "id", "registerNumber", "admissionNumber", "name", "branch", "batchStart", "batchEnd", "section", "admissionType", "lateralEntry",
    "studentPhotoUrl", "fatherPhotoUrl", "motherPhotoUrl", "passoutPhotoUrl", "createdAt", "updatedAt"
)
VALUES (
    '77777777-7777-7777-7777-777777777777', '111422104001', 'PEC/2022/CSE/001', 'Aravind Swaminathan', 'CSE', 2022, 2026, 'A', 'COUNSELING', false,
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    NULL, NOW(), NOW()
)
ON CONFLICT ("registerNumber") DO NOTHING;

-- 6. Insert Student Personal Details
INSERT INTO "student_personal_details" (
    "id", "studentId", "dob", "age", "sex", "state", "nationality", "religion", "community", "caste", "contactLandline", "contactMobile", "email", "bloodGroup", "foodHabit", "motherTongue", "otherLanguages", "chronicIllness", "visionProblem", "siblings", "createdAt", "updatedAt"
)
VALUES (
    'pd111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', '2004-05-14T00:00:00.000Z', 20, 'Male', 'Tamil Nadu', 'Indian', 'Hindu', 'BC', 'Brahmin', '044-24567890', '9876543210', 'aravind.s@example.com', 'O+', 'Vegetarian', 'Tamil', '["English", "Hindi"]'::jsonb, NULL, false, '[]'::jsonb, NOW(), NOW()
)
ON CONFLICT ("studentId") DO NOTHING;

-- 7. Insert Student Family Details
INSERT INTO "student_family_details" (
    "id", "studentId", "fatherName", "fatherEducation", "fatherOccupation", "fatherMobile", "fatherAnnualIncome", "motherName", "motherEducation", "motherOccupation", "motherMobile", "motherAnnualIncome", "otherIncomeSource", "parentCommunicationAddress", "studentPermanentAddress", "presentAddresses", "localGuardian", "undertakePartTimeJob", "scholarshipDetails", "otherFinancialAssistance", "createdAt", "updatedAt"
)
VALUES (
    'fd111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'R. Swaminathan', 'B.Sc, CA', 'Chartered Accountant', '9876500001', 650000, 'S. Vijayalakshmi', 'M.Com', 'Teacher', '9876500002', 350000, NULL, '42, Temple View Apartments, Anna Nagar, Chennai - 600040', '42, Temple View Apartments, Anna Nagar, Chennai - 600040', '{"type": "DAY_SCHOLAR", "address": "Anna Nagar, Chennai"}'::jsonb, '{}'::jsonb, 'None', 'First Graduate Scholarship', NULL, NOW(), NOW()
)
ON CONFLICT ("studentId") DO NOTHING;

-- 8. Insert Student Academic History (10th/12th/Diploma)
INSERT INTO "student_academic_history" (
    "id", "studentId", "sslcSchoolName", "sslcBoard", "sslcMedium", "sslcMarks", "sslcPercentage", "sslcYearOfPassing", "hscSchoolName", "hscBoard", "hscMathsMark", "hscPhysicsMark", "hscChemistryMark", "hscBiologyOrCsMark", "hscCutoff", "hscPercentage", "hscClass", "diplomaInstitution", "diplomaBranch", "diplomaPercentage", "createdAt", "updatedAt"
)
VALUES (
    'ah111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'DAV Boys Senior Secondary School', 'CBSE', 'English', 478, 95.6, 2020, 'DAV Boys Senior Secondary School', 'CBSE', 98, 96, 95, 97, 192.5, 96.5, 'First Class with Distinction', NULL, NULL, NULL, NOW(), NOW()
)
ON CONFLICT ("studentId") DO NOTHING;

-- 9. Insert Student Ambition & Profile
INSERT INTO "student_ambition_and_profile" (
    "id", "studentId", "personalAimOrGoal", "objectives", "plansToAchieveAim", "careerOption", "preparationDetails", "extraCoaching", "collegeHelpRequired", "prizesAndAwards", "stayType", "hostellerDetails", "dayscholarStayWith", "parentCommFrequencyStudent", "parentCommFrequencyParent", "holidayAndWeekendRoutine", "outsideStayFellowMates", "strengthsAcademic", "strengthsGeneral", "weaknesses", "likesBranch", "branchDislikeReason", "mathFundamentalsRating", "coreEngineeringRating", "capableRaisingQuestions", "sportsAndGames", "createdAt", "updatedAt"
)
VALUES (
    'ap111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'Become an AI / Machine Learning Architect at a premier tech firm', 'Master core CS principles, contribute to open-source, publish high-impact research', 'Maintain CGPA > 8.5, solve 500+ LeetCode problems, build fullstack systems', 'Software Engineering / AI Systems', 'Self-study on competitive coding platforms, AWS certifications', 'None', 'Guidance in hackathons, advanced ML lab infrastructure access', '1st prize in Inter-school CodeQuest 2021', 'DAYSCHOLAR', '{}'::jsonb, 'Parents', 'Daily in person', 'Daily in person', 'Review weekly lecture notes, practice DSA algorithms, play badminton', 'None', 'Algorithms, Database Systems, Discrete Mathematics', 'Quick learner, focused, leadership and teamwork', 'Occasional public speaking hesitation', true, NULL, 'Excellent', 'Excellent', true, '{"indoor": ["Chess", "Table Tennis"], "outdoor": ["Badminton", "Cricket"]}'::jsonb, NOW(), NOW()
)
ON CONFLICT ("studentId") DO NOTHING;

-- 10. Assign Student to Mentor
INSERT INTO "mentor_mentee_mappings" ("id", "mentorId", "studentId", "semester", "academicYear", "active", "createdAt", "updatedAt")
VALUES
    ('mm111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777', 4, '2024-2025', true, NOW(), NOW())
ON CONFLICT ("studentId", "semester", "academicYear") DO NOTHING;

-- 11. Initial Scorecard (Semester 4)
INSERT INTO "semester_academic_performance" (
    "id", "studentId", "semester", "year", "academicYear", "classId", "attendancePercentage", "overallGpa", "arrearsCount", "mentorSigned", "studentSigned", "createdAt", "updatedAt"
)
VALUES (
    'sap11111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 4, 2, '2024-2025', 'c1111111-1111-1111-1111-111111111111', 94.5, 8.85, 0, true, true, NOW(), NOW()
)
ON CONFLICT ("studentId", "semester") DO NOTHING;

