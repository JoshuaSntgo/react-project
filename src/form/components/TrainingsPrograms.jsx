import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateTrainings } from '../reducer';
import axiosInstance from '../../axios/Index';
import { fetchFromStorage } from '../../utilities/Storage';


const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function TrainingsPrograms(props) {
    const user = fetchFromStorage('user')
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const {activeStep, handleBack, handleNext, steps} = props
    const [newForm, setNewForm] = useState(false)
    const initialValues = {
        TrainingData : []
    }

    console.log(user)
    const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = useFormik({
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

          const {data} = await axiosInstance.put(`/users/${user._id}`, {
              userInfo,
          })
          console.log(data)
          if (data.success) {
            handleNext()
          }
        }
    })
    const handleAdd = (data) => {
        setFieldValue("TrainingData", [...values.TrainingData, data])
    }
    console.log(values)
    return (
        <Box sx={{padding: 5,}}>
            <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                <div>
                    <Typography style={{fontWeight: 600, fontSize: 18}}>Trainings and Programs (Trainings, seminars, and certification)</Typography>
                    <Typography style={{color: '#b4b4b4', fontSize: 15}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
                </div>
                <Button size="small" color="primary" variant="contained" startIcon={<Add />} onClick={() => setNewForm(true)}>Add Work LD and Training Programs</Button>
            </div>
            <Box sx={{marginTop: 5}} component="form" onSubmit={handleSubmit}>
                {values.TrainingData.map((training_data, index) => (
                    <Card key={index} sx={{padding: 2, marginBottom:5}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <Typography style={{fontWeight: 700, fontSize: 16}}>{training_data.titleOfLearning}</Typography>
                                <Typography style={{fontSize: 14, color: '#b4b4b4'}}>{training_data.typeOfLD}</Typography>
                            </div>
                            <IconButton onClick={() => console.log(training_data)}><Edit /></IconButton>
                        </div>
                        
                    </Card>
                ))}
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
            {newForm && (
                <TrainingsProgramsForm open={newForm} onClose={() => setNewForm(false)} handleAdd={handleAdd} />
            )}
        </Box>
    )
}

const TrainingsProgramsForm = ({open, onClose, handleAdd}) => {

    const initialValues = {
        titleOfLearning:"",
        type:"",
        DatesOfAttendance : {
            from: new Date(),
            to: new Date(),
        },
        hours: 0,
        typeOfLD:"",
        conducted:"",
    }
    const {values, handleSubmit, errors, handleChange, touched, setFieldValue}  = useFormik({
        initialValues,
        validationSchema: Yup.object({
            DatesOfAttendance: Yup.object({
                from: Yup.date(),
                to: Yup.date()
            }),
            titleOfLearning: Yup.string().required("Title of learning is required"),
            hours: Yup.number().required(),
            typeOfLD: Yup.string().required("Type of LD is required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            handleAdd(values)
            onClose()
        }
    })
    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth component="form" onSubmit={handleSubmit}>
            <DialogTitle style={{marginTop: 15, fontWeight: 600, fontSize: 18}}>Add Work LD and Training Programs</DialogTitle>
            <DialogContent>

            <Typography style={{marginTop: 20, fontWeight: 600, fontSize: 18}}>Title of learning and development interventions/​training programs (write in full)   </Typography>
            
            <TextField 
                required
                fullWidth size="small"
                label="Title of L&D interventions/​training programs"
                style={{marginTop:20}}
                placeholder='Title of L&D'
                value={values.titleOfLearning}
                name="titleOfLearning"
                onChange={handleChange}
                error={Boolean(errors.titleOfLearning || touched.titleOfLearning)}
                helperText={errors.titleOfLearning} 
            />

            <TextField 
                required
                fullWidth size="small"
                label="Type"
                placeholder='Type'
                style={{marginTop:20}}
                value={values.type}
                name="type"
                onChange={handleChange} 
                error={Boolean(errors.type || touched.type)}
                helperText={errors.type} 
            />

            <Typography style={{marginTop: 20, fontWeight: 600, fontSize: 18}}>Inclusive Dates</Typography>
                <Box sx={{marginTop: 3, display: 'flex', flexDirection:'row'}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="from"
                            value={values.DatesOfAttendance.from}
                            onChange={(n) => setFieldValue("DatesOfAttendance.from", n)}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                        />
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="to"
                            value={values.DatesOfAttendance.to}
                            onChange={(n) => setFieldValue("DatesOfAttendance.to", n)}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                        />
                    </LocalizationProvider>
                
                </Box>

            
                    
            <TextField 
                required
                fullWidth size="small"
                label="No. of Hours"
                placeholder='No. of Hours'
                style={{marginTop:20}}
                value={values.hours}
                name="hours"
                onChange={handleChange} 
            /> 

            <Typography style={{marginTop: 20, fontWeight: 600, fontSize: 18}}>Types of LD (Managerial/​ Supervisory/​ Technical/​etc)</Typography>
            
            <TextField 
                required
                fullWidth size="small"
                label="Types of L&D"
                placeholder='Types of L&D'
                style={{marginTop:20}}
                value={values.typeOfLD}
                name="typeOfLD"
                onChange={handleChange} 
            />

            <TextField
                required
                fullWidth size ="small"
                label ="Conducted/​ sponsored by"
                placeholder= 'Conducted/​ sponsored by (Write in full)'
                style={{marginTop:20}}
                value={values.conducted}
                name="conducted"
                onChange={handleChange}
            />

            </DialogContent>


            <DialogActions>
                <Button size="small" variant='outlined' color="primary" onClick={onClose}>Cancel</Button>
                <Button size="small" variant='contained' color="primary" type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default TrainingsPrograms