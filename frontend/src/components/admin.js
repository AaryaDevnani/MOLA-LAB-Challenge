import React, { useContext, useEffect, useState } from "react";
import UserContext from "../userContext";
import FileUpload from "./fileUpload";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Snackbar, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function Admin() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [users, setUsers] = useState([]);

  const { userLoggedIn } = useContext(UserContext);

  const handleClick = async (event, cellValues) => {
    // console.log(cellValues.row);
    if (cellValues.row.email == userLoggedIn.userData.email) {
      // console.log("Cannot Demote Self");
      setToast({
        open: true,
        message: "Cannot Demote Self",
        severity: "error",
      });
    } else {
      let action = "";
      if (cellValues.row.isAdmin) {
        action = "removeadmin";
      } else {
        action = "makeadmin";
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}api/user/${action}`,
        {
          method: "POST",
          body: JSON.stringify({
            objectID: userLoggedIn.userData._id,
            email: cellValues.row.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let res = await response.json();
      console.log(res);
      if (res.modifiedCount == 1) {
        setToast({
          open: true,
          message: "Users admin priveleges changed successfully",
          severity: "success",
        });
      }
    }
    fetchUsers();
  };

  const fetchUsers = async () => {
    let obj = { objectID: userLoggedIn.userData._id };
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}api/user/allusers`,
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      let data = await response.json();
      setUsers(data.output);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [toast]);

  const columns = [
    // { field: "id", headerName: "Email", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "isAdmin", headerName: "isAdmin", width: 70 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "Promote / Demote",
      renderCell: (cellValues) => {
        return (
          <Button
            onClick={(e) => {
              handleClick(e, cellValues);
            }}
          >
            {cellValues.row.isAdmin ? <>Demote</> : <>Promote</>}
          </Button>
        );
      },
    },
  ];
  return (
    <div className="homePage">
      <div style={{ width: "100%", height: "100%" }}>
        {!userLoggedIn.isAdmin ? (
          <div className="profileContent">
            You do not have access to this page.
            <br /> Only Admins can view this page.
            <br />
            If you think this is a mistake contact an admin.
          </div>
        ) : (
          <>
            <div className="title">Add Publications</div>
            <FileUpload />
            <div className="title">Users</div>
            <DataGrid
              rows={users}
              columns={columns}
              getRowId={(row) => row.email}
              align="center"
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              sx={{ mt: "15px", mb: "30px" }}
            />
          </>
        )}
      </div>
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
  );
}

export default Admin;
