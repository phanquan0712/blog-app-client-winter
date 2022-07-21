import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getOtherInfo } from '../../redux/action/profileActions' 
import { RootStore, IUser  } from '../../utils/TypeScript'
import Loading from '../alert/Loading'
import { showErrMsg } from '../alert/Alert'
interface IProps  {
   id: string
}

const OrtherInfor = ({ id }: IProps) => {
   const dispatch = useDispatch();
   const { otherInfo } = useSelector((state: RootStore) => state)

   const [other, setOther] = useState<IUser>()

   useEffect(() => {
      if(!id) return;

      if(otherInfo.every(item => item._id !== id)) {
         dispatch(getOtherInfo(id))
      } else {
         const newUser = otherInfo.find(item => item._id === id)
         if(newUser) setOther(newUser)
      }

   }, [id, dispatch, otherInfo])

   if(!other) return <Loading />
   return (
      <div className="profile_info text-center rounded">
         <div className="info_avatar">
            <img src={other.avatar} alt="" />
         </div>

         <h5 className='text-uppercase text-danger'>
            {other.role}
         </h5>

         <div>
            Name: <span className='text-info'>{other.name}</span>
         </div>
         <div>
            Email / Phone number: <span className='text-info'>{other.account}</span>
         </div>
         <div>
            Join Date: <span style={{ color: '#ffc107'}}>{new Date(other.createdAt).toLocaleString()}</span>
         </div>
      </div>
   )
}

export default OrtherInfor