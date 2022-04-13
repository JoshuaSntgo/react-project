import React from 'react'
import useForm from './useForm'
import validate from './validationInfo';
import './Form.css';

const LoginForm = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
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

export default LoginForm;