// ──────────────────────────────────────────────
// Flux: SELECTORS  (Store → View)
// Memoized selectors for reading student state.
// Components NEVER read raw state — always via selectors.
// ──────────────────────────────────────────────

import type { RootState } from './index'

// ── Atomic selectors ─────────────────────────
export const selectStudentProfile = (state: RootState) => state.student.profile
export const selectProfileLoaded = (state: RootState) => state.student.profileLoaded
export const selectStudentId = (state: RootState) => state.student.profile?.studentId ?? null

// ── Section-level selectors ──────────────────
export const selectAcademicDetails = (state: RootState) => state.student.profile?.academicDetails ?? null
export const selectPersonalDetails = (state: RootState) => state.student.profile?.personalDetails ?? null
export const selectFamilyDetails = (state: RootState) => state.student.profile?.familyDetails ?? null
export const selectAddressDetails = (state: RootState) => state.student.profile?.addressDetails ?? null
export const selectAcademicHistory = (state: RootState) => state.student.profile?.academicHistory ?? null
export const selectMiscDetails = (state: RootState) => state.student.profile?.miscDetails ?? null
export const selectSocioEconomicDetails = (state: RootState) => state.student.profile?.socioEconomicDetails ?? null
export const selectAmbitionDetails = (state: RootState) => state.student.profile?.ambitionDetails ?? null
