import { useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  loadHeroById,
  selectHeroById,
  selectRequestStatus,
} from "../features/heroes/heroesSlice"
import { HeroEdit } from "../features/heroes/components/HeroEdit"
import { PageTitle } from "../components/PageTitle"

const HeroPage = () => {
  const dispatch = useAppDispatch()
  const { heroId = "" } = useParams<{ heroId: string }>()

  if (!heroId) {
    // If occurs, routing is messed up
    throw new Error("No hero id provided")
  }

  const selectedHero = useAppSelector(selectHeroById(heroId))
  const requestStatus = useAppSelector(selectRequestStatus)

  useEffect(() => {
    if (!selectedHero) {
      dispatch(loadHeroById(heroId))
    }
  }, [dispatch, heroId, selectedHero])

  if (requestStatus === "failed") {
    return <Navigate to="/error" />
  } else if (!selectedHero) {
    return <CircularProgress sx={{ margin: "0 auto" }} />
  }

  return (
    <>
      <PageTitle title="Edit hero" />
      <HeroEdit hero={selectedHero} />
    </>
  )
}

export { HeroPage }
