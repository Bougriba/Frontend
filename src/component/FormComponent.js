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
import React, { useEffect } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userAddAction, userSignUpAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  fullName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  phoneNumber: yup
    .string("Enter your phoneNumber")
    .min(8, "phoneNumber should be  8 characters length"),
});

const Add = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success,data } = useSelector((state) => state.adduser);
    
  useEffect(() => {
      if (success) 
          navigate('/admin/dashboard')
  }, [success])
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      age: "",
      phoneNumber: "",
      role: ""
    },
    validationSchema: validationSchema,
      onSubmit: (values, actions) => {
        console.log(values)
      //alert(JSON.stringify(values, null, 2));
      dispatch(userAddAction(values));
      actions.resetForm();
    },
  });

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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              name="password"
              label="Password"
              type="password"
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
            <FormControl>
              <FormLabel id="genre">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="genre"
                name="genre"
                value={formik.values.gender}
                onChange={(e) => {
                  formik.setFieldValue("genre", e.target.value);
                }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Role
              </InputLabel>
              <Select
                labelId="role"
                name="role"
                id="demo-simple-select-autowidth"
                value={formik.values.role}
                onChange={formik.handleChange}
                label="Role"
              >
                <MenuItem value={"recruiter"}>Recruiter</MenuItem>
                <MenuItem value={"job_seeker"}>Job_Seeker</MenuItem>
              </Select>
            </FormControl>

            <Button fullWidth variant="contained" type="submit">
              ADD
            </Button>
          </Box>
        </Box>
      </Box>
      
    </>
  );
};

export default Add;
