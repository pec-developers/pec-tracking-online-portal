import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const facultyApi = createApi({
    reducerPath: 'facultyApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/faculty' }),
    tagTypes: ['Courses', 'Attendance'],
    endpoints: (builder) => ({
        getCourses: builder.query<Record<string, unknown>[], void>({
            query: () => '/courses',
            providesTags: ['Courses'],
        }),
    }),
})

export const { useGetCoursesQuery } = facultyApi
