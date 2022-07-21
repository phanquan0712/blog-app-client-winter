import { IUserLogin, IUserRegister } from "../../utils/TypeScript"
import { Dispatch } from "react"
import { postApi, getApi } from "../../utils/FetchData"
import { AUTH, IAuthType } from "../types/authType"
import { ALERT, IAlertType } from '../types/alertType'
import { ValidRegister, validPhone, checkPassword } from "../../utils/Valid"
import { checkTokenExp } from "../../utils/checkTokenExp"
export const login = (userLogin: IUserLogin) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         const res = await postApi('login', userLogin);
         console.log(res);
         dispatch({
            type: AUTH,
            payload: {
               access_token: res.data.access_token,
               user: res.data.user
            }
         })
         dispatch({
            type: ALERT,
            payload: { success: "Login Success!" }
         })
         localStorage.setItem('logged', 'noze')
      }
      catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const register = (userRegister: IUserRegister) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      const check = ValidRegister(userRegister);
      if (check.errLength > 0) {
         return dispatch({
            type: ALERT,
            payload: { errors: check.errMsg }
         })
      }
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         const res = await postApi('register', userRegister);
         dispatch({
            type: ALERT,
            payload: { success: res.data.msg }
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

export const refreshToken = () => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      const logged = localStorage.getItem('logged')
      if(logged !== 'noze') return;
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })
         const res = await getApi('refresh_token')
         
         dispatch({
            type: AUTH,
            payload: res.data
         })
         dispatch({
            type: ALERT,
            payload: {}
         })
      }
      catch (err: any) {
         dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
         localStorage.removeItem('logged')
      }
   }
}

export const logout = (token: string) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      const result = await checkTokenExp(token, dispatch);
      const access_token = result ? result : token
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         localStorage.removeItem('logged');
         await getApi('logout', access_token);
         window.location.href = '/'
         dispatch({
            type: ALERT,
            payload: {}
         })
      }
      catch (err: any) {
         dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
      }
   }
}

export const googlelogin = (id_token: string) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         const res = await postApi('google_login', {id_token});
         console.log(res);
         dispatch({
            type: AUTH,
            payload: res.data
         })
         dispatch({
            type: ALERT,
            payload: { success: "Login Success!" }
         })
         localStorage.setItem('logged', 'noze')
      }
      catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const facebookLogin = (accessToken: string,  userID: string) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         const res = await postApi('facebook_login', {accessToken, userID});
         dispatch({
            type: AUTH,
            payload: res.data
         })
         dispatch({
            type: ALERT,
            payload: { success: "Login Success!" }
         })
         localStorage.setItem('logged', 'noze')
      }
      catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const loginSms = (phone: string) => {
   return async (dispatch: Dispatch<IAuthType | IAlertType>) => {
      const check = validPhone(phone)
      if(!check) return dispatch({
         type: ALERT,
         payload: { errors: "Phone number format is incorrect" }
      })
      try {
         
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })
         const res = await postApi('login_sms', { phone })
         if(!res.data.valid) {
            verifySms(phone, dispatch)
         }         
         // localStorage.setItem('logged', 'noze')
      }
      catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

const verifySms = async(phone: string, dispatch: Dispatch<IAuthType | IAlertType>) => {
   const code = prompt('Enter your code')
   if(!code) return;
   try {
      dispatch({
         type: ALERT,
         payload: { loading: true }
      })
      const res = await postApi('verify_sms', { phone, code })
      dispatch({
         type: AUTH,
         payload: res.data
      })
      dispatch({
         type: ALERT,
         payload: { success: "Login Success!" }
      })
      localStorage.setItem('logged', 'noze')
   }
   catch(err: any) {
      dispatch({
         type: ALERT,
         payload: {errors: err.response.data.msg}
      })
      setTimeout(() => {
         verifySms(phone, dispatch)
      }, 500)
   }
}


export const forgotPassword = (account: string) => {
   return async(dispatch: Dispatch<IAuthType | IAlertType>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })

         const res = await postApi('forgot_password', { account })
         console.log(res);
         dispatch({
            type: ALERT,
            payload:{ success: res.data.msg}
         })
      } catch(err: any) {
         dispatch({
            type: ALERT, 
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

