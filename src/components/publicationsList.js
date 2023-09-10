import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Article from "./article";
function PublicationsList() {
  return (
    <Box sx={{ width: '100%', maxWidth: '100vw', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem>
          <ListItemButton>
            <Article/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
            <Article/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      {/* <Divider /> */}

    </Box>
  )
}

export default PublicationsList