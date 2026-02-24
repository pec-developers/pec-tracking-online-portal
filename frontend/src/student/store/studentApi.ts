import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/student' }),
    tagTypes: ['StudentProfile'],
    endpoints: (builder) => ({
        getProfile: builder.query<Record<string, unknown>, void>({
            query: () => '/profile',
            providesTags: ['StudentProfile'],
        }),
    }),
})

export const { useGetProfileQuery } = studentApi
