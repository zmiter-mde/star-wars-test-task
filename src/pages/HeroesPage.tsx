import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  loadHeroes,
  selectCurrentPage,
  selectHeroes,
  selectRequestStatus,
  selectSearchPattern,
} from "../features/heroes/heroesSlice"
import { Hero } from "../types"
import { HeroesPagination } from "../features/heroes/components/HeroesPagination"
import { HeroesView } from "../features/heroes/components/HeroesView"
import { PageTitle } from "../components/title/PageTitle"
import { Progress } from "../components/progress/Progress"

const HeroesPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const heroes: Hero[] = useAppSelector(selectHeroes)
  const page: number = useAppSelector(selectCurrentPage)
  const search: string = useAppSelector(selectSearchPattern)
  const requestStatus = useAppSelector(selectRequestStatus)

  useEffect(() => {
    dispatch(loadHeroes({ page, search }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const viewHero = useCallback(
    (heroId: string) => () => {
      navigate(`/heroes/${heroId}`)
    },
    [navigate],
  )

  return (
    <>
      <PageTitle title="All Heroes" />
      {requestStatus === "loading" && <Progress />}
      {requestStatus === "idle" && (
        <HeroesView heroes={heroes} onClick={viewHero} />
      )}
      <HeroesPagination />
    </>
  )
}

export { HeroesPage }
