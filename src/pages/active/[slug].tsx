import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from '../../utils/TypeScript'
import { postApi } from '../../utils/FetchData'
import { showErrMsg, showSuccessMsg } from '../../components/alert/Alert'
const Active = () => {
   const { slug }: IParams = useParams();
   const [errMsg, setErrMsg] = useState('');
   const [successMsg, setSuccessMsg] = useState('');
   useEffect(() => {
      if (slug) {
         postApi('active', { active_token: slug })
            .then(res => setSuccessMsg(res.data.msg))
            .catch(err => setErrMsg(err.response.data.msg))
      }
   }, [slug])
   return (
      <div>
         {
            errMsg && showErrMsg(errMsg)
         }
         {
            successMsg && showSuccessMsg(successMsg)
         }
      </div>
   )
}

export default Active