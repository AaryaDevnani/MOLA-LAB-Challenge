import React from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import "./styles/home.css";
import FilterList from "./filterList";
import PublicationsList from "./publicationsList";

function home() {
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
              <FilterList
                sx={{
                  position: "relative",
                  overflow: "auto",
                }}
              />
            </Grid>
            <Grid div lg={9} sm={12} xs={12}>
              <div>
                <PublicationsList />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default home;
