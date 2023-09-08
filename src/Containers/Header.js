import React, { useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Logout, AccountCircle } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton } from "@mui/joy";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StopIcon from "@mui/icons-material/Stop";
import { useNavigate } from "react-router-dom";
import PauseIcon from "@mui/icons-material/Pause";
import { Tooltip } from "@mui/material";
import Divider from "@mui/joy/Divider";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import { useTheme } from "@mui/material/styles";
import Favourite from "../Favourites/Favourite";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = (props) => {
  const {
    user,
    setPaidSession,
    setPausesSession,

    setPrice,
  } = props;

  const [Pausesession, setpausesession] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isFavouriteOpen, setIsFavouriteOpen] = useState(false);
  const details = localStorage.getItem("token");
  const userDetails = jwtDecode(details);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showStopSessionConfirm, setShowStopSessionConfirm] = useState(false);
  const [isSessionPaused, setIsSessionPaused] = useState(false);
  const [showPauseSessionConfirm, setShowPauseSessionConfirm] = useState(false);
  const [showResumeSessionConfirm, setShowResumeSessionConfirm] =
    useState(false);
  const [selectedIndex] = useState(
    parseInt(localStorage.getItem("selectedIndex") || 0)
  );

  const handleButtonClick1 = () => {
    if (!isSessionPaused) {
      localStorage.setItem("selectedIndex", 0);
      navigate("/dashboard");
    } else {
      toast("Your session is paused. Resume session to navigate.", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  const handleButtonClick2 = () => {
    if (!isSessionPaused) {
      localStorage.setItem("selectedIndex", 1);
      navigate("/orders");
    } else {
      toast("Your session is paused. Resume session to navigate.", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };
  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    if (!isSessionPaused) {
      handleMenuClose();

      localStorage.setItem("selectedIndex", 3);
      navigate("/profile");
    } else {
      toast("Your session is paused. Resume session to navigate.", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  // const handlePaymentClick = () => {
  //   if (!isSessionPaused) {
  //     handleMenuClose();
  //     localStorage.setItem("selectedIndex", 4);
  //     navigate("/payment");
  //   } else {
  //     toast("Your session is paused. Resume session to navigate.", {
  //       position: toast.POSITION.TOP_CENTER,
  //       hideProgressBar: true
  //     });
  //   }
  // };

  const handleLogoutClick = () => {
    handleMenuClose();
    setPaidSession(true);
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("selectedIndex");
    toast.success("You have been logged out successfully.");
    navigate("/login");
  };
  const handleStopClick = () => {
    setPrice(true);
    setShowStopSessionConfirm(true);
  };
  const handleCancelStopSession = () => {
    setShowStopSessionConfirm(false);
  };
  const handlePause = () => {
    setShowPauseSessionConfirm(true);
  };
  const handleCancelPauseSession = () => {
    setShowPauseSessionConfirm(false);
  };
  const handleCancelResumeSession = () => {
    setShowResumeSessionConfirm(false);
  };
  const handleresume = () => {
    setShowResumeSessionConfirm(true);
  };
  const handlecConfirmPauseSession = () => {
    setShowPauseSessionConfirm(false);
    setpausesession(false);
    setPausesSession(true);
    setIsSessionPaused(true);
    toast(
      "Your session is paused.Please resume the session to place the orders.",
      {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      }
    );
  };
  const handleConfirmCloseSession = () => {
    setPaidSession(true);

    setPausesSession(false);
    setShowStopSessionConfirm(false);
    toast("Your session is ended,please start your sesion to trade again", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
    });
    setShowPauseSessionConfirm(false);
  };
  const handlecConfirmResumeSession = () => {
    setShowResumeSessionConfirm(false);
    setPausesSession(false);
    setpausesession(true);
    setIsSessionPaused(false);
    toast("Your session is resumed", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
    });
  };
  return (
    <>
      <Box
        sx={{
          background: "#fcfcfc",
          width: "980px",
          height: "69px",
          borderBottom: "2px solid #e7ebf0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "1px",
          "@media (max-width: 600px)": {
            width: "610px",
            marginLeft: 0,
          },
        }}
      >
        <div style={{}}></div>
        {!user.paidSession && (
          <>
            <div style={{ width: "860px" }}></div>
            {Pausesession ? (
              <Tooltip title="Pause Session">
                <Box>
                  {" "}
                  <Button
                    size="sm"
                    style={{
                      background: "#6ddac5",
                      borderRadius: "8px",
                      color: "white",
                      padding: "6px",
                      margin: "8px",
                    }}
                    onClick={handlePause}
                  >
                    <PauseIcon />
                  </Button>
                </Box>
              </Tooltip>
            ) : (
              <Tooltip title="Resume Session">
                <Button
                  style={{
                    background: "#6ddac5",
                    borderRadius: "8px",
                    color: "white",
                    padding: "6px",
                    margin: "8px",
                  }}
                  onClick={handleresume}
                >
                  <PlayArrowIcon />
                </Button>
              </Tooltip>
            )}
            {isMobile && (
              <IconButton
                onClick={() => setIsFavouriteOpen(!isFavouriteOpen)}
                sx={{
                  alignSelf: "flex-end",
                  m: 2,
                }}
              >
                <ShowChartIcon />
              </IconButton>
            )}
            <Tooltip title="Stop Session">
              <Button
                style={{
                  background: "#6ddac5",
                  borderRadius: "8px",
                  color: "white",
                  padding: "6px",
                  margin: "8px",
                }}
                onClick={handleStopClick}
              >
                <StopIcon />
              </Button>
            </Tooltip>
          </>
        )}{" "}
        {user.paidSession && (
          <>
            <div style={{ width: "860px" }}></div>
            {Pausesession ? (
              <Tooltip title="Pause Session">
                <Box>
                  {" "}
                  <Button
                    size="sm"
                    style={{
                      background: "#FCFCFC",
                      borderRadius: "8px",
                      color: "white",
                      padding: "6px",
                      margin: "8px",
                    }}
                    onClick={handlePause}
                  ></Button>
                </Box>
              </Tooltip>
            ) : (
              <Tooltip title="Resume Session">
                <Button
                  style={{
                    background: "#FCFCFC",
                    borderRadius: "8px",
                    color: "white",
                    padding: "6px",
                    margin: "8px",
                  }}
                  onClick={handleresume}
                ></Button>
              </Tooltip>
            )}
            {isMobile && (
              <IconButton
                onClick={() => setIsFavouriteOpen(!isFavouriteOpen)}
                sx={{
                  alignSelf: "flex-end",
                  m: 2,
                }}
              >
                <ShowChartIcon />
              </IconButton>
            )}
            <Tooltip title="Stop Session">
              <Button
                style={{
                  background: "#FCFCFC",
                  borderRadius: "8px",
                  color: "white",
                  padding: "6px",
                  margin: "8px",
                }}
                onClick={handleStopClick}
              ></Button>
            </Tooltip>
          </>
        )}
        <Typography
          onClick={() => handleButtonClick1()}
          style={{
            padding: "5px",
            margin: "2px",
            cursor: "pointer",
            color: selectedIndex === 0 ? "#6ddac5" : null,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          onClick={() => handleButtonClick2()}
          sx={{
            padding: "5px",
            marginLeft: "10px",
            cursor: "pointer",
            color: selectedIndex === 1 ? "#6ddac5" : null,
          }}
        >
          Orders
        </Typography>
        <Divider
          orientation="vertical"
          sx={{ height: "30px", marginTop: "19px" }}
        />
        <Avatar
          sx={{
            marginRight: "10px",
            marginLeft: "10px",
            fontSize: "15px",
            height: "30px",
            width: "30px",
            color: "black",
          }}
          onClick={handleAvatarClick}
        >
          {`${userDetails.firstname
            ?.charAt(0)
            .toUpperCase()}${userDetails.lastname?.charAt(0).toUpperCase()}`}
        </Avatar>
        <Menu
          placement="bottom-end"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          sx={{ width: "10em", marginTop: "1.43em" }}
        >
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon sx={{ marginRight: "5px", fontSize: "20px" }}>
              <AccountCircle />
            </ListItemIcon>
            Profile
          </MenuItem>

          <Divider sx={{ margin: "0px" }}></Divider>
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon sx={{ marginRight: "5px", fontSize: "20px" }}>
              <Logout size="sm" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Dialog open={showStopSessionConfirm} onClose={handleCancelStopSession}>
          <DialogTitle>Stop Session?</DialogTitle>
          <DialogContent>
            Are you sure you want to stop this session?
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                width: "90px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handleCancelStopSession}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "90px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handleConfirmCloseSession}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showPauseSessionConfirm}
          onClose={handleCancelPauseSession}
        >
          <DialogTitle>Pause Session?</DialogTitle>
          <DialogContent>
            Are you sure you want to Pause this session?
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                width: "90px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handleCancelPauseSession}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "90px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handlecConfirmPauseSession}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showResumeSessionConfirm}
          onClose={handleCancelResumeSession}
        >
          <DialogTitle>Resume Session?</DialogTitle>
          <DialogContent>
            Are you sure you want to Resume this session?
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                width: "90px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handleCancelResumeSession}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "90px",
                borderRadius: "10px",
                background: "#6ddac5",
                color: "#FCFCFC",
                textTransform: "none",
              }}
              onClick={handlecConfirmResumeSession}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {isFavouriteOpen && isMobile && <Favourite />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setPaidSession: dispatch.user.setPaidSession,
  setPrice: dispatch.user.setPrice,
  setPausesSession: dispatch.user.setPausesSession,
  setActiveSessionType: dispatch.user.setActiveSessionType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
