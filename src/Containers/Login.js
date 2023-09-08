import { Button, Typography, TextField, Box } from "@mui/material";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Link as RouterLink } from "react-router-dom";

import { Paper } from "@mui/material";

import { connect } from "react-redux";

// const useStyles = makeStyles((theme) => {
//   return {};
// });

const Login = (props) => {
  const { getLoginAsync } = props;

  const navigate = useNavigate();

  const [, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: {
      value: "",

      error: false,

      errorMessage: "Please enter a valid Email Id",
    },

    password: {
      value: "",

      error: false,

      errorMessage: "Password must be at least 8 characters long",
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
  // const handleLoginSuccess = (role) => {
  //   let message = "Login successful!";

  //   if (role === "USER") {
  //     message = "Welcome back! You are now logged in as a user.";
  //   } else if (role === "ADMIN") {
  //     message = "Welcome back! You are now logged in as an admin.";
  //   }
  // };
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
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = formValues.email.value;

    const passwordValue = formValues.password.value;

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

    if (passwordValue === "" || passwordValue.length < 6) {
      newFormValues.password = {
        ...newFormValues.password,

        error: true,

        errorMessage: "Please enter Password",
      };

      hasError = true;
    }

    if (hasError) {
      setFormValues(newFormValues);
    } else {
      try {
        console.log(emailValue);

        setIsLoading(true);

        const payload = {
          email: emailValue,

          password: passwordValue,
        };

        const payload2 = JSON.stringify(payload);

        await getLoginAsync(payload2);

        setIsLoading(false);
        const roles = localStorage.getItem("roles");
        if (roles === "USER") {
          console.log(roles);

          navigate("/dashboard");
          toast.success("User logged in successfully!");
        } else if (roles === "ADMIN") {
          console.log(roles);

          navigate("/admin");
          toast.success("Admin logged in successfully!");
        } else {
          console.log("Unknown role:", roles);
        }
      } catch (error) {
        setIsLoading(false);

        toast.error("user should register");
      }
    }
  };

  return (
    <>
      <div className="signup_container">
        <Paper className="signup_form_container">
          <Typography
            textAlign="left"
            sx={{ marginBottom: "1em", fontSize: "25px", fontWeight: "bold" }}
          >
            Sign In
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

          <Typography sx={{ marginBottom: "10px", marginTop: "6.5px" }}>
            Password
            <span style={{ color: "red" }}>*</span>
          </Typography>

          <TextField
            type="Password"
            placeholder="Enter Password"
            value={formValues.password.value}
            name="password"
            sx={{
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
          <Box
            display="flex"
            justifyContent="center"
            marginTop="20px"
            sx={{
              paddingLeft: "190px",
              "@media (max-width: 600px)": {
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "flex-end",
                paddingLeft: "0px",
              },
            }}
          >
            <Typography>
              <RouterLink to="/forget">Forget Password?</RouterLink>
            </Typography>
          </Box>

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
              Sign In
            </Button>
          </Box>

          <div></div>

          <Box display="flex" justifyContent="center" marginTop="33px">
            <Typography>
              New User? <RouterLink to="/">SignUp</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  getLoginAsync: dispatch.login.getLoginAsync,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
