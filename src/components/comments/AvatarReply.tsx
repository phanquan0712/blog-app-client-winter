import React from 'react'
import { IUser } from '../../utils/TypeScript'
import { Link } from 'react-router-dom'

interface IProps {
   user: IUser,
   reply_user?: IUser
}
const AvatarReply = ({ user, reply_user }: IProps) => {

   return (
      <div className='avatar_reply'>
         <img src={user.avatar} alt="Avatar" />

         <div className='ms-1'>  
            <small className='text-muted d-block text-break'>
               <Link to={`/profile/${user._id}`}>
                  {user.name}
               </Link>
            </small>

            <small className='text-muted d-block text-break'>
               Reply to <Link to={`/profile/${reply_user?._id}`}>
                  {reply_user?.name}
               </Link>
            </small>
         </div>
      </div>
   )
}

export default AvatarReply