import { Link, useLocation } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import { styled } from "@mui/material/styles"
import { SearchBar } from "../searchBar/SearchBar"
import { Lightsaber } from "../Lightsaber/Lightsaber"

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.common.black,
  boxShadow:
    "0 0 5px #fff,0 0 8px #fff,0 0 12px #fff,0 0 15px blue,0 0 25px blue",
  borderRadius: "7px",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    marginBottom: 0,
  },
}))

const Header = () => {
  const { pathname } = useLocation()
  return (
    // TODO: move texts to i18n files
    <Box sx={{ flexGrow: 1 }}>
      <Lightsaber />
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <StyledToolbar>
          <MenuItem component={Link} to={"/heroes"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, width: { xs: "100%", sm: "auto" } }}
            >
              Star Wars Heroes
            </Typography>
          </MenuItem>
          {pathname === "/heroes" && <SearchBar />}
        </StyledToolbar>
      </AppBar>
    </Box>
  )
}

export { Header }
