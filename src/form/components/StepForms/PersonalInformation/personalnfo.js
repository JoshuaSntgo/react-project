import * as React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik'
import '../info.css'
import * as Yup from 'yup'
import TextError from '../TextError'
import { Checkbox, FormControlLabel, MenuItem, Radio, Select } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'react-datepicker/dist/react-datepicker.css'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const initialValues = {
  email:'',
  password:'',
  emp_no:'',
  name:'',
  lname:'',
  mi:'',
  name_ext:'',
  dateBirth:'',
  placeBirth:'',
  gender:'',
  age:'',
  rs_status:'',
  height:'',
  weight:'',
  btype:'',
  gsis:'',
  pagibig:'',
  phl_health:'',
  sss:'',
  tin:'',
  citizenship:'',
  address:{
      house_no:'',
      street:'',
      subd:'',
      baranggay:'',
      city:'',
      province:'',
      zip:''
  },
  TelNo:'',
  MobileNum:'',
  AltEmail:'',
}

const onSubmit = values =>{
  console.log("Form Data", values)
}



const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email format').required('Email Required'),
  password: Yup.string().required('Password is Required'),
  emp_no: Yup.string().required('Employee No. is Required'),
  name: Yup.string().required('Name is Required'),
  lname: Yup.string().required('Last Name is Required'),
  mi: Yup.string().required('Middle Initial is Required'),
  btype: Yup.string().required('Blood Type is Required'),
  placeBirth: Yup.string().required("Place of birth is Required"),
  gender: Yup.string().required("Gender is Required"),
  rs_status: Yup.string().required("Relationship status is Required"),
})

const Personalnfo = () => {

  const [value, setValue] = React.useState(null);
  return (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    <Form>

    <div className='form-control'>
        <label htmlFor="email">Email:</label>
        <Field type="email"id="email"name="email"/>
        <ErrorMessage name = 'email'component={TextError}/>
      </div>
      
      <div className='form-control'>
        <label htmlFor="password">Pssword:</label>
        <Field type="password"id="password"name="password"/>
        <ErrorMessage name = 'password' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="emp_no">Employee No.:</label>
        <Field type="text" id="emp_no" name="emp_no"/>
        <ErrorMessage name ='emp_no' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="name">Name:</label>
        <Field type="text" id="name" name="name"/>
        <ErrorMessage name ='name' component={TextError}/>
      </div>

      
      <div className='form-control'>
        <label htmlFor="lname">Last Name:</label>
        <Field type="text" id="lname" name="lname"/>
        <ErrorMessage name ='lname' component={TextError}/>
      </div>
      
      <div className='form-control'>
        <label htmlFor="mi">Middle Name:</label>
        <Field type="text" id="mi" name="mi"/>
        <ErrorMessage name ='mi' component={TextError}/>
      </div>
      
      <div className='form-control'>
        <label htmlFor="name_ext">Name Extension:</label>
        <Field type="text" id="name_ext" name="name_ext"/>
      </div>
      
/** Kukuhanin value */
      <div className='form-control'>
        <label htmlFor="dateBirth">Date of Birth:</label>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="mm/dd/yyyy"
            value={value}
            id="dateBirth"
            name="dateBirth"
            onChange={(newValue) => {
            setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
          <ErrorMessage name ='dateBirth' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor='placeBirth'>Place of Birth:</label>
        <Field type="text" id="placeBirth" name="placeBirth"/>
        <ErrorMessage name='placeBirth' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="gender">Gender:</label>
        <Field name="gender" type="radio" value="Male" as={Radio}/>Male
        <Field name="gender" type="radio" value="Female" as={Radio}/>Female
        <Field name="gender" type="radio" value="I prefer not to say" as={Radio}/>I prefer not to say
      
        <ErrorMessage name='gender'component={TextError}/>
      </div>

      age: auto compute don sa date picker,
      <div className='form-control'>
        <label htmlFor="age">Age:</label>
        <Field type="text" id="age" name="age"/>
      </div>

      <div className='form-control'>
        <label htmlFor="rs_status">Relationship Status:</label>
        <Field name="rs_status" type="select" as={Select}>
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="In a Relationship">In a Relationship</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
        </Field>
        <ErrorMessage name='rs_status'component={TextError}/>
      </div>


      <div className='form-control'>
        <label htmlFor="height">Height:</label>
        <Field type="text" id="height" name="height"/>
      </div>

      <div className='form-control'>
        <label htmlFor="weight">Weight:</label>
        <Field type="text" id="weight" name="weight"/>
      </div>

      <div className='form-control'>
        <label htmlFor="btype">Blood Type:</label>
        <Field type="text" id="btype" name="btype"/>
        <ErrorMessage name = 'btype' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="gsis">GSIS Number:</label>
        <Field type="text" id="gsis" name="gsis"/>
        <ErrorMessage name = 'gsis' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="pagibig">PAG-IBIG ID Number:</label>
        <Field type="text" id="pagibig" name="pagibig"/>
        <ErrorMessage name = 'pagibig' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="phl_health">Philhealth Number:</label>
        <Field type="text" id="phl_health" name="phl_health"/>
      </div>

      <div className='form-control'>
        <label htmlFor='sss'>SSS Number:</label>
        <Field type="text" id="sss" name="sss"/>
      </div>

      <div className='form-control'>
        <label htmlFor='tin'>TIN ID:</label>
        <Field type="text" id="tin" name="tin"/>
      </div>

      <div className='form-control'>
        <label htmlFor="citizenship">Citizenship:</label>
        <Field type="text"id="citizenship"name="citizenship"/>
      </div>


      <div className='form-control'>
        <label>Resident Address (Some fields are required)</label>
      </div>


      <div className='form-control'>
        <label htmlFor="house_no">House No.:</label>
        <Field type="text"id="house_no"name="address.house_no"/>
      </div>

      <div className='form-control'>
        <label htmlFor="street">Street:</label>
        <Field type="text"id="street"name="address.street"/>
      </div>

      <div className='form-control'>
        <label htmlFor="subd">Subdivision:</label>
        <Field type="text"id="subd"name="address.subd"/>
      </div>

      <div className='form-control'>
        <label htmlFor="baranggay">Baranggay:</label>
        <Field type="text"id="baranggay"name="address.baranggay"/>
        <ErrorMessage name = 'baranggay' component={TextError}/>
      </div>

      <div className='form-control'>
        <label htmlFor="city">City/Municipality:</label>
        <Field type="text"id="city"name="address.city"/>
      </div>

      <div className='form-control'>
        <label htmlFor="province">Province:</label>
        <Field type="text"id="province"name="address.province"/>
      </div>

      <div className='form-control'>
        <label htmlFor="zip">ZIP Code:</label>
        <Field type="text"id="zip"name="address.zip"/>
      </div>

      <div className='form-control'>
        <label>Permanent Address (Some fields are required)</label>
        <Field name="Address2" type="check" value="Address2" as={Checkbox}/>Same as Resident Address
      </div>

      
      <div className='form-control'>
        <label htmlFor="TelNo">Telephone No:</label>
        <Field type="text"id="TelNo"name="TelNo"/>
      </div>

      <div className='form-control'>
        <label htmlFor="MobileNum">Mobile No:</label>
        <Field type="text"id="MobileNum"name="MobileNum"/>
      </div>

      <div className='form-control'>
        <label htmlFor="AltEmail">Alternate Email Address:</label>
        <Field type="text"id="AltEmail"name="AltEmail"/>
      </div>

      <button type='submit'>Submit</button>
      
    </Form>
  </Formik>
  )
}

export default Personalnfo