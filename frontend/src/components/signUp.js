import React, { useContext, useEffect, useState } from "react";
import UserContext from "../userContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function SignUp() {
  //MUI Alerts
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  //Context Hooks
  const { user, setUser, sendMail } = useContext(UserContext);

  //On Submit Handler
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let res = await sendMail();
    if (res == 200) {
      setToast({
        open: true,
        message: "Please check your email to set your password.",
        severity: "success",
      });
    } else {
      setToast({
        open: true,
        message: "Error.",
        severity: "error",
      });
    }
  };

  //On Change Handler
  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //UseEffect Hooks
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleOnSubmit}>
            <Grid container>
              <Grid item xs>
                <TextField
                  margin="normal"
                  required
                  width="50%"
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  type="text"
                  autoFocus
                  value={user.firstName}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  required
                  width="50%"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  autoFocus
                  value={user.lastName}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: 500 }}>
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
      </Container>
    </div>
  );
}

export default SignUp;
