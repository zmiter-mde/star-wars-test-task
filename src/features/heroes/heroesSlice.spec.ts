import heroesReducer, {
  HeroesState,
  updateSearch,
  setCurrentPage,
} from "./heroesSlice"

describe("heroes reducer", () => {
  const initialState: HeroesState = {
    heroes: [],
    totalPages: 0,
    totalRecords: 0,
    currentPage: 1,
    searchPattern: "",
    status: "idle",
    error: null,
  }

  it("should handle initial state", () => {
    expect(heroesReducer(undefined, { type: "unknown" })).toEqual({
      heroes: [],
      totalPages: 0,
      totalRecords: 0,
      currentPage: 1,
      searchPattern: "",
      status: "idle",
      error: null,
    })
  })

  it("should handle updateSearch", () => {
    const newSearch = "search"
    const actual = heroesReducer(initialState, updateSearch(newSearch))
    expect(actual.searchPattern).toEqual(newSearch)
  })

  it("should handle setCurrentPage", () => {
    const newPage = 3
    const actual = heroesReducer(initialState, setCurrentPage(newPage))
    expect(actual.currentPage).toEqual(newPage)
  })
})
