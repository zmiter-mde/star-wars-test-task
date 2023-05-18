import { useCallback, useEffect, useMemo, useState } from "react"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import debounce from "lodash.debounce"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  loadHeroes,
  selectSearchPattern,
} from "../../features/heroes/heroesSlice"

// Default example search component styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "auto",
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const searchPattern: string = useAppSelector(selectSearchPattern)
  const [search, setSearch] = useState(searchPattern)

  const changeHandler = useCallback(
    (value: string) => {
      dispatch(loadHeroes({ search: value }))
    },
    [dispatch],
  )

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [changeHandler],
  )

  const onSearchChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(value)
      debouncedChangeHandler(value)
    },
    [debouncedChangeHandler],
  )

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={onSearchChange}
        value={search}
      />
    </Search>
  )
}

export { SearchBar }
