import { useEffect } from "react"
import { Grid, styled, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { SearchBar } from "../../../components/searchBar/SearchBar"
import { loadHeroes, selectHeroes } from "../heroesSlice"
import { Hero } from "../heroesAPI"
import { HeroesPagination } from "./Pagination"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

interface HeroesProps {
  heroes: Hero[]
}

const HeroesView = ({ heroes }: HeroesProps) => (
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {heroes.map((hero) => (
      <Grid key={hero.id} item xs={12} sm={6} md={4}>
        <Item>{hero.name}</Item>
      </Grid>
    ))}
  </Grid>
)

const Heroes = () => {
  const dispatch = useAppDispatch()
  const heroes: Hero[] = useAppSelector(selectHeroes)

  useEffect(() => {
    dispatch(loadHeroes({ page: 1 }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SearchBar />
      <HeroesView heroes={heroes} />
      <HeroesPagination />
    </>
  )
}

export { Heroes }
