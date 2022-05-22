import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardContent, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
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

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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

    const exportPdf = () => {

        html2canvas(document.querySelector("#capture")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'letter', false);
            pdf.addImage(imgData, 'PNG', 0, 0, 500, 0, undefined, false); // padding left, padding top, size, 0,
            pdf.save(user.userInfo.personalInformation.lastName + "_" + user.userInfo.personalInformation.firstName + "_" + "Trainings and Programs.pdf");
        });

    }
    useEffect(() => {
        getUser()
    }, [getUser])

    /* End Code for getting user information */

    return (
        <Card sx={{ padding: 5, display: 'flex' }}>

            <Sidebar></Sidebar>
            <Box sx={{ marginTop: 1 }} component="form">
                <div id="capture">
                    <Typography variant='h6' sx={{ marginLeft: 18 }}>Trainings and Programs</Typography>
                    <Grid container spacing={2}>
                        {selectedUser !== null && selectedUser.userInfo.trainings.TrainingData.map((us) => (
                            <Grid xs={12} sm={5}>
                                <Card sx={{ minWidth: 600, marginLeft: 20, marginTop: 5, borderRadius: 4 }}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 600, fontSize: 18, marginTop: 5 }}>
                                            {us.titleOfLearning}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {us.type}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5, marginTop: -1 }} color="text.secondary">
                                            Hours: {us.hours}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div >
                <Button variant="outlined" onClick={exportPdf} sx={{ marginLeft: 18, marginTop: 5 }}>Print</Button>
            </Box>
        </Card>
    )
}

export default TNP