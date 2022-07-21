import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { FormSubmit, InputChange, IUserProfile, RootStore } from '../../utils/TypeScript'
import NotFound from '../Global/NotFound'
import { updateUser, resetPassword } from '../../redux/action/profileActions'



const UserInfor = () => {
   const dispatch = useDispatch()
   const { auth } = useSelector((state: RootStore) => state)
   const initState = {
      name: '', account: '', avatar: '', password: '', cf_password: ''
   }
   const [user, setUser] = useState<IUserProfile>(initState);
   const [typePass, setTypePass] = useState(false);
   const [typeCfPass, setTypeCfPass] = useState(false);

   const handleChangeInput = (event: InputChange) => {
      const { name, value } = event.target;    
      setUser({ ...user, [name]: value })
   }

   const handleChangeFile = (event : InputChange) => {
      const target = event.target as HTMLInputElement;
      const files = target.files
      if(files) {
         const file = files[0];
         setUser({...user, avatar: file})
      }
   }
   const { name, account, avatar, password, cf_password } = user;

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault();      
      if(avatar || name) {         
         dispatch(updateUser((avatar as File), name, auth))
      }

      if(password && auth.access_token) {
         dispatch(resetPassword(password, cf_password, auth.access_token))
      }
   }
   if(!auth.user) return <NotFound />;
   return (
      <form className="profile_info" onSubmit={handleSubmit}>
         <div className="info_avatar">
            <img src={avatar ? URL.createObjectURL((avatar as File)) : auth.user.avatar}
               alt="avatar"
            />
            <span>
               <i className='fas fa-camera'></i>
               <p>Change Image</p>
               <input
                  type="file"
                  accept='image/*'
                  name='file'
                  id='file_up'
                  onChange={handleChangeFile}
               />
            </span>
         </div>

         <div className="form-group my-3">
            <label htmlFor="name" className='form-label'>Name</label>
            <input
               type="text"
               className='form-control'
               name='name'
               id='name'
               onChange={handleChangeInput}
               defaultValue={auth.user.name}
            />
         </div>

         <div className="form-group my-3">
            <label htmlFor="account">Account</label>
            <input
               type="text"
               className='form-control'
               name='account'
               id='account'
               defaultValue={auth.user.account}
               disabled={true}
            />
         </div>

         {
            auth.user.type !== 'register' &&
            <small className='text-danger'>
               * Quick login account with {auth.user.type} can't use this function *
            </small>
         }

         <div className="form-group my-3">
            <label className='form-label' htmlFor="password">Password</label>
            <div className="pass">
               <input type={typePass ? 'text' : 'password'}
                  className='form-control'
                  name='password' id='password'
                  value={password}
                  onChange={handleChangeInput}
                  disabled={auth.user.type !== 'register' ? true : false}
               />
               <small
                  onClick={() => setTypePass(!typePass)}>
                  {typePass ? 'hide' : 'show'}
               </small>
            </div>
         </div>

         <div className="form-group my-3">
            <label className='form-label' htmlFor="cf_password">Confirm password</label>
            <div className="pass">
               <input type={typeCfPass ? 'text' : 'password'}
                  className='form-control'
                  name='cf_password' id='cf_password'
                  value={cf_password}
                  onChange={handleChangeInput}
                  disabled={auth.user.type !== 'register' ? true : false}
               />
               <small
                  onClick={() => setTypeCfPass(!typeCfPass)}>
                  {typeCfPass ? 'hide' : 'show'}
               </small>
            </div>
         </div>

         <button className='btn btn-dark w-100' type='submit'>
            Update
         </button>
      </form>
   )
}

export default UserInfor