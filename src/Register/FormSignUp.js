import React from 'react'
import useForm from './useForm'
import validate from './validationInfo';
import './Form.css';
import * as Yup from 'yup'
import {useFormik} from 'formik'
import { NoiseAwareOutlined } from '@mui/icons-material';
import {AlertDialog, MenuItem, Snackbar} from '@mui/material'
import axiosInstance from '../axios/Index';

const FormSignup = ({ submitForm }) => {
  const [message, setMessage] = React.useState(null)
  const [success, setSuccess] = React.useState('error')
  const formik = useFormik({
    initialValues: {
      firstName: '', 
      lastName: '', 
      email: '',
      password: '', 
      confirmPassword: ''
    }, 
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"), 
      lastName: Yup.string().required("Last Name is required"), 
      email: Yup.string().email('Please provide a valid email address').required("Please provide a valid email address"),
      password: Yup.string().required("A password is required"), 
      confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref("password"), null], 'Passwords must match')
    }),
    onSubmit: async (values, {setSubmitting, resetForm}) => {
      console.log(values)
      const {data} = await axiosInstance.post('/users', values)
 
      setMessage(data.success ? 'Your account has been created. Please wait for 24-48hours' : data.message)
 
      setSuccess(data.success ? 'success': 'error')
      setSubmitting()
      resetForm()
    }
  })
    const { handleChange, handleSubmit, values, errors } = useForm(
      submitForm,
      validate
    );
  
    return (
      <div className='form-content-right'>
        {success && (
          <Snackbar open={Boolean(message)}  onClose={() => setMessage(null)} message={message} />
        )}
        <form onSubmit={formik.handleSubmit} className='form' noValidate>
          <h1>
            Get started with us today!
          </h1>
          <h2>CITI</h2>
          <div className='name'>
            <div className='form-inputs'>
              <label className='form-label'>First Name</label>
              <input
                className='form-name'
                type='text'
                name='firstName'
                placeholder='First Name'
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName && <p>{formik.errors.firstName}</p>}
            </div>

            <div className='form-inputs'>
              <label className='form-label'>Last Name</label>
              <input
                className='form-name'
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && <p>{formik.errors.lastName}</p>}
            </div>
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='juan.delacruz@gmail.com'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && <p>{formik.errors.email}</p>}
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && <p>{formik.errors.password}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Confirm Password</label>
            <input
              className='form-input'
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
          </div>.
          <button className='form-input-btn' type='submit'>
            Sign up
          </button>
          <span className='form-input-login'>
            Already have an account? Login <a href='/sign-in'>here</a>
          </span>
        </form>
      </div> 
    );
  };
  
  export default FormSignup;