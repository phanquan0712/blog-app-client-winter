import { IBlog } from "../../utils/TypeScript";

export const GET_HOME_BLOG = 'GET_HOME_BLOG';
export const GET_BLOG_BY_CATEGORY_ID = 'GET_BLOG_BY_CATEGORY_ID';
export const GET_BLOGS_USER_ID = 'GET_BLOGS_USER_ID';
export const CREATE_BLOG_USER_ID = 'CREATE_BLOG_USER_ID';
export const DELETE_BLOG_USER_ID = 'DELETE_BLOG_USER_ID';



export interface IHomeBlogs {
   _id: string,
   name: string, 
   count: number,
   blogs: IBlog[]
}

export interface IGetHomeBlogsType {
   type: typeof GET_HOME_BLOG,
   payload: IHomeBlogs[]
}


export interface IBlogsCategory {
   id: string,
   blogs: IBlog[],
   total: number,
   search: string
}


export interface IGetBlogsByCategoryIdType {
   type: typeof GET_BLOG_BY_CATEGORY_ID,
   payload: IBlogsCategory
}

export interface IBlogsUser {
   id: string,
   blogs: IBlog[],
   total: number,
   search: string,
}

export interface IGetBlogsByUserType {
   type: typeof GET_BLOGS_USER_ID,
   payload: IBlogsUser
}

export interface ICreateBlogUserType {
   type: typeof CREATE_BLOG_USER_ID,
   payload: IBlog
}


export interface IDeleteBlogUserType {
   type: typeof DELETE_BLOG_USER_ID,
   payload: IBlog
}

export type IBlogUserType =  ICreateBlogUserType | IGetBlogsByUserType | IDeleteBlogUserType;