import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IParams, IBlog, RootStore } from '../../utils/TypeScript'
import { getApi } from '../../utils/FetchData'
import Loading from '../../components/alert/Loading'
import { showErrMsg } from '../../components/alert/Alert'
import DisplayBlog from '../../components/blog/DisplayBlog'
import { useSelector } from 'react-redux'
const DetailBlog = () => {
   const blog_id = useParams<IParams>().slug;
   const { socket } = useSelector((state: RootStore) => state)
   const [blog, setBlog] = useState<IBlog>();
   const [loading, setLoadig] = useState(false);
   const [error, setError] = useState('');

   

   useEffect(() => {
      if(!blog_id) return;
      setLoadig(true);
      getApi(`/blog/${blog_id}`)
         .then(res => {
            setBlog(res.data)
            setLoadig(false);
         })
         .catch(err => {
            setError('Cannot get blog detail');
            setLoadig(false);
         })

      return () => {
         setBlog(undefined);
      }
   }, [blog_id])

   useEffect(() => {
      if(!blog_id || !socket) return;
      socket.emit('joinRoom', blog_id)

      return () => {
         socket.emit('leaveRoom', blog_id)
      }
   }, [socket, blog_id])

   if(loading) return <Loading />
   return (
      <div>
         { error && showErrMsg(error) }
         
         { blog && <DisplayBlog blog={blog} /> }
      </div>
   )
}

export default DetailBlog