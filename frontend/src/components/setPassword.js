import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../userContext";
import MuiAlert from "@mui/material/Alert";
import {
  Button,
  Box,
  TextField,
  Typography,
  Container,
  Snackbar,
} from "@mui/material";

function SetPassword() {
  const location = useLocation();
  // Fetch URL Params
  const token = new URLSearchParams(location.search).get("token");

  // Context API Hooks
  const { finalUser, setFinalUser, setPassword } = useContext(UserContext);

  // MUI Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (finalUser.password !== "") {
      let res = await setPassword(token);
      if (res === 200) {
        setToast({
          open: true,
          message: "Password set successfully",
          severity: "success",
        });
      } else {
        setToast({
          open: true,
          message: "Error.",
          severity: "error",
        });
      }
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setFinalUser({ ...finalUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // console.log("Effect", toast);
  }, [toast]);

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
          <Box component="form" onSubmit={handleOnSubmit}>
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
              Set Password
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={toast.open}
              autoHideDuration={6000}
              key={"topcenter"}
            >
              <Alert
                onClose={() => {
                  setToast({ open: false, message: "", severity: "" });
                }}
                severity={toast.severity}
              >
                {toast.message}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SetPassword;
