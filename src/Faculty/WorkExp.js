import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkXP } from '../form/reducer';
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'
import axiosInstance from '../axios/Index';
import { fetchFromStorage } from '../utilities/Storage';

function WorkExp(props) {/* Code for getting user information */
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
    const userInfo = useSelector(state => state.userInfo)
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
            <Typography variant='h6'>Personal Information</Typography>

            <pre>{JSON.stringify(selectedUser, null, 4)}</pre>
            <Box sx={{ marginTop: 2 }} component="form" >

                <TextField sx={{ mt: 5 }}
                    required
                    variant="outlined"
                    style={{ marginBottom: 20 }}
                    size="small"
                    fullWidth
                    label="Company"
                    placeholder='Company'
                    value={user.userInfo.workexp.WorkData.company}
                    name="email"
                />
            </Box>
        </Box>
    )
}

export default WorkExp