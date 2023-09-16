import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import RestartIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import "./styles/home.css";
import Article from "./article";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [publications, setPublications] = useState([]);

  const fetchPublications = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}api/publications/get`,
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      setPublications(data.articles);
    } else {
      console.log(response);
    }
  };

  const handleOnSearchChange = (e) => {
    setSearchInput(e.target.value);

    if (searchInput) {
      searchFunction();
    } else {
      fetchPublications();
    }
  };

  const searchFunction = () => {
    setPublications(
      publications.filter((publication) =>
        publication.Title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };
  useEffect(() => {
    fetchPublications();
  }, []);

  return (
    <div className="homePage">
      <div className="title">Publications</div>
      <div className="gridStart">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container rowSpacing={1} columnSpacing={3}>
            <Grid
              lg={3}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  med: "block",
                  lg: "block",
                },
              }}
            >
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
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
                {/* <ListItemButton
                  sx={{
                    borderBottom: "1px solid black",
                  }}
                > */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    width: "100%",
                  }}
                >
                  <TextField
                    InputProps={{ disableUnderline: true }}
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    target="search"
                    value={searchInput}
                    onChange={handleOnSearchChange}
                  />
                  <SearchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleOnSearchChange}
                  />
                  <RestartIcon
                    sx={{ cursor: "pointer" }}
                    onClick={fetchPublications}
                  />
                </div>
              </List>
            </Grid>
            <Grid div lg={9} sm={12} xs={12}>
              <div>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "100vw",
                    bgcolor: "background.paper",
                  }}
                >
                  <nav aria-label="main mailbox folders">
                    <List>
                      {publications.map((pub) => (
                        <ListItem>
                          <Article
                            Title={pub.Title}
                            Collaborators={pub.Collaborators}
                            Year={pub.Year}
                            Journal={pub.Journal}
                            bib={pub.bib}
                            key={pub.key}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </nav>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Home;
