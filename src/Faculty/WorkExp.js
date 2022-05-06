import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkXP } from '../form/reducer';
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'


const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

function WorkExp(props) {
    const user = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const { activeStep, handleBack, handleNext, steps } = props
    const [newForm, setNewForm] = useState(false)
    const initialValues = {
        WorkData: []
    }

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = useFormik({
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
        <Box sx={{ padding: 5, display: 'flex' }}>
            <Sidebar />
            <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                <div>
                    <Typography variant='h6'>Work Experience</Typography>
                </div>
            </div>
            <Box sx={{ marginTop: 5 }} component="form" onSubmit={handleSubmit}>
                {values.WorkData.map((work_data, index) => (
                    <Card key={index} sx={{ padding: 2, marginBottom: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <Typography style={{ fontWeight: 700, fontSize: 16 }}>{work_data.positionTitle}</Typography>
                                <Typography style={{ fontSize: 14, color: '#b4b4b4' }}>{work_data.company}</Typography>
                            </div>
                            <IconButton onClick={() => console.log(work_data)}><Edit /></IconButton>
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

export default WorkExp