import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkXP } from '../reducer';


const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function WorkExperience(props) {
    const user = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const {activeStep, handleBack, handleNext, steps} = props
    const [newForm, setNewForm] = useState(false)
    const initialValues = {
        WorkData : []
    }

    const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = useFormik({
        initialValues,
        validationSchema: Yup.object({
          WorkData: Yup.array().of(
              Yup.object().shape({
                positionTitle: Yup.string().required("Position Title is required"),
              })
          ),
        }),
        onSubmit: async (values) => {
          console.log(values)
          dispatch(updateWorkXP(values))
          handleNext()
        }
    })
    const handleAdd = (data) => {
        setFieldValue("WorkData", [...values.WorkData, data])
    }
    console.log(values)
    return (
        <Box sx={{padding: 5,}}>
            <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                <div>
                    <Typography style={{fontWeight: 600, fontSize: 18}}>Work Experience</Typography>
                    <Typography style={{color: '#b4b4b4', fontSize: 15}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
                </div>
                <Button size="small" color="primary" variant="contained" startIcon={<Add />} onClick={() => setNewForm(true)}>Add Work Experience</Button>
            </div>
            <Box sx={{marginTop: 5}} component="form" onSubmit={handleSubmit}>
                {values.WorkData.map((work_data, index) => (
                    <Card key={index} sx={{padding: 2, marginBottom:5}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <Typography style={{fontWeight: 700, fontSize: 16}}>{work_data.positionTitle}</Typography>
                                <Typography style={{fontSize: 14, color: '#b4b4b4'}}>{work_data.company}</Typography>
                            </div>
                            <IconButton onClick={() => console.log(work_data)}><Edit /></IconButton>
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
                <WorkExperienceForm open={newForm} onClose={() => setNewForm(false)} handleAdd={handleAdd} />
            )}
        </Box>
    )
}

const WorkExperienceForm = ({open, onClose, handleAdd}) => {

    const initialValues = {
        InclusiveDate : {
            from: new Date(),
            to: new Date(),
        },
        positionTitle:"",
        company:"",
        monthlySalary: 0,
        salary:0.00,
        statusOfAppointment:"",
        govtService: true
    }
    const {values, handleSubmit, errors, handleChange, touched, setFieldValue}  = useFormik({
        initialValues,

        validationSchema: Yup.object({
            InclusiveDate: Yup.object({
                from: Yup.date(),
                to: Yup.date()
            }),
            positionTitle: Yup.string().required("Position Title is required"),
            company: Yup.string().required("Company Name Field is required"),
            monthlySalary: Yup.number().required(),
            salary: Yup.number().required(),
            statusOfAppointment: Yup.string().required("Status of Appointment Field is required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            handleAdd(values)
            onClose()
        }
    })
    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth component="form" onSubmit={handleSubmit}>
            <DialogTitle style={{marginTop: 15, fontWeight: 600, fontSize: 18}}>Add Work Experience</DialogTitle>
            <DialogContent>
                <Typography style={{marginTop: 10, fontWeight: 600, fontSize: 18}}>Inclusive DATES (mm/dd/yyyy)</Typography>

                <Box sx={{marginTop: 3, display: 'flex', flexDirection:'row'}}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="from"
                            value={values.InclusiveDate.from}
                            onChange={(n) => setFieldValue("InclusiveDate.from", n)}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                        />
                    </LocalizationProvider>
                    
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="to"
                            value={values.InclusiveDate.to}
                            onChange={(n) => setFieldValue("InclusiveDate.to", n)}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                        />
                    </LocalizationProvider>
                
                </Box>

                <TextField 
                        required
                        fullWidth size="small"
                        label="Position Title"
                        style={{marginTop:20}}
                        placeholder='Position Title'
                        value={values.positionTitle}
                        name="positionTitle"
                        onChange={handleChange} 
                />

                <TextField 
                        required
                        fullWidth size="small"
                        label="Company"
                        placeholder='Company'
                        style={{marginTop:20}}
                        value={values.company}
                        name="company"
                        onChange={handleChange} 
                />

                <Typography style={{marginTop: 20, fontWeight: 600, fontSize: 18}}>Salary</Typography>


                <Box sx={{ display: 'flex', flexDirection:'row'}}>
                    
                    <TextField 
                            required
                            fullWidth size="small"
                            label="Monthly Salary"
                            placeholder='Monthly Salary'
                            style={{marginTop:20, marginRight:5}}
                            value={values.monthlySalary}
                            name="monthlySalary"
                            onChange={handleChange} 
                    />  
                    
                    <TextField 
                            required
                            fullWidth size="small"
                            label="Salary"
                            placeholder='Salary'
                            style={{marginTop:20}}
                            value={values.salary}
                            name="salary"
                            onChange={handleChange} 
                    /> 
                </Box>
                    
                <TextField 
                    required
                    fullWidth size="small"
                    label="Status of Appointment"
                    placeholder='Status of Appointment'
                    style={{marginTop:20}}
                    value={values.statusOfAppointment}
                    name="statusOfAppointment"
                    onChange={handleChange} 
                /> 

                <Box sx={{ display: 'flex', flexDirection:'row'}}>
                    <Typography style={{fontSize: 18, marginTop: 20, marginRight: 10}}>Gov't service (y/​ n): </Typography>
                    <RadioGroup row 
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="govtService" 
                        style={{marginTop: 12, width: '50%'}} >.
                        <FormControlLabel name="govtService" value="Yes" control={<Radio onChange={(e) => setFieldValue("govtService", e.target.checked ? true : false)}  />} label="Yes" />
                        <FormControlLabel name="govtService" value="No" control={<Radio onChange={(e) => setFieldValue("govtService", e.target.checked ? false : true)}  />} label="No" />
                    </RadioGroup>
                </Box>


            </DialogContent>


            <DialogActions>
                <Button size="small" variant='outlined' color="primary" onClick={onClose}>Cancel</Button>
                <Button size="small" variant='contained' color="primary" type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default WorkExperience