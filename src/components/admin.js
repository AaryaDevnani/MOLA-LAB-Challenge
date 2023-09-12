import React, { useContext, useEffect, useState } from "react";

import UserContext from "../userContext";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

function Admin() {
  const [users, setUsers] = useState([]);

  const { userLoggedIn } = useContext(UserContext);

  const handleClick = async (event, cellValues) => {
    // console.log(cellValues.row);
    if (cellValues.row.email == userLoggedIn.userData.email) {
      console.log("Cannot Demote Self");
    } else {
      let action = "";
      if (cellValues.row.isAdmin) {
        action = "removeadmin";
        //   console.log(await response.json());
      } else {
        action = "makeadmin";
      }
      const response = await fetch(`http://localhost:5000/api/user/${action}`, {
        method: "POST",
        body: JSON.stringify({
          objectID: userLoggedIn.userData._id,
          email: cellValues.row.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await response.json();
      console.log(res);
    }
  };

  const fetchUsers = async () => {
    let obj = { objectID: userLoggedIn.userData._id };
    const response = await fetch("http://localhost:5000/api/user/allusers", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let data = await response.json();
      setUsers(data.output);
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

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
            // variant="contained"
            // color="black"
            onClick={(e) => {
              handleClick(e, cellValues);
            }}
          >
            {cellValues.row.isAdmin ? <>Demote</> : <>Promote</>}
            {/* Promote */}
          </Button>
        );
      },
    },
  ];
  return (
    <div className="homePage">
      <div className="title">Users</div>
      <div style={{ width: "100%", height: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.email}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          sx={{ mt: "15px" }}
        />
      </div>
    </div>
  );
}

export default Admin;
