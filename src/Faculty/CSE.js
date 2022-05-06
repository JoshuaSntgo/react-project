import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'
import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateCivilService } from '../form/reducer';


const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

function CSE(props) {
    const user = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const { activeStep, handleBack, handleNext, steps } = props
    const [newForm, setNewForm] = useState(false)
    const initialValues = {
        CivilData: []
    }

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues,
        validationSchema: Yup.object({
            CivilData: Yup.array().of(
                Yup.object().shape({
                    civilService: Yup.string().required("Civil Service is required"),
                    dateOfExamination: Yup.date(),
                })
            ),
        }),
        onSubmit: async (values) => {
            console.log(values)
            dispatch(updateCivilService(values))
            handleNext()
        }
    })
    const handleAdd = (data) => {
        setFieldValue("CivilData", [...values.CivilData, data])
    }
    console.log(values)
    return (
        <Box sx={{ padding: 5, display: 'flex' }}>
            <Sidebar />
            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="h6">Civil Service Eligibility</Typography>
                </div>
            </div>
            <Box sx={{ marginTop: 5 }} component="form" onSubmit={handleSubmit}>
                {values.CivilData.map((civil_data, index) => (
                    <Card key={index} sx={{ padding: 2, marginBottom: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <Typography style={{ fontWeight: 700, fontSize: 16 }}>{civil_data.civilService}</Typography>
                                <Typography style={{ fontSize: 14, color: '#b4b4b4' }}>{civil_data.rating}</Typography>

                            </div>
                            <IconButton onClick={() => console.log(civil_data)}><Edit /></IconButton>
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

export default CSE