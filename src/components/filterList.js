import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const FilterList = () => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      //   subheader={
      //     <ListSubheader component="div" id="nested-list-subheader">
      //       {/* Nested List Items */}
      //     </ListSubheader>
      //   }
    >
      <ListItemButton
        sx={{
          borderBottom: "1px solid black",
        }}
      >
        <ListItemText primary="Year" />
        <ListItemIcon>
          <ExpandMore />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton
        sx={{
          borderBottom: "1px solid black",
        }}
      >
        <ListItemText primary="Type" />
        <ListItemIcon>
          <ExpandMore />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton
        sx={{
          borderBottom: "1px solid black",
        }}
      >
        <ListItemText primary="Topic" />
        <ListItemIcon>
          <ExpandMore />
        </ListItemIcon>
      </ListItemButton>
      <ListItemButton
        sx={{
          borderBottom: "1px solid black",
        }}
      >
        <IconButton>
          <SearchIcon />
        </IconButton>
        <TextField
          InputProps={{ disableUnderline: true }}
          id="standard-basic"
          label="Search"
          variant="standard"
        />
      </ListItemButton>
    </List>
  );
};

export default FilterList;
