export interface Hero {
  id: string
  url: string
  name: string
  height: number
  mass: number
  homeworld: string
}

export type RequestStatus = "idle" | "loading" | "failed"
