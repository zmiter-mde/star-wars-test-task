import { Link, useLocation } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import { shadow } from "../../features/heroes/util"
import { SearchBar } from "../searchBar/SearchBar"
import { Lightsaber } from "../lightsaber/Lightsaber"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.common.black,
  boxShadow: shadow("blue"),
  borderRadius: "7px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}))

const StyledLink = styled(Link)(({ theme }) => ({
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

const Header = () => {
  const { pathname } = useLocation()
  return (
    // TODO: move texts to i18n files
    <Box sx={{ flexGrow: 1 }}>
      <Lightsaber />
      <AppBar
        position="static"
        sx={{ backgroundColor: "black", marginTop: "100px" }}
      >
        <StyledToolbar>
          <StyledLink to="/heroes">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, width: { xs: "100%", sm: "auto" } }}
            >
              Star Wars Heroes
            </Typography>
          </StyledLink>
          {pathname === "/heroes" ? (
            <SearchBar />
          ) : (
            <StyledLink to="/heroes">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, width: { xs: "100%", sm: "auto" } }}
              >
                Back
              </Typography>
            </StyledLink>
          )}
        </StyledToolbar>
      </AppBar>
    </Box>
  )
}

export { Header }
