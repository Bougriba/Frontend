import React, { useEffect } from "react";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Typography,
  gridClasses,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { allUserAction, userDeleteAction } from "../../redux/actions/userAction";
import { useState } from "react";


const DashUsers = () => {
  // const pageSize = 3;
    const [pageSize, setPageSize] = useState(5);
    
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUserAction(pageNumber, pageSize));
  },[pageNumber,pageSize]);

  const { data, totalPages, loading } = useSelector(
    (state) => state.allusers.users
    );
   

  const [data1, setData1] = useState([]);
  useEffect(() => {
    setData1(data !== undefined && data.length > 0 ? data : []);
  }, [data]);
  console.log(data1);
  const deleteUserById = (e, id) => {
    dispatch(userDeleteAction(id))
    dispatch(allUserAction())
  };

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      width: 150,
      editable: true,
    },

    {
      field: "email",
      headerName: "E_mail",
      width: 150,
    },

    {
      field: "fullName",
      headerName: "fullName",
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "phoneNumber",
      width: 150,
    },

    {
      field: "role",
      headerName: "User status",
      width: 150,
      // renderCell: (params) => (
      //     params.row.role === "admin" ? "admin" : "Regular user"
      // )
    },

    {
      field: "createdAt",
      headerName: "Creation date",
      width: 150,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 300,
      renderCell: (values) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
          <Button variant="contained">
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/edit/user/${values.row.id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteUserById(e, values.row.id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
    <Box >

        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
            All users
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                  <Button variant='contained' color="success" startIcon={<AddIcon />}> Create user</Button>
                  
        </Box>
        <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{

                        '& .MuiTablePagination-displayedRows': {
                            color: 'white',
                        },
                        color: 'white',
                        [`& .${gridClasses.row}`]: {
                            bgcolor: (theme) =>
                                // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                theme.palette.secondary.main
                        },
                        button: {
                            color: '#ffffff'
                        }

                    }}
                    getRowId={(row) => row.id}
                    rows={data1}
                    columns={columns}
                    pageSize={3}
                    rowsPerPageOptions={[3]}
                    checkboxSelection
                    slots={{ toolbar: GridToolbar }}
                />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              color="primary"
              onChange={(event, value) => setPageNumber(value)}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default DashUsers;
