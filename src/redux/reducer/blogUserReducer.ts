import { GET_BLOGS_USER_ID, CREATE_BLOG_USER_ID, DELETE_BLOG_USER_ID, IBlogUserType, IBlogsUser } from "../types/blogType";
import { IUser } from "../../utils/TypeScript";

const blogUserReducer = (state: IBlogsUser[] = [], action: IBlogUserType): IBlogsUser[] => {
   switch (action.type) {
      case GET_BLOGS_USER_ID:
         if (state.every(item => item.id !== action.payload.id)) {
            return [...state, action.payload];
         } else {
            return state.map((item) => (item.id === action.payload.id ? action.payload : item));
         }
      case CREATE_BLOG_USER_ID:
         return state.map(item => (
            item.id === (action.payload.user as IUser)._id
               ? {
                  ...item,
                  blogs: [action.payload, ...item.blogs]
               }
               : item
         ))
      case DELETE_BLOG_USER_ID:
         return state.map(item => (
            item.id === (action.payload.user as IUser)._id
            ? {
               ...item,
               blogs: item.blogs.filter(blog => blog._id !== action.payload._id)
            }: item
         ))
      default:
         return state;
   }
}

export default blogUserReducer;