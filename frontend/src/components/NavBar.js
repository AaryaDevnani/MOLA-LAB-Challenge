import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "../userContext";
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/nav.css";

function NavBar(props) {
  // Styling Constants
  const navButtonStyle = {
    fontSize: "15px",
    color: "#000",
    fontFamily: " Cabin, sans-serif",
    fontWeight: "700",
    "&:hover": {
      backgroundColor: "#fff",
      textDecoration: "Underline",
      textDecorationColor: "#C63210",
      textDecorationThickness: "1px",
      color: "#C63210",
    },
  };
  const navActiveStyle = {
    color: "#C63210",
    fontSize: "15px",
    fontFamily: " Cabin, sans-serif",
    fontWeight: "700",
    textDecoration: "Underline",
    textDecorationColor: "#C63210",
    textDecorationThickness: "1px",
    "&:hover": {
      backgroundColor: "#fff",
      textDecoration: "Underline",
      textDecorationColor: "#C63210",
      textDecorationThickness: "1px",
      transition: "all .5s ease-in",
    },
  };
  const mobileNavMenu = {
    color: "#000",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "700",
    justifyContent: "center",
  };
  const mobileNavMenuActive = {
    color: "#000",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "700",
    justifyContent: "center",
    textDecoration: "Underline",
    textDecorationThickness: "1px",
  };

  // Context API Hooks
  const { userLoggedIn, logout } = useContext(UserContext);

  // Mobile Menu handling
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const location = useLocation().pathname;

  // Mobile Drawer
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{ my: 2, fontFamily: '"Cabin", san-serif', fontSize: "25px" }}
      >
        <div className="mobileTitle">
          <p>Morality and Language Lab</p>
          <CloseIcon
            sx={{ ml: 5, "&:hover": { cursor: "pointer" } }}
            onClick={handleDrawerToggle}
          />
        </div>
      </Typography>
      <List sx={{ fontFamily: '"Cabin", san-serif' }}>
        <ListItem
          key="Publications"
          disablePadding
          sx={{ justifyContent: "center" }}
        >
          <NavLink className="mobileList" to={"/"} onClick={handleDrawerToggle}>
            <ListItemText
              primary="Publications"
              sx={location === "/" ? mobileNavMenuActive : mobileNavMenu}
              disableTypography
            />
          </NavLink>
        </ListItem>
        {!userLoggedIn.isAdmin && !userLoggedIn.isLoggedin ? (
          <>
            <ListItem
              key="Login"
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <NavLink
                className="mobileList"
                to={"/login"}
                onClick={handleDrawerToggle}
              >
                <ListItemText
                  primary="Login"
                  sx={
                    location === "/login" ? mobileNavMenuActive : mobileNavMenu
                  }
                  disableTypography
                />
              </NavLink>
            </ListItem>
            <ListItem
              key="Signup"
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <NavLink
                className="mobileList"
                to={"/signup"}
                onClick={handleDrawerToggle}
              >
                <ListItemText
                  primary="Signup"
                  sx={
                    location === "/signup" ? mobileNavMenuActive : mobileNavMenu
                  }
                  disableTypography
                />
              </NavLink>
            </ListItem>
          </>
        ) : (
          <>
            {userLoggedIn.isAdmin && (
              <ListItem
                key="Admin"
                disablePadding
                sx={{ justifyContent: "center" }}
              >
                <NavLink
                  className="mobileList"
                  to={"/admin"}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText
                    primary="Admin"
                    sx={
                      location === "/admin"
                        ? mobileNavMenuActive
                        : mobileNavMenu
                    }
                    disableTypography
                  />
                </NavLink>
              </ListItem>
            )}

            <ListItem
              key="Profile"
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <NavLink
                className="mobileList"
                to={"/profile"}
                onClick={handleDrawerToggle}
              >
                <ListItemText
                  primary="Profile"
                  sx={
                    location === "/profile"
                      ? mobileNavMenuActive
                      : mobileNavMenu
                  }
                  disableTypography
                />
              </NavLink>
            </ListItem>
            <ListItem
              key="Logout"
              disablePadding
              sx={{ justifyContent: "center" }}
            >
              <NavLink
                className="mobileList"
                onClick={() => {
                  logout();
                }}
              >
                <ListItemText
                  primary="Logout"
                  sx={mobileNavMenu}
                  disableTypography
                />
              </NavLink>
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
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <NavLink to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <Typography
              component="div"
              fontFamily={" Cabin, sans-serif"}
              disableTypography
              sx={{
                ml: { lg: "50px", md: "50px" },
                fontSize: { lg: "37px", md: "25px", sm: "23px", xs: "23px" },
                "&:hover": { color: "#C63210", transition: "all .5s ease-in" },
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
                  color: "#C63210",
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
                sx={location === "/" ? navActiveStyle : navButtonStyle}
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
                        location === "/admin" ? navActiveStyle : navButtonStyle
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
                      location === "/profile" ? navActiveStyle : navButtonStyle
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
                      location === "/profile" ? navActiveStyle : navButtonStyle
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
                      location === "/profile" ? navActiveStyle : navButtonStyle
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
          anchor="right"
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
