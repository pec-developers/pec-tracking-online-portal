// ──────────────────────────────────────────────
// Student General Profile — TypeScript Interfaces
// Matches: PUT /general-profile/{studentId} response
// ──────────────────────────────────────────────

// ── Academic Details ──────────────────────────
export interface AcademicDetails {
    imageUrl: string | null
    name: string
    registerNumber: string
    admissionNumber: string
    batchStart: number
    batchEnd: number
    branch: string
    section: string
}

// ── Personal Details ─────────────────────────
export interface PersonalDetails {
    gender: string
    dateOfBirth: string
    age: number | null
    nationality: string
    state: string
    religion: string
    caste: string
    community: string
    bloodGroup: string
    phoneNumber: string
    email: string
}

// ── Family Details ───────────────────────────
export interface ParentInfo {
    imageUrl: string | null
    name: string
    education: string
    occupation: string
    contactNumber: string
}

export interface Sibling {
    name: string
    age: number
    sex: string
    eduOrProfession: string
}

export interface LocalGuardian {
    name: string
    contactNumber: string
    address: string
}

export interface FamilyDetails {
    father: ParentInfo
    mother: ParentInfo
    siblings: Sibling[]
    localGuardian: LocalGuardian
}

// ── Address Details ──────────────────────────
export interface FellowMate {
    name: string
    age: number
    gender: string
    contactNumber: string
}

export interface StayDetail {
    academicYear: number
    stayType: string
    address: string
    fellowMates: FellowMate[]
}

export interface AddressDetails {
    parentCommunicationAddress: string
    studentPermanentAddress: string
    stayDetails: StayDetail[]
    studentPresentAddress: string
    studentPresentStayType: string
}

// ── Academic History ─────────────────────────
export interface HscDetails {
    schoolName: string
    board: string
    medium: string
    scoredMark: number
    totalMark: number
}

export interface SslcInterDetails {
    schoolName: string
    board: string
    medium: string
    mathMark: number
    phyMark: number
    chemMark: number
    csBioMark: number
    cutoffMark: number
}

export interface DiplomaDetails {
    collegeName: string
    branch: string
    cgpa: number
}

export interface AcademicHistory {
    isLateralEntry: boolean
    hscDetails: HscDetails | null
    sslcInterDetails: SslcInterDetails | null
    diplomaDetails: DiplomaDetails | null
}

// ── Misc Details ─────────────────────────────
export interface MiscDetails {
    motherTongue: string
    otherKnownLanguages: string[]
    modeOfAdmission: string
    dietaryPreference: string
    visionProblem: boolean
    chronicIllness: string
}

// ── Socio-Economic Details ───────────────────
export interface SocioEconomicDetails {
    fatherAnnualIncome: number
    motherAnnualIncome: number
    otherIncomeSource: string
    partTimeJob: string
    scholarship: string
    otherFinancialAssistance: string
}

// ── Ambition Details ─────────────────────────
export interface PersonalAmbition {
    longTermGoals: string
    longTermGoalPlan: string
}

export interface CareerPlan {
    careerChoices: string[]
    careerPrepPlan: string
    extraCoachingDetails: string
    helpNeeded: string
}

export interface SelfAnalysis {
    academicStrength: string
    generalStrength: string
    academicWeakness: string
    generalWeakness: string
}

export interface LivingStyle {
    yourCommunicationToParent: string
    parentCommunicationToYou: string
    weekendPlans: string
    roommatesDescription: string | null
    hostelEnvironmentDescription: string | null
}

export interface GeneralAcademicDetails {
    branchFeedback: string
    fundamentalMathStrength: string
    fundamentalEnggStrength: string
    questioningCapability: boolean
    sportsInvolvement: string
    awardRecognitions: string
}

export interface AmbitionDetails {
    personalAmbition: PersonalAmbition
    careerPlan: CareerPlan
    selfAnalysis: SelfAnalysis
    livingStyle: LivingStyle
    generalAcademicDetails: GeneralAcademicDetails
}

// ── Root Profile ─────────────────────────────
export interface StudentPublicProfile {
    studentId: string
    academicDetails: AcademicDetails
    personalDetails: PersonalDetails
    familyDetails: FamilyDetails
    addressDetails: AddressDetails
    academicHistory: AcademicHistory
    miscDetails: MiscDetails
    socioEconomicDetails: SocioEconomicDetails
    ambitionDetails: AmbitionDetails
}

// ── Request type (for PUT body) ──────────────
export type StudentPublicProfileRequest = Omit<StudentPublicProfile, 'studentId'>
