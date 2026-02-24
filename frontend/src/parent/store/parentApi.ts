import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const parentApi = createApi({
    reducerPath: 'parentApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/parent' }),
    tagTypes: ['WardProfile'],
    endpoints: (builder) => ({
        getWardProfile: builder.query<Record<string, unknown>, string>({
            query: (wardId) => `/ward/${wardId}`,
            providesTags: ['WardProfile'],
        }),
    }),
})

export const { useGetWardProfileQuery } = parentApi
