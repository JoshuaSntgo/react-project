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

    return (
        <Card sx={{ padding: 5, display: 'flex' }}>

            <Sidebar></Sidebar>
            <Box sx={{ marginTop: 1 }} component="form">
                <Typography variant='h6'>Educational Background</Typography>
                {selectedUser !== null && selectedUser.userInfo.educ.educs.map((us) => (
                    <Grid container spacing={2} style={{ marginRight: 10 }}>
                        <Grid xs={12} sm={4}>
                            <Card sx={{ minWidth: 700, marginLeft: 3, marginTop: 5 }}>
                                <CardContent>
                                    <Typography sx={{ mb: 1.5, marginTop: 2 }} color="text.secondary">
                                        {us.schoolName}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {us.course}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {us.from.year} - {us.to.year}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </Card>
    )
}

export default TNP