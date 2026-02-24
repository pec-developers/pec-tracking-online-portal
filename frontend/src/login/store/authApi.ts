import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_KEYCLOAK_URL ?? '/auth',
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        getUserInfo: builder.query<Record<string, unknown>, string>({
            query: (accessToken) => ({
                url: `/realms/${import.meta.env.VITE_KEYCLOAK_REALM ?? 'pectop'}/protocol/openid-connect/userinfo`,
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
            providesTags: ['Auth'],
        }),
    }),
})

export const { useGetUserInfoQuery } = authApi
