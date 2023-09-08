import React, { useEffect } from "react";

import {  Box,  Grid } from "@mui/material";
import Divider from "@mui/joy/Divider";

import { connect } from "react-redux";
import { SessionTypes } from "../utils/sessionUtils";
import jwtDecode from "jwt-decode";

import { toast } from "react-toastify";

const Dashboard = (props) => {
  const { user, getMarginAsync, margin } = props;

  const details = localStorage.getItem("token");
  const userDetails = jwtDecode(details);
  const firstName = userDetails.firstname;
  const marginAvailable = margin.marginData.marginAvailable;
  const marginUsed = margin.marginData.marginUsed;

  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  // const formatNumber = (num) => {
  //   if (num >= 10000000) {
  //     return (num / 10000000) + "cr";
  //   } else if (num >= 100000) {
  //     return (num / 100000) + "L";
  //   } else if (num >= 1000) {
  //     return (num / 1000) + "k";
  //   } else {
  //     return num + " rupees";
  //   }
  // };
  // const formattedMarginUsed = formatNumber(marginUsed);
  // const formattedMarginavailable = formatNumber(marginAvailable);

  const getmargin = async () => {
    try {
      await getMarginAsync();
    } catch (error) {
      if (error?.response?.data) {
        console.log("data:",error?.response?.data);
    
        toast.error(error.response.data);
      } 
    }
  };

  useEffect(() => {
    getmargin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMarginAsync]);

  return (
    <>
      <Box
        sx={{
          height: "88.5vh",
          background: "#FCFCFC",
          marginLeft: "1px",

          overflow: user.scroll ? "auto" : "",
          "@media (max-width: 600px)": {
            width: "100%",
            marginLeft: 0,
            height: "1330px",
          },
        }}
      >
        <Box
          sx={{
            height: "60px",

            display: "flex",

            alignItems: "center",

            marginLeft: "10px",

            marginRight: "10px",
          }}
        >
          <div style={{ fontSize: "25px", margin: "10px" }}>
            Hi, {formattedFirstName}
          </div>
        </Box>
        <Divider sx={{ margin: "10px" }} />
        <Grid container style={{ marginLeft: "20px", marginTop: "20px" }}>
          <Grid item xs={6} sm={6}>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>
              {marginAvailable}
            </div>
          </Grid>
          <Grid item xs={3} sm={3}>
            <div>Margin Used</div>
          </Grid>
          <Grid item xs={3} sm={3}>
            <div>{marginUsed}</div>
          </Grid>
        </Grid>
        <Grid container style={{ marginLeft: "20px", marginBottom: "40px" }}>
          <Grid item xs={6} sm={6}>
            <div>Margin Available</div>
          </Grid>
          <Grid item xs={3} sm={3}>
            <div>Opening Balance</div>
          </Grid>
          <Grid item xs={3} sm={3}>
            <div>10,000,000</div>
          </Grid>
        </Grid>
        <div
          style={{
            margin: "20px",
            fontWeight: "bold",
          }}
        >
          Session Details
        </div>
        <Divider sx={{ marginLeft: "10px", marginRight: "10px" }} />
        <Grid container style={{ margin: "20px" }}>
          <Grid item xs={6} sm={6}>
            <div style={{ fontWeight: "bold" }}>Session Type</div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div>{user?.activeSessionType}</div>
          </Grid>
        </Grid>
        {user.activeSessionType === SessionTypes.SELECT_DATE && (
          <Grid container style={{ marginLeft: "20px" }}>
            <Grid item xs={6} sm={6}>
              <div style={{ fontWeight: "bold" }}>Date</div>
            </Grid>
            <Grid item xs={6} sm={6}>
              <div>{user.date}</div>
            </Grid>
          </Grid>
        )}{" "}
      </Box>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  margin: state.margin,
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,
  setActiveSessionType: dispatch.user.setActiveSessionType,
  getOrdersAsync: dispatch.orders.getOrdersAsync,
  setQuantitySession: dispatch.user.setQuantitySession,
  getMarginAsync: dispatch.margin.getMarginAsync,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
