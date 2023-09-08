import React from "react";
import { useState } from "react";

import { Box, Grid } from "@mui/material";

import { ClassNames } from "@emotion/react";

import Favourite from "../Favourites/Favourite";

import Profile1 from "./Profile1";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// const useStyles = makeStyles((theme) => {
//   return {
// app:{

//     height: "100vh",
//     width: "100vw",

//     display: "flex",
//     flexdirection: "column"
//   }

//   };
// });

//px, em, rem
//vh,

const Profile2 = (props) => {
  const [isFavouriteOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <div className={ClassNames.app}>
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

            <Box display="flex">
              <Profile1 />
            </Box>
          </Box>
        </Grid>
      </div>
      {isFavouriteOpen && isMobile && <Favourite />}
    </>
  );
};

export default Profile2;
