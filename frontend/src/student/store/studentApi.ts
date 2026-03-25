// ──────────────────────────────────────────────
// Flux: ACTIONS  (View → Dispatcher)
// RTK Query API — every endpoint maps to an Action.
// Triggering a hook dispatches the action automatically.
// ──────────────────────────────────────────────

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    StudentPublicProfile,
    StudentPublicProfileRequest,
} from './types'

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/student-general-profile' }),
    tagTypes: ['StudentProfile'],

    endpoints: (builder) => ({
        // ── GET  /general-profile/{studentId} ────
        getStudentProfile: builder.query<StudentPublicProfile, string>({
            query: (studentId) => `/general-profile/${studentId}`,
            providesTags: (_result, _error, studentId) => [
                { type: 'StudentProfile', id: studentId },
            ],
        }),

        // ── PUT  /general-profile/{studentId} ────
        updateStudentProfile: builder.mutation<
            StudentPublicProfile,
            { studentId: string; body: StudentPublicProfileRequest }
        >({
            query: ({ studentId, body }) => ({
                url: `/general-profile/${studentId}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, { studentId }) => [
                { type: 'StudentProfile', id: studentId },
            ],
        }),
    }),
})

// ── Auto-generated hooks (Flux dispatcher bindings) ──
export const {
    useGetStudentProfileQuery,
    useUpdateStudentProfileMutation,
} = studentApi
