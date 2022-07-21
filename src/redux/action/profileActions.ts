import { ALERT } from './../types/alertType';
import { Dispatch } from "react"
import { AUTH, IAuth, IAuthType } from "../types/authType"
import { IAlertType } from "../types/alertType"
import { checkImage, imageUpload } from '../../utils/ImageUpload';
import { patchApi, getApi } from '../../utils/FetchData';
import { checkPassword } from '../../utils/Valid';
import { GET_OTHER_INFO, IGetOtherInfo } from '../types/profileType';
import { checkTokenExp } from '../../utils/checkTokenExp';

export const updateUser = (avatar: File, name: string, auth: IAuth) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      if (!auth.access_token || !auth.user) return;

      const result = await checkTokenExp(auth.access_token, dispatch)
      const access_token = result ? result : auth.access_token;
      
      let url = ''
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })

         if (avatar) {
            const check = checkImage(avatar)
            if (check) {
               return dispatch({
                  type: ALERT,
                  payload: { errors: check }
               })
            }
            const photo = await imageUpload(avatar)
            url = photo.url
         }

         await patchApi('user', {
            name: name ? name : auth.user.name,
            avatar: url ? url : auth.user.avatar
         }, access_token);

         dispatch({
            type: AUTH,
            payload: {
               access_token: access_token,
               user: {
                  ...auth.user,
                  name: name ? name : auth.user.name,
                  avatar: url ? url : auth.user.avatar
               }
            }
         })

         dispatch({
            type: ALERT,
            payload: { loading: false }
         })
      }
      catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const resetPassword = (password: string, cf_password: string, token: string) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })

         const msg = checkPassword(password, cf_password)
         if(msg) return dispatch({
            type: ALERT,
            payload: { errors: msg }
         })

         const res = await patchApi('reset_password', { password }, access_token )
         dispatch({
            type: ALERT,
            payload: { success: res.data.msg}
         })
      }
      catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      } 
   }
}


export const getOtherInfo = (id: string) => {
   return async(dispatch: Dispatch<IAlertType | IGetOtherInfo>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         const res = await getApi(`user/${id}`)
         
         dispatch({
            type: GET_OTHER_INFO,
            payload: res.data
         })

         dispatch({
            type: ALERT, 
            payload: { loading: false }
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.message }
         })
      }
   }
}