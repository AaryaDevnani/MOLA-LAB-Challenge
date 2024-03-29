import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  List,
  ListItem,
  Box,
  MenuItem,
  InputLabel,
  Select,
  Button,
  Drawer,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RestartIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import Article from "./article";
import "./styles/home.css";

function Home(props) {
  // State hooks
  const [searchInput, setSearchInput] = useState("");
  const [allPublications, setAllPublications] = useState([]);
  const [publications, setPublications] = useState([]);
  const [year, setYear] = useState(0);
  const [type, setType] = useState("all");
  const [topic, setTopic] = useState("all");
  const [yearValues, setYearValues] = useState([]);
  const [topicValues, setTopicValues] = useState([]);
  const [typeValues, setTypeValues] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  //Filters Drawer Handler
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Get and Set all Publications
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
      // console.log(response);
    }
  };

  // Get and set all filter values
  const getFilterValues = async () => {
    // console.log("whee");
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}api/publications/getfilters`,
      {
        method: "GET",
      }
    );
    let res = await response.json();
    //console.log(res);
    setYearValues(res.years.reverse());
    setTopicValues(res.topics);
    setTypeValues(res.types);
  };

  const handleOnSearchChange = (e) => {
    setSearchInput(e.target.value);

    if (searchInput) {
      searchFunction();
    } else {
      setPublications(allPublications);
    }
  };

  // Search
  const searchFunction = () => {
    setPublications(
      allPublications.filter((publication) =>
        publication.Title.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  // Reset Function
  const resetHandler = () => {
    setPublications(allPublications);
    setYear(0);
    setTopic("all");
    setType("all");
  };
  // Filtering Function
  const filterPublications = () => {
    let filteredPublications = allPublications;
    if (year !== 0) {
      filteredPublications = filteredPublications.filter(
        (pub) => pub.Year === year
      );
    }
    if (type !== "all") {
      filteredPublications = filteredPublications.filter(
        (pub) => pub.Type === type
      );
    }
    if (topic !== "all") {
      filteredPublications = filteredPublications.filter(
        (pub) => pub.Topic === topic
      );
    }
    setPublications(filteredPublications);
  };

  // Filter Change Handlers
  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  // Separate Use Effect only for filters
  useEffect(() => {
    filterPublications();
  }, [year, type, topic]);

  // Separate use effect only for search
  useEffect(() => {}, [publications]);

  // API Call UseEffect
  useEffect(() => {
    fetchPublications();
    getFilterValues();
  }, []);
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem sx={{ borderBottom: "1px solid black" }}>
          <InputLabel sx={{ mr: 2 }}>Year</InputLabel>
          <Select
            sx={{
              width: "80%",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
            disableUnderline
            value={year}
            onChange={handleYearChange}
          >
            <MenuItem value={0}>All</MenuItem>
            {yearValues.map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </ListItem>

        <ListItem sx={{ borderBottom: "1px solid black" }}>
          <InputLabel sx={{ mr: 2 }}>Type</InputLabel>
          <Select
            sx={{
              width: "80%",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
            disableUnderline
            value={type}
            onChange={handleTypeChange}
          >
            <MenuItem value="all">All</MenuItem>
            {typeValues.map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </Select>
        </ListItem>

        <ListItem sx={{ borderBottom: "1px solid black" }}>
          <InputLabel sx={{ mr: 2 }}>Topic</InputLabel>
          <Select
            sx={{
              width: "80%",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
            disableUnderline
            value={topic}
            onChange={handleTopicChange}
          >
            <MenuItem value="all">All</MenuItem>
            {topicValues.map((topic) => (
              <MenuItem value={topic}>{topic}</MenuItem>
            ))}
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
            sx={{ margin: "15px" }}
          />
          <SearchIcon
            sx={{ cursor: "pointer", ml: "55px" }}
            onClick={handleOnSearchChange}
          />
          <RestartIcon sx={{ cursor: "pointer" }} onClick={resetHandler} />
        </div>
      </List>
      <CloseIcon
        sx={{ mt: "25px", "&:hover": { cursor: "pointer" } }}
        onClick={handleDrawerToggle}
      />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="homePage">
      <div className="title">Publications</div>
      <div className="gridStart">
        <Button
          type="Filters"
          // fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            display: { lg: "none", md: "none", sm: "block", xs: "block" },
          }}
          onClick={handleDrawerToggle}
          // primary="Filters"
        >
          Filters
        </Button>
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
                  <InputLabel sx={{ mr: 2 }}>Year</InputLabel>
                  <Select
                    sx={{
                      width: "80%",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    disableUnderline
                    value={year}
                    onChange={handleYearChange}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    {yearValues.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </ListItem>

                <ListItem sx={{ borderBottom: "1px solid black" }}>
                  <InputLabel sx={{ mr: 2 }}>Type</InputLabel>
                  <Select
                    sx={{
                      width: "80%",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    disableUnderline
                    value={type}
                    onChange={handleTypeChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {typeValues.map((type) => (
                      <MenuItem value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </ListItem>

                <ListItem sx={{ borderBottom: "1px solid black" }}>
                  <InputLabel sx={{ mr: 2 }}>Topic</InputLabel>
                  <Select
                    sx={{
                      width: "80%",
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                    disableUnderline
                    value={topic}
                    onChange={handleTopicChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {topicValues.map((topic) => (
                      <MenuItem value={topic}>{topic}</MenuItem>
                    ))}
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
                    sx={{ margin: "15px" }}
                  />
                  <SearchIcon
                    sx={{ cursor: "pointer", ml: "30px" }}
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
            mt: "80px",
            boxSizing: "border-box",
            width: "90vw",
            alignContent: "left",
          },
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
}

export default Home;
