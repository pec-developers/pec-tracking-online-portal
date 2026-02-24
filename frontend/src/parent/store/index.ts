import { configureStore } from '@reduxjs/toolkit'
import parentReducer from './parentSlice'
import { parentApi } from './parentApi'

export const store = configureStore({
    reducer: {
        parent: parentReducer,
        [parentApi.reducerPath]: parentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(parentApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
