import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import RestartIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import "./styles/home.css";
import Article from "./article";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [allPublications, setAllPublications] = useState([]);
  const [publications, setPublications] = useState([]);
  const [year, setYear] = useState(0);
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
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
      setAllPublications(data.articles);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleOnSearchChange = (e) => {
    setSearchInput(e.target.value);

    if (searchInput) {
      searchFunction();
    } else {
      setPublications(allPublications);
    }
  };

  const searchFunction = () => {
    setPublications(
      allPublications.filter((publication) =>
        publication.Title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const filterPublications = (filterParam, value) => {
    if (filterParam == "year") {
      setYear(value);
      if (value == 0) {
        setPublications(allPublications);
        return;
      }
      setPublications(allPublications.filter((pub) => pub.Year == value));
      return;
    }
    if (filterParam == "type") {
      setType(value);
      if (value == "all") {
        setPublications(allPublications);
        return;
      }
      setPublications(allPublications.filter((pub) => pub.Type == value));
      return;
    }
    if (filterParam == "topic") {
      setTopic(value);
      if (value == "all") {
        setPublications(allPublications);
        return;
      }
      setPublications(allPublications.filter((pub) => pub.Topic == value));
      return;
    }
  };

  useEffect(() => {
    console.log({ publications });
  }, [publications]);

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
                <ListItem sx={{ borderBottom: "1px solid black" }}>
                  <InputLabel sx={{ mr: 2 }} id="demo-customized-select-label">
                    Year
                  </InputLabel>
                  <Select
                    sx={{
                      width: "80%",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    disableUnderline
                    value={year}
                    onChange={(e) => {
                      filterPublications("year", e.target.value);
                    }}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                  </Select>
                </ListItem>

                <ListItem sx={{ borderBottom: "1px solid black" }}>
                  <InputLabel sx={{ mr: 2 }} id="demo-customized-select-label">
                    Type
                  </InputLabel>
                  <Select
                    sx={{
                      width: "80%",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    disableUnderline
                    value={type}
                    onChange={(e) => {
                      filterPublications("type", e.target.value);
                    }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value={"book"}>Book</MenuItem>
                    <MenuItem value={"book_chapter"}>Book Chapter</MenuItem>
                    <MenuItem value={"journal_article"}>
                      Journal Article
                    </MenuItem>
                  </Select>
                </ListItem>

                <ListItem sx={{ borderBottom: "1px solid black" }}>
                  <InputLabel sx={{ mr: 2 }} id="demo-customized-select-label">
                    Topic
                  </InputLabel>
                  <Select
                    sx={{
                      width: "80%",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    disableUnderline
                    value={topic}
                    onChange={(e) => {
                      filterPublications("topic", e.target.value);
                    }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value={"hate"}>Hate</MenuItem>
                    <MenuItem value={"morals"}>Morals</MenuItem>
                  </Select>
                </ListItem>

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
                        <ListItem key={pub.key}>
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
