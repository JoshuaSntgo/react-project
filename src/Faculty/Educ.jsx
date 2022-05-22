import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import axiosInstance from '../axios/Index';
import { updateEduc } from '../form/reducer';
import { fetchFromStorage } from '../utilities/Storage';


import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


function Educ(props) {

    /*User information */
    const user = fetchFromStorage('user')
    const [selectedUser, setSelectedUser] = useState(null)

    const getUser = React.useCallback(async () => {
        const { data } = await axiosInstance.get(`/users/${user._id}`)
        setSelectedUser(data.user)
    }, [])

    const exportPdf = () => {

        html2canvas(document.querySelector("#capture")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'pt', 'letter', false);
            pdf.addImage(imgData, 'PNG', 0, 0, 800, 0, undefined, false); // padding left, padding top, size, 0,
            pdf.save(user.userInfo.personalInformation.lastName + "_" + user.userInfo.personalInformation.firstName + "_" + "Educational Background.pdf");
        });

    }

    useEffect(() => {
        getUser()
    }, [getUser])
    /* End Code 
            <pre>{JSON.stringify(selectedUser, null, 4)}</pre>*/

    return (
        <Card sx={{ padding: 5, display: 'flex' }}>
            <Sidebar></Sidebar>
            <Box sx={{ marginTop: 1 }} component="form">
                <div id="capture">
                    <Typography variant='h6' sx={{ marginLeft: 18 }}>Educational Background</Typography>
                    <Grid container spacing={2}>
                        {selectedUser !== null && selectedUser.userInfo.educ.educs.map((us) => (
                            <Grid xs={12} sm={5}>
                                <Card sx={{ minWidth: 600, marginLeft: 20, marginTop: 5, borderRadius: 4 }}>
                                    <CardContent>
                                        <Typography style={{ fontWeight: 600, fontSize: 18, marginTop: 5 }}>
                                            {us.educationalLevel.toUpperCase()}
                                        </Typography>
                                        <Typography style={{ fontWeight: 600, fontSize: 18, marginTop: 5 }}>
                                            {us.schoolName}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {us.course}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5, marginTop: -1 }} color="text.secondary">
                                            {us.from.year} - {us.to.year}
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
export default Educ