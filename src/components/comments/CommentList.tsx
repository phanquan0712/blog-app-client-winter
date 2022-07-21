import React, { useState } from 'react'
import { IComment } from '../../utils/TypeScript'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import Input from './Input'
import { replyComment, updateComment, deleteCommnet } from '../../redux/action/commentAction'
interface IProps {
   comment: IComment
}
const CommentList: React.FC<IProps> = ({ comment, children }) => {
   const [onReply, setOnReply] = useState(false)
   const [edit, setEdit] = useState<IComment>()
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch();

   const handleReply = (body: string) => {
      if (!auth.user || !auth.access_token) {
         alert('Please, Login to comment.')
         setOnReply(false)
         return;
      }

      const data = {
         user: auth.user,
         content: body,
         blog_id: comment.blog_id,
         blog_user_id: comment.blog_user_id,
         reply_user: comment.user,
         replyCM: [],
         comment_root: comment.comment_root || comment._id,
         createdAt: new Date().toISOString()
      }
      dispatch(replyComment(data, auth.access_token))
      setOnReply(false)
   }

   const handleUpdate = (body: string) => {
      if (!auth.user || !auth.access_token) return;

      if(body === edit?.content) return setEdit(undefined)
      
      const newComment = {...edit, content: body}
      
      dispatch(updateComment(newComment as IComment, auth.access_token))
      setEdit(undefined)
   }

   const handleDelete = (comment: IComment) => {
      if(!auth.user || !auth.access_token) return;

      dispatch(deleteCommnet(comment, auth.access_token))      
   }

   const Nav = (comment: IComment) => {
      return (
         <div>
            <i className='fas fa-trash-alt mx-2' 
               onClick={() => handleDelete(comment)}
            />
            <i className='fas fa-edit mx-2'
               onClick={() => setEdit(comment)}
            />
         </div>
      )
   }

   return (
      <div className='w-100'>
         {
            edit ?
               <Input
                  callback={handleUpdate}
                  edit={edit}
                  setEdit={setEdit}
               />
               :
               <div className="comment_box">
                  <div className='p-2' dangerouslySetInnerHTML={{
                     __html: comment.content
                  }}>
                  </div>

                  <div className='d-flex justify-content-between p-2'>
                     <small style={{ cursor: 'pointer', opacity: '0.8', color: 'blue' }} onClick={() => setOnReply(!onReply)}>
                        {onReply ? '- Cancel -' : '- Reply -'}
                     </small>

                     <small className='d-flex'>
                        <div className='comment_nav'>
                           {
                              // if you is the author of the blog, you can delete the comment
                              // if you is the author of the comment, you can delete and edit the comment
                              // if you is the author of the comment and blog, you can delete and edit the comment
                              comment.blog_user_id === auth.user?._id ?
                                 comment.user._id === auth.user._id ?
                                    Nav(comment)
                                    :
                                    <i className='fas fa-trash-alt mx-2' 
                                       onClick={() => handleDelete(comment)}
                                    />
                                 :
                                 // if you not is the author of the blog and comment, you cann't delete and edit the comment
                                 comment.user._id === auth.user?._id && Nav(comment)
                           }
                        </div>
                        <div>
                           {new Date(comment.createdAt).toLocaleString()}
                        </div>
                     </small>
                  </div>
               </div>
         }

         {
            onReply && <Input callback={handleReply} />
         }

         {children}
      </div>
   )
}

export default CommentList