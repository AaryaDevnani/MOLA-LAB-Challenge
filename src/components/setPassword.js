import React, { useContext, useState } from "react";
import {useLocation} from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserContext from "../userContext";

function SetPassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { finalUser, setFinalUser, setPassword  } = useContext(UserContext)
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (finalUser.password !== "" ) {
      await setPassword(token);
    }

  };
  const handleOnChange = (e) => {
    e.preventDefault()
    setFinalUser({ ...finalUser, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Set Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleOnSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoFocus
              value={finalUser.password}
              onChange={handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SetPassword;
