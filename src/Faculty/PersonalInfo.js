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

const PersonalInfo = (props) => {

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
        email: "",
        password: "",
        emp_no: "",
        firstName: "",
        lastName: "",
        middleInitial: "",
        nameExtension: "",
        dateOfBirth: new Date(),
        placeBirth: "",
        gender: "",
        age: "",
        civilStatus: "",
        height: "",
        weight: "",
        btype: "",
        gsis: "",
        pagibig: "",
        phl_health: "",
        sss: "",
        tin: "",
        citizenship: "",

        address: {
            house_no: '',
            street: '',
            subd: '',
            baranggay: '',
            city: '',
            province: '',
            zip: ''
        },


        address2: {
            house_no2: '',
            street2: '',
            subd2: '',
            baranggay2: '',
            city2: '',
            province2: '',
            zip2: ''
        },


        TelNo: '',
        MobileNum: '',
        AltEmail: '',
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
            console.log(values)
            dispatch(updatePersonalInfo(values))
            handleNext()
        },

    })

    return (
        <Box sx={{ padding: 5, display: 'flex' }}>
            <Sidebar />
            <Typography variant='h6'>Personal Information</Typography>

            <pre>{JSON.stringify(selectedUser, null, 4)}</pre>
            <Box sx={{ marginTop: 2 }} component="form" onSubmit={handleSubmit}>

                <TextField sx={{ mt: 5 }}
                    required
                    variant="outlined"
                    style={{ marginBottom: 20 }}
                    size="small"
                    fullWidth
                    label="Email Address"
                    placeholder='Email Address'
                    value={user.userInfo.personalInformation.email}
                    name="email"
                    onChange={handleChange}
                    error={Boolean(errors.email) || touched.email}
                    helperText={errors.email}
                />

                <TextField
                    required
                    variant="outlined"
                    type='password'
                    style={{ marginBottom: 20 }}
                    size="small"
                    fullWidth
                    label="Password"
                    placeholder='Password'
                    value={user.userInfo.personalInformation.password}
                    name="password"
                    onChange={handleChange}
                    error={Boolean(errors.password) || touched.password}
                    helperText={errors.password}
                />

                <TextField
                    required
                    variant="outlined"
                    style={{ marginBottom: 20 }}
                    size="small"
                    fullWidth
                    label="Employee No."
                    placeholder='Employee No.'
                    value={user.userInfo.personalInformation.emp_no}
                    name="emp_no"
                    onChange={handleChange}
                    error={Boolean(errors.emp_no) || touched.emp_no}
                    helperText={errors.emp_no}
                />

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="First Name"
                        placeholder='First Name'
                        value={user.userInfo.personalInformation.firstName}
                        name="firstName"
                        onChange={handleChange}
                        error={Boolean(errors.firstName) || touched.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        required
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%' }}
                        size="small"
                        fullWidth
                        label="Last Name"
                        placeholder='Last Name'
                        value={user.userInfo.personalInformation.lastName}
                        name="lastName"
                        onChange={handleChange}
                        error={Boolean(errors.lastName) || touched.lastName}
                        helperText={errors.lastName}
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
                        value={user.userInfo.personalInformation.middleInitial}
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
                        value={user.userInfo.personalInformation.nameExtension}
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
                            onChange={(n) => setFieldValue("dateOfBirth", n)}
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
                        value={user.userInfo.personalInformation.placeBirth}
                        name="placeBirth"
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <Typography style={{ fontSize: 18, marginTop: 7, marginRight: 20 }}>Gender:</Typography>

                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="gender"
                        style={{ marginBottom: 20, width: '40%', marginRight: 20 }} >
                        <FormControlLabel name="gender" value="male" control={<Radio onChange={(e) => setFieldValue("gender", e.target.checked ? true : true)} />} label="Male" />
                        <FormControlLabel name="gender" value="female" control={<Radio onChange={(e) => setFieldValue("gender", e.target.checked ? false : true)} />} label="Female" />
                        <FormControlLabel name="gender" value="other" control={<Radio onChange={(e) => setFieldValue("gender", e.target.checked ? false : true)} />} label="Other" />
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
                            value={civilStatus}
                            label="Civil Status"
                            onChange={handleChangeCivilStatus}
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
                        value={user.userInfo.personalInformation.height}
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
                        value={user.userInfo.personalInformation.weight}
                        name="weight"
                        onChange={handleChange}
                    />
                    <FormControl sx={{ marginBottom: 3, width: '50%' }}>
                        <InputLabel id="btype" style={{ marginTop: -7 }}>Blood Type</InputLabel>
                        <Select
                            required
                            labelId="btype"
                            id="btype"
                            value={btype}
                            label="Blood Type"
                            size="small"
                            onChange={handleChangeBType}
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
                        value={user.userInfo.personalInformation.gsis}
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
                        value={user.userInfo.personalInformation.pagibig}
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
                        value={user.userInfo.personalInformation.phl_health}
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
                        value={user.userInfo.personalInformation.sss}
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
                        value={user.userInfo.personalInformation.tin}
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
                        value={user.userInfo.personalInformation.citizenship}
                        name="citizenship"
                        onChange={handleChange}
                    />
                </Box>

                <Typography style={{ marginTop: 15, fontWeight: 600, fontSize: 18 }}>Resident Address</Typography>
                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="House/​Block/​Lot No"
                        placeholder='House/​Block/​Lot No:'
                        value={user.userInfo.personalInformation.address.house_no}
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
                        value={user.userInfo.personalInformation.address.street}
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
                        value={user.userInfo.personalInformation.address.subd}
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
                        value={user.userInfo.personalInformation.address.baranggay}
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
                        value={user.userInfo.personalInformation.address.city}
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
                        value={user.userInfo.personalInformation.address.province}
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
                        value={user.userInfo.personalInformation.address.zip}
                        name="address.zip"
                        onChange={handleChange}
                    />
                </Box>

                <Typography style={{ marginTop: 15, fontWeight: 600, fontSize: 18 }}>Permanent Address</Typography>
                {/* <FormControlLabel label="Same as Resident Address" control={<Checkbox onChange={({ target }) => {
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
                }} />} /> */}


                <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        variant="outlined"
                        style={{ marginBottom: 20, width: '50%', marginRight: 10 }}
                        size="small"
                        fullWidth
                        label="House/​Block/​Lot No"
                        placeholder='House/​Block/​Lot No:'
                        value={user.userInfo.personalInformation.address2.house_no2}
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
                        value={user.userInfo.personalInformation.address2.street2}
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
                        value={user.userInfo.personalInformation.address2.subd2}
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
                        value={user.userInfo.personalInformation.address2.baranggay2}
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
                        value={user.userInfo.personalInformation.address2.city2}
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
                        value={user.userInfo.personalInformation.address2.province2}
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
                        value={user.userInfo.personalInformation.address2.zip2}
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
                        value={user.userInfo.personalInformation.TelNo}
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
                        value={user.userInfo.personalInformation.MobileNum}
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
                        value={user.userInfo.personalInformation.AltEmail}
                        name="AltEmail"
                        onChange={handleChange}
                    />
                </Box>

            </Box>
        </Box>
    )
}

export default PersonalInfo

