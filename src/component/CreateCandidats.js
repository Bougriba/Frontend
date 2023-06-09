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
  TextareaAutosize,
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
import { useNavigate, useParams } from "react-router-dom";
import {
  RecruiterProfileAction,
  userProfileAction,
} from "../redux/actions/RecruiterAction";
import axios from "axios";
import { useState } from "react";
import { CandidatAddAction } from "../redux/actions/CandidatsAction";

const validationSchema = yup.object({
  fullName: yup
    .string("Enter your First Name")
    .min(3, "First Name should be of minimum 3 characters length")
    .required("First Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  PhoneNumber: yup
    .string("Enter your PhoneNumber")
    .min(8, "PhoneNumber should be  8 characters length"),
});

const ResumeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {id}=useParams()
  useEffect(() => {
    dispatch(RecruiterProfileAction());
  }, []);
  const { profile } = useSelector((state) => state.profiles);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      PhoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(CandidatAddAction(id,values))
        navigate('/')
    
    },
  });
  useEffect(() => {
    if (profile) {
      formik.setValues({
        fullName: profile?.fullName,
        email: profile?.email,
        age: profile?.age,
        PhoneNumber: profile?.phoneNumber,
      });
    }
  }, [profile]);

  function handleFileChange(event) {
    const formData = new FormData();
    formData.append("pdf", event.target.files[0]);
    axios
      .post("http://localhost:3002/extract_resume_entities", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
                
        formik.setValues({
          ...formik.values,
          Skills: response.data.Skills,
          degrees: response.data.degrees,
          majors: response.data["Acceptable majors"],
        });
      
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleuploadChange(event) {
    const formData = new FormData()
    formData.append('pdf', event.target.files[0]);
    axios.post("http://localhost:3000/api/users/uploadpdf", formData, {
      hearders: {
        "content-Type":"multipart/form-data",
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
      console.log(error)
    })
  }
  
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
              id="PhoneNumber"
              name="PhoneNumber"
              label="PhoneNumber"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="PhoneNumber"
              value={formik.values.PhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
              }
              helperText={
                formik.touched.PhoneNumber && formik.errors.PhoneNumber
              }
            />
            {formik.values.degrees && (<TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="degrees"
              name="degrees"
              label="Degrees"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="degrees"
              value={formik.values.degrees}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            )}
          {formik.values.majors && (<TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="majors"
              name="majors"
              label="Majors"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="majors"
              value={formik.values.majors}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            )}
            {formik.values.Skills && (
              <>
                <InputLabel htmlFor="Skills" sx={{ mr_right: 1 }}>Skills</InputLabel>
              <TextareaAutosize
                sx={{
                  mb: 3,
                  "& .MuiInputBase-root": {
                    color: "text.secondary",
                  },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
                fullWidth
                id="Skills"
                name="Skills"
                label="Skills"
                type="textarea"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Skills"
                value={formik.values.Skills}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minRows={5}
                style={{ fontSize: "15px", height: "200px", width: "100%" }}
                />
                </>
            )}
            <br></br>

            <Button variant="contained" component="label">
              Upload Your Resume
              <input
                type="file"
                onChange={(event) => {
                  handleFileChange(event);
                  handleuploadChange(event);
                }}
                style={{ display: "none" }}
              />
            </Button>

            <br></br>
            <Button fullWidth variant="contained" type="submit">
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResumeForm;
