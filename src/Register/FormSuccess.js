import React from 'react';
import './Form.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
      <h2 className='form-success-login'>
            Try to Login <a href='/sign-in'>here</a>
      </h2>
    </div>
  );
};

export default FormSuccess;