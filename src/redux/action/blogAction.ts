import { IBlog } from '../../utils/TypeScript'
import { Dispatch } from 'react'
import { ALERT, IAlertType } from '../types/alertType'
import { imageUpload } from '../../utils/ImageUpload'
import { postApi, getApi, putApi, delApi } from '../../utils/FetchData'
import { GET_HOME_BLOG, IGetHomeBlogsType, 
   GET_BLOG_BY_CATEGORY_ID, IGetBlogsByCategoryIdType
   ,GET_BLOGS_USER_ID, IBlogUserType,
   CREATE_BLOG_USER_ID, DELETE_BLOG_USER_ID
} from '../types/blogType'

import { checkTokenExp } from '../../utils/checkTokenExp';


export const createBlog = (blog: IBlog, token: string) => {
   return async (dispatch: Dispatch<IAlertType | IBlogUserType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })
         let url: string = ''
         if(typeof blog.thumbnail !== 'string') {
            const photo = await imageUpload(blog.thumbnail)
            url  = photo.url
         }
         else {
            url = blog.thumbnail
         }
         const newBlog = {...blog, thumbnail: url}
         const res = await postApi('blog', newBlog, access_token)
         dispatch({
            type: CREATE_BLOG_USER_ID,
            payload: res.data
         })

         dispatch({
            type: ALERT,
            payload: { loading: false}
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg}
         })
      }
   }
}

export const getHomeBlogs = () => {
   return async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })
         const res = await getApi('home/blogs');

         dispatch({
            type: GET_HOME_BLOG,
            payload: res.data
         })
         
         dispatch({
            type: ALERT,
            payload: { loading: false}
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg }
         })
      }
   }
}

export const getBlogsByCategoryId = (categoryId: string, search: string) => {
   return async(dispatch: Dispatch<IAlertType | IGetBlogsByCategoryIdType>) => {
      try {
         let limit  = 8;
         let value = search ? search : `?page=${1}`
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })
         
         const res  = await getApi(`blogs/category/${categoryId}${value}&limit=${limit}`);
         console.log(res)
         dispatch({
            type: GET_BLOG_BY_CATEGORY_ID,
            payload: {...res.data, id: categoryId, search}
         })


         dispatch({
            type: ALERT,
            payload: { loading: false}
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg}
         })
      }
   }
}

export const getBlogsByUser = (id: string, search?: string) => {
   return async(dispatch: Dispatch<IAlertType | IBlogUserType>) => {
      try {
         let limit = 3;
         let value = search ? search : `?page=${1}`
         
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })

         const res = await getApi(`blogs/user/${id}${value}&limit=${limit}`);

         dispatch({
            type: GET_BLOGS_USER_ID,
            payload: {...res.data, id, search}
         })
         

         dispatch({
            type: ALERT,
            payload: { loading: false}
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg}
         })
      }
   }
}

export const updateBlog = (blog: IBlog, token: string) => {
   return async(dispatch: Dispatch<IAlertType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })
         let url: string = ''
         if(typeof blog.thumbnail !== 'string') {
            const photo = await imageUpload(blog.thumbnail)
            url  = photo.url
         }
         else {
            url = blog.thumbnail
         }
         const newBlog = {...blog, thumbnail: url}
         
         const res = await putApi(`blog/${newBlog._id}`, newBlog, access_token)
         dispatch({
            type: ALERT,
            payload: { success: res.data.msg}
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg}
         })
      }
   }
}

export const deleteBlog = (blog: IBlog, token: string) => {
   return async(dispatch: Dispatch<IAlertType | IBlogUserType>) => {
      const result = await checkTokenExp(token, dispatch)
      const access_token = result ? result : token;
      try {
         dispatch({
            type: ALERT,
            payload: { loading: true}
         })

         await delApi(`blog/${blog._id}`, access_token)
         dispatch({
            type: DELETE_BLOG_USER_ID,
            payload: blog
         })

         dispatch({
            type :ALERT,
            payload: { }
         })
      } catch(err: any) {
         dispatch({
            type: ALERT,
            payload: { errors: err.response.data.msg}
         })
      }
   }
}