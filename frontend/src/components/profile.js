import React, { useContext, useEffect, useState } from "react";
import UserContext from "../userContext";
import { Box, TextField, Snackbar, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./styles/profile.css";

function Profile() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [passwordReset, setPasswordReset] = useState({
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
  });
  //   const [oldPassword, setOldPassword] = useState("");

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { userLoggedIn, deleteAccount } = useContext(UserContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(passwordReset);
    if (passwordReset.newPassword === passwordReset.confirmedPassword) {
      console.log(passwordReset.newPassword);
      const resetOptions = {
        method: "POST",
        body: JSON.stringify({
          oldPassword: passwordReset.oldPassword,
          newPassword: passwordReset.newPassword,
          email: userLoggedIn.userData.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URI}api/user/resetpassword`,
        resetOptions
      );
      if (response.status == 200) {
        setToast({
          open: true,
          message: "Password has been reset successfully.",
          severity: "success",
        });
      } else {
        setToast({
          open: true,
          message: "Error.",
          severity: "error",
        });
      }
      console.log("reset");
    } else {
      setToast({
        open: true,
        message: "Error: Passwords do not match.",
        severity: "error",
      });
    }
  };

  //On Change Handler
  const handleOnChange = (e) => {
    setPasswordReset({ ...passwordReset, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // console.log("Effect", passwordReset);
  }, [userLoggedIn]);

  return (
    <div className="profilePage">
      <div className="profileTitle">Profile</div>
      {!userLoggedIn.isLoggedIn ? (
        <div className="profileContent">
          <a href="/login">Login</a> to access this page
        </div>
      ) : (
        <div className="profileContent">
          <div className="subTitle">Reset Password</div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: {
                lg: "left",
                md: "left",
                sm: "center",
                xs: "center",
              },
              width: "250px",
            }}
            component="form"
            onSubmit={handleOnSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="oldPassword"
              type="password"
              value={passwordReset.oldPassword}
              onChange={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordReset.newPassword}
              onChange={handleOnChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Confirm New Password"
              name="confirmedPassword"
              type="password"
              value={passwordReset.confirmedPassword}
              onChange={handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
          <div className="subTitle">Delete Account</div>
          <div className="warning">
            WARNING: THIS WILL PERMANENTLY DELETE YOUR ACCOUNT.
          </div>
          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              if (window.confirm("Are you sure to delete this record?")) {
                await deleteAccount();
              }
            }}
          >
            Delete
          </Button>
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
        </div>
      )}
    </div>
  );
}

export default Profile;
