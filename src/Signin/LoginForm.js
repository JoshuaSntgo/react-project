import React from 'react'
import useForm from './useForm'
import validate from './validationInfo';
import './Form.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axiosInstance from '../axios/Index';
import { useHistory } from 'react-router-dom';
const LoginForm = ({ submitForm }) => {
  const { push } = useHistory()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Please provide us a valid email address").required('Email is required'),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      console.log(values)
      const { data } = await axiosInstance.post('/users/auth', values)
      if (!data.success) {
        return setFieldError("email", data.message)
      }
      if (!data.user.isConfirmed) {
        return setFieldError("email", 'Your account is not yet approved.')
      }
      sessionStorage.setItem('user', JSON.stringify(data.user))
      sessionStorage.setItem('token', data.access_token)

      if (data.user.access_level === 1) {
        if (data.user.userInfo === Object.isEmpty) {

          push('/formsnew')
          return window.location.reload()
        }
        else {
          push('/Faculty/PersonalInfo')
          return window.location.reload()
        }

      }
      if (data.user.access_level === 2) {
        push('/admin/dashboard');
        return window.location.reload()
      }
    }
  })
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={formik.handleSubmit} className='form' noValidate>
        <h1>
          Sign in now to get started!
        </h1>
        <h2>CITI</h2>
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
        <button className='form-input-btn' type='submit'>
          Sign in
        </button>
        <span className='form-input-login'>
          Don't have an account yet? Register <a href='/sign-up'>here</a>
        </span>
      </form>
    </div>
  );
};
//
export default LoginForm;