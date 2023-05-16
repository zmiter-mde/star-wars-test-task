import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { fetchHeroes, fetchHero, FetchHeroesParams, Hero } from "./heroesAPI"
import { prepareHeroesIds } from "./util"

export interface HeroesState {
  heroes: Hero[]
  totalRecords: number
  totalPages: number
  searchPattern: string
  status: "idle" | "loading" | "failed"
}

const initialState: HeroesState = {
  heroes: [],
  totalPages: 0,
  totalRecords: 0,
  searchPattern: "",
  status: "idle",
}

export const loadHeroes = createAsyncThunk(
  "heroes/fetch",
  async ({ page, search = "" }: FetchHeroesParams, { dispatch }) => {
    dispatch(heroesSlice.actions.updateSearch(search))
    const response = await fetchHeroes({ page, search })
    return response
  },
)

export const loadHeroById = createAsyncThunk(
  "heroes/fetchById",
  async (id: string) => {
    const response = await fetchHero(id)
    return response
  },
)

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.searchPattern = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHeroes.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loadHeroes.fulfilled, (state, action) => {
        const { heroes, totalPages, totalRecords } = action.payload
        state.status = "idle"
        state.totalPages = totalPages
        state.totalRecords = totalRecords
        state.heroes = prepareHeroesIds(heroes)
      })
      .addCase(loadHeroes.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const selectHeroes = (state: RootState) => state.heroes.heroes

export const selectHeroesPages = (state: RootState) => state.heroes.totalPages

export const selectHeroById = (id: string) => (state: RootState) =>
  state.heroes.heroes.find((hero) => id === hero.id)

export const selectSearchPattern = (state: RootState) =>
  state.heroes.searchPattern

export default heroesSlice.reducer
