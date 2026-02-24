import { configureStore } from '@reduxjs/toolkit'
import facultyReducer from './facultySlice'
import { facultyApi } from './facultyApi'

export const store = configureStore({
    reducer: {
        faculty: facultyReducer,
        [facultyApi.reducerPath]: facultyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(facultyApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
