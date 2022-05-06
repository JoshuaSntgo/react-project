import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateTrainings } from '../form/reducer';
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'


const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

function TNP(props) {
  const user = useSelector(state => state.userInfo)
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
    <Box sx={{ padding: 5, display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
        <div>
          <Typography style={{ fontWeight: 600, fontSize: 18 }}>Trainings and Programs (Trainings, seminars, and certification)</Typography>
        </div>
      </div>
      <Box sx={{ marginTop: 5 }} component="form" onSubmit={handleSubmit}>
        {values.TrainingData.map((training_data, index) => (
          <Card key={index} sx={{ padding: 2, marginBottom: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Typography style={{ fontWeight: 700, fontSize: 16 }}>{training_data.titleOfLearning}</Typography>
                <Typography style={{ fontSize: 14, color: '#b4b4b4' }}>{training_data.typeOfLD}</Typography>
              </div>
              <IconButton onClick={() => console.log(training_data)}><Edit /></IconButton>
            </div>

          </Card>
        ))}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {/* <Button
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
                    </Button> */}
        </Box>
      </Box>
    </Box>
  )
}

export default TNP