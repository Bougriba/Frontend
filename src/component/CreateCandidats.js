// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button } from '@mui/material';

// const ResumeForm = () => {
//   const [Skills, setSkills] = useState([]);
//   const [degrees, setDegrees] = useState([]);
//   const [majors, setMajors] = useState([]);
  
//   function handleFileChange(event) {
//     const formData = new FormData();
//     formData.append('resume', event.target.files[0]);
    
//     axios.post('http://localhost:3002/extract_resume_entities', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     })
//         .then(response => {
//         console.log(response)
//             if (response.data.Skills) { setSkills(response.data.Skills); }
//             if (response.data.degrees) { setDegrees(response.data.degrees) };
//             if (response.data['Acceptable majors']) { setMajors(response.data['Acceptable majors']) };
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   }
  
//   return (
//     <div>
//       <label>
//         Skills:
//         <input type="text" value={Skills ? Skills.join(', ') : ''} readOnly />
//       </label>
//       <label>
//         Degrees:
//         <input type="text" value={degrees ? degrees.join(', ') : ''} readOnly />
//       </label>
//       <label>
//         Majors:
//         <input type="text" value={majors ? majors.join(', ') : ''} readOnly />
//       </label>
//       <input
//   style={{ display: 'none' }}
//   id="raised-button-file"
//   multiple
//               type="file"
//               onChange={handleFileChange}
// />
// <label htmlFor="raised-button-file">
//   <Button variant="raised" component="span" >
//     Upload Your
//   </Button>
// </label>
//     </div>
//   );
// }
// export default  ResumeForm;

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
import { RecruiterProfileAction, userProfileAction } from "../redux/actions/RecruiterAction";
  
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
    PhoneNumber: yup
      .string("Enter your PhoneNumber")
      .min(8, "PhoneNumber should be  8 characters length"),
  });
  
  const ResumeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
        dispatch(RecruiterProfileAction());
    }, []);
 const{profile}=useSelector((state)=>state.profiles)
 console.log(profile?.phoneNumber)
    const formik = useFormik({
      initialValues: {
        fullName: "",
        email: "",
        age: "",
        PhoneNumber: "",
        
      },
      validationSchema: validationSchema,
        
    });
    useEffect(() => {
        if (profile) {
          formik.setValues({
            fullName: profile?.fullName,
            email: profile?.email,
            age: profile?.age,
            phoneNumber: profile?.phoneNumber,
          });
        }
      }, [profile]);
  
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
  