import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Article from "./article";

function PublicationsList() {
  let [publications, setPublications] = useState([]);
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
  useEffect(() => {
    fetchPublications();
  }, []);
  return (
    <Box sx={{ width: "100%", maxWidth: "100vw", bgcolor: "background.paper" }}>
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
              />
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default PublicationsList;
