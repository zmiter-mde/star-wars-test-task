import { Grid, styled, Paper } from "@mui/material"
import { Hero } from "../../../types"
import { shadow } from "../../../util"

const HeroItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  boxShadow: shadow("blue"),
  "&:hover": {
    boxShadow: shadow("green"),
  },
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
