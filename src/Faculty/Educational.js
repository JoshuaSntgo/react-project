import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Sidebar from '../components/Layout/Sidebar'
import { updateEducs } from '../form/reducer'

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

function Educational(props) {
  const user = useSelector(state => state.userInfo)
  const dispatch = useDispatch()
  const { activeStep, handleBack, handleNext, steps } = props
  const [newForm, setNewForm] = useState(false)
  const initialValues = {
    educs: []
  }

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      educs: Yup.array().of(
        Yup.object().shape({
          schoolName: Yup.string().required("School Name is required"),
          course: Yup.string().required("Course is required"),
          from: Yup.object({
            month: Yup.string().required(),
            year: Yup.string().required(),
          }),
          to: Yup.object({
            month: Yup.string().required(),
            year: Yup.string().required(),
          }),
          unitsEarned: Yup.number().required(),
          awards: Yup.string()
        })
      ),
    }),
    onSubmit: async (values) => {
      console.log(values)
      dispatch(updateEducs(values))
      handleNext()
    }
  })
  const handleAdd = (data) => {
    setFieldValue("educs", [...values.educs, data])
  }
  console.log(values)
  return (
    <Box sx={{ padding: 5, display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h6">Educational Background</Typography>
        </div>

      </div>
      <Box sx={{ marginTop: 5 }} component="form" onSubmit={handleSubmit}>
        {values.educs.map((educ, index) => (
          <Card key={index} sx={{ padding: 2, marginBottom: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Typography style={{ fontWeight: 700, fontSize: 16 }}>{educ.schoolName}</Typography>
                <Typography style={{ fontSize: 14, color: '#b4b4b4' }}>{educ.course}</Typography>
                <Typography style={{ fontSize: 11, color: '#b4b4b4' }}>{educ.from.year} - {educ.to.year}</Typography>
              </div>
              <IconButton onClick={() => console.log(educ)}><Edit /></IconButton>
            </div>

          </Card>
        ))}
      </Box>
    </Box>
  )
}
export default Educational