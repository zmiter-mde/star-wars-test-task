import { useLocation } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import { shadow } from "../../util"
import { SearchBar } from "../searchBar/SearchBar"
import { Lightsaber } from "../Lightsaber/Lightsaber"
import { Link } from "../link/Link"

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

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: "transparent",
  marginTop: "100px",
}))

const Header = () => {
  const { pathname } = useLocation()
  return (
    <Box data-testid="swHeader">
      <Lightsaber />
      <StyledAppBar position="static">
        <StyledToolbar>
          <Link to="/heroes">
            <Typography variant="h6" noWrap component="div">
              Star Wars Heroes
            </Typography>
          </Link>

          {pathname === "/heroes" ? (
            <SearchBar />
          ) : (
            <Link to="/heroes">
              <Typography variant="h6" noWrap component="div">
                Back
              </Typography>
            </Link>
          )}
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  )
}

export { Header }
