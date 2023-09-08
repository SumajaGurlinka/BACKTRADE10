import { Button, Grid, Typography, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Paper } from "@mui/material";

const useStyles = makeStyles((theme) => {
  return {};
});

const SignUp = (props) => {
  const { getRegisterAsync } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: {
      value: "",
      error: false,
      errorMessage: "You must enter a valid email",
    },
    firstname: {
      value: "",
      error: false,
      errorMessage: "You must enter a first name",
    },
    lastname: {
      value: "",
      error: false,
      errorMessage: "You must enter a last name",
    },
    password: {
      value: "",
      error: false,
      errorMessage: "Password must be at least 8 characters long",
    },
    phoneNumber: {
      value: "",
      error: false,
      errorMessage: "You must enter a valid phone number",
    },
  });

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
  // const handleAddGmailClick = () => {

  //     const newEmail = formValues.email.value + '@gmail.com';
  //     setFormValues((prevFormValues) => ({
  //       ...prevFormValues,
  //       email: {
  //         ...prevFormValues.email,
  //         value: newEmail,
  //       },
  //     }));

  //     setIsButtonDisabled(true);

  // };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };
  const hasSpecialCharactersInLastName = (value) => {
    const specialCharactersRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|/`"']/;
    return specialCharactersRegex.test(value);
  };
  const hasNumericalsInLastName = (value) => {
    const numericalsRegex = /[0-9]/;
    return numericalsRegex.test(value);
  };

  const hasSpecialCharacters = (value) => {
    const specialCharactersRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|/`"']/;
    return specialCharactersRegex.test(value);
  };
  const hasNumericals = (value) => {
    const numericalsRegex = /[0-9]/;
    return numericalsRegex.test(value);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]*$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = formValues.email.value;
    const firstnameValue = formValues.firstname.value;
    const lastnameValue = formValues.lastname.value;
    const passwordValue = formValues.password.value;
    const phoneNumberValue = formValues.phoneNumber.value;
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

    if (firstnameValue === "") {
      newFormValues.firstname = {
        ...newFormValues.firstname,
        error: true,
        errorMessage: "Please enter First Name",
      };
      hasError = true;
    } else if (firstnameValue.length > 15) {
      newFormValues.firstname = {
        ...newFormValues.firstname,
        error: true,
        errorMessage: "Please enter First Name of 20 characters or less",
      };
      hasError = true;
    } else if (/\d/.test(firstnameValue)) {
      newFormValues.firstname = {
        ...newFormValues.firstname,
        error: true,
        errorMessage: "First Name should not contain numerical values",
      };
      hasError = true;
    }

    if (lastnameValue === "") {
      newFormValues.lastname = {
        ...newFormValues.lastname,
        error: true,
        errorMessage: "Please enter Last Name",
      };
      hasError = true;
    } else if (lastnameValue.length > 20) {
      newFormValues.lastname = {
        ...newFormValues.lastname,
        error: true,
        errorMessage: "Please enter Last Name of 20 characters or less",
      };
      hasError = true;
    } else if (!/^\D*$/.test(lastnameValue)) {
      newFormValues.lastname = {
        ...newFormValues.lastname,
        error: true,
        errorMessage: "Last Name should not contain numerical values",
      };
      hasError = true;
    }
    if (passwordValue === "") {
      newFormValues.password = {
        ...newFormValues.password,
        error: true,
        errorMessage: "Please enter Password",
      };
      hasError = true;
    } else if (passwordValue.length < 6) {
      newFormValues.password = {
        ...newFormValues.password,
        error: true,
        errorMessage: "Please enter Password of at least 6 characters",
      };
      hasError = true;
    }

    if (phoneNumberValue === "") {
      newFormValues.phoneNumber = {
        ...newFormValues.phoneNumber,
        error: true,
        errorMessage: "Please enter Phone Number",
      };
      hasError = true;
    } else if (!isPhoneNumber(phoneNumberValue)) {
      newFormValues.phoneNumber = {
        ...newFormValues.phoneNumber,
        error: true,
        errorMessage: "Please enter valid Phone Number",
      };
      hasError = true;
    }

    if (hasError) {
      setFormValues(newFormValues);
    } else {
      try {
        setIsLoading(true);

        localStorage.setItem("Password", passwordValue);
        localStorage.setItem("Registered_Email", emailValue);
        localStorage.setItem("firstname", firstnameValue);
        localStorage.setItem("phone", phoneNumberValue);

        const payload = {
          email: emailValue,
          firstname: firstnameValue,
          lastname: lastnameValue,
          password: passwordValue,
          phone: phoneNumberValue,
        };
        const payload1 = JSON.stringify(payload);
        await getRegisterAsync(payload1);

        setIsLoading(false);
        toast.success("Registration successful!");

        navigate("/login");
      } catch (error) {
        setIsLoading(false);
        if (error?.response?.data) {
          console.log("data:", error?.response?.data);

          toast.error(error.response.data);
        }
      }
    }
  };

  return (
    <>
      <div className="login_container">
        <Paper className="login_form_container">
          <Typography
            textAlign="left"
            sx={{
              marginBottom: "1em",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Typography>
          <Grid container>
            {" "}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ marginRight: isMobile ? 0 : "8px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ marginBottom: "6px" }} required>
                  First Name
                  <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  placeholder="First Name"
                  variant="outlined"
                  name="firstname"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                      borderRadius: "8px",
                      height: "45px",
                    },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: "",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#6ddac5",
                      borderWidth: "3px",
                    },
                  }}
                  value={formValues.firstname.value}
                  onChange={handleChange}
                  error={
                    formValues.firstname.error ||
                    hasSpecialCharacters(formValues.firstname.value) ||
                    hasNumericals(formValues.firstname.value) ||
                    formValues.firstname.value.length > 20
                  }
                  helperText={
                    formValues.firstname.error
                      ? formValues.firstname.errorMessage
                      : hasSpecialCharacters(formValues.firstname.value)
                      ? "Please do not include special characters in First Name"
                      : hasNumericals(formValues.firstname.value)
                      ? "Please do not include numeric values in First Name"
                      : formValues.firstname.value.length > 20
                      ? "Please enter First Name of 20 characters or less"
                      : ""
                  }
                  FormHelperTextProps={{
                    sx: {
                      marginLeft: "0",
                      textAlign: "left",
                    },
                  }}
                  inputProps={{ className: classes.input }}
                />{" "}
              </Box>
            </Grid>
            <Grid item xs={12} sm={5.7}>
              <Box>
                <Typography sx={{ marginBottom: "6px" }} required>
                  Last Name
                  <span style={{ color: "red" }}>*</span>
                </Typography>

                <TextField
                  placeholder="Last Name"
                  variant="outlined"
                  name="lastname"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "none",
                      borderRadius: "8px",
                      height: "45px",
                    },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: "",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#6ddac5",
                      borderWidth: "3px",
                    },
                  }}
                  value={formValues.lastname.value}
                  onChange={handleChange}
                  error={
                    formValues.lastname.error ||
                    formValues.lastname.value.length > 20 ||
                    hasSpecialCharactersInLastName(formValues.lastname.value) ||
                    hasNumericalsInLastName(formValues.lastname.value)
                  }
                  helperText={
                    formValues.lastname.error
                      ? formValues.lastname.errorMessage
                      : formValues.lastname.value.length > 20
                      ? "Please enter Last Name of 20 characters or less"
                      : hasSpecialCharactersInLastName(
                          formValues.lastname.value
                        )
                      ? "Please do not include special characters in Last Name"
                      : hasNumericalsInLastName(formValues.lastname.value)
                      ? "Please do not include numeric values in Last Name"
                      : ""
                  }
                  FormHelperTextProps={{
                    sx: {
                      marginLeft: "0",
                      textAlign: "left",
                    },
                  }}
                  inputProps={{ className: classes.input }}
                />
              </Box>
            </Grid>
          </Grid>
          <Typography sx={{ marginBottom: "6px", marginTop: "5px" }}>
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
                height: "45px",
                position: "relative",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#6ddac5",
                borderWidth: "3px",
              },
              "& .MuiInputBase-root": {
                padding: 0,
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
          <Typography sx={{ marginBottom: "6px", marginTop: "5px" }}>
            Password
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="password"
            placeholder="Enter Password"
            value={formValues.password.value}
            name="password"
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none",
                borderRadius: "8px",
                height: "45px",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#6ddac5",
                borderWidth: "3px",
              },
            }}
            onChange={handleChange}
            required
            error={
              formValues.password.error ||
              (formValues.password.value.length > 0 &&
                formValues.password.value.length < 6)
            }
            helperText={
              formValues.password.error
                ? formValues.password.errorMessage
                : formValues.password.value.length > 0 &&
                  formValues.password.value.length < 6
                ? "Please enter Password of at least 6 characters"
                : ""
            }
            FormHelperTextProps={{
              sx: {
                marginLeft: "0",
                textAlign: "left",
              },
            }}
          />
          <Typography sx={{ marginBottom: "6px", marginTop: "5px" }}>
            Phone Number
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            type="tel"
            placeholder="Enter Phone Number"
            value={formValues.phoneNumber.value}
            name="phoneNumber"
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none",
                borderRadius: "8px",
                height: "45px",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#6ddac5",
                borderWidth: "3px",
              },
              marginBottom: "1em",
            }}
            onChange={handleChange}
            required
            error={
              formValues.phoneNumber.error ||
              !isPhoneNumberValid(formValues.phoneNumber.value) ||
              formValues.phoneNumber.value.length > 10 ||
              formValues.phoneNumber.value.startsWith("0")
            }
            helperText={
              formValues.phoneNumber.error
                ? formValues.phoneNumber.errorMessage
                : !isPhoneNumberValid(formValues.phoneNumber.value)
                ? "Please enter a numeric Phone Number"
                : formValues.phoneNumber.value.length > 10
                ? "Please ensure Phone Number is not longer than 10 digits"
                : formValues.phoneNumber.value.startsWith("0")
                ? "Please do not start the Phone Number with 0"
                : ""
            }
            FormHelperTextProps={{
              sx: {
                marginLeft: "0",
                textAlign: "left",
              },
            }}
          />
          <Box display="flex" justifyContent="center">
            <Button
              style={{
                marginTop: "4px",

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
              Verify
            </Button>
          </Box>{" "}
          <div style={{ flex: 0.5 }}></div>
          <Box display="flex" justifyContent="center">
            <Typography>
              Existing User? <RouterLink to="/login">SignIn</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  register: state.register,
});
const mapDispatchToProps = (dispatch) => ({
  getRegisterAsync: dispatch.register.getRegisterAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
