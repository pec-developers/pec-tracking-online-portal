import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface StudentState {
    profileLoaded: boolean
    name: string | null
}

const initialState: StudentState = {
    profileLoaded: false,
    name: null,
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{ name: string }>) => {
            state.name = action.payload.name
            state.profileLoaded = true
        },
        clearProfile: (state) => {
            state.name = null
            state.profileLoaded = false
        },
    },
})

export const { setProfile, clearProfile } = studentSlice.actions
export default studentSlice.reducer
