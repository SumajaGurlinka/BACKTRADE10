import React, { useState } from "react";

import {
  Button,
  IconButton,
  TextField,
  Tooltip,
  
} from "@mui/material";

import { Box, Grid } from "@mui/material";


import makeStyles from "@mui/styles/makeStyles";
import TimelineSharpIcon from '@mui/icons-material/TimelineSharp';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { SessionTypes } from "../utils/sessionUtils";

import {  toast } from "react-toastify";

import WebStoriesIcon from "@mui/icons-material/WebStories";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";


import { connect } from "react-redux";

import Header1 from "../Containers/Header1";

import Favourite from "../Favourites/Favourite";
import { SYMBOLS } from "../data/Symbol";
// import Select, { components } from "react-select";

import { Select } from "@mui/material";

import { MARKET_PATTERNS } from "../data/MarketPatterns";

import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";


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
    width: "30%",
    overflow: "hidden",
    "@media (max-width: 600px)": {
      width: "60%",
    },
  },
}));

const Dashboard1 = (props) => {
  const classes = useStyles();

  const symbol = SYMBOLS;
  const {
  

    getStockAsync,

    user,
   
    setPaidSession,
    getSpickedAsync,
    setActiveSessionType,
    setLoading,
   
   
    setDate,
    
  } = props;

  const [selectedBox, setSelectedBox] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const theme = useTheme();
 
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
  const [, setSelectedSessionType] = useState(null);
  const [isFavouriteOpen, ] = useState(false);
  
  const [selectedSymbol, setSelectedSymbol] = useState("A");
  const [selectedSymbol1, setSelectedSymbol1] = useState(symbol[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketPattern, setMarketPattern] = useState(MARKET_PATTERNS[0].value);
  
  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };

  const handleContinue = async () => {
    setPaidSession(false);
    const selectedPattern = MARKET_PATTERNS.find(
      (pattern) => pattern.value === marketPattern
    );
    if (selectedPattern) {
      setDate(selectedPattern.label);
    }

    try {
      if (selectedBox === 0) {
        const data = {
          selectedSymbol: selectedSymbol,
          marketPattern: marketPattern,
        };
        await getStockAsync(data);
        toast.success("Stock data fetched successfully!");
      } else if (selectedBox === 1) {
        const data = {
          selectedSymbol: selectedSymbol1,
        };
        await getSpickedAsync(data);
        toast.success("System Picked data fetched successfully!");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data. Please try again.");
      setLoading(false);
    }
  };
  const filteredOptions = symbol.filter((symbol) =>
    symbol.toLowerCase().includes(inputValue.toLowerCase())
  );
  const filteredOptions1 = symbol.filter((symbol) =>
    symbol.toLowerCase().includes(inputValue1.toLowerCase())
  );
 

  // const handleSymbol1 = async (event) => {
  //   setSymbol1(event.target.value);

  //   setSymbolExists(null);
  // };
  // const handleArrowClick = async () => {};
  // const handleArrowClick1 = async () => {
  //   try {
  //     const data = {
  //       Symbol1: Symbol1,
  //     };

  //     await getSymbolAsync1(data);
  //     toast.success("Symbol Available");
  //   } catch (error) {
  //     toast.error("Symbol not Available");
  //   }
  // };
  // const handleSymbolChange = (event, newValue) => {
  //   if (newValue) {
  //     const selectedValue = newValue.symbol;
  //     setSelectedSymbol(selectedValue);
  //     setMenuOpen(false);
  //   } else {
  //     setSelectedSymbol(null);
  //   }
  // };
  // const handleSymbol1Change = (e) => {
  //   const { value } = e.target;

  //   setSelectedSymbol1(value);
  // };

  const handleMarketPatternChange = (e) => {
    setMarketPattern(e.target.value);
  };
  const handleclose = () => {
    setPaidSession(false);
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

              flexDirection: isMobile ? "" : "row",
            }}
          >
            {!isMobile && <Favourite />}

            <Box display="flex" sx={{ flex: 2 }}>
              <Header1 />
            </Box>
          </Box>
        </Grid>

        <Dialog
          open={user.paidSession}
          classes={{ paper: classes.dialogPaper }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "0px",
              paddingLeft: "10px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <>
              Start your Session
              <Tooltip title="Close">
                <IconButton
                  sx={{
                    margin: "0px",
                    position: "absolute",
                    top: "10px",
                    right: "5px",
                  }}
                  onClick={handleclose}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </>
          </DialogTitle>

          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginLeft: "30px",
              }}
            >
              <Box
                sx={{
                  border:
                    selectedBox === 0 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  borderRadius: "10px",

                  width: "110px",

                  margin: "8px",

                  display: "flex",

                  alignItems: "center",

                  flexDirection: "column",
                  cursor: "pointer",
                  justifyContent: "center",
                }} //   onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                onClick={() => handleBoxClick(0)}
              >
                <TimelineSharpIcon sx={{ fontSize: 32 }} />

                {SessionTypes.SELECT_DATE}
                {/* {isHovering && (
        <input
          type="text"
          placeholder="Enter value"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )} */}
              </Box>

              <Box
                sx={{
                  border:
                    selectedBox === 1 ? "2px solid #6ddac5" : "1px solid grey",

                  height: "100px",

                  width: "115px",
                  cursor: "pointer",
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
            </Box>
          </DialogContent>

          <DialogActions sx={{ flexDirection: "column", alignItems: "center" }}>
            {selectedBox === 0 && (
              <>
                {" "}
                <Autocomplete
                  fullWidth
                  size="small"
                  options={filteredOptions}
                  value={selectedSymbol}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) =>
                    setInputValue(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    setSelectedSymbol(newValue);
                    setInputValue("");
                  }}
                  open={menuOpen && !!inputValue}
                  onOpen={() => setMenuOpen(true)}
                  onClose={() => setMenuOpen(false)}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Symbol"
                      sx={{ marginBottom: "20px", marginRight: "10px" }}
                    
                    />
                  )}
                />
                {/*<> <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter Symbol"
                  value={Symbol}
                  onChange={handleSymbol}
                  sx={{
                    marginRight: "10px",
                    marginLeft: "10px",
                    "& .MuiOutlinedInput-root": {
                      marginBottom: "18px",

                      height: "42px",
                    },
                    "& .MuiIconButton-root": {
                      marginLeft: "20px",
                      padding: "3px",
                    },
                  }}
                  // InputProps={{
                  //   endAdornment: (
                  //     <Tooltip title="Search Symbol">
                  //       <IconButton edge="end" onClick={handleArrowClick}>
                  //         <SearchIcon />
                  //       </IconButton>
                  //     </Tooltip>
                  //   ),
                  // }}
                 
                /></> */}
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ marginBottom: "10px", marginRight: "8px" }}
                >
                  <InputLabel>Select Time series</InputLabel>
                  <Select
                    fullWidth
                    label="Select Time Series"
                    variant="outlined"
                    onChange={handleMarketPatternChange}
                    value={marketPattern}
                    menuplacement="bottom"
                    menuposition="fixed"
                    size="small"
                    sx={{ marginBottom: "10px" }}
                  
                    
                  >
                    {MARKET_PATTERNS.map((pattern) => (
                      <MenuItem key={pattern.value} value={pattern.value}>
                        {pattern.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            {selectedBox === 1 && (
              <>
                <Autocomplete
                  fullWidth
                  size="small"
                  options={filteredOptions1}
                  value={selectedSymbol1}
                  inputValue={inputValue1}
                  onInputChange={(event, newInputValue) =>
                    setInputValue1(newInputValue)
                  }
                  onChange={(event, newValue) => {
                    setSelectedSymbol1(newValue);
                    setInputValue("");
                  }}
                  open={menuOpen && !!inputValue1}
                  onOpen={() => setMenuOpen(true)}
                  onClose={() => setMenuOpen(false)}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Symbol"
                      sx={{ marginBottom: "80px", marginRight: "10px" }}
                    />
                  )}
                />
                {/* <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter Symbol"
                  value={Symbol1}
                  onChange={handleSymbol1}
                  sx={{
                    marginRight: "10px",
                    marginLeft: "10px",
                    marginBottom: "60px",
                    "& .MuiOutlinedInput-root": {
                      marginBottom: "18px",

                      height: "42px",
                    },
                    "& .MuiIconButton-root": {
                      marginLeft: "20px",
                      padding: "3px",
                    },
                  }}
                  // InputProps={{
                  //   endAdornment: (
                  //     <Tooltip title="Search Symbol">
                  //       <IconButton edge="end" onClick={handleArrowClick1}>
                  //         <SearchIcon />
                  //       </IconButton>
                  //     </Tooltip>
                  //   ),
                  // }}
                /> 


              */}{" "}
              </>
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
      </div>
      {isFavouriteOpen && isMobile && <Favourite />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,

  stock: state.stock,
  spicked: state.spicked,
  autocomplete: state.autocomplete,
});

const mapDispatchToProps = (dispatch) => ({
  

  setActiveSessionType: dispatch.user.setActiveSessionType,
  setLoading: dispatch.stock.setLoading,
  setDate: dispatch.user.setDate,
  getSpickedAsync: dispatch.spicked.getSpickedAsync,
  getSymbolAsync: dispatch.symbol.getSymbolAsync,
  getAutocompleteAsync: dispatch.autocomplete.getAutocompleteAsync,
  getSymbolAsync1: dispatch.symbol1.getSymbolAsync1,
  getStockAsync: dispatch.stock.getStockAsync,
  setPaidSession: dispatch.user.setPaidSession,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard1);
