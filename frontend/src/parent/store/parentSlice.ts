import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ParentState {
    selectedWardId: string | null
}

const initialState: ParentState = {
    selectedWardId: null,
}

export const parentSlice = createSlice({
    name: 'parent',
    initialState,
    reducers: {
        setSelectedWard: (state, action: PayloadAction<string | null>) => {
            state.selectedWardId = action.payload
        },
    },
})

export const { setSelectedWard } = parentSlice.actions
export default parentSlice.reducer
