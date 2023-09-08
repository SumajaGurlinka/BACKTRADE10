import React, { useEffect, useState } from "react";
import { Box, Paper, TablePagination } from "@mui/material";
import Table from "@mui/joy/Table";

import { connect } from "react-redux";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   borderBottom: "0px solid #fcfcfc",
// }));

const Orders = (props) => {
  const {
    orders,

    getOrdersAsync,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  // const total = quantity * avgPrice;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getOrders = async () => {
    try {
      await getOrdersAsync();
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOrdersAsync]);
  return (
    <>
      <Box
        className="order_form"
        sx={{
          height: "88.5vh",
          background: "#FCFCFC",
          marginLeft: "1px",

          "@media (max-width: 600px)": {
            width: "100%",
            height: "1330px",
            marginLeft: "0px",
          },
        }}
      >
        <Table sx={{ width: "100%" }} component={Paper}>
          <thead>
            <tr>
              <th
                style={{
                  width: "20%",
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Time
              </th>

              <th
                style={{
                  width: "10%",
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Type
              </th>
              <th
                style={{
                  width: "5%",
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Symbol
              </th>
              <th
                style={{
                  textAlign: "right",
                  width: "5%",
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Quantity.
              </th>
              <th
                style={{
                  textAlign: "right",
                  width: "10%",
                  marginRight: "10px",
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Average.Price
              </th>
              <th
                style={{
                  width: "18%",
                  textAlign: "center",
                  color: "black",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.ordersData && orders?.ordersData.length > 0
              ? orders?.ordersData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <tr>
                      <td style={{ width: "20%" }}>{order.time}</td>
                      <td style={{ width: "10%" }}>
                        {" "}
                        <Box
                          sx={{
                            background:
                              order.type === "BUY" ? "#ecf2fe" : "#fdeded",
                            color: order.type === "BUY" ? "blue" : "red",
                            width: "32px",
                            paddingLeft: "5px",
                          }}
                        >
                          {order.type}
                        </Box>
                      </td>
                      <td style={{ width: "5%" }}>{order.symbol}</td>
                      <td
                        style={{
                          textAlign: "right",
                          width: "5%",
                          marginRight: "10px",
                        }}
                      >
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
          component="div"
          count={orders.ordersData.length}
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
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,
  setActiveSessionType: dispatch.user.setActiveSessionType,
  getOrdersAsync: dispatch.orders.getOrdersAsync,
  setQuantitySession: dispatch.user.setQuantitySession,
  setTotalSession: dispatch.user.setTotalSession,
  getBuyAsync: dispatch.buy.getBuyAsync,
  getSellAsync: dispatch.sell.getSellAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
