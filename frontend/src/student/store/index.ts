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
