// ──────────────────────────────────────────────
// Flux: STORE  (Dispatcher → Store)
// Holds the canonical student profile state.
// Reducers are pure functions — no side effects.
// ──────────────────────────────────────────────

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { StudentPublicProfile } from './types'

export interface StudentState {
    profile: StudentPublicProfile | null
    profileLoaded: boolean
}

const initialState: StudentState = {
    profile: null,
    profileLoaded: false,
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        // ── Flux Action Handlers ─────────────────
        setProfile: (state, action: PayloadAction<StudentPublicProfile>) => {
            state.profile = action.payload
            state.profileLoaded = true
        },
        clearProfile: (state) => {
            state.profile = null
            state.profileLoaded = false
        },
    },
})

export const { setProfile, clearProfile } = studentSlice.actions
export default studentSlice.reducer
