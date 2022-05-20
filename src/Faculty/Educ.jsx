import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid,InputLabel, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState, useEffect} from 'react'
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import axiosInstance from '../axios/Index';
import { updateEduc } from '../form/reducer';
import { fetchFromStorage } from '../utilities/Storage';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', borderRadius: 100 }}
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

    useEffect(() => {
        getUser()
    }, [getUser])
    /* End Code 
            <pre>{JSON.stringify(selectedUser, null, 4)}</pre>*/

    return (
        <Card sx={{ padding: 5, display: 'flex' }}>
            <Sidebar></Sidebar>
            <Box sx={{ marginTop: 1 }} component="form">
                <Typography variant='h6'>Educational Background</Typography>
                <Grid container spacing={2}>
                    {selectedUser !==null && selectedUser.userInfo.educ.educs.map((us) => (
                        <Grid xs={12} sm={5}>
                            <Card sx={{ minWidth: 600, marginLeft: 20, marginTop: 5, borderRadius: 4 }}>
                                <CardContent>
                                    <Typography style={{ fontWeight: 600, fontSize: 18, marginTop:5 }}>
                                        {us.schoolName}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {us.course}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5, marginTop:-1 }} color="text.secondary">
                                        {us.from.year} - {us.to.year}
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
export default Educ