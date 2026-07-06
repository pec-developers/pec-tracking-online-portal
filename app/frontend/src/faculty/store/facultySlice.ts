import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FacultyState {
    selectedCourseId: string | null
}

const initialState: FacultyState = {
    selectedCourseId: null,
}

export const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setSelectedCourse: (state, action: PayloadAction<string | null>) => {
            state.selectedCourseId = action.payload
        },
    },
})

export const { setSelectedCourse } = facultySlice.actions
export default facultySlice.reducer
