import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import heroesReducer from "../features/heroes/heroesSlice"

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
