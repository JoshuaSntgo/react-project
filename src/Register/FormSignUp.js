import React from 'react'
import useForm from './useForm'
import validate from './validationInfo';
import './Form.css';

const FormSignup = ({ submitForm }) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
      submitForm,
      validate
    );
  
    return (
      <div className='form-content-right'>
        <form onSubmit={handleSubmit} className='form' noValidate>
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
                name='firstname'
                placeholder='First Name'
                value={values.firstname}
                onChange={handleChange}
              />
              {errors.firstname && <p>{errors.firstname}</p>}
            </div>

            <div className='form-inputs'>
              <label className='form-label'>Last Name</label>
              <input
                className='form-name'
                type='text'
                name='lastname'
                placeholder='Last Name'
                value={values.lastname}
                onChange={handleChange}
              />
              {errors.lastname && <p>{errors.lastname}</p>}
            </div>
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='juan.delacruz@gmail.com'
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Confirm Password</label>
            <input
              className='form-input'
              type='password'
              name='password2'
              placeholder='Confirm your password'
              value={values.password2}
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
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