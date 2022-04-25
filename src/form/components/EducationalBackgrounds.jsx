import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

const months = [
    "January",
    "February"
]

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function EducationalBackgrounds(props) {
    const {activeStep, handleBack, handleNext, steps} = props
    const [newForm, setNewForm] = useState(false)
    const initialValues = {
        educs : []
    }

    const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = useFormik({
        initialValues,
        validationSchema: Yup.object({
          educs: Yup.array().of(
              Yup.object().shape({
                schoolName: Yup.string().required("School Name is required"),
                course: Yup.string().required("Course is required"), 
                from: Yup.object({
                    month: Yup.string().required(), 
                    year:Yup.string().required(), 
                }),
                to: Yup.object({
                    month: Yup.string().required(), 
                    year:Yup.string().required(), 
                }),
                unitsEarned: Yup.number().required(), 
                awards: Yup.string()
              })
          ),
        }),
        onSubmit: async (values) => {
          console.log(values)
          handleNext()
        }
    })
    const handleAdd = (data) => {
        setFieldValue("educs", [...values.educs, data])
    }
    console.log(values)
    return (
        <Box sx={{padding: 5,}}>
            <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                <div>
                    <Typography style={{fontWeight: 600, fontSize: 18}}>Educational Background</Typography>
                    <Typography style={{color: '#b4b4b4', fontSize: 11}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
                </div>
                <Button size="small" color="primary" variant="contained" startIcon={<Add />} onClick={() => setNewForm(true)}>Add Education</Button>
            </div>
            <Box sx={{marginTop: 5}} component="form" onSubmit={handleSubmit}>
                {values.educs.map((educ, index) => (
                    <Card key={index} sx={{padding: 2}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <Typography style={{fontWeight: 700, fontSize: 16}}>{educ.schoolName}</Typography>
                                <Typography style={{fontSize: 14, color: '#b4b4b4'}}>{educ.course}</Typography>
                                <Typography style={{fontSize: 11, color: '#b4b4b4'}}>{educ.from.year} - {educ.to.year}</Typography>
                            </div>
                            <IconButton onClick={() => console.log(educ)}><Edit /></IconButton>
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
                <NewEducationForm open={newForm} onClose={() => setNewForm(false)} handleAdd={handleAdd} />
            )}
        </Box>
    )
}

const NewEducationForm = ({open, onClose, handleAdd}) => {

    const initialValues = {
        schoolName: "", 
        course: "",
        from : {
            month: "January", 
            year: "2016"
        },
        to: {
            month: "January", 
            year: "2016"
        },
        unitsEarned: 0, 
        awards: ""
    }
    const {values, handleSubmit, errors, handleChange, touched, setFieldValue}  = useFormik({
        initialValues, 
        validationSchema: Yup.object({
            schoolName: Yup.string().required("School Name is required"),
            course: Yup.string().required("Course is required"), 
            from: Yup.object({
                month: Yup.string().required(), 
                year:Yup.string().required(), 
            }),
            to: Yup.object({
                month: Yup.string().required(), 
                year:Yup.string().required(), 
            }),
            unitsEarned: Yup.number().required(), 
            awards: Yup.string()
        }),
        onSubmit: (values) => {
            console.log(values)
            handleAdd(values)
            onClose()
        }
    })
    console.log(errors)
    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth component="form" onSubmit={handleSubmit}>
            <DialogTitle>Add Education</DialogTitle>
            <DialogContent>
                <TextField required style={{marginTop: 20}} fullWidth size="small" label="School" placeholder='School' value={values.schoolName} name="schoolName" onChange={handleChange} 
                    error={Boolean(errors.schoolName || touched.schoolName)}
                    helperText={errors.schoolName} 
                />
                <TextField required style={{marginTop: 20}}  fullWidth size="small" label="Course" placeholder='Course' value={values.course} name="course" onChange={handleChange} 
                    error={Boolean(errors.course || touched.course)}
                    helperText={errors.course} 
                />
                <TextField required style={{marginTop: 20}}  fullWidth size="small" label="Units Earned" placeholder='Units Earned' value={values.unitsEarned} name="unitsEarned" onChange={handleChange} 
                    error={Boolean(errors.unitsEarned || touched.unitsEarned)}
                    helperText={errors.unitsEarned} 
                />
                <Typography style={{marginTop: 20, fontSize: 14}}>Start Date</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <Select value={values.from.month} label="Month" onChange={(e) => setFieldValue("from.month", e.target.value)}>
                                {months.map((month, index) => (
                                    <MenuItem key={index} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <Select value={values.from.year} label="Year" onChange={(e) => setFieldValue("from.year", e.target.value)}>
                                {range(currentYear, currentYear - 50, -1).sort().map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Typography style={{marginTop: 20, fontSize: 14}}>End Date</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <Select value={values.to.month} label="Month" onChange={(e) => setFieldValue("to.month", e.target.value)}>
                                {months.map((month, index) => (
                                    <MenuItem key={index} value={month}>{month}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <Select value={values.to.year} label="Year" onChange={(e) => setFieldValue("to.year", e.target.value)}>
                                {range(currentYear, currentYear - 50, -1).sort().map((year, index) => (
                                    <MenuItem key={index} value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <TextField style={{marginTop: 20}}  fullWidth size="small" label="Awards" placeholder='Awards' value={values.awards} name="awards" onChange={handleChange} 
                    error={Boolean(errors.awards || touched.awards)}
                    helperText={errors.awards} 
                />
                
            </DialogContent>
            <DialogActions>
                <Button size="small" variant='outlined' color="primary" onClick={onClose}>Cancel</Button>
                <Button size="small" variant='contained' color="primary" type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default EducationalBackgrounds