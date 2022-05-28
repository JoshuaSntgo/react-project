import React, { useEffect, useState } from 'react'
import Sidebar, { facultyMenu } from '../components/Layout/Sidebar'
import { Box, Button, TextField, Typography, Radio, RadioGroup, FormControlLabel, MenuItem, Select, Checkbox, InputLabel, FormControl } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ButtonsComponent } from '..';
import { width } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../form/reducer';
import axiosInstance from '../axios/Index';
import { fetchFromStorage } from '../utilities/Storage';


function EDITPI(props) {
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
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const Civil_Status = [
        "Single",
        "In a Relationship",
        "Married",
        "Divorced"
    ]

    const { activeStep, handleBack, handleNext, steps } = props

    const initialValues = {
        email: user.userInfo.personalInformation.email,
        password: user.userInfo.personalInformation.password,
        emp_no: user.userInfo.personalInformation.emp_no,
        firstName: user.userInfo.personalInformation.firstName,
        lastName: user.userInfo.personalInformation.lastName,
        middleInitial: user.userInfo.personalInformation.middleInitial,
        nameExtension: user.userInfo.personalInformation.nameExtension,
        dateOfBirth: new Date(),
        placeBirth: user.userInfo.personalInformation.placeBirth,
        gender: user.userInfo.personalInformation.gender,
        age: 0,
        civilStatus: user.userInfo.personalInformation.civilStatus,
        height: user.userInfo.personalInformation.height,
        weight: user.userInfo.personalInformation.weight,
        btype: user.userInfo.personalInformation.btype,
        gsis: user.userInfo.personalInformation.gsis,
        pagibig: user.userInfo.personalInformation.pagibig,
        phl_health: user.userInfo.personalInformation.phl_health,
        sss: user.userInfo.personalInformation.sss,
        tin: user.userInfo.personalInformation.tin,
        citizenship: user.userInfo.personalInformation.citizenship,

        address: {
            house_no: user.userInfo.personalInformation.address.house_no,
            street: user.userInfo.personalInformation.address.street,
            subd: user.userInfo.personalInformation.address.subd,
            baranggay: user.userInfo.personalInformation.address.baranggay,
            city: user.userInfo.personalInformation.address.city,
            province: user.userInfo.personalInformation.address.province,
            zip: user.userInfo.personalInformation.address.zip
        },


        address2: {
            house_no2: user.userInfo.personalInformation.address2.house_no2,
            street2: user.userInfo.personalInformation.address2.street2,
            subd2: user.userInfo.personalInformation.address2.subd2,
            baranggay2: user.userInfo.personalInformation.address2.baranggay2,
            city2: user.userInfo.personalInformation.address2.city2,
            province2: user.userInfo.personalInformation.address2.province2,
            zip2: user.userInfo.personalInformation.address2.zip2
        },


        TelNo: user.userInfo.personalInformation.TelNo,
        MobileNum: user.userInfo.personalInformation.MobileNum,
        AltEmail: user.userInfo.personalInformation.AltEmail,
    }


    const [civilStatus, setcivilStatus] = React.useState('');
    const [btype, setbtype] = React.useState('');

    const handleChangeCivilStatus = (event) => {
        setcivilStatus(event.target.value)
    }

    const handleChangeBType = (event) => {
        setbtype(event.target.value)
    }


    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = useFormik({
        initialValues,

        validationSchema: Yup.object({
            dateOfBirth: Yup.date(),
            email: Yup.string().email("Please provide a valid email address").required("Email is required"),
            password: Yup.string().required("Password is Mandatory").min(5, "Password must be at 5 characters long"),
            emp_no: Yup.string().required("Employee Number is Mandatory"),
            firstName: Yup.string().required("First Name is Mandatory"),
            lastName: Yup.string().required("Last Name is Mandatory"),
            middleInitial: Yup.string().required("Last Name is Mandatory"),

            address: Yup.object().shape({
                baranggay: Yup.string().required("Barangay is Mandatory"),
                city: Yup.string().required("City/Municipality is Mandatory"),
                province: Yup.string().required("Province is Mandatory")
            }),
        }),

        onSubmit: async (values) => {
            setFieldValue("age", parseInt(new Date().getFullYear() - values.dateOfBirth.getFullYear() - 1))
            console.log(values)
            dispatch(updatePersonalInfo(values))
            handleNext()
        },

    })

    return (
        < Box sx={{ padding: 5, }
        }>
            <Typography style={{ fontWeight: 600, fontSize: 18 }}>Personal Information</Typography>
            <Typography style={{ color: '#b4b4b4', fontSize: 15 }}>Please complete the information below. If the field is not applicable, type N/A</Typography>

            <Box sx={{ marginTop: 2 }} component="form" onSubmit={handleSubmit}>

                <TextField
                    variant="outlined"
                    style={{ marginBottom: 20 }}
                    size="small"
                    fullWidth
                    label="Email Address"
                    placeholder='Email Address'
                    value={values.email}
                    name="email"
                    onChange={({ target }) => setFieldValue('email', target.value)}
                    InputLabelProps={{
                        shrink: true
                    }}
                />


                <TextField
                    variant="outlined"
                    style={{ marginBottom: 20 }}
                    size="small"
                    fullWidth
                    label="Employee No."
                    placeholder='Employee No.'
                    value={values.emp_no}
                    name="emp_no"
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="First Name"
                        placeholder='First Name'
                        value={values.firstName}
                        name="firstName"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Last Name"
                        placeholder='Last Name'
                        value={values.lastName}
                        name="lastName"
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Middle Initial"
                        placeholder='Middle Initial'
                        value={values.middleInitial}
                        name="middleInitial"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Name Extension (II, III, Jr., Sr.)"
                        placeholder='Name Extension (II, III, Jr., Sr.)'
                        value={values.nameExtension}
                        name="nameExtension"
                        onChange={handleChange}
                    />

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={user.userInfo.personalInformation.dateOfBirth}
                            name="dateOfBirth"
                            onChange={(n) => {
                                setFieldValue("dateOfBirth", n);
                                setFieldValue("age", parseInt(new Date().getFullYear() - n.getFullYear() - 1))
                            }}
                            renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                        />
                    </LocalizationProvider>

                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '100%', marginLeft: 10 }}
                        size="small"
                        fullWidth
                        label="Place of Birth"
                        placeholder='Place of Birth'
                        value={values.placeBirth}
                        name="placeBirth"
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Typography style={{ fontSize: 18, marginTop: 7, marginRight: 20 }}>Gender:</Typography>

                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="gender"
                        defaultValue={values.gender}
                        style={{ marginBottom: 20, width: '40%', marginRight: 20 }} >
                        <FormControlLabel name="gender" value="Male" control={<Radio onChange={(e) => setFieldValue("gender", e.target.checked ? "Male" : "")} />} label="Male" />
                        <FormControlLabel name="gender" value="Female" control={<Radio onChange={(e) => setFieldValue("gender", e.target.checked ? "Female" : "")} />} label="Female" />
                        <FormControlLabel name="gender" value="Other" control={<Radio onChange={(e) => setFieldValue("gender", e.target.checked ? "Other" : "")} />} label="Other" />
                    </RadioGroup>

                    <TextField
                        InputProps={{
                            readOnly: true
                        }}
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Age"
                        placeholder='Age'
                        name='age'
                        value={new Date().getFullYear() - values.dateOfBirth.getFullYear() - 1}
                    />
                </Box>
                <Box sx={{ marginBottom: 3, width: '100%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="civilStatus">Civil Status</InputLabel>
                        <Select
                            labelId="civilStatus"
                            id="civilStatus"
                            value={values.civilStatus}
                            label="Civil Status"
                            onChange={(e) => setFieldValue("civilStatus", e.target.value)}
                        >
                            <MenuItem value={'Single'}>Single</MenuItem>
                            <MenuItem value={'In a Relationship'}>In a Relationship</MenuItem>
                            <MenuItem value={'Married'}>Married</MenuItem>
                            <MenuItem value={'Divorced'}>Divorced</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Height(cm)"
                        placeholder='Height(cm)'
                        value={values.height}
                        name="height"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Weight(kg)"
                        placeholder='Weight(kg)'
                        value={values.weight}
                        name="weight"
                        onChange={handleChange}
                    />
                    <FormControl sx={{ marginBottom: 3, width: '50%' }}>
                        <InputLabel id="btype" style={{ marginTop: -7 }}>Blood Type</InputLabel>
                        <Select
                            required
                            labelId="btype"
                            id="btype"
                            value={values.btype}
                            label="Blood Type"
                            size="small"
                            onChange={(e) => setFieldValue("btype", e.target.value)}
                        >
                            <MenuItem value={'A+'}>A+</MenuItem>
                            <MenuItem value={'A-'}>A-</MenuItem>
                            <MenuItem value={'B+'}>B+</MenuItem>
                            <MenuItem value={'B-'}>B-</MenuItem>
                            <MenuItem value={'AB+'}>AB+</MenuItem>
                            <MenuItem value={'AB-'}>AB-</MenuItem>
                            <MenuItem value={'O+'}>O+</MenuItem>
                            <MenuItem value={'O-'}>O-</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="GSIS Number"
                        placeholder='GSIS Number'
                        value={values.gsis}
                        name="gsis"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="PAG-IBIG ID Number"
                        placeholder='PAG-IBIG ID Number'
                        value={values.pagibig}
                        name="pagibig"
                        onChange={handleChange}
                    />
                </Box>


                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="PHILHEALTH Number"
                        placeholder='PHILHEALTH Number'
                        value={values.phl_health}
                        name="phl_health"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="SSS Number"
                        placeholder='SSS Number'
                        value={values.sss}
                        name="sss"
                        onChange={handleChange}
                    />
                </Box>


                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="TIN Number"
                        placeholder='TIN Number'
                        value={values.tin}
                        name="tin"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Citizenship"
                        placeholder='Citizenship'
                        value={values.citizenship}
                        name="citizenship"
                        onChange={handleChange}
                    />
                </Box>

                <Typography style={{ marginTop: 15, fontWeight: 600, fontSize: 18 }}>Resident Address (Some fields are required)</Typography>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="House/​Block/​Lot No"
                        placeholder='House/​Block/​Lot No:'
                        value={values.address.house_no}
                        name="address.house_no"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Street"
                        placeholder='Street'
                        value={values.address.street}
                        name="address.street"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Subdivision/​Village"
                        placeholder='Subdivision/​Village'
                        value={values.address.subd}
                        name="address.subd"
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Barangay"
                        placeholder='Barangay'
                        value={values.address.baranggay}
                        name="address.baranggay"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="City/​Municipality"
                        placeholder='City/​Municipality'
                        value={values.city}
                        name="address.city"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Province"
                        placeholder='Province'
                        value={values.address.province}
                        name="address.province"
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="ZIP Code"
                        placeholder='ZIP Code'
                        value={values.address.zip}
                        name="address.zip"
                        onChange={handleChange}
                    />
                </Box>

                <Typography style={{ marginTop: 15, fontWeight: 600, fontSize: 18 }}>Permanent Address (Some fields are required)</Typography>
                <FormControlLabel label="Same as Resident Address" control={<Checkbox onChange={({ target }) => {
                    if (target.checked) {
                        setFieldValue("address2.house_no2", values.address.house_no)
                        setFieldValue("address2.street2", values.address.street)
                        setFieldValue("address2.subd2", values.address.subd)
                        setFieldValue("address2.baranggay2", values.address.baranggay)
                        setFieldValue("address2.city2", values.address.city)
                        setFieldValue("address2.province2", values.address.province)
                        setFieldValue("address2.zip2", values.address.zip)
                    } else {
                        setFieldValue("address2.house_no2", "")
                        setFieldValue("address2.street2", "")
                        setFieldValue("address2.subd2", "")
                        setFieldValue("address2.baranggay2", "")
                        setFieldValue("address2.city2", "")
                        setFieldValue("address2.province2", "")
                        setFieldValue("address2.zip2", "")
                    }
                }} />} />


                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="House/​Block/​Lot No"
                        placeholder='House/​Block/​Lot No:'
                        value={values.address2.house_no2}
                        name="address2.house_no2"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Street"
                        placeholder='Street'
                        value={values.address2.street2}
                        name="address2.street2"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Subdivision/​Village"
                        placeholder='Subdivision/​Village'
                        value={values.address2.subd2}
                        name="address2.subd2"
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Barangay"
                        placeholder='Barangay'
                        value={values.address2.baranggay2}
                        name="address2.baranggay2"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="City/​Municipality"
                        placeholder='City/​Municipality'
                        value={values.address2.city2}
                        name="address2.city2"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Province"
                        placeholder='Province'
                        value={values.address2.province2}
                        name="address2.province2"
                        onChange={handleChange}
                    />

                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="ZIP Code"
                        placeholder='ZIP Code'
                        value={values.address2.zip2}
                        name="address2.zip2"
                        onChange={handleChange}
                    />
                </Box>

                <Typography style={{ marginTop: 15, fontWeight: 600, fontSize: 18 }}>Contact Information</Typography>

                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Telephone No"
                        placeholder='Telephone No'
                        value={values.TelNo}
                        name="TelNo"
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="Mobile Number"
                        placeholder='Mobile Number'
                        value={values.MobileNum}
                        name="MobileNum"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Alternative Email"
                        placeholder='Alternative Email'
                        value={values.AltEmail}
                        name="AltEmail"
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
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
                    </Button>
                </Box>

            </Box>
        </Box >
    )
}

export default EDITPI