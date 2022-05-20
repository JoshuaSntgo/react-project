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

    const employees = [
        {
            name: user.userInfo.workexp.WorkData[0].positionTitle,
            id: "1"
        },
        {
            name:"Chayl",
            id: "2"
        },
    ]

    const initialValues = [
        {
            InclusiveDate : {
                from: user.userInfo.workexp.WorkData[0].InclusiveDate.from,
                to: user.userInfo.workexp.WorkData[0].InclusiveDate.to,
            },
            positionTitle:user.userInfo.workexp.WorkData[0].positionTitle,
            company:user.userInfo.workexp.WorkData[0].company,
            monthlySalary: user.userInfo.workexp.WorkData[0].monthlySalary,
            salary:user.userInfo.workexp.WorkData[0].salary,
            statusOfAppointment:user.userInfo.workexp.WorkData[0].statusOfAppointment,
            govtService: user.userInfo.workexp.WorkData[0].govtService
        }
    ]

    return (
        <Card sx={{ padding: 5, display: 'flex' }}>
                
            <Sidebar></Sidebar>
            <pre>{JSON.stringify(selectedUser, null, 4)}</pre>
            <Box sx={{ marginTop: 1 }} component="form">
                <Typography variant='h6'>Work Experience</Typography>
                {employees.map((us, key)=>(
                    <Grid container spacing={2} style={{marginRight: 10}}>
                        <Grid xs={12} sm={4}>
                            <Card sx={{ minWidth: 700, marginLeft: 3, marginTop: 5 }}>
                                <CardContent>
                                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                                        {us.name}
                                    </Typography>
                                    <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                                        {us.id}
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

export default WorkExp