import { GET_BLOG_BY_CATEGORY_ID, IBlogsCategory, IGetBlogsByCategoryIdType } from "../types/blogType";

const blogCategoryReducer = (state: IBlogsCategory[] = [], action: IGetBlogsByCategoryIdType): IBlogsCategory[] => {
   switch (action.type) {
      case GET_BLOG_BY_CATEGORY_ID:
         if(state.every(item => item.id !== action.payload.id)) {
            return [...state, action.payload];
         } else {
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog);
         }
      default:
         return state;
   }
}

export default blogCategoryReducer;