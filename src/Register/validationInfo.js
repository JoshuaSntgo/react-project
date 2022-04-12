export default function validateInfo(values) {
    let errors = {};
  
    if (!values.firstname.trim()) {
      errors.firstname = 'First Name required';
    }
  
    if (!values.lastname.trim()) {
      errors.lastname = 'Last Name required';
    }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 5) {
      errors.password = 'Password needs to be 5 characters or more';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
  
    
    return errors;
  }