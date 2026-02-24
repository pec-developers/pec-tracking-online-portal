import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    selectedRole: string | null
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    idToken: null,
    selectedRole: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{
            accessToken: string
            refreshToken: string
            idToken: string
        }>) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.idToken = action.payload.idToken
        },
        setSelectedRole: (state, action: PayloadAction<string | null>) => {
            state.selectedRole = action.payload
        },
        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.idToken = null
            state.selectedRole = null
        },
    },
})

export const { setTokens, setSelectedRole, logout } = authSlice.actions
export default authSlice.reducer
