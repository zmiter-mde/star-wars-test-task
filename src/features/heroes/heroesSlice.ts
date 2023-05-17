import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {
  fetchHeroes,
  fetchHero,
  FetchHeroesParams,
  Hero,
  updateHero,
} from "./heroesAPI"
import { prepareHeroesIds, mergeHeroes } from "./util"

export interface HeroesState {
  heroes: Hero[]
  totalRecords: number
  totalPages: number
  currentPage: number
  searchPattern: string
  status: "idle" | "loading" | "failed"
  error: string | null
}

const initialState: HeroesState = {
  heroes: [],
  totalPages: 0,
  totalRecords: 0,
  currentPage: 1,
  searchPattern: "",
  status: "idle",
  error: null,
}

export const loadHeroes = createAsyncThunk(
  "heroes/fetch",
  async ({ page = 1, search = "" }: FetchHeroesParams, { dispatch }) => {
    dispatch(heroesSlice.actions.updateSearch(search))
    const response = await fetchHeroes({ page, search })
    dispatch(heroesSlice.actions.setCurrentPage(page))
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

export const updateHeroById = createAsyncThunk(
  "heroes/update",
  async (hero: Hero) => {
    const response = await updateHero(hero)
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
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
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
        // Hack to create an illusion of updating backend
        // TODO: (never) Remove mergeHeroes when backend update is ready
        state.heroes = mergeHeroes(prepareHeroesIds(heroes), state.heroes)
      })
      .addCase(loadHeroes.rejected, (state) => {
        state.status = "failed"
      })

      .addCase(loadHeroById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loadHeroById.fulfilled, (state, action) => {
        state.status = "idle"
        state.totalPages = 1
        state.totalRecords = 1
        // Hack to create an illusion of updating backend
        // TODO: (never) Remove mergeHeroes when backend update is ready
        state.heroes = mergeHeroes(
          prepareHeroesIds([action.payload]),
          state.heroes,
        )
      })
      .addCase(loadHeroById.rejected, (state, action) => {
        state.error = `Failed to fetch a hero by id ${action.meta.arg}`
        state.status = "failed"
      })

      .addCase(updateHeroById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updateHeroById.fulfilled, (state, action) => {
        state.status = "idle"
        const heroIndex = state.heroes.findIndex(
          (hero) => hero.id === action.payload.id,
        )

        state.heroes[heroIndex] = action.payload
      })
      .addCase(updateHeroById.rejected, (state, action) => {
        state.error = `Failed to update a hero by id ${action.meta.arg}`
        state.status = "failed"
      })
  },
})

export const { setCurrentPage } = heroesSlice.actions

export const selectHeroes = (state: RootState) => state.heroes.heroes

export const selectHeroesPages = (state: RootState) => state.heroes.totalPages

export const selectHeroById = (id: string) => (state: RootState) =>
  state.heroes.heroes.find((hero) => id === hero.id)

export const selectSearchPattern = (state: RootState) =>
  state.heroes.searchPattern

export const selectCurrentPage = (state: RootState) => state.heroes.currentPage

export const selectRequestStatus = (state: RootState) => state.heroes.status

export const selectRequestError = (state: RootState) => state.heroes.error

export default heroesSlice.reducer
