import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { InputChange, FormSubmit } from '../../utils/TypeScript';
import { register } from '../../redux/action/authAction';
const RegisterForm = () => {
   const dispatch = useDispatch();
   const initState = { name: '',  account: '', password: '', cf_password: '' };
   const [userRegister, setUserRegister] = useState(initState);
   const { name,  account, password, cf_password } = userRegister;
   const [typePass, setTypePass] = useState(false);
   const [typeCfPass, setTypeCfPass] = useState(false);
   const handleChangeInput = (e: InputChange) => {
      const { value, name } = e.target;
      setUserRegister({ ...userRegister, [name]: value });
   }

   const handleSubmitForm = (e: FormSubmit) => {
      e.preventDefault();      
      dispatch(register(userRegister))
   }
   return (
      <form onSubmit={handleSubmitForm}>
         <div className="form-group mb-2">
            <label className='form-label' htmlFor="name">Name</label>
            <input type="text"
               className='form-control'
               name='name' id='name'
               value={name}
               onChange={handleChangeInput}
            />
         </div>
         <div className="form-group mb-2">
            <label className='form-label' htmlFor="account">Email/ Phone number</label>
            <input type="text"
               className='form-control'
               name='account' id='account'
               value={account}
               onChange={handleChangeInput}
            />
         </div>
         <div className="form-group">
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

         <button className='btn btn-dark w-100 my-4' type='submit' >
            Register
         </button>
      </form>
   )
}

export default RegisterForm