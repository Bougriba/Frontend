import {
  Avatar,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailCheckAction,
  userLoadSingledAction,
  userUpdateAction,
} from "../redux/actions/userAction";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = yup.object({
  fullName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  age: yup.number("Enter your age").min(0, "age should be positive"),
  phoneNumber: yup
    .string("Enter your PhoneNumber")
    .min(8, "PhoneNumber should be  8 characters length"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
});

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { singleuser } = useSelector((state) => state.singleUser);
  const emailChecked = useSelector((state) => state.emailcheck);
  const { loading, error, emailExists } = emailChecked;

  const [selectedRole, setSelectedRole] = useState(singleuser?.role);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const handleEmailChange = (e,formik) => {
    formik.handleChange(e);
    setEmailError("");
  };

  const handleEmailBlur = (formik) => {
      formik.handleBlur("email");
    dispatch(EmailCheckAction(formik.values.email));
  };

  useEffect(() => {
    // Set emailError to the error message if there is an error
    setEmailError(error);
  }, [error]);

  useEffect(() => {
    // Set emailError to "Email already exists" if emailExists is true
    if (emailExists) {
      setEmailError("Email already exists");
    }
  }, [emailExists]);

  const { id } = useParams();
  useEffect(() => {
    dispatch(userLoadSingledAction(id));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      age: "",
      phoneNumber: "",
      role: "",
    },
    validationSchema: validationSchema,
      onSubmit: (values, actions) => {
        console.log(values)
      dispatch(userUpdateAction(id, values));
      actions.resetForm();
      //   navigate("/admin/dashboard");
    },
  });

  useEffect(() => {
    if (singleuser) {
      formik.setValues({
        fullName: singleuser.fullName,
        email: singleuser.email,
        password: "",
        age: singleuser.age,
        phoneNumber: singleuser.phoneNumber,
        role: singleuser.role,
      });
    }
  }, [singleuser]);

  return (
    <>
      <Box
        sx={{
          height: "81vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={(e) => handleEmailChange(e, formik)}
              onBlur={() => handleEmailBlur(formik)}
              error={
                (formik.touched.email &&
                  Boolean(formik.errors.email)) ||
                Boolean(emailError)
              }
              helperText={
                (formik.touched.email && formik.errors.email) ||
                emailError
              }
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="age"
              name="age"
              label="age"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="password"
              label="Password"
              name="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="phoneNumber"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Role
        </InputLabel>
        <Select
          labelId="role"
          name="role"
          id="demo-simple-select-autowidth"
          value={selectedRole || ""}
          onChange={handleRoleChange}
          label="Role"
        >
          <MenuItem value={"recruiter"}>Recruiter</MenuItem>
          <MenuItem value={"job_seeker"}>Job_Seeker</MenuItem>
        </Select>
      </FormControl>

            <Button fullWidth variant="contained" type="submit">
              edit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Update;
