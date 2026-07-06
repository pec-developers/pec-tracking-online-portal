// ──────────────────────────────────────────────
// Redux Store configuration
// Combines Flux Store (slice) + Flux Actions (API)
// ──────────────────────────────────────────────

import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './studentSlice'
import { studentApi } from './studentApi'

export const store = configureStore({
    reducer: {
        student: studentReducer,
        [studentApi.reducerPath]: studentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(studentApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// ── Re-exports for convenient imports ────────
export { useGetStudentProfileQuery, useUpdateStudentProfileMutation } from './studentApi'
export { setProfile, clearProfile } from './studentSlice'
export * from './selectors'
export type { StudentPublicProfile, StudentPublicProfileRequest } from './types'
