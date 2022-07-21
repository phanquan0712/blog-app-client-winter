import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import { InputChange,FormSubmit  } from '../../utils/TypeScript'
import { resetPassword } from '../../redux/action/profileActions'
const ResetPassword = () => {
   const { slug } = useParams<IParams>()
   const dispatch = useDispatch();

   const [password, setPassword] = useState<string>('')
   const [cf_password, setCfPassword] = useState<string>('')
   const [typePass, setTypePass] = useState(false);
   const [typeCfPass, setTypeCfPass] = useState(false);


   const handleChangeInput = (e: InputChange) => {
      const { value, name } = e.target;
      if (name === 'password') {
         setPassword(value)
      } else if (name === 'cf_password') {
         setCfPassword(value)
      }
   }

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault();
      dispatch(resetPassword(password, cf_password, slug))
   }

   return (
      <div className='auth_page'>
         <form action="" className='auth_box' onSubmit={handleSubmit}>
            <h3 className='text-center text-uppercase' style={{ letterSpacing: 2 }}>Reset Password</h3>

            <div className="form-group mb-3">
               <label className='form-label' htmlFor="password">Password</label>
               <div className="pass">
                  <input type={typePass ? 'text' : 'password'}
                     className='form-control'
                     name='password' id='password'
                     value={password}
                     onChange={handleChangeInput}
                  />
                  <small
                     onClick={() => setTypePass(!typePass)}>
                     {typePass ? 'hide' : 'show'}
                  </small>
               </div>
            </div>

            <div className="form-group">
               <label className='form-label' htmlFor="cf_password">Confirm password</label>
               <div className="pass">
                  <input type={typeCfPass ? 'text' : 'password'}
                     className='form-control'
                     name='cf_password' id='cf_password'
                     value={cf_password}
                     onChange={handleChangeInput}
                  />
                  <small
                     onClick={() => setTypeCfPass(!typeCfPass)}>
                     {typeCfPass ? 'hide' : 'show'}
                  </small>
               </div>
            </div>

            <button type='submit' className='btn btn-dark w-100 mt-4'>
               Save Changes
            </button>
         </form>
      </div>
   )
}

export default ResetPassword