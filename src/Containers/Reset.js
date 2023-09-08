import { Button, Typography, TextField, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Paper } from "@mui/material";

// const useStyles = makeStyles((theme) => {
//   return {};
// });

const Reset = (props) => {
  const navigate = useNavigate();
  const [, setIsLoading] = useState(false);

  const location = useLocation();

  const [formValues, setFormValues] = useState({
    newPassword: {
      value: "",
      error: false,
      errorMessage: "You must enter a password",
    },
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: "You must enter a valid email",
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
  // const isEmail = (email) =>
  //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPasswordValue = formValues.newPassword.value;
    const confirmPasswordValue = formValues.confirmPassword.value;

    let newFormValues = { ...formValues };
    let hasError = false;

    if (newPasswordValue === "") {
      newFormValues.newPassword = {
        ...newFormValues.newPassword,
        error: true,
        errorMessage: "Please enter Password ",
      };
      hasError = true;
    } else if (newPasswordValue.length < 6) {
      newFormValues.newPassword = {
        ...newFormValues.newPassword,
        error: true,
        errorMessage: "Please enter Password of more than 6 digits",
      };
      hasError = true;
    }
    if (confirmPasswordValue === "") {
      newFormValues.confirmPassword = {
        ...newFormValues.confirmPassword,
        error: true,
        errorMessage: "Please Confirm Password ",
      };
      hasError = true;
    } else if (confirmPasswordValue.length < 6) {
      newFormValues.confirmPassword = {
        ...newFormValues.confirmPassword,
        error: true,
        errorMessage: "Please enter Password of more than 6 digits",
      };
      hasError = true;
    }
    if (newPasswordValue !== confirmPasswordValue) {
      newFormValues.confirmPassword = {
        ...newFormValues.confirmPassword,
        error: true,
        errorMessage: "Passwords do not match",
      };
      hasError = true;
    }
    if (hasError) {
      setFormValues(newFormValues);
    } else {
      try {
        console.log(confirmPasswordValue);

        const token = new URLSearchParams(location.search).get("token");
        const data = {
          newPassword: newPasswordValue,

          confirmPassword: confirmPasswordValue,
        };
        console.log("123444");
        const response = await axios.post(
          `http://localhost:9090/reset-password?token=${token}`,
          data
        );
        console.log("data", response.data);
        toast.success(
          "Password reset successful! You can now log in with your new Password."
        );
        navigate("/login");
        setIsLoading(true);
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
      <div className="reset_container">
        <Paper className="reset_form_container">
          <Typography
            textAlign="left"
            sx={{ marginBottom: "1em", fontSize: "25px", fontWeight: "bold" }}
          >
            Reset Password
          </Typography>
          <Typography sx={{ marginBottom: "10px" }}>
            New Password
            <span style={{ color: "red" }}>*</span>
          </Typography>

          <TextField
            type="password"
            placeholder="Enter new Password"
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
            value={formValues.newPassword.value}
            name="newPassword"
            onChange={handleChange}
            required
            error={
              formValues.newPassword.error ||
              (formValues.newPassword.value.length > 0 &&
                formValues.newPassword.value.length < 6)
            }
            helperText={
              formValues.newPassword.error
                ? formValues.newPassword.errorMessage
                : formValues.newPassword.value.length > 0 &&
                  formValues.newPassword.value.length < 6
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
          <Typography sx={{ marginTop: "5px", marginBottom: "7px" }}>
            Confirm Password
            <span style={{ color: "red" }}>*</span>
          </Typography>

          <TextField
            type="password"
            placeholder="Confirm Password"
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
            value={formValues.confirmPassword.value}
            name="confirmPassword"
            onChange={handleChange}
            required
            error={
              formValues.confirmPassword.error ||
              (formValues.confirmPassword.value.length > 0 &&
                formValues.confirmPassword.value.length < 6)
            }
            helperText={
              formValues.confirmPassword.error
                ? formValues.confirmPassword.errorMessage
                : formValues.confirmPassword.value.length > 0 &&
                  formValues.confirmPassword.value.length < 6
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

          <Box display="flex" justifyContent="center">
            <Button
              style={{
                marginTop: "1.5em",
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
              Reset
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Typography>
              <RouterLink to="/login">Back to Login</RouterLink>
            </Typography>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export default Reset;
