import * as React from "react";
import { NavLink } from "react-router-dom";
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

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography sx={{ my: 2 }}>
        <div>Morality and Language Lab</div>
      </Typography>
      <List>
        <ListItem key="Publications" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Publications" sx={{ color: "#000" }} />
          </ListItemButton>
        </ListItem>
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
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className="toolbar"
        sx={{ backgroundColor: "#fff", boxShadow: "None", color: "#000" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              // display: { xs: "block", sm: "block" },
              ml: "50px",
              fontSize: { lg: "30px", md: "20px", sm: "20px" },
            }}
          >
            Morality and Language Lab
            <Typography
              component="div"
              sx={{
                fontSize: { lg: "20px" },
                fontWeight: "500",
                textAlign: "center",
                display: { xs: "None", sm: "None", md: "block", lg: "block" },
              }}
            >
              University of Southern California
            </Typography>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Button
                key="Publications"
                sx={{
                  "&:hover": { backgroundColor: "#fff" },
                  color: "#000",
                  fontWeight: "1000",
                }}
              >
                Publications
              </Button>
            </NavLink>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button
                key="Login"
                sx={{
                  "&:hover": { backgroundColor: "#fff" },
                  color: "#000",
                  fontWeight: "1000",
                }}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
              <Button
                key="Signup"
                sx={{
                  "&:hover": { backgroundColor: "#fff" },
                  color: "#000",
                  fontWeight: "1000",
                  mr: "60px",
                }}
              >
                Signup
              </Button>
            </NavLink>
          </Box>
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

export default DrawerAppBar;
