import React, {useState} from 'react';
import './Form.css';
import FormSignup from './FormSignUp';
import FormSuccess from './FormSuccess';
import Footer from '../components/Footer';
const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    function submitForm() {
      setIsSubmitted(true);
    }
    return (
      <>
        <div className='form-container'>
          {!isSubmitted ? (
            <FormSignup submitForm={submitForm} />
          ) : (
            <FormSuccess />
          )}
        </div>
        <Footer/>
      </>
    );
  };
  
  export default Form;