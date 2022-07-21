import { Dispatch } from "react";
import { ALERT, IAlertType } from "../types/alertType";
import { IComment } from "../../utils/TypeScript";
import { postApi, getApi, patchApi, delApi } from "../../utils/FetchData";
import { CREATE_COMMENT, GET_COMMENTS, 
   REPLY_COMMENT, UPDATE_COMMENT, 
   UPDATE_REPLY,  DELETE_COMMENT,
   DELETE_REPLY,
   ICommentType
} from "../types/commentType";
import { checkTokenExp } from "../../utils/checkTokenExp";

export const createComment = (data: IComment, token: string) => {
   return async(dispatch: Dispatch<IAlertType | ICommentType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         const res = await postApi('comment', data, access_token);
         
         // dispatch({
         //    type: CREATE_COMMENT,
         //    payload: {...res.data, user: data.user}
         // })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: {
               errors: err.message
            }
         })
      }
   }
}

export const getComments = (id: string, num: number) => {
   return async (dispatch: Dispatch<IAlertType | ICommentType>) => {
      try {
         let limit = 4;
         const res = await getApi(`comments/blog/${id}?limit=${limit}&page=${num}`);
         
         dispatch({
            type :GET_COMMENTS,
            payload: {
               data: res.data.comments,
               total: res.data.total
            }
         })
         
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.message }
         })
      }
   }
}

export const replyComment = (data: IComment, token: string) => {
   return async(dispatch: Dispatch<IAlertType | ICommentType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         const res = await postApi('reply_comment', data, access_token);
         // dispatch({
         //    type: REPLY_COMMENT,
         //    payload: {
         //       ...res.data,
         //       user: data.user,
         //       reply_user: data.reply_user
         //    }
         // })
         
      } catch(err: any) {
         dispatch({
            type :ALERT,
            payload: { errors: err.message }
         })
      }
   }
}

export const updateComment = (data: IComment, token: string) => {
   return async(dispatch: Dispatch<IAlertType | ICommentType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         // dispatch({
         //    type :data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
         //    payload: data
         // })

         await patchApi(`comment/${data._id}`, { data }, access_token);
         
         
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.message }
         })
      }
   }
}

export const deleteCommnet = (data: IComment, token: string) => {
   return async(dispatch: Dispatch<IAlertType | ICommentType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         // dispatch({
         //    type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
         //    payload: data
         // })

         await delApi(`comment/${data._id}`, access_token);
         
      } catch(err : any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.message }
         })
      }
   }
}