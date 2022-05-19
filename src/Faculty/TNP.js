import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateTrainings } from '../form/reducer';
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'

import axiosInstance from '../axios/Index';
import { fetchFromStorage } from '../utilities/Storage';

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

function TNP(props) {

  /* Code for getting user information */
  const user = fetchFromStorage('user')
  const [selectedUser, setSelectedUser] = useState(null)

  const getUser = React.useCallback(async () => {
      const { data } = await axiosInstance.get(`/users/${user._id}`)
      setSelectedUser(data.user)
  }, [])

  useEffect(() => {
      getUser()
  }, [getUser])

  /* End Code for getting user information */
  
  const dispatch = useDispatch()
  const { activeStep, handleBack, handleNext, steps } = props
  const [newForm, setNewForm] = useState(false)
  const initialValues = {
    TrainingData: []
  }

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      TrainingData: Yup.array().of(
        Yup.object().shape({
          titleOfLearning: Yup.string().required("Title of Learning is required"),
          DatesOfAttendance: Yup.object({
            from: Yup.date(),
            to: Yup.date()
          }),

          hours: Yup.number().required(),
          typeOfLD: Yup.string().required("Type of LD is required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log(values)
      dispatch(updateTrainings(values))

      console.log(user)
      handleNext()
    }
  })
  const handleAdd = (data) => {
    setFieldValue("TrainingData", [...values.TrainingData, data])
  }
  console.log(values)
  return (
    <Card sx={{ padding: 5, display: 'flex' }}>
                    
    <Sidebar></Sidebar>
    
    <Box sx={{ marginTop: 1 }} component="form">

        <Typography variant='h6'>Civil Service</Typography>

        <Grid container spacing={2} style={{marginRight: 10}}>
            <Grid xs={12} sm={4}>
                <Card sx={{ minWidth: 700, marginLeft: 3, marginTop: 5 }}>
                    <CardContent>
                        <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                            {user.userInfo.workexp.WorkData[0].positionTitle}</Typography>
                        <Typography sx={{ mb: 1.5, marginTop: 2  }} color="text.secondary">
                            {user.userInfo.workexp.WorkData[0].company}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {user.userInfo.workexp.WorkData[0].statusOfAppointment}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid xs={12} sm={4}>
                <Card sx={{ minWidth: 700, marginLeft: 30, marginTop: 5 }}>
                    <CardContent>
                        <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                            {user.userInfo.workexp.WorkData[0].positionTitle}</Typography>
                        <Typography sx={{ mb: 1.5, marginTop: 2  }} color="text.secondary">
                            {user.userInfo.workexp.WorkData[0].company}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {user.userInfo.workexp.WorkData[0].statusOfAppointment}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    </Box>

    </Card>
  )
}

export default TNP