import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FormSubmit } from '../utils/TypeScript'
import { forgotPassword } from '../redux/action/authAction'
const ForgotPassword = () => {
   const [account, setAccount] = useState<string>('')
   const dispatch = useDispatch();

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault();
      dispatch(forgotPassword(account))
   }
   return (
      <div className='my-2' style={{ maxWidth: '500px'}}>
         <h2>Forgot Password?</h2>

         <form className='form-group' onSubmit={handleSubmit}>
            <label htmlFor="account">Email / Phone Number</label>
            <div className='d-flex align-items-center'>
               <input type="text" className='form-control' id='account' name='account'
                  onChange={(e) => setAccount(e.target.value)}
               />

               <button className='btn btn-primary mx-2 d-flex align-items-center'
               >
                  <i className='fas fa-paper-plane mr-3 '></i>
                  <span>Send</span>
               </button>
            </div>
         </form>
      </div>
   )
}

export default ForgotPassword