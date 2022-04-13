import React, {useState} from 'react';
import './Form.css';
import LoginForm from './LoginForm';
import FormSuccess from './FormSuccess';
import Footer from '../components/Footer';
import UserManagement from '../components/UserManagement';
const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    function submitForm() {
      setIsSubmitted(true);
    }
    return (
      <>
        <div className='form-container'>
          {!isSubmitted ? (
            <LoginForm submitForm={submitForm} />
          ) : (
            <FormSuccess/>
          )}
        </div>
        <Footer/>
      </>
    );
  };
  
  export default Form;