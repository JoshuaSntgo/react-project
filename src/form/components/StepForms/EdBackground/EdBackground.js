import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import '../info.css'
import * as Yup from 'yup'
import TextError from '../TextError'

const initialValues = {
  email:'',
  password:'',
  phoneNumbers:['',''],
  phNumbers:[''  ]
}

const onSubmit = values =>{
  console.log("Form Data", values)
  
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email format').required('Email Required'),
  password: Yup.string().required('Password is Required')
})

/**     <div className='form-control'>
        <label>List of Phone Numbers</label>
        <FieldArray name='phNumber'>
          {
            (fieldArrayProps) => {
              const {push, remove, form} = fieldArrayProps
              const {values} = form
              const{phNumber} = values
              return(
                <div>
                  {phNumber.map((phNumber, index) =>
                  <div key={index}>
                    <Field name = {'phNumber[${index}]'}/>{
                      index > 0 && 
                      <button type='button' onClick={() => remove(index)}>-</button>
                    }
                    <button type='button' onClick={() => push('')}>+</button>
                  </div>
                  )}
                </div>
              )
            }
          }
        </FieldArray>
      </div> */
const EdBackground = () => {
  return (
  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    <Form>
      <div className='form-control'>
        <label htmlFor="email">Email:</label>
        <Field type="email"id="email"name="email"/>
        <ErrorMessage name = 'email'component={TextError}/>
      </div>

      <div className='form-control'>
        <label>Phone</label>
        <FieldArray name ='phNumbers'>
          {
            fieldArrayProps => {
              const {push, remove, form} = fieldArrayProps
              const {values} = form
              const {phNumbers} = values
              return <div>
                {
                  phNumbers.map((phNumber, index) => (
                    <div key = {index}>
                      <Field name={`phNumbers[${index}]`}/>
                      { index > 0 && (
                        <button type="button" onClick={() => remove(index)}>{''}-{''}</button>
                      )}
                      <button type="button" onClick={() => push('')}>+</button>
                    </div>
                  ))
                }
              </div>
            }
          }
        </FieldArray>
      </div>

      <button type='submit'>Submit</button>
    </Form>
  </Formik>
  )
}

export default EdBackground