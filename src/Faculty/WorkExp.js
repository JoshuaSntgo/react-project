import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
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

function WorkExp(props) {

    /*User information */
    const user = fetchFromStorage('user')
    const [selectedUser, setSelectedUser] = useState(null)

    const getUser = React.useCallback(async () => {
        const { data } = await axiosInstance.get(`/users/${user._id}`)
        setSelectedUser(data.user)
    }, [])

    useEffect(() => {
        getUser()
    }, [getUser])
    /* End Code*/

    return (
        <Card sx={{ padding: 5, display: 'flex' }}>

            <Sidebar></Sidebar>
            <Box sx={{ marginTop: 1 }} component="form">
                <Typography variant='h6'>Work Experience</Typography>
                <Grid container spacing={2}>
                    {selectedUser !== null && selectedUser.userInfo.workexp.WorkData.map((us) => (
                        <Grid xs={12} sm={5}>
                            <Card sx={{ minWidth: 600, marginLeft: 20, marginTop: 5, borderRadius: 4, borderStyle: 'solid' }}>
                                <CardContent>
                                    <Typography style={{ fontWeight: 600, fontSize: 18, marginTop: 5 }}>
                                        {us.positionTitle}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {us.company}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Card>
    )
}

export default WorkExp