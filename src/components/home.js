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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={3}>
              <FilterList sx={{ position: "relative", overflow: "auto" }} />
            </Grid>
            <Grid div xs={9}>
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
