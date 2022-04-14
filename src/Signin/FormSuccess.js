import React from 'react';
import './Form.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>Logged in successfully</h1>
      <h2 className='form-success-login'> <a href='/admin/usermanagement'>click here to proceed</a>
      </h2>
    </div>
  );
};

export default FormSuccess;