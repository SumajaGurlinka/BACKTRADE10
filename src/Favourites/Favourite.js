import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  TextField,
  Paper,
} from "@mui/material";
import { Tooltip } from "@mui/joy";

import { RadioGroup, Radio } from "@mui/joy";

import Divider from "@mui/joy/Divider";

import { connect } from "react-redux";

import makeStyles from "@mui/styles/makeStyles";

import Typography from "@mui/joy/Typography";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Switch } from "@mui/joy";

import { toast } from "react-toastify";

import ShowChartIcon from "@mui/icons-material/ShowChart";

import { SessionTypes } from "../utils/sessionUtils";
const useStyles = makeStyles((theme) => {
  return {
    tabContainer: {
      position: "absolute",
      bottom: 0,
      width: "285px",
      marginBottom: "10px",
      marginLeft: "5px",
      marginRight: "5px",
      border: "1px solid #A9A9A9",

      borderRadius: "10px",
      "@media (max-width: 600px)": {
        width: "590px",
      },
    },
    tickerActionsContainer: {
      display: "none",
      position: "absolute",
      left: "210px",
      width: "50px",

      height: "30px",
      "@media (max-width: 600px)": {
        left: "120px",
        width: "400px",
      },
    },
    gridItemHovered: {
      "& $tickerActionsContainer": {
        display: "block",
      },
    },

    tickerActionWrapper: {
      display: "flex",

      justifyContent: "space-between",
    },
    tickerActionButton: {
      backgroundColor: "transparent",
      cursor: "pointer",
    },
  };
});

const Favourite = (props) => {
  const {
    user,

    getBuyAsync,
    stock,
    getSellAsync,
    getOrdersAsync,
    spicked,
    setPrice,

    getMarginAsync,

    sell,
  } = props;

  const [Tick, setTick] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [Qty, setQty] = useState("1");
  const [isbuying, setIsbuying] = useState(false);
  const [isselling, setIsselling] = useState(false);
  const [Qty1, setQty1] = useState("1");

  const [Price, setprice] = useState("");
  const [, setprice1] = useState("");
  const [handleqnty, setHandleqnty] = useState("");

  const [handleqnty1, setHandleqnty1] = useState("");
  useEffect(() => {
    const calculatedQnty = Qty * Price;
    const roundedQnty = calculatedQnty.toFixed(2);
    setHandleqnty(parseFloat(roundedQnty));
  }, [Qty, Price]);

  useEffect(() => {
    const calculatedQnty1 = Qty1 * Price;
    const roundedQnty1 = calculatedQnty1.toFixed(2);
    setHandleqnty1(parseFloat(roundedQnty1));
  }, [Qty1, Price]);

  const [hoveredItem, setHoveredItem] = useState(null);
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [showHighLow, setShowHighLow] = useState(false);
  const [showHighLow1, setShowHighLow1] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("up");
  const [arrowDirection1, setArrowDirection1] = useState("up");

  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    Object.values(stock.stockData).length / itemsPerPage
  );

  const handleNewOrder = (orderType, tickerSymbol, tickerPrice) => {
    console.log("handleNewOrder called with orderType:", orderType);
    console.log("tickerSymbol:", tickerSymbol);
    console.log("tickerPrice:", tickerPrice);

    if (orderType === "BUY") {
      setIsBuying(true);
      setIsSelling(false);
      setTick(tickerSymbol);
      setprice(tickerPrice);
      setprice1(tickerPrice);
    } else if (orderType === "SELL") {
      setIsBuying(false);
      setIsSelling(true);
      setTick(tickerSymbol);
      setprice(tickerPrice);
    }
  };

  const handleItemHover = (index) => {
    setHoveredItem(index);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };
  const getTickerColor = (percentage) => {
    if (percentage > 0) {
      return "green";
    } else if (percentage < 0) {
      return "red";
    }
  };
  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const handleQtyChange1 = (e) => {
    setQty1(e.target.value);
  };

  const handleCancel = () => {
    setIsBuying(false);
    setprice("");
    setQty("1");
  };
  const handleCancel1 = () => {
    setIsSelling(false);
    setprice("");
    setQty1("1");
  };
  const toggleHighLow = () => {
    setShowHighLow(!showHighLow);
    setArrowDirection(showHighLow ? "up" : "down");
    setPrice(showHighLow);
  };
  const toggleHighLow1 = () => {
    setShowHighLow1(!showHighLow1);
    setArrowDirection1(showHighLow1 ? "up" : "down");
    setPrice(showHighLow);
  };

  const handleBuy = async () => {
    setIsbuying(true);
    try {
      const data = {
        tick: Tick,
        Qty: Qty,
        Price: Price,
      };

      await getBuyAsync(data);
      await getMarginAsync();
      await getOrdersAsync();
      setIsBuying(false);
      setprice("");
      setQty("1");
      toast.success("Stock has been bought.");
      setIsbuying(false);
    } catch (error) {
      toast.error("Error placing the order. Please try again later.");
      setIsbuying(false);
    }
  };

  const handleSell = async () => {
    setIsselling(true);
    try {
      const data = {
        tick: Tick,
        Qty: Qty1,
      };

      await getSellAsync(data);
      await getMarginAsync();
      await getOrdersAsync();
      setIsSelling(false);
      setprice("");
      setQty1("1");
      const toasts = localStorage.getItem("toast");
      console.log("Before toast:", sell.sellData);
      toast.success(toasts);
      console.log("After toast");
      setIsselling(false);
    } catch (error) {
      if (error?.response?.data) {
        console.log("data:", error?.response?.data);
        toast.error(error.response.data);
      } else {
        toast.error("Error placing the order. Please try again later.");
      }
      setIsselling(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "300px",
          background: "#FCFCFC",
          marginLeft: "3px",
          marginTop: "0px",
          "@media (max-width: 600px)": {
            width: "610px",
            marginLeft: 0,
          },
        }}
      >
        <Box
          sx={{
            height: "69px",

            borderBottom: "2px solid #e7ebf0",

            gap: "10px",
            display: "flex",
            alignItems: "center",
            marginLeft: "0px",
            overflowX: "auto",
            cursor: "pointer",
            " &::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <>
            {" "}
            <ShowChartIcon sx={{ marginLeft: "10px", fontSize: "25px" }} />
            <Typography
              sx={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Stock Prices
            </Typography>
            {/* <TextField
            sx={{
              marginTop: "10px",
              marginLeft: "5px",
              marginRight: "5px",
              width: "290px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {},
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#6ddac5",
              },
              "@media (max-width: 600px)": {
                width: "600px",
                marginLeft: "5px",
                marginRight: "5px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ marginRight: "10px" }} />
                </InputAdornment>
              ),
            }}
            placeholder="Search eg:infy,nifty weekly"
          /> */}
          </>
        </Box>

        {spicked.isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {" "}
            {!user.paidSession &&
              user.activeSessionType === SessionTypes.SYSTEM_PICKED && (
                <>
                  <Box>
                    <>
                      {" "}
                      <Grid
                        container
                        style={{
                          marginLeft: "10px",
                          marginBottom: "10px",
                          marginTop: "27px",
                        }}
                      >
                        <Grid item xs={4} sm={4}>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Symbol
                          </div>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5}>
                          <div
                            style={{
                              color: "black",
                              fontSize: "14px",
                              textAlign: "left",
                              fontWeight: "bold",
                            }}
                          >
                            {arrowDirection === "up" ? "Price" : "High Price"}
                          </div>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            {arrowDirection === "up" ? "" : "Low Price"}
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  </Box>
                  {Object.values(spicked.spickedData)
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, id) => (
                      <>
                        {" "}
                        <Grid
                          container
                          style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            marginTop: "20px",
                          }}
                          key={id}
                        >
                          <Grid item xs={4} sm={4}>
                            <div style={{ fontSize: "14px" }}>
                              {item && item["01. symbol"].toUpperCase()}
                            </div>
                          </Grid>
                          <Grid item xs={2.5} sm={2.5}>
                            <div
                              style={{ fontSize: "14px", textAlign: "left" }}
                            >
                              {" "}
                              {showHighLow
                                ? parseFloat(item["03. high"]).toFixed(2)
                                : parseFloat(item["05. price"]).toFixed(2)}
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            onClick={() => toggleHighLow()}
                          >
                            <Tooltip
                              title={
                                arrowDirection === "down"
                                  ? "Expand Less"
                                  : "Expand More"
                              }
                              style={{ fontSize: "9px" }}
                            >
                              <div
                                style={{
                                  color: getTickerColor(item.percentage),
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                {arrowDirection === "down" ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </div>
                            </Tooltip>
                          </Grid>

                          <Grid item xs={3} sm={3}>
                            <div
                              style={{ fontSize: "14px", textAlign: "left" }}
                            >
                              {" "}
                              {showHighLow
                                ? parseFloat(item["04. low"]).toFixed(2)
                                : ""}
                            </div>
                          </Grid>
                          {!user.pausesSession && (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "300px",
                                  marginTop: "20px",
                                  fontsize: "2px",
                                  "@media (max-width: 600px)": {
                                    width: "100vw",
                                    gap: "50px",
                                    alignItems: "center",
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    background: "#4184f3",
                                    width: "40px",
                                    marginRight: "6px",
                                    marginLeft: "10px",
                                    display: "flex",
                                    padding: "1.5px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    color: "#FCFCFC",
                                    fontSize: "14px",
                                    "@media (max-width: 600px)": {
                                      width: "100px",
                                      marginLeft: "150px",
                                    },
                                  }}
                                  onClick={() =>
                                    handleNewOrder(
                                      "BUY",
                                      item["01. symbol"],
                                      parseFloat(item["05. price"]).toFixed(2)
                                    )
                                  }
                                >
                                  Buy
                                </Box>
                                <Box
                                  sx={{
                                    background: "#df514c",
                                    width: "40px",
                                    marginRight: "0px",
                                    marginLeft: "5px",
                                    height: "20px",
                                    display: "flex",
                                    padding: "1.5px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#FCFCFC",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    "@media (max-width: 600px)": {
                                      width: "100px",
                                    },
                                  }}
                                  onClick={() =>
                                    handleNewOrder(
                                      "SELL",
                                      item["01. symbol"].toUpperCase(),
                                      parseFloat(item["05. price"]).toFixed(2)
                                    )
                                  }
                                >
                                  Sell
                                </Box>
                              </Box>
                            </>
                          )}
                        </Grid>
                      </>
                    ))}

                  {isBuying && (
                    <Box
                      component={Paper}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,

                        top: "71px",
                        width: "300px",
                        height: "88.5vh",
                        background: "#FCFCFC",
                        border: "1px solid #f5f5f5",
                        zIndex: "10",
                        "@media (max-width: 600px)": {
                          top: "121px",
                          position: "absolute",
                          bottom: "0",
                          left: "0",

                          width: "602px",
                        },
                      }}
                    >
                      {" "}
                      <Box
                        sx={{
                          background: "#4184f3",
                          height: "70px",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          paddingLeft: "10px",
                          gap: "80px",
                        }}
                      >
                        <>
                          <div style={{ marginLeft: "8px", color: "white" }}>
                            Buy {Tick} x {Qty}
                          </div>{" "}
                          <Switch
                            size="sm"
                            variant="soft"
                            sx={{
                              position: "absolute",
                              right: "0px",
                              marginRight: "10px",
                            }}
                            checked={isSelling}
                            onChange={() => {
                              setIsBuying(!isBuying);
                              setIsSelling(!isSelling);
                            }}
                          />
                        </>
                      </Box>
                      <Box sx={{ paddingRight: "10px", paddingLeft: "10px" }}>
                        <div style={{ marginTop: "10px" }} required>
                          Quantity
                        </div>
                        <TextField
                          size="small"
                          label="Qty"
                          fullWidth
                          type="number"
                          value={Qty}
                          onChange={handleQtyChange}
                          inputProps={{
                            min: 1,
                            step: 2,
                          }}
                          style={{ marginTop: "1em" }}
                        />
                        <div
                          style={{ marginTop: "10px", marginBottom: "0px" }}
                          required
                        >
                          Price
                        </div>
                        <TextField
                          size="small"
                          label="Price"
                          fullWidth
                          value={handleqnty}
                          style={{ marginTop: "1em" }}
                        />

                        <Divider style={{ marginTop: "200px" }}></Divider>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "0px",
                          margin: "20px",
                        }}
                      >
                        <Button
                          style={{
                            color: "#FCFCFC",
                            background: "#4184f3",
                            width: "120px",
                            marginRight: "5px",
                            textTransform: "none",
                            cursor: isbuying ? "not-allowed" : "pointer",
                          }}
                          onClick={handleBuy}
                          disabled={isbuying}
                        >
                          {isbuying ? "Buying..." : "Buy"}
                        </Button>
                        <Button
                          style={{
                            color: "#6ddac5",
                            background: "#FCFCFC",
                            width: "120px",
                            border: "1px solid #6ddac5",
                            marginRight: "5px",
                            textTransform: "none",
                          }}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {isSelling && (
                    <Box
                      component={Paper}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        top: "71px",
                        width: "300px",
                        height: "88.5vh",
                        background: "#FCFCFC",
                        border: "1px solid #f5f5f5",
                        zIndex: "10",
                        "@media (max-width: 600px)": {
                          top: "121px",
                          position: "absolute",
                          bottom: "0",
                          left: "0",

                          width: "602px",
                        },
                      }}
                    >
                      {" "}
                      <Box
                        sx={{
                          background: "#df514c",
                          height: "70px",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          paddingLeft: "10px",
                          gap: "80px",
                        }}
                      >
                        <>
                          <div style={{ marginLeft: "8px", color: "white" }}>
                            Sell {Tick} x {Qty1}
                          </div>{" "}
                          <Switch
                            size="sm"
                            variant="soft"
                            sx={{
                              position: "absolute",
                              right: "0px",
                              marginRight: "10px",
                            }}
                            checked={isSelling}
                            onChange={() => {
                              setIsBuying(!isBuying);
                              setIsSelling(!isSelling);
                            }}
                          />
                        </>
                      </Box>
                      <Box sx={{ paddingRight: "10px", paddingLeft: "10px" }}>
                        <div
                          style={{ marginTop: "10px", marginBottom: "0px" }}
                          required
                        >
                          Quantity
                        </div>
                        <TextField
                          size="small"
                          label="Qty"
                          fullWidth
                          type="number"
                          value={Qty1}
                          onChange={handleQtyChange1}
                          inputProps={{
                            min: 1,
                            step: 2,
                          }}
                          style={{ marginTop: "1em" }}
                        />
                        <div
                          style={{ marginTop: "10px", marginBottom: "0px" }}
                          required
                        >
                          Price
                        </div>
                        <TextField
                          size="small"
                          label="Price"
                          fullWidth
                          value={handleqnty1}
                          onChange={() => {}}
                          style={{ marginTop: "1em" }}
                        />

                        <Divider style={{ marginTop: "200px" }}></Divider>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "0px",
                          margin: "20px",
                          textTransform: "none",
                        }}
                      >
                        <Button
                          style={{
                            color: "#FCFCFC",
                            background: "#df514c",
                            width: "120px",
                            marginRight: "5px",
                            textTransform: "none",
                            cursor: isselling ? "not-allowed" : "pointer",
                            "@media (max-width: 600px)": {
                              width: "220px",
                              background: "yellow",
                            },
                          }}
                          onClick={handleSell}
                          disabled={isselling}
                        >
                          {isselling ? "Selling..." : "Sell"}
                        </Button>
                        <Button
                          style={{
                            color: "#6ddac5",
                            background: "#FCFCFC",
                            width: "120px",
                            border: "1px solid #6ddac5",
                            marginRight: "5px",
                            textTransform: "none",
                          }}
                          onClick={handleCancel1}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              )}{" "}
          </>
        )}
        {stock.isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!user.paidSession &&
              user.activeSessionType === SessionTypes.SELECT_DATE && (
                <>
                  <Box>
                    <>
                      {" "}
                      <Grid
                        container
                        style={{
                          marginLeft: "10px",
                          marginBottom: "10px",
                          marginTop: "27px",
                        }}
                      >
                        <Grid item xs={4} sm={4}>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            Symbol
                          </div>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5}>
                          <div
                            style={{
                              color: "black",
                              fontSize: "14px",
                              textAlign: "left",
                              fontWeight: "bold",
                            }}
                          >
                            {arrowDirection1 === "up" ? "Price" : "High Price"}
                          </div>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                            {arrowDirection1 === "up" ? "" : "Low Price"}
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  </Box>
                  {Object.values(stock.stockData)
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => (
                      <>
                        {" "}
                        <Grid
                          container
                          style={{
                            marginLeft: "10px",
                            marginBottom: "10px",
                            marginTop: "20px",
                          }}
                          key={index}
                          className={
                            hoveredItem === index ? classes.gridItemHovered : ""
                          }
                          onMouseEnter={() => handleItemHover(index)}
                          onMouseLeave={handleItemLeave}
                        >
                          <Grid item xs={4} sm={4}>
                            <div style={{ fontSize: "14px" }}>
                              {item.symbol.toUpperCase()}
                            </div>
                          </Grid>
                          <Grid item xs={2.5} sm={2.5}>
                            <div
                              style={{ fontSize: "14px", textAlign: "left" }}
                            >
                              {" "}
                              {showHighLow1
                                ? parseFloat(item.highPrice).toFixed(2)
                                : parseFloat(item.openPrice).toFixed(2)}
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            sm={2}
                            onClick={() => toggleHighLow1()}
                          >
                            <Tooltip
                              title={
                                arrowDirection1 === "down"
                                  ? "Expand Less"
                                  : "Expand More"
                              }
                              style={{ fontSize: "9px" }}
                            >
                              <div
                                style={{
                                  color: getTickerColor(item.percentage),
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                {arrowDirection1 === "down" ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={3} sm={3}>
                            <div
                              style={{ fontSize: "14px", textAlign: "left" }}
                            >
                              {" "}
                              {showHighLow1
                                ? parseFloat(item.lowPrice).toFixed(2)
                                : ""}
                            </div>
                          </Grid>

                          {/* {!user.pausesSession ? (
  hoveredItem === index && (
    <div className={classes.tickerActionsContainer}>
      <div className={classes.tickerActionWrapper}>
        <Box
          sx={{
            background: "#4184f3",
            width: "38px",
            marginRight: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "#FCFCFC",
            "@media (max-width: 600px)": {
              width: "50px",
              marginLeft: "90px",
              marginRight: "0px",
            },
          }}
          onClick={() =>
            handleNewOrder("BUY",  item.symbol,parseFloat(item.highPrice ))
          }
        >
          Buy
        </Box>
        <Box
          sx={{
            background: "#df514c",
            width: "38px",
            marginRight: "0px",
            marginLeft: "5px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#FCFCFC",
            cursor: "pointer",
            "@media (max-width: 600px)": {
              width: "50px",
              marginRight: "30px",
            },
          }}
          onClick={() =>
            handleNewOrder("SELL", item.symbol,item.highPrice )
          }
        >
          Sell
        </Box>
      </div>
    </div>
  )
) : null} */}
                        </Grid>
                      </>
                    ))}

                  {isBuying && (
                    <Box
                      component={Paper}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,

                        top: "71px",
                        width: "300px",
                        height: "88.5vh",
                        background: "#FCFCFC",
                        border: "1px solid #f5f5f5",
                        zIndex: "10",
                        "@media (max-width: 600px)": {
                          top: "121px",
                          position: "absolute",
                          bottom: "0",
                          left: "0",

                          width: "602px",
                        },
                      }}
                    >
                      {" "}
                      <Box
                        sx={{
                          background: "#4184f3",
                          height: "70px",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          paddingLeft: "10px",
                          gap: "80px",
                        }}
                      >
                        <>
                          <Typography
                            sx={{ marginLeft: "8px", color: "white" }}
                          >
                            Buy {Tick} x {Qty}
                          </Typography>{" "}
                          <Switch
                            size="sm"
                            variant="soft"
                            sx={{
                              position: "absolute",
                              right: "0px",
                              marginRight: "10px",
                            }}
                            checked={isSelling}
                            onChange={() => {
                              setIsBuying(!isBuying);
                              setIsSelling(!isSelling);
                            }}
                          />
                        </>
                      </Box>
                      <Box sx={{ paddingRight: "10px", paddingLeft: "10px" }}>
                        <RadioGroup
                          defaultValue="Intraday"
                          size="sm"
                          style={{
                            marginTop: "2em",
                            justifyContent: "left",
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Radio value="Intraday" label=" Intraday MIS" />
                          <Radio value="NRML" label=" Overnight NRML" />
                        </RadioGroup>
                        <TextField
                          size="small"
                          label="Qty"
                          fullWidth
                          type="number"
                          value={Qty}
                          onChange={handleQtyChange}
                          inputProps={{
                            min: 1,
                            step: 2,
                          }}
                          style={{ marginTop: "2em" }}
                        />
                        <TextField
                          size="small"
                          label="Price"
                          fullWidth
                          value={handleqnty}
                          style={{ marginTop: "2em" }}
                        />

                        <RadioGroup
                          defaultValue="market"
                          size="sm"
                          style={{
                            marginTop: "2em",
                            justifyContent: "left",
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Radio value="market" label="Market" />
                          <Radio value="limit" label="Limit" />
                        </RadioGroup>
                        <Divider style={{ marginTop: "150px" }}></Divider>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "0px",
                          margin: "20px",
                        }}
                      >
                        <Button
                          style={{
                            color: "#FCFCFC",
                            background: "#4184f3",
                            width: "120px",
                            marginRight: "5px",
                            textTransform: "none",
                          }}
                          onClick={handleBuy}
                        >
                          Buy
                        </Button>
                        <Button
                          style={{
                            color: "#6ddac5",
                            background: "#FCFCFC",
                            width: "120px",
                            border: "1px solid #6ddac5",
                            marginRight: "5px",
                            textTransform: "none",
                          }}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {isSelling && (
                    <Box
                      component={Paper}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        top: "71px",
                        width: "300px",
                        height: "88.5vh",
                        background: "#FCFCFC",
                        border: "1px solid #f5f5f5",
                        zIndex: "10",
                        "@media (max-width: 600px)": {
                          top: "121px",
                          position: "absolute",
                          bottom: "0",
                          left: "0",

                          width: "602px",
                        },
                      }}
                    >
                      {" "}
                      <Box
                        sx={{
                          background: "#df514c",
                          height: "70px",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          paddingLeft: "10px",
                          gap: "80px",
                        }}
                      >
                        <>
                          <Typography
                            sx={{ marginLeft: "8px", color: "white" }}
                          >
                            Sell {Tick} x {Qty}
                          </Typography>{" "}
                          <Switch
                            size="sm"
                            variant="soft"
                            sx={{
                              position: "absolute",
                              right: "0px",
                              marginRight: "10px",
                            }}
                            checked={isSelling}
                            onChange={() => {
                              setIsBuying(!isBuying);
                              setIsSelling(!isSelling);
                            }}
                          />
                        </>
                      </Box>
                      <Box sx={{ paddingRight: "10px", paddingLeft: "10px" }}>
                        <RadioGroup
                          defaultValue="Intraday"
                          size="sm"
                          style={{
                            marginTop: "2em",
                            justifyContent: "left",
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Radio value="Intraday" label=" Intraday MIS" />
                          <Radio value="NRML" label=" Overnight NRML" />
                        </RadioGroup>
                        <TextField
                          size="small"
                          label="Qty"
                          fullWidth
                          type="number"
                          value={Qty1}
                          onChange={handleQtyChange1}
                          inputProps={{
                            min: 1,
                            step: 2,
                          }}
                          style={{ marginTop: "2em" }}
                        />
                        <TextField
                          size="small"
                          label="Price2"
                          fullWidth
                          value={handleqnty1}
                          onChange={() => {}}
                          style={{ marginTop: "2em" }}
                        />
                        <RadioGroup
                          defaultValue="market"
                          size="sm"
                          style={{
                            marginTop: "2em",
                            justifyContent: "left",
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                          }}
                        >
                          <Radio value="market" label="Market" />
                          <Radio value="limit" label="Limit" />
                        </RadioGroup>
                        <Divider style={{ marginTop: "150px" }}></Divider>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "0px",
                          margin: "20px",
                          textTransform: "none",
                        }}
                      >
                        <Button
                          style={{
                            color: "#FCFCFC",
                            background: "#df514c",
                            width: "120px",
                            marginRight: "5px",
                            textTransform: "none",
                            "@media (max-width: 600px)": {
                              width: "220px",
                              background: "yellow",
                            },
                          }}
                          onClick={handleSell}
                        >
                          Sell
                        </Button>
                        <Button
                          style={{
                            color: "#6ddac5",
                            background: "#FCFCFC",
                            width: "120px",
                            border: "1px solid #6ddac5",
                            marginRight: "5px",
                            textTransform: "none",
                          }}
                          onClick={handleCancel1}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {!user.paidSession &&
                    user.activeSessionType === SessionTypes.SELECT_DATE && (
                      <Box>
                        {" "}
                        <Box className={classes.tabContainer}>
                          {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                          ).map((pageNumber) => (
                            <Button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              style={{
                                background:
                                  pageNumber === currentPage ? "#6ddac5" : "",
                                fontSize: "12px",

                                margin: "5px",
                                color: "black",
                                width: "50px !important",
                                borderRadius: "8px",
                              }}
                            >
                              {pageNumber}
                            </Button>
                          ))}
                        </Box>
                      </Box>
                    )}
                </>
              )}
          </>
        )}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  buy: state.buy,
  sell: state.sell,
  stock: state.stock,
  spicked: state.spicked,
});

const mapDispatchToProps = (dispatch) => ({
  setScroll: dispatch.user.setScroll,
  setPrice: dispatch.user.setPrice,
  setLoading: dispatch.stock.setLoading,
  getBuyAsync: dispatch.buy.getBuyAsync,
  getSellAsync: dispatch.sell.getSellAsync,
  getOrdersAsync: dispatch.orders.getOrdersAsync,
  setQuantitySession: dispatch.user.setQuantitySession,
  getMarginAsync: dispatch.margin.getMarginAsync,
});
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
