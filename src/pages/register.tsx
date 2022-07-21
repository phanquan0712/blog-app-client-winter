import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import { useHistory } from 'react-router-dom';
const Register = ()=> {
   const history = useHistory();
   return (
      <div className="auth_page">
         <div className="auth_box">
            <h3 className="text-uppercase text-center mb-4 mt-2">Register</h3>
            <RegisterForm />
            <p className='text-center'>
               Already have an account ?
               <Link to={`/login${history.location.search}`} style={{ color: 'crimson' }}>
                  {` Login Now!`}
               </Link>
            </p>
         </div>
      </div>
   )
}

export default Register