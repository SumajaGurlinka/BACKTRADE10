import React, { useState, useEffect } from "react";

import { Button, TextField, Typography } from "@mui/material";

import { Box, Grid } from "@mui/material";

import axios from "axios";

import makeStyles from "@mui/styles/makeStyles";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { SessionTypes } from "../utils/sessionUtils";

import { ToastContainer, toast } from "react-toastify";

import WebStoriesIcon from "@mui/icons-material/WebStories";

import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { connect } from "react-redux";

import Header1 from "../Containers/Header1";

import Favourite from "../Favourites/Favourite";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
// import Select, { components } from "react-select";

import { Select } from "@mui/material";

import { MARKET_PATTERNS } from "../data/MarketPatterns";

import { MenuItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100vh",

    width: "100vw",

    display: "flex",

    flexDirection: "column",
  },

  dialogPaper: {
    "&::-webkit-scrollbar": {
      display: "none",
    },

    overflow: "hidden",
  },
}));

const FullPaneItems = (props) => {
  const classes = useStyles();

  const marketPatterns = MARKET_PATTERNS;

  const {
    stock,

    getStockAsync,

    user,

    setPaidSession,

    setActiveSessionType,
getSpickedAsync,
    setDate,
  } = props;

  const [selectedBox, setSelectedBox] = useState(0);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedSessionType, setSelectedSessionType] = useState(null);

  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [selectedSymbol1, setSelectedSymbol1] = useState("AAPL");
  const [isFavouriteOpen, setIsFavouriteOpen] = useState(false);

  const [marketPattern, setMarketPattern] = useState(marketPatterns[0]);

 

  const handleContinue = async () => {
    setPaidSession(false);
    setDate(marketPattern);
  
    try {
      if (selectedBox === 0) {
        
        const data = {
          selectedSymbol: selectedSymbol,
          marketPattern: marketPattern,
        };
        await getStockAsync(data);
      } else if (selectedBox === 1) {
       
        const data = {
          selectedSymbol: selectedSymbol1,
         
        };
        await getSpickedAsync(data);console.log("spicked");
      } 
     
    } catch (error) {
      
    }
  };
  const handleSymbolChange = (e) => {
    const { value } = e.target;

    setSelectedSymbol(value);
  };
  const handleSymbolChange1 = (e) => {
    const { value } = e.target;

    setSelectedSymbol1(value);
  };

  const handleMarketPatternChange = (e) => {
    setMarketPattern(e.target.value);
  };

  const handleBoxClick = (boxIndex) => {
    let sessionType;

    switch (boxIndex) {
      case 0:
        sessionType = SessionTypes.SELECT_DATE;

        break;

      case 1:
        sessionType = SessionTypes.SYSTEM_PICKED;

        break;

      case 2:
        sessionType = SessionTypes.MARKET_PATTERN;

        break;

      default:
        sessionType = "not sent";

        break;
    }

    setSelectedBox(boxIndex);

    setSelectedSessionType(sessionType);

    setActiveSessionType(sessionType);
  };

  return (
    <>
      <div className={classes.app}>
        <Grid container style={{ height: "100vh" }}>
        <Box
  sx={{
    height: "100vh",
    width: "100vw",
    margin: 0,
    display: isMobile ? "" : "flex",
    flexDirection: isMobile ? "column" : "row",
   
  }}
>
{!isMobile && <Favourite />}


  <Box sx={{ flex: 2 ,}}>
    <Header1 />
  </Box>
  
</Box>
        </Grid>

        <Dialog
          open={user.paidSession}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle>Start your Session</DialogTitle>

          <DialogContent>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box
                sx={{
                  border:
                    selectedBox === 0 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  borderRadius: "10px",

                  width: "100px",

                  margin: "8px",

                  display: "flex",

                  alignItems: "center",

                  flexDirection: "column",

                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(0)}
              >
                <CalendarMonthIcon sx={{ fontSize: 32 }} />

                {SessionTypes.SELECT_DATE}
              </Box>

              <Box
                sx={{
                  border:
                    selectedBox === 1 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  width: "100px",

                  margin: "8px",

                  display: "flex",

                  alignItems: "center",

                  borderRadius: "10px",

                  flexDirection: "column",

                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(1)}
              >
                <WebStoriesIcon sx={{ fontSize: 32 }} />

                {SessionTypes.SYSTEM_PICKED}
              </Box>

              <Box
                sx={{
                  border:
                    selectedBox === 2 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  width: "110px",

                  margin: "8px 8px ",

                  display: "flex",

                  alignItems: "center",

                  borderRadius: "10px",

                  flexDirection: "column",

                  justifyContent: "center",
                }}
                onClick={() => handleBoxClick(2)}
              >
                <WaterfallChartIcon sx={{ fontSize: 32 }} />

               {SessionTypes.MARKET_PATTERN}
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ flexDirection: "column", alignItems: "center" }}>
            {selectedBox === 0 && (
              <>
                {" "}
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "none",

                      height: "40px",
                    },

                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: "",
                    },

                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#6ddac5",

                      borderWidth: "3px",
                    },

                    marginLeft: "8px",

                    marginBottom: "8px",
                  }}
                  fullWidth
                  variant="outlined"
                  value={selectedSymbol} 
                  onChange={handleSymbolChange}
                  placeholder="Enter the selected symbol" 
                />
                <Select
                  fullWidth
                  variant="outlined"
                  onChange={handleMarketPatternChange}
                  value={marketPattern}
                  menuplacement="bottom"
                  menuposition="fixed"
                  size="small"
                  sx={{ marginBottom: "10px" }}
                >
                  {marketPatterns.map((marketPattern, index) => (
                    <MenuItem key={index} value={marketPattern}>
                      {marketPattern}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}

            {selectedBox === 1 && (
           <>   <TextField
               sx={{
                 "& .MuiOutlinedInput-root": {
                   border: "none",

                   height: "40px",
                 },

                 "& .MuiOutlinedInput-root:hover fieldset": {
                   borderColor: "",
                 },

                 "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                   borderColor: "#6ddac5",

                   borderWidth: "3px",
                 },

                 marginLeft: "8px",

                 marginBottom: "8px",
               }}
               fullWidth
               variant="outlined"
               value={selectedSymbol1} 
               onChange={handleSymbolChange1}
               placeholder="Enter the selected symbol" 
             />
              <Typography sx={{ marginBottom: "30px" }}>
                System will randomly pick a session for you.
              </Typography></> 
            )}

            {selectedBox === 2 && (
              <Select
                fullWidth
                variant="outlined"
                onChange={handleMarketPatternChange}
                value={marketPattern}
                menuplacement="bottom"
                menuposition="fixed"
                size="small"
                sx={{ marginBottom: "50px" }}
              >
                {marketPatterns.map((marketPattern, index) => (
                  <MenuItem key={index} value={marketPattern}>
                    {marketPattern}
                  </MenuItem>
                ))}
              </Select>
            )}

            <Button
              fullWidth
              style={{
                marginBottom: "5px",

                borderRadius: "10px",

                background: "#6ddac5",

                color: "#FCFCFC",

                textTransform: "none",
              }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>  {isFavouriteOpen && isMobile && <Favourite />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,

  stock: state.stock,
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,

  setActiveSessionType: dispatch.user.setActiveSessionType,

  setDate: dispatch.user.setDate,
  getSpickedAsync:dispatch.spicked.getSpickedAsync,
  getStockAsync: dispatch.stock.getStockAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(FullPaneItems);
