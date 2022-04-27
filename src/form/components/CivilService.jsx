import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'


const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function CivilService(props) {
    const {activeStep, handleBack, handleNext, steps} = props
    const [newForm, setNewForm] = useState(false)
    const initialValues = {
        CivilData : []
    }

    const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = useFormik({
        initialValues,
        validationSchema: Yup.object({
          CivilData: Yup.array().of(
              Yup.object().shape({
                civilService: Yup.string().required("School Name is required"),
                rating: Yup.string().required("rating is required"), 
                dateOfExamination: Yup.date(),
              })
          ),
        }),
        onSubmit: async (values) => {
          console.log(values)
          handleNext()
        }
    })
    const handleAdd = (data) => {
        setFieldValue("CivilData", [...values.CivilData, data])
    }
    console.log(values)
    return (
        <Box sx={{padding: 5,}}>
            <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                <div>
                    <Typography style={{fontWeight: 600, fontSize: 18}}>Civil Service Eligibility</Typography>
                    <Typography style={{color: '#b4b4b4', fontSize: 15}}>Please complete the information below. If the field is not applicable, type N/A</Typography>
                </div>
                <Button size="small" color="primary" variant="contained" startIcon={<Add />} onClick={() => setNewForm(true)}>Add Eligibility</Button>
            </div>
            <Box sx={{marginTop: 5}} component="form" onSubmit={handleSubmit}>
                {values.CivilData.map((civil_data, index) => (
                    <Card key={index} sx={{padding: 2, marginBottom:5}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div>
                                <Typography style={{fontWeight: 700, fontSize: 16}}>{civil_data.civilService}</Typography>
                                <Typography style={{fontSize: 14, color: '#b4b4b4'}}>{civil_data.rating}</Typography>

                            </div>
                            <IconButton onClick={() => console.log(civil_data)}><Edit /></IconButton>
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
                <CivilServiceForm open={newForm} onClose={() => setNewForm(false)} handleAdd={handleAdd} />
            )}
        </Box>
    )
}

const CivilServiceForm = ({open, onClose, handleAdd}) => {

    const initialValues = {
        civilService: "", 
        rating: "",
        dateOfExamination: new Date(),
        placeOfExamination:"",
        dateOfValidity: new Date(),
        number:""
    }
    const {values, handleSubmit, errors, handleChange, touched, setFieldValue}  = useFormik({
        initialValues, 
        validationSchema: Yup.object({
            civilService: Yup.string().required("This field is required"),
            rating: Yup.string().required("Rating is required"),
            dateOfExamination: Yup.date()
        }),
        onSubmit: (values) => {
            console.log(values)
            handleAdd(values)
            onClose()
        }
    })
    return (
        <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth component="form" onSubmit={handleSubmit}>
            <DialogTitle style={{marginTop: 15, fontWeight: 600, fontSize: 18}}>Add Eligibility</DialogTitle>
            <DialogContent>
                <TextField required style={{marginTop: 5}} fullWidth size="small" label="Civil Service Eligibility (Board/Bar, CES, etc..)" placeholder='Civil Service Eligibility (Board/Bar, CES, etc..)' value={values.civilService} name="civilService" onChange={handleChange} 
                    error={Boolean(errors.civilService || touched.civilService)}
                    helperText={errors.civilService} 
                />
                <TextField required style={{marginTop: 20}}  fullWidth size="small" label="Rating (if applicable)" placeholder='Rating (if applicable)' value={values.rating} name="rating" onChange={handleChange} 
                    error={Boolean(errors.rating || touched.rating)}
                    helperText={errors.rating} 
                />
                <Box sx={{marginTop: 3, display: 'flex', flexDirection:'row'}}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Examination"
                            value={values.dateOfExamination}
                            name="dateOfExamination"
                            onChange={(n) => setFieldValue("dateOfExamination", n)}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                        />
                    </LocalizationProvider>
                    
                    <TextField 
                        required
                        style={{marginLeft:5}} 
                        fullWidth size="small"
                        label="Place of Examination"
                        placeholder='Place of Examination'
                        value={values.placeOfExamination}
                        name="placeOfExamination"
                        onChange={handleChange} 
                    />
                
                </Box>


                <Typography style={{marginTop: 20, fontWeight: 600, fontSize: 18}}>License (if applicable)</Typography>

                <Box sx={{marginTop: 3, display: 'flex', flexDirection:'row'}}>

                    <TextField 
                        required
                        fullWidth size="small"
                        label="Number"
                        style={{marginRight:5}} 
                        placeholder='Number'
                        value={values.number}
                        name="number"
                        onChange={handleChange} 
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Validity"
                            value={values.dateOfValidity}
                            name="dateOfValidity"
                            onChange={(n) => setFieldValue("dateOfValidity", n)}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                        />
                    </LocalizationProvider>

                </Box>

            </DialogContent>


            <DialogActions>
                <Button size="small" variant='outlined' color="primary" onClick={onClose}>Cancel</Button>
                <Button size="small" variant='contained' color="primary" type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default CivilService