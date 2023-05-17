import { useCallback, useEffect } from "react"
import { Pagination, PaginationItem, styled } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  loadHeroes,
  selectHeroesPages,
  selectSearchPattern,
  selectCurrentPage,
  setCurrentPage,
  selectRequestStatus,
} from "../heroesSlice"

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(3),
}))

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  boxShadow:
    "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px blue, 0 0 25px blue",
}))

const HeroesPagination = () => {
  const dispatch = useAppDispatch()

  const search: string = useAppSelector(selectSearchPattern)
  const currentPage: number = useAppSelector(selectCurrentPage)
  const heroesPages: number = useAppSelector(selectHeroesPages)
  const requestStatus = useAppSelector(selectRequestStatus)

  useEffect(() => {
    dispatch(setCurrentPage(1))
  }, [dispatch, search])

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, newPage: number) => {
      dispatch(loadHeroes({ page: newPage, search }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  )

  return (
    <StyledPagination
      onChange={handleChange}
      count={heroesPages}
      variant="outlined"
      shape="rounded"
      page={currentPage}
      disabled={requestStatus === "loading"}
      renderItem={(item) => (
        <StyledPaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
        />
      )}
    />
  )
}

export { HeroesPagination }
