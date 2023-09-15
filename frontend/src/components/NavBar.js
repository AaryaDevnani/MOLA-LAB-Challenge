import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "../userContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./styles/nav.css";

function NavBar(props) {
  const molaRed = "#C63210";
  const navButtonStyle = {
    fontSize: "15px",
    color: "#000",
    fontFamily: " Cabin, sans-serif",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#fff",
      textDecoration: "Underline",
      textDecorationColor: molaRed,
      textDecorationThickness: "1px",
      color: molaRed,
    },
  };
  const navActiveStyle = {
    color: molaRed,
    fontSize: "15px",
    fontFamily: " Cabin, sans-serif",
    fontWeight: "700",
    textDecoration: "Underline",
    textDecorationColor: molaRed,
    textDecorationThickness: "1px",
    "&:hover": {
      backgroundColor: "#fff",
      textDecoration: "Underline",
      textDecorationColor: molaRed,
      textDecorationThickness: "1px",
      transition: "all .5s ease-in",
    },
  };

  const { userLoggedIn, logout } = useContext(UserContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const location = useLocation().pathname;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography sx={{ my: 2, fontFamily: '"Cabin", san-serif' }}>
        <div>Morality and Language Lab</div>
      </Typography>
      <List sx={{ fontFamily: '"Cabin", san-serif' }}>
        <ListItem key="Publications" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Publications" sx={{ color: "#000" }} />
          </ListItemButton>
        </ListItem>
        {!userLoggedIn.isAdmin && !userLoggedIn.isLoggedin ? (
          <>
            <ListItem key="Login" disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Login" sx={{ color: "#000" }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Signup" disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Signup" sx={{ color: "#000" }} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            {userLoggedIn.isAdmin && (
              <ListItem key="Admin" disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary="Admin" sx={{ color: "#000" }} />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem key="Profile" disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Profile" sx={{ color: "#000" }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Logout" disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary="Logout" sx={{ color: "#000" }} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {}, [userLoggedIn]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className="toolbar"
        sx={{ backgroundColor: "#fff", boxShadow: "None", color: "#000" }}
      >
        <Toolbar>
          <NavLink to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography
              component="div"
              fontFamily={" Cabin, sans-serif"}
              sx={{
                ml: "50px",
                fontSize: { lg: "37px", md: "25px", sm: "20px" },
                "&:hover": { color: molaRed, transition: "all .5s ease-in" },
              }}
            >
              Morality and Language Lab
              <Typography
                component="div"
                fontFamily={" Cabin, sans-serif"}
                sx={{
                  fontSize: { lg: "17px" },
                  fontWeight: "700",
                  textAlign: "center",
                  display: { xs: "None", sm: "None", md: "block", lg: "block" },
                  color: molaRed,
                }}
              >
                UNIVERSITY OF SOUTHERN CALIFORNIA
              </Typography>
            </Typography>
          </NavLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              justifyContent: "flex-end",
              mr: "35px",
            }}
          >
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
              <Button
                key="Publications"
                disableRipple
                sx={location == "/" ? navActiveStyle : navButtonStyle}
              >
                Publications
              </Button>
            </NavLink>
            {userLoggedIn.isLoggedIn ? (
              <>
                {userLoggedIn.isAdmin && (
                  <NavLink to={"/admin"} style={{ textDecoration: "none" }}>
                    <Button
                      key="Admin"
                      disableRipple
                      sx={
                        location == "/admin" ? navActiveStyle : navButtonStyle
                      }
                    >
                      Admin
                    </Button>
                  </NavLink>
                )}
                <NavLink to={"/profile"} style={{ textDecoration: "none" }}>
                  <Button
                    key="Profile"
                    disableRipple
                    sx={
                      location == "/profile" ? navActiveStyle : navButtonStyle
                    }
                  >
                    Profile
                  </Button>
                </NavLink>
                <NavLink to={"/"} style={{ textDecoration: "none" }}>
                  <Button
                    key="Logout"
                    disableRipple
                    sx={
                      navButtonStyle
                      // mr: "60px",
                    }
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/login"} style={{ textDecoration: "none" }}>
                  <Button
                    key="Login"
                    disableRipple
                    sx={
                      location == "/profile" ? navActiveStyle : navButtonStyle
                    }
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to={"/signup"} style={{ textDecoration: "none" }}>
                  <Button
                    key="Signup"
                    disableRipple
                    sx={
                      location == "/profile" ? navActiveStyle : navButtonStyle
                    }
                  >
                    Signup
                  </Button>
                </NavLink>
              </>
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" }, alignContent: "flex-end" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100vw",
              alignContent: "left",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default NavBar;
