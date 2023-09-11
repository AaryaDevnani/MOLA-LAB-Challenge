import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Login() {
  //context hooks
  const { login, loginData, setLoginData, userLoggedIn, setUserLoggedIn } =
    useContext(UserContext);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    console.log("Effect", toast);
  }, [toast]);

  //nav Hooks

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let res = await login();
    if (res.status == 201) {
      setUserLoggedIn({
        isLoggedIn: true,
        isAdmin: res.body.isAdmin,
      });
      setToast({
        open: true,
        message: "Login Successful",
        severity: "success",
      });
      navigate("/");
    } else {
      setToast({
        open: true,
        message: `Error ${res.status}: ${res.body.error}`,
        severity: "error",
      });
    }
  };

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleOnSubmit}>
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
              value={loginData.email}
              onChange={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              value={loginData.password}
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
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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

export default Login;
