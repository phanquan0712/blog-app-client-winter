import { ICategory } from './../../utils/TypeScript';
import { Dispatch } from "react"
import { ALERT, IAlertType } from "../types/alertType"
import { postApi, getApi, patchApi, delApi  } from "../../utils/FetchData"
import * as CateType from "../types/categoryType"
import { checkTokenExp } from '../../utils/checkTokenExp';


export const createCategory = (name: string, token: string) => {
   return async (dispatch: Dispatch<IAlertType | CateType.ICategoryType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })

         const res = await postApi('category', { name }, access_token)

         dispatch({
            type: CateType.CREATE_CATEGORY,
            payload: res.data.newCategory
         })
         dispatch({
            type: ALERT,
            payload: { loading: false }
         })
      } catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const getCategory = () => {
   return async (dispatch: Dispatch<CateType.ICategoryType | IAlertType>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true }
         })

         const response = await getApi('category')

         dispatch({
            type: CateType.GET_CATEGORY,  
            payload: response.data.categories
         })

         dispatch({
            type: ALERT,
            payload: { loading: false}
         })
      } catch (err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.message }
         })
      }
   }
}

export const updateCategory = (data: ICategory, token: string) => {
   return async (dispatch: Dispatch<IAlertType | CateType.ICategoryType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         dispatch({
            type: CateType.UPDATE_CATEGORY,
            payload: data
         })
         await patchApi(`category/${data._id}`, { name: data.name },  access_token)         
      
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const deleteCategory = (id: string, token: string) => {
   return async (dispatch: Dispatch<IAlertType | CateType.ICategoryType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         const res = await delApi(`category/${id}`, access_token)
         if(res.data.errCode === 1) {
            dispatch({
               type: ALERT,
               payload: { success: res.data.msg}
            })
         }
         dispatch({
            type: CateType.DELETE_CATEGORY,
            payload: id
         })
 
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}