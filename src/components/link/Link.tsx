import { Link as RouterLink } from "react-router-dom"
import { styled } from "@mui/material"
import { shadow } from "../../util"

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  border: "none",
  borderRadius: "7px",
  padding: theme.spacing(0.5, 2),
  "&:hover": {
    boxShadow: shadow("green"),
  },
  "> div": {
    fontFamily: "'Star Wars', sans-serif",
    color: "#EEDB00",
  },
}))

export { StyledLink as Link }
