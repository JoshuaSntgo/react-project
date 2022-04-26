import React from 'react'
import {Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, MenuItem, Select, Checkbox} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ButtonsComponent } from '..';
import { width } from '@mui/system';

function PersonalInformation(props) {

  const Civil_Status = [
    "Single",
    "In a Relationship",
    "Married",
    "Divorced"
  ]
  const {activeStep, handleBack, handleNext, steps} = props
  const initialValues = {
    email: "",
    password:"",
    emp_no:"",
    firstName:"",
    lastName:"",
    middleInitial:"",
    nameExtension:"",
    dateOfBirth: new Date(),
    placeBirth:"",
    gender:"",
    age:"",
    civilStatus:"",
    height:"",
    weight:"",
    btype:"",
    gsis:"",
    pagibig:"",
    phl_health:"",
    sss:"",
    tin:"",
    citizenship:"",

    address:{
      house_no:'',
      street:'',
      subd:'',
      baranggay:'',
      city:'',
      province:'',
      zip:''
    },


    address2:{
      house_no2:'',
      street2:'',
      subd2:'',
      baranggay2:'',
      city2:'',
      province2:'',
      zip2:''
    },


    TelNo:'',
    MobileNum:'',
    AltEmail:'',
  }

  const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = useFormik({
    initialValues,

    validationSchema: Yup.object({
      dateOfBirth: Yup.date(),
      email: Yup.string().email("Please provide a valid email address").required("Email is required"),
      password: Yup.string().required("Password is Mandatory").min(5, "Password must be at 5 characters long"),
      emp_no: Yup.string().required("Employee Number is Mandatory"),
      firstName: Yup.string().required("First Name is Mandatory"),
      lastName: Yup.string().required("Last Name is Mandatory"),
      middleInitial: Yup.string().required("Last Name is Mandatory"),
      
      address: Yup.object().shape({
        baranggay: Yup.string().required("Barangay is Mandatory"),
        city: Yup.string().required("City/Municipality is Mandatory"),
        province: Yup.string().required("Province is Mandatory")
      }),
    }),
    onSubmit: async (values) => {
      console.log(values)
      handleNext()
    }
  })
  
  return (
    <Box sx={{padding: 5,}}>
        <Typography style={{fontWeight: 600, fontSize: 18}}>Personal Information</Typography>
        <Typography style={{color: '#b4b4b4', fontSize: 15}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
        
        <Box sx={{marginTop: 2}} component="form" onSubmit={handleSubmit}>
          
          <TextField 
            required
            variant="outlined" 
            style={{marginBottom: 20}} 
            size="small" 
            fullWidth 
            label="Email Address" 
            placeholder='Email Address' 
            value={values.email} 
            name="email" 
            onChange={handleChange} 
            error={Boolean(errors.email) || touched.email} 
            helperText={errors.email} 
          />

          <TextField 
            required
            variant="outlined" 
            type= 'password'
            style={{marginBottom: 20}} 
            size="small" 
            fullWidth 
            label="Password" 
            placeholder='Password' 
            value={values.password} 
            name="password" 
            onChange={handleChange} 
            error={Boolean(errors.password) || touched.password} 
            helperText={errors.password} 
          />
          
          <TextField 
            required
            variant="outlined" 
            style={{marginBottom: 20}} 
            size="small" 
            fullWidth 
            label="Employee No." 
            placeholder='Employee No.' 
            value={values.emp_no} 
            name="emp_no" 
            onChange={handleChange} 
            error={Boolean(errors.emp_no) || touched.emp_no} 
            helperText={errors.emp_no} 
          />
          
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="First Name" 
              placeholder='First Name' 
              value={values.firstName} 
              name="firstName" 
              onChange={handleChange} 
              error={Boolean(errors.firstName) || touched.firstName} 
              helperText={errors.firstName} 
            />
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%'}} 
              size="small" 
              fullWidth 
              label="Last Name" 
              placeholder='Last Name' 
              value={values.lastName} 
              name="lastName" 
              onChange={handleChange} 
              error={Boolean(errors.lastName) || touched.lastName} 
              helperText={errors.lastName} 
            />
          </Box>

          <Box sx={{display:'flex', flexDirection:'row'}}>

          <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="Middle Initial" 
              placeholder='Middle Initial' 
              value={values.middleInitial} 
              name="middleInitial" 
              onChange={handleChange} 
            />
            <TextField
              variant="outlined" 
              style={{marginBottom: 20, width: '50%'}} 
              size="small" 
              fullWidth 
              label="Name Extension (II, III, Jr., Sr.)" 
              placeholder='Name Extension (II, III, Jr., Sr.)' 
              value={values.nameExtension} 
              name="nameExtension" 
              onChange={handleChange} 
            />

          </Box>

          <Box sx={{display: 'flex', flexDirection:'row'}}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={values.dateOfBirth}
                name="dateOfBirth"
                onChange={(n) => setFieldValue("dateOfBirth", n)}
                renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
              />
            </LocalizationProvider>

            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '100%', marginLeft:10}} 
              size="small" 
              fullWidth 
              label="Place of Birth" 
              placeholder='Place of Birth' 
              value={values.placeBirth} 
              name="placeBirth" 
              onChange={handleChange} 
            />
          </Box>

          <Box sx={{display:'flex', flexDirection:'row'}}>

            <Typography style={{fontSize: 18, marginTop: 7, marginRight:20}}>Gender:</Typography>
          
            <RadioGroup row 
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender" 
                style={{marginBottom: 20, width: '40%', marginRight:20}} >
                  <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" />
                  <FormControlLabel name="gender" value="female" control={<Radio />} label="Female" />
                  <FormControlLabel name="gender" value="other" control={<Radio />} label="Other" />
              </RadioGroup>

              <TextField 
              InputProps={{
                readOnly: true
              }}
              variant="outlined" 
              style={{marginBottom: 20, width: '50%'}} 
              size="small" 
              fullWidth 
              label="Age" 
              placeholder='Age' 
              name='age'
              value={new Date().getFullYear() - values.dateOfBirth.getFullYear() - 1} 
              />
          </Box>

          <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '100%'}} 
              size="small" 
              fullWidth 
              label="Relationship Status gagawin dropdown" 
              placeholder='Relationship Status gagawin dropdown' 
              value={values.civilStatus} 
              name="civilStatus" 
              onChange={handleChange} 
            />

          <Box sx={{display:'flex', flexDirection:'row'}}>
            <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="Height(cm)" 
                placeholder='Height(cm)' 
                value={values.height} 
                name="height" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="Weight(kg)" 
                placeholder='Weight(kg)' 
                value={values.weight} 
                name="weight" 
                onChange={handleChange} 
              />
              <TextField 
                required
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="Blood Type" 
                placeholder='Blood Type' 
                value={values.btype} 
                name="btype" 
                onChange={handleChange} 
              />
          </Box>

          <Box sx={{display:'flex', flexDirection:'row'}}>
            <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="GSIS Number" 
                placeholder='GSIS Number' 
                value={values.gsis} 
                name="gsis" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="PAG-IBIG ID Number" 
                placeholder='PAG-IBIG ID Number' 
                value={values.pagibig} 
                name="pagibig" 
                onChange={handleChange} 
              />
          </Box>

          
          <Box sx={{display:'flex', flexDirection:'row'}}>
            <TextField
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="PHILHEALTH Number" 
                placeholder='PHILHEALTH Number' 
                value={values.phl_health} 
                name="phl_health" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="SSS Number" 
                placeholder='SSS Number' 
                value={values.sss} 
                name="sss" 
                onChange={handleChange} 
              />
          </Box>

          
          <Box sx={{display:'flex', flexDirection:'row'}}>
            <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="TIN Number" 
                placeholder='TIN Number' 
                value={values.tin} 
                name="tin" 
                onChange={handleChange} 
              />
              <TextField 
                required
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="Citizenship" 
                placeholder='Citizenship' 
                value={values.citizenship} 
                name="citizenship" 
                onChange={handleChange} 
              />
          </Box>
     
          <Typography style={{marginTop: 15, fontWeight: 600, fontSize: 18}}>Resident Address (Some fields are required)</Typography> 
          <Box sx={{marginTop: 2,display:'flex', flexDirection:'row'}}>
            <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="House/​Block/​Lot No" 
                placeholder='House/​Block/​Lot No:' 
                value={values.address.house_no} 
                name="address.house_no" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="Street" 
                placeholder='Street' 
                value={values.address.street} 
                name="address.street" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="Subdivision/​Village" 
                placeholder='Subdivision/​Village' 
                value={values.address.subd} 
                name="address.subd" 
                onChange={handleChange} 
              />
          </Box>
          <Box sx={{display:'flex', flexDirection:'row'}} >
            <TextField
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="Barangay" 
              placeholder='Barangay' 
              value={values.address.baranggay} 
              name="address.baranggay" 
              onChange={handleChange}
              />
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="City/​Municipality" 
              placeholder='City/​Municipality' 
              value={values.city} 
              name="city" 
              onChange={handleChange} 
              error={Boolean(errors.city) || touched.city} 
              helperText={errors.city} 
            />
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="Province" 
              placeholder='Province' 
              value={values.address.province} 
              name="address.province" 
              onChange={handleChange} 
            />
            
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%'}} 
              size="small" 
              fullWidth 
              label="ZIP Code" 
              placeholder='ZIP Code' 
              value={values.address.zip} 
              name="address.zip" 
              onChange={handleChange} 
            />
          </Box>

          <Typography style={{marginTop: 15, fontWeight: 600, fontSize: 18}}>Permanent Address (Some fields are required)</Typography>
          <FormControlLabel label="Same as Resident Address" control={<Checkbox />}/> //Will get the value from the resident address


          <Box sx={{marginTop: 2,display:'flex', flexDirection:'row'}}>
            <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="House/​Block/​Lot No" 
                placeholder='House/​Block/​Lot No:' 
                value={values.address2.house_no2} 
                name="address2.house_no2" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="Street" 
                placeholder='Street' 
                value={values.address2.street2} 
                name="address2.street2" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="Subdivision/​Village" 
                placeholder='Subdivision/​Village' 
                value={values.address2.subd2} 
                name="address2.subd2" 
                onChange={handleChange} 
              />
          </Box>
          <Box sx={{display:'flex', flexDirection:'row'}}>
            <TextField
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="Barangay" 
              placeholder='Barangay' 
              value={values.address2.baranggay2} 
              name="address2.baranggay2" 
              onChange={handleChange}
              />
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="City/​Municipality" 
              placeholder='City/​Municipality' 
              value={values.address2.city2} 
              name="address2.city2" 
              onChange={handleChange} 
            />
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%', marginRight:10}} 
              size="small" 
              fullWidth 
              label="Province" 
              placeholder='Province' 
              value={values.address2.province2} 
              name="address2.province2" 
              onChange={handleChange} 
            />
            
            <TextField 
              required
              variant="outlined" 
              style={{marginBottom: 20, width: '50%'}} 
              size="small" 
              fullWidth 
              label="ZIP Code" 
              placeholder='ZIP Code' 
              value={values.address2.zip2} 
              name="address2.zip2" 
              onChange={handleChange} 
            />
          </Box>

          <Typography style={{marginTop: 15, fontWeight: 600, fontSize: 18}}>Contact Information</Typography>
          
          <Box sx={{marginTop: 2,display:'flex', flexDirection:'row'}}>
            <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="Telephone No" 
                placeholder='Telephone No' 
                value={values.TelNo} 
                name="TelNo" 
                onChange={handleChange} 
              />
              <TextField 
                required
                variant="outlined" 
                style={{marginBottom: 20, width: '50%', marginRight:10}} 
                size="small" 
                fullWidth 
                label="Mobile Number" 
                placeholder='Mobile Number' 
                value={values.MobileNum} 
                name="MobileNum" 
                onChange={handleChange} 
              />
              <TextField 
                variant="outlined" 
                style={{marginBottom: 20, width: '50%'}} 
                size="small" 
                fullWidth 
                label="Alternative Email" 
                placeholder='Alternative Email' 
                value={values.AltEmail} 
                name="AltEmail" 
                onChange={handleChange} 
              />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
              >
              Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button type="submit">
                  Next
              </Button>
          </Box>

        </Box>
    </Box>
  )
}

export default PersonalInformation