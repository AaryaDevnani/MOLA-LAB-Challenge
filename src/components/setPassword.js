import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserContext from "../userContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function SetPassword() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { finalUser, setFinalUser, setPassword } = useContext(UserContext);

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
      if (res == 200) {
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
    console.log("Effect", toast);
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
              Sign In
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
