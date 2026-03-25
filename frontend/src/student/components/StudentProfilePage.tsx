// ──────────────────────────────────────────────
// Flux: VIEW  (Store → View)
// Reads data from selectors, dispatches via hooks.
// ──────────────────────────────────────────────

import { useGetStudentProfileQuery } from '../store'
import { useAppSelector } from '@/shared/store/hooks'
import {
    selectAcademicDetails,
    selectPersonalDetails,
    selectFamilyDetails,
    selectAddressDetails,
    selectAcademicHistory,
    selectMiscDetails,
    selectSocioEconomicDetails,
    selectAmbitionDetails,
} from '../store/selectors'
import { useEffect } from 'react'
import { useAppDispatch } from '@/shared/store/hooks'
import { setProfile } from '../store'

// ── Hardcoded for now – replace with auth context ──
const STUDENT_ID = '43345805-947b-4341-a6ba-9be64b354580'

export default function StudentProfilePage() {
    const dispatch = useAppDispatch()

    // Flux: Action → Dispatcher (RTK Query fires the GET)
    const { data, isLoading, isError, error } = useGetStudentProfileQuery(STUDENT_ID)

    // Flux: Sync RTK Query cache → local Flux Store
    useEffect(() => {
        if (data) {
            dispatch(setProfile(data))
        }
    }, [data, dispatch])

    // Flux: View reads from selectors
    const academic = useAppSelector(selectAcademicDetails)
    const personal = useAppSelector(selectPersonalDetails)
    const family = useAppSelector(selectFamilyDetails)
    const address = useAppSelector(selectAddressDetails)
    const history = useAppSelector(selectAcademicHistory)
    const misc = useAppSelector(selectMiscDetails)
    const socioEconomic = useAppSelector(selectSocioEconomicDetails)
    const ambition = useAppSelector(selectAmbitionDetails)

    // ── Loading & Error states ───────────────────
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-500 animate-pulse">Loading profile…</div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 max-w-md">
                    <h2 className="font-semibold text-lg mb-2">Failed to load profile</h2>
                    <p className="text-sm">
                        {(error as { status?: number })?.status === 404
                            ? 'Student profile not found.'
                            : 'An unexpected error occurred. Please try again later.'}
                    </p>
                </div>
            </div>
        )
    }

    if (!academic) return null

    // ── Render ────────────────────────────────────
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            <h1 className="text-2xl font-bold">Student Profile</h1>

            {/* ── Academic Details ──────────────── */}
            <Section title="Academic Details">
                <Field label="Name" value={academic.name} />
                <Field label="Register Number" value={academic.registerNumber} />
                <Field label="Admission Number" value={academic.admissionNumber} />
                <Field label="Batch" value={`${academic.batchStart} – ${academic.batchEnd}`} />
                <Field label="Branch" value={academic.branch} />
                <Field label="Section" value={academic.section} />
            </Section>

            {/* ── Personal Details ─────────────── */}
            {personal && (
                <Section title="Personal Details">
                    <Field label="Gender" value={personal.gender} />
                    <Field label="Date of Birth" value={personal.dateOfBirth} />
                    <Field label="Nationality" value={personal.nationality} />
                    <Field label="State" value={personal.state} />
                    <Field label="Religion" value={personal.religion} />
                    <Field label="Caste" value={personal.caste} />
                    <Field label="Community" value={personal.community} />
                    <Field label="Blood Group" value={personal.bloodGroup} />
                    <Field label="Phone" value={personal.phoneNumber} />
                    <Field label="Email" value={personal.email} />
                </Section>
            )}

            {/* ── Family Details ───────────────── */}
            {family && (
                <Section title="Family Details">
                    <h3 className="font-semibold text-sm mt-2 mb-1">Father</h3>
                    <Field label="Name" value={family.father.name} />
                    <Field label="Education" value={family.father.education} />
                    <Field label="Occupation" value={family.father.occupation} />
                    <Field label="Contact" value={family.father.contactNumber} />

                    <h3 className="font-semibold text-sm mt-4 mb-1">Mother</h3>
                    <Field label="Name" value={family.mother.name} />
                    <Field label="Education" value={family.mother.education} />
                    <Field label="Occupation" value={family.mother.occupation} />
                    <Field label="Contact" value={family.mother.contactNumber} />

                    {family.siblings.length > 0 && (
                        <>
                            <h3 className="font-semibold text-sm mt-4 mb-1">Siblings</h3>
                            {family.siblings.map((s, i) => (
                                <div key={i} className="pl-2 border-l-2 border-gray-200 mb-2">
                                    <Field label="Name" value={s.name} />
                                    <Field label="Age" value={String(s.age)} />
                                    <Field label="Sex" value={s.sex} />
                                    <Field label="Education / Profession" value={s.eduOrProfession} />
                                </div>
                            ))}
                        </>
                    )}

                    <h3 className="font-semibold text-sm mt-4 mb-1">Local Guardian</h3>
                    <Field label="Name" value={family.localGuardian.name} />
                    <Field label="Contact" value={family.localGuardian.contactNumber} />
                    <Field label="Address" value={family.localGuardian.address} />
                </Section>
            )}

            {/* ── Address Details ──────────────── */}
            {address && (
                <Section title="Address Details">
                    <Field label="Parent Address" value={address.parentCommunicationAddress} />
                    <Field label="Permanent Address" value={address.studentPermanentAddress} />
                    <Field label="Present Address" value={address.studentPresentAddress} />
                    <Field label="Present Stay Type" value={address.studentPresentStayType} />

                    {address.stayDetails.map((stay, i) => (
                        <div key={i} className="mt-3 pl-2 border-l-2 border-gray-200">
                            <h4 className="font-medium text-sm">Year {stay.academicYear} — {stay.stayType}</h4>
                            <Field label="Address" value={stay.address} />
                            {stay.fellowMates?.map((fm, j) => (
                                <div key={j} className="pl-2 mt-1 text-sm text-gray-600">
                                    {fm.name} ({fm.gender}, {fm.age}y) — {fm.contactNumber}
                                </div>
                            ))}
                        </div>
                    ))}
                </Section>
            )}

            {/* ── Academic History ─────────────── */}
            {history && (
                <Section title="Academic History">
                    <Field label="Lateral Entry" value={history.isLateralEntry ? 'Yes' : 'No'} />

                    {history.hscDetails && (
                        <>
                            <h3 className="font-semibold text-sm mt-3 mb-1">HSC</h3>
                            <Field label="School" value={history.hscDetails.schoolName} />
                            <Field label="Board" value={history.hscDetails.board} />
                            <Field label="Medium" value={history.hscDetails.medium} />
                            <Field label="Marks" value={`${history.hscDetails.scoredMark} / ${history.hscDetails.totalMark}`} />
                        </>
                    )}

                    {history.sslcInterDetails && (
                        <>
                            <h3 className="font-semibold text-sm mt-3 mb-1">SSLC / Intermediate</h3>
                            <Field label="School" value={history.sslcInterDetails.schoolName} />
                            <Field label="Board" value={history.sslcInterDetails.board} />
                            <Field label="Medium" value={history.sslcInterDetails.medium} />
                            <Field label="Math" value={String(history.sslcInterDetails.mathMark)} />
                            <Field label="Physics" value={String(history.sslcInterDetails.phyMark)} />
                            <Field label="Chemistry" value={String(history.sslcInterDetails.chemMark)} />
                            <Field label="CS / Bio" value={String(history.sslcInterDetails.csBioMark)} />
                            <Field label="Cutoff" value={String(history.sslcInterDetails.cutoffMark)} />
                        </>
                    )}
                </Section>
            )}

            {/* ── Misc Details ─────────────────── */}
            {misc && (
                <Section title="Miscellaneous Details">
                    <Field label="Mother Tongue" value={misc.motherTongue} />
                    <Field label="Other Languages" value={misc.otherKnownLanguages.join(', ')} />
                    <Field label="Mode of Admission" value={misc.modeOfAdmission} />
                    <Field label="Dietary Preference" value={misc.dietaryPreference} />
                    <Field label="Vision Problem" value={misc.visionProblem ? 'Yes' : 'No'} />
                    <Field label="Chronic Illness" value={misc.chronicIllness} />
                </Section>
            )}

            {/* ── Socio-Economic Details ────────── */}
            {socioEconomic && (
                <Section title="Socio-Economic Details">
                    <Field label="Father's Annual Income" value={`₹${socioEconomic.fatherAnnualIncome.toLocaleString('en-IN')}`} />
                    <Field label="Mother's Annual Income" value={`₹${socioEconomic.motherAnnualIncome.toLocaleString('en-IN')}`} />
                    <Field label="Other Income Source" value={socioEconomic.otherIncomeSource} />
                    <Field label="Part-Time Job" value={socioEconomic.partTimeJob} />
                    <Field label="Scholarship" value={socioEconomic.scholarship} />
                    <Field label="Other Financial Assistance" value={socioEconomic.otherFinancialAssistance} />
                </Section>
            )}

            {/* ── Ambition Details ─────────────── */}
            {ambition && (
                <Section title="Ambition & Self-Analysis">
                    <h3 className="font-semibold text-sm mt-2 mb-1">Personal Ambition</h3>
                    <Field label="Long-Term Goals" value={ambition.personalAmbition.longTermGoals} />
                    <Field label="Plan" value={ambition.personalAmbition.longTermGoalPlan} />

                    <h3 className="font-semibold text-sm mt-4 mb-1">Career Plan</h3>
                    <Field label="Choices" value={ambition.careerPlan.careerChoices.join(', ')} />
                    <Field label="Preparation Plan" value={ambition.careerPlan.careerPrepPlan} />
                    <Field label="Extra Coaching" value={ambition.careerPlan.extraCoachingDetails} />
                    <Field label="Help Needed" value={ambition.careerPlan.helpNeeded} />

                    <h3 className="font-semibold text-sm mt-4 mb-1">Self Analysis</h3>
                    <Field label="Academic Strength" value={ambition.selfAnalysis.academicStrength} />
                    <Field label="General Strength" value={ambition.selfAnalysis.generalStrength} />
                    <Field label="Academic Weakness" value={ambition.selfAnalysis.academicWeakness} />
                    <Field label="General Weakness" value={ambition.selfAnalysis.generalWeakness} />

                    <h3 className="font-semibold text-sm mt-4 mb-1">Living Style</h3>
                    <Field label="Communication to Parent" value={ambition.livingStyle.yourCommunicationToParent} />
                    <Field label="Parent Communication" value={ambition.livingStyle.parentCommunicationToYou} />
                    <Field label="Weekend Plans" value={ambition.livingStyle.weekendPlans} />

                    <h3 className="font-semibold text-sm mt-4 mb-1">General Academic</h3>
                    <Field label="Branch Feedback" value={ambition.generalAcademicDetails.branchFeedback} />
                    <Field label="Math Strength" value={ambition.generalAcademicDetails.fundamentalMathStrength} />
                    <Field label="Engg Strength" value={ambition.generalAcademicDetails.fundamentalEnggStrength} />
                    <Field label="Questioning" value={ambition.generalAcademicDetails.questioningCapability ? 'Yes' : 'No'} />
                    <Field label="Sports" value={ambition.generalAcademicDetails.sportsInvolvement} />
                    <Field label="Awards" value={ambition.generalAcademicDetails.awardRecognitions} />
                </Section>
            )}
        </div>
    )
}

// ── Reusable sub-components ──────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 border-b pb-2">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">{children}</div>
        </section>
    )
}

function Field({ label, value }: { label: string; value: string | undefined | null }) {
    return (
        <div className="py-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{value ?? '—'}</p>
        </div>
    )
}
