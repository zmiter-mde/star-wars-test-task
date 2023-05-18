import axios from "axios"
import { Hero } from "../../types"

// TODO: switch to RTKQuery?
const baseUrl = "https://swapi.dev/api/"
// TODO: (never) API doesn't allow limiting atm.
const DEFAULT_LIMIT = 10

export interface FetchHeroesParams {
  page?: number
  search?: string
  limit?: number
}

export interface FetchHeroesResponse {
  heroes: Hero[]
  totalPages: number
  totalRecords: number
}

const fetchHeroes = async ({
  page = 1,
  search = "",
  limit = DEFAULT_LIMIT,
}): Promise<FetchHeroesResponse> => {
  const res = await axios.request({
    url: `${baseUrl}people?page=${page}&limit=${limit}&search=${search}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  return {
    heroes: res.data.results,
    totalPages: Math.ceil(res.data.count / limit),
    totalRecords: res.data.count,
  }
}

const fetchHero = async (id: string): Promise<Hero> => {
  const res = await axios.request({
    url: `${baseUrl}people/${id}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  return res.data
}

const updateHero = async (hero: Hero): Promise<Hero> => {
  // TODO: (never) make a request to backend

  return hero
}

export { fetchHeroes, fetchHero, updateHero }
