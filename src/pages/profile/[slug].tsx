import React from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/TypeScript';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript'
import UserInfor from '../../components/profile/UserInfor';
import OrtherInfor from '../../components/profile/OrtherInfor';
import UserBlog from '../../components/profile/UserBlog';
const Profile = () => {
   const { slug }: IParams = useParams();
   const { auth } = useSelector((state: any) => state);
   return (
      <div className="row my-2">
         <div className="col-md-5 mb-3">
            {
               auth.user?._id === slug ?
               <UserInfor />
               :
               <OrtherInfor id={slug} />
            }
         </div>
         <div className="col-md-7">
            <UserBlog />
         </div>
      </div>
   )
}

export default Profile