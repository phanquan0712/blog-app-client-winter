import React, { useState, useEffect } from 'react'
import { IComment } from '../../utils/TypeScript'
import AvatarComment from './AvatarComment'
import CommentList from './CommentList'
import AvatarReply from './AvatarReply'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
interface IProps {
   comment: IComment
}
const Comments = ({ comment }: IProps) => {
   const [showReply, setShowReply] = useState<IComment[]>([])
   const [next, setNext] = useState(2)
   useEffect(() => {
      if(!comment.replyCM) return;
      setShowReply(comment.replyCM)
   }, [comment.replyCM])
   return (
      <div className='my-3 d-flex' style={{
         opacity: comment._id ? 1 : 0.5,
         pointerEvents: comment._id ? 'initial' : 'none'
      }}>
         <AvatarComment user={comment.user} />

         <CommentList
            comment={comment}
         >
            {
               showReply.slice(0, next).map(reply => (
                  <div key={reply._id} style={{
                     opacity: reply._id ? 1 : 0.5,
                     pointerEvents: reply._id ? 'initial' : 'none'
                  }}>
                     <AvatarReply
                        user={reply.user}
                        reply_user={reply.reply_user}
                     />
                     <CommentList
                        comment={reply}
                     />
                  </div>
               ))
            }

            <div style={{ cursor: 'pointer'}}>
               {
                  showReply.length - next > 0 ?
                  <small style={{ color: 'crimson'}} onClick={() => setNext(Number(showReply.length))}>
                     See more comments
                  </small>
                  : showReply.length > 2 &&
                  <small style={{ color: 'teal'}} onClick={() => setNext(2)}>
                     Hide comments
                  </small>
               }
            </div>
         </CommentList>
      </div>
   )
}

export default Comments