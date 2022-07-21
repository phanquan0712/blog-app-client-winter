import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { InputChange, FormSubmit } from '../../utils/TypeScript';
import { login } from '../../redux/action/authAction';
const LoginPass = () => {
   const dispatch = useDispatch();
   const initState = { account: '', password: '' };
   const [userLogin, setUserLogin] = useState(initState);
   const { account, password } = userLogin;
   const [typePass, setTypePass] = useState(false);
   const handleChangeInput = (e: InputChange) => {
      const { value, name } = e.target;
      setUserLogin({ ...userLogin, [name]: value });
   }

   const handleSubmitForm = (e: FormSubmit) => {
      e.preventDefault();      
      dispatch(login(userLogin))
   }
   return (
      <form onSubmit={handleSubmitForm}>
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

         <button
            disabled={(account && password) ? false : true}
            className='btn btn-dark w-100 mt-4' type='submit' >
            Login
         </button>
      </form>
   )
}

export default LoginPass