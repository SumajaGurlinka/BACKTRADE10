import { Button, Typography, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";

import { useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Paper } from "@mui/material";

// const useStyles = makeStyles((theme) => {
//   return {};
// });

const Forget = (props) => {
  const { getForgotAsync } = props;

  const [formValues, setFormValues] = useState({
    email: {
      value: "",

      error: false,

      errorMessage: "Please enter valid email",
    },
  });
  // const handleAddGmailClick = () => {
  //   if (!isButtonDisabled) {

  //     const newEmail = formValues.email.value + '@gmail.com';
  //     setFormValues((prevFormValues) => ({
  //       ...prevFormValues,
  //       email: {
  //         ...prevFormValues.email,
  //         value: newEmail,
  //       },
  //     }));

  //     setIsButtonDisabled(true);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,

      [name]: {
        ...prevFormValues[name],

        value,

        error: false,
      },
    }));
  };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = formValues.email.value;

    let newFormValues = { ...formValues };

    let hasError = false;

    if (emailValue === "") {
      newFormValues.email = {
        ...newFormValues.email,

        error: true,

        errorMessage: "Please enter Email Id",
      };

      hasError = true;
    } else if (!isEmail(emailValue)) {
      newFormValues.email = {
        ...newFormValues.email,

        error: true,

        errorMessage: "Please enter valid Email Id",
      };

      hasError = true;
    }

    if (hasError) {
      setFormValues(newFormValues);
    } else {
      try {
        console.log(emailValue);

        const payload = {
          email: emailValue,
        };

        await getForgotAsync(payload);
        toast.success(
          "A Password reset link has been sent to your registered Email Id."
        );
      } catch (error) {
        toast.error(
          error.response?.data?.ErrorMessage ||
            "User should enter registered Email Id"
        );
      }
    }
  };

  return (
    <>
      <div className="forget_container">
        <Paper className="forget_form_container">
          <Typography
            textAlign="left"
            sx={{ marginBottom: "1em", fontSize: "25px", fontWeight: "bold" }}
          >
            Forget Password
          </Typography>

          <Typography sx={{ marginBottom: "10px" }}>
            Email Id
            <span style={{ color: "red" }}>*</span>
          </Typography>

          <TextField
            type="email"
            placeholder="Enter Email Id"
            sx={{
              "& .css-1dcmvj3-MuiFormControl-root-MuiTextField-root .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  height: "5px",
                },

              "& .MuiOutlinedInput-root": {
                border: "none",

                borderRadius: "8px",

                height: "50px",
              },

              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "",
              },

              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#6ddac5",

                borderWidth: "3px",
              },
            }}
            value={formValues.email.value}
            name="email"
            onChange={handleChange}
            required
            error={formValues.email.error}
            helperText={
              formValues.email.error ? formValues.email.errorMessage : ""
            }
            FormHelperTextProps={{
              sx: {
                marginLeft: "0",
                textAlign: "left",
              },
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <Button style={{color:"grey",position: "absolute", right: "5px", }} onClick={handleAddGmailClick} disabled={isButtonDisabled}>
            //         <AddIcon/>
            //       </Button>
            //     </InputAdornment>
            //   ),
            // }}
          />

          <Box display="flex" justifyContent="center">
            <Button
              style={{
                marginTop: "2em",

                height: "40px",

                width: "50%",

                textTransform: "none",

                fontSize: "15px",

                background: "#6ddac5",

                color: "white",

                borderRadius: "8px",
              }}
              onClick={handleSubmit}
            >
              Send Link
            </Button>
          </Box>

          <Box display="flex" justifyContent="center" marginTop="25px">
            <Typography>
              <RouterLink to="/login">Back to SignIn</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  forgot: state.forgot,
});

const mapDispatchToProps = (dispatch) => ({
  getForgotAsync: dispatch.forgot.getForgotAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Forget);
