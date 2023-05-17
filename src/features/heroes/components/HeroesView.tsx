import { Grid, styled, Paper } from "@mui/material"
import { Hero } from "../heroesAPI"

const HeroItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  boxShadow:
    "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px blue, 0 0 25px blue",
}))

interface HeroesProps {
  heroes: Hero[]
  onClick: (id: string) => () => void
}

const HeroesView = ({ heroes, onClick }: HeroesProps) => (
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {heroes.map((hero) => (
      <Grid onClick={onClick(hero.id)} key={hero.id} item xs={12} sm={6} md={4}>
        <HeroItem>{hero.name}</HeroItem>
      </Grid>
    ))}
  </Grid>
)

export { HeroesView }
