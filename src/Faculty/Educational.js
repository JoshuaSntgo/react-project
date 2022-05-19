import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { updatePersonalInfo } from '../form/reducer';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function Educational(props) {

    return (
        <Box sx={{padding: 5}}>
        </Box>
    )
}
export default Educational