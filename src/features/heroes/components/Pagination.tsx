import { useCallback, useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  loadHeroes,
  selectHeroesPages,
  selectSearchPattern,
} from "../heroesSlice"

const HeroesPagination = () => {
  const dispatch = useAppDispatch()

  const search: string = useAppSelector(selectSearchPattern)
  const heroesPages: number = useAppSelector(selectHeroesPages)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [search])

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, newPage: number) => {
      dispatch(loadHeroes({ page: newPage, search }))
      setPage(newPage)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return (
    <Pagination
      onChange={handleChange}
      count={heroesPages}
      variant="outlined"
      shape="rounded"
      page={page}
    />
  )
}

export { HeroesPagination }
