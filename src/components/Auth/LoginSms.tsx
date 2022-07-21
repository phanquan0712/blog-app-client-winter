import React, { useState } from 'react'
import { FormSubmit } from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import { loginSms } from '../../redux/action/authAction'
const LoginSms = () => {
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch();
   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      dispatch(loginSms(phone))
   }
   return (
      <form onSubmit={handleSubmit}>
         <div className="form-group mb-3">
            <label htmlFor="phone" className='form-label'>Phone number</label>
            <input type="text" 
            className='form-control' 
            id='phone' name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='+84123456789'
            />
         </div>
         <button className='btn btn-dark w-100' disabled={phone ? false : true}>
            Login
         </button>
      </form>
   )
}

export default LoginSms