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
import { shadow } from "../../../util"

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(3),
}))

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  margin: theme.spacing(1, 1),
  boxShadow: shadow("blue"),
  "&.Mui-selected": {
    boxShadow: shadow("red"),
  },
  "&:hover": {
    boxShadow: shadow("green"),
  },
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
