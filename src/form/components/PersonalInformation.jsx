import React from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ButtonsComponent } from '..';

function PersonalInformation(props) {

  const {activeStep, handleBack, handleNext, steps} = props
  const initialValues = {
    email: "",
    dateOfBirth: new Date()
  }

  const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = useFormik({
    initialValues,
    validationSchema: Yup.object({
      dateOfBirth: Yup.date(),
      email: Yup.string().email("Please provide a valid email address").required("Email is required")
    }),
    onSubmit: async (values) => {
      console.log(values)
      handleNext()
    }
  })
  
  return (
    <Box sx={{padding: 5,}}>
        <Typography style={{fontWeight: 600, fontSize: 18}}>Personal Information</Typography>
        <Typography style={{color: '#b4b4b4', fontSize: 11}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
        <Box sx={{marginTop: 5}} component="form" onSubmit={handleSubmit}>
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
            InputProps={{
              readOnly: true
            }}
            variant="outlined" 
            style={{marginBottom: 20}} 
            size="small" 
            fullWidth 
            label="Age" 
            placeholder='Age' 
            value={new Date().getFullYear() - values.dateOfBirth.getFullYear() - 1} 
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="mm/dd/yyyy"
              value={values.dateOfBirth}
              name="dateOfBirth"
              onChange={(n) => setFieldValue("dateOfBirth", n)}
              renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
            />
          </LocalizationProvider>
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