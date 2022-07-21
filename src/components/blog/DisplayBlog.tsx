import React, { useState, useEffect, useCallback } from 'react'
import { IBlog } from '../../utils/TypeScript'
import Comments from '../comments/Comments'
import Input from '../comments/Input'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore, IUser, IComment } from '../../utils/TypeScript' 
import { createComment, getComments } from '../../redux/action/commentAction'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../alert/Loading'
import Pagination from '../Global/Pagination'
interface IProps {
   blog: IBlog
}
const DisplayBlog = ({ blog }: IProps) => {
   const { auth, comments } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch();
   const history = useHistory()
   const [showComments, setShowComments] = useState<IComment[]>([])
   const [loading, setLoading] = useState(false)
   
   const handleComment = (body: string) => {
      if(!auth || !auth.user || !auth.access_token) return;

      const data = {
         content: body,
         user: auth.user,
         blog_id: (blog._id as string),
         replyCM: [],
         blog_user_id: (blog.user as IUser)._id,
         createdAt: new Date().toISOString()
      }
      dispatch(createComment(data, auth.access_token))   
   }

   useEffect(() => {
      if(!comments) return;
      setShowComments(comments.data)
   }, [comments.data])


   const fetchComments = useCallback(async(id: string, num: number = 1) => {
      setLoading(true)
      await dispatch(getComments(id, num))
      setLoading(false)
   }, [dispatch])

   useEffect(() => {
      if(!blog._id) return;
         const num = Number(history.location.search.slice(6)) || 1;
      fetchComments(blog._id, num);
   }, [blog._id])

   const handlePagination = (page: number) => {
      if(!blog._id) return;
      fetchComments(blog._id, page)
   }

   return (
      <div>
         <h2 className='text-center my-3 text-capitalize' style={{ color: '#ff7a00'}}>
            {blog.title}
         </h2>

         <div className='text-end my-3' style={{ color: 'teal'}}>
            <small>
               {
                  typeof(blog.user) !== 'string' &&
                  `By: ${blog.user.name}`
               }
            </small>

            <small className='ms-2'>
               {new Date(blog.createdAt).toLocaleString()}
            </small>
         </div>

         <div className='text-center blog' dangerouslySetInnerHTML={{
            __html: blog.content
         }}>
         </div>
            <hr className='my-1' />
            <h3 style={{ color: '#ff7a00'}}> Comments </h3>
            {
               auth.user ? 
               <Input callback={handleComment} />
               : 
               <h5> Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.</h5>
            }

            {
               loading ? 
               <Loading />
               :
               showComments && showComments.length > 0 &&
               showComments.map((comment) => (
                  <Comments key={comment._id} comment={comment} />
               ))
            }

            {
               comments.total > 1 &&
               <Pagination 
                  total={comments.total}
                  callback={handlePagination}
               />
            }
      </div>
   )
}

export default DisplayBlog