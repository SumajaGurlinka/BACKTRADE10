import React, { useEffect, useState } from "react";
import {
  
  Box,
 
  Paper,
 
 
  
  TablePagination,
} from "@mui/material";
import Table from "@mui/joy/Table";
import { Tooltip } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";


import {  toast } from "react-toastify";

import { connect } from "react-redux";
import { useNavigate } from "react-router";
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   borderBottom: "0px solid #fcfcfc",
// }));

const AdminStock = (props) => {
  const {
    
   
    getAdminstockAsync,
    adminstock,
  } = props;

  // const columns = [
  //   { label: "Time", accessor: "Time" },
  //   { label: "User Name", accessor: "User Name" },

  //   { label: "Type", accessor: "type" },
  //   { label: "Instrument", accessor: "Instrument" },
  //   { label: "Qty.", accessor: "Qty" },
  //   { label: "Avg.Price", accessor: "AvgPrice" },
  //   { label: "Status", accessor: "Status" },
  // ];

  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const arrow = () => {
    navigate("/admin");
  };

  const getAdminstock = async () => {
    try {
      await getAdminstockAsync();
      // toast.success("Stock data fetched successfully!");
    } catch (error) {
      toast.error("Error fetching stock data!");
    }
  };

  useEffect(() => {
    getAdminstock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        className="order_form"
        sx={{
          height: "100vh",
          background: "#FCFCFC",
          marginLeft: "1px",
          marginTop: "0px",
          "@media (max-width: 600px)": {
            width: "100%",
            height: "915px",
            marginLeft: "0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexwrap: "wrap",
            marginBottom: "10px",
          }}
        >
          <Tooltip title="Back to admin" placement="bottom-end">
            <IconButton
              onClick={arrow}
              sx={{ marginTop: "10px", marginLeft: "3px" }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <div style={{ fontSize: "28px", marginTop: "10px" }}>
            Users Orders Summary{" "}
          </div>
        </Box>
        <Table sx={{ width: "98%", marginLeft: "12px" }} component={Paper}>
          <thead>
            <tr>
              <th style={{ width: "20%", color: "black" }}>Time</th>
              <th style={{ width: "10%", color: "black" }}>User Name</th>
              <th style={{ width: "5%", color: "black" }}>Type</th>
              <th style={{ width: "5%", color: "black" }}>Symbol</th>

              <th style={{ textAlign: "right", width: "5%", color: "black" }}>
                Quantity.
              </th>
              <th
                style={{
                  textAlign: "right",
                  width: "10%",
                  marginRight: "10px",
                  color: "black",
                }}
              >
                Average.Price
              </th>
              <th style={{ width: "18%", textAlign: "center", color: "black" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {adminstock?.adminstockData && adminstock?.adminstockData.length > 0
              ? adminstock?.adminstockData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <tr>
                      <td style={{ width: "20%" }}>{order.time}</td>
                      <td style={{ width: "10%" }}>
                        {order.user.firstname.charAt(0).toUpperCase() +
                          order.user.firstname.slice(1)}
                      </td>
                      <td style={{ width: "5%" }}>{order.type}</td>
                      <td style={{ width: "5%" }}>{order.symbol}</td>
                      <td style={{ textAlign: "right", width: "5%" }}>
                        {order.quantity}
                      </td>
                      <td
                        style={{
                          textAlign: "right",
                          width: "10%",
                          marginRight: "10px",
                        }}
                      >
                        {order.avgPrice.toFixed(2)}
                      </td>
                      <td style={{ width: "18%", textAlign: "center" }}>
                        {order.status}
                      </td>
                    </tr>
                  ))
              : null}
          </tbody>
        </Table>

        <TablePagination
          style={{ width: "97%", marginLeft: "10px" }}
          component="div"
          count={adminstock.adminstockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  orders: state.orders,
  adminstock: state.adminstock,
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,
  setActiveSessionType: dispatch.user.setActiveSessionType,
  getOrdersAsync: dispatch.orders.getOrdersAsync,
  getAdminstockAsync: dispatch.adminstock.getAdminstockAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminStock);
