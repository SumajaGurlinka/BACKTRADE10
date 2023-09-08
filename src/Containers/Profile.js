import React from "react";
import { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Grid, Tooltip } from "@mui/joy";

import {  toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import EditIcon from "@mui/icons-material/Edit";

import { connect } from "react-redux";
const Profile = (props) => {
  const { getPhoneAsync } = props;
  const details = localStorage.getItem("token");
  const userDetails = jwtDecode(details);
  const firstName = userDetails.firstname;
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhone, setEditedPhone] = useState(userDetails.phone);
  const [isEditing1, ] = useState(false);
  const [editedEmail, setEditedEmail] = useState(userDetails.sub);
  const lastName = userDetails.lastname;
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const formattedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);
  const formattedName = `${formattedFirstName} ${formattedLastName}`;

  const handleEditClick = () => {
    setIsEditing(true);
  };
  // const handleEditClick1 = () => {
  //   setIsEditing1(true);
  // };

  // const handleSaveClick1 = async () => {
  //   try {
  //     const data = {
  //       email: editedEmail,
  //     };
  //     console.log(data);
  //     await getEditAsync(data);
  //     console.log("de");
  //     toast.success("Email number has been updated successfully");
  //   } catch (error) {
  //     toast.error("There is an issue while updating details");
  //   }
  //   setIsEditing1(false);
  // };
  const handleSaveClick = async () => {
    try {
      const data = {
        phone: editedPhone,
      };
      console.log(data);
      await getPhoneAsync(data);
      console.log("de");
      toast.success("Phone number has been updated successfully");
    } catch (error) {
      toast.error("There is an issue while updating details");
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedPhone(userDetails.phone);
  };
  // const handleCancelClick1 = () => {
  //   setIsEditing1(false);
  //   setEditedEmail(userDetails.sub);
  // };
  return (
    <>
      <Box
        sx={{
          height: "88.5vh",
          width: "980px",
          background: "#FCFCFC",

          marginLeft: "1px",

          overflow: "auto !important",
          "@media (max-width: 600px)": {
            width: "100%",
            height: "1330px",
            marginLeft: "0px",
          },
        }}
      >
        <Box
          sx={{
            height: "60px",

            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
            marginRight: "10px",
            fontSize: "20px",
          }}
        >
          <div style={{ fontWeight: "bold" }}> Profile</div>
        </Box>
        <Divider margin="10px" />
        <Box sx={{ display: "flex", flexwrap: "wrap" }}>
          <Avatar sx={{ color: "black", margin: "20px" }}>
            {" "}
            {`${userDetails.firstname
              ?.charAt(0)
              .toUpperCase()}${userDetails.lastname?.charAt(0).toUpperCase()}`}
          </Avatar>
          <div
            style={{
              margin: "10px",
              display: "flex",
              alignItems: "center",
              color: "black",
              fontSize: "18px",
            }}
          >
            {formattedName}
          </div>
        </Box>
        <Box
          sx={{
            height: "50x",

            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <div
            style={{
              margin: "10px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              color: "black",
              fontSize: "19px",
              fontWeight: "bold",
            }}
          >
            Account
          </div>
        </Box>
        <Divider margin="10px" />
        <Grid
          container
          style={{
            marginLeft: "20px",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <Grid item xs={5} sm={3}>
            <div
              style={{ fontWeight: "bold", fontSize: "18px", marginTop: "8px" }}
            >
              Email
            </div>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={9}>
              {isEditing1 ? (
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: "1px solid #FCFCFC",
                      height: "30px",
                    },
                  }}
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  fullWidth
                />
              ) : (
                <div>{userDetails.sub}</div>
              )}
            </Grid>
            {/* <Grid item xs={12} sm={2}>
        {isEditing1? (
          <>
          <Box sx={{display:"flex",flexwrap:"wrap",gap:"10px"}}>
           <Button style={{ textTransform: "none",marginLeft:"8px"}}
              onClick={handleSaveClick1}
             
            >
              Save
              </Button>
            <Button style={{ textTransform: "none",}}
              onClick={handleCancelClick1}
              
            >
              Cancel
            </Button></Box>
          </>
        ) : (
          <Tooltip title="Edit"  style={{ fontSize: "12px" }}>
          <IconButton sx={{marginLeft:"30px"}}
            onClick={handleEditClick1}
            
          >
            <EditIcon />
          </IconButton></Tooltip>
        )}
      </Grid> */}
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            marginLeft: "20px",
            marginBottom: "10px",
            marginTop: "20px",
          }}
        >
          <Grid item xs={5} sm={3}>
            <div
              style={{ fontWeight: "bold", fontSize: "18px", marginTop: "8px" }}
            >
              Phone
            </div>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={7} sm={7}>
              {isEditing ? (
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderColor: "1px solid #FCFCFC",
                      height: "30px",
                    },
                    width: "170px",
                  }}
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  fullWidth
                />
              ) : (
                <div>{userDetails.phone}</div>
              )}
            </Grid>
            <Grid item xs={1} sm={1}>
              {isEditing ? (
                <>
                  <Box sx={{ display: "flex", flexwrap: "wrap", gap: "10px" }}>
                    <Button
                      style={{ textTransform: "none", marginLeft: "8px" }}
                      onClick={handleSaveClick}
                    >
                      Save
                    </Button>
                    <Button
                      style={{ textTransform: "none" }}
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <Tooltip title="Edit" style={{ fontSize: "12px" }}>
                  <IconButton
                    sx={{ marginLeft: "8px" }}
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Grid>

        <div
          style={{
            margin: "20px",
          }}
        ></div>
        <Divider margin="10px" />
      </Box>
    </>
  );
};
const mapStateToProps = (state) => ({
  edit: state.edit,
});
const mapDispatchToProps = (dispatch) => ({
  getPhoneAsync: dispatch.phonr.getPhoneAsync,
  getEditAsync: dispatch.edit.getEditAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
