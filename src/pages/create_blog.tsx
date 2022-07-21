import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import CreateForm from '../components/cards/CreateForm'
import CardHoriz from '../components/cards/CardHoriz'
import NotFound from '../components/Global/NotFound'
import Quill from '../components/editor/ReactQuill'
import { imageUpload } from '../utils/ImageUpload'
import  { IBlog, IUser } from '../utils/TypeScript'
import { validCreateBlog, shallowEquality } from '../utils/Valid'
import { ALERT } from '../redux/types/alertType'
import { createBlog, updateBlog } from '../redux/action/blogAction'
import { getApi } from '../utils/FetchData'


interface IProps {
   id?: string
}
const CreateBlog = ({ id }: IProps) => {
   const initState = {
      user: '',
      title: '',
      content: '',
      description: '',
      thumbnail: '',
      category: '',
      createdAt: new Date().toISOString() 
   }
   const [blog, setBlog]  = useState<IBlog>(initState)
   const [body, setBody] = useState('')
   const [text, setText] = useState('');
   const { auth } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch()
   const divRef = useRef<HTMLDivElement>(null)
   const [oldData, setOldData] = useState<IBlog>(initState)    

   useEffect(() => {
      if(!id) return;

      getApi(`blog/${id}`)
         .then(res => {
            setBlog(res.data)
            setBody(res.data.content)
            setOldData(res.data)
      }) 
         .catch(err => {
            console.log(err);
         })
      return () => {
         setBlog(initState)
         setBody('')
         setOldData(initState)
      }
   }, [id, dispatch])

   useEffect(() => {
      const div = divRef.current;
      console.log(div);
      
      if(!div) return;
      const text = (div?.innerText as string);
      setText(text);      
   }, [body])  

   const handleSubmit = async() => {
      if(!auth.access_token) return;
      const check = validCreateBlog({ ...blog, content: text})

      if(check.errLength !==0 ) return dispatch({
         type: ALERT,
         payload: { errors: check.errMsg }
      })
   
      let newData = {...blog, content: body}

      if(id) {
         const result = shallowEquality(oldData, newData)
         if(!result) {
            if(!(auth.user?._id === (blog.user as IUser)._id)) {
               return dispatch({
                  type: ALERT,
                  payload: { errors: 'Invalid Authentication!'}
               })
            }
            dispatch(updateBlog(newData, auth.access_token))
         } else {
            dispatch({
               type :ALERT,
               payload: { errors: 'The data does not change.'}
            })
         }
      }
      else {
         dispatch(createBlog(newData, auth.access_token))
      }
   }

   if(!auth.access_token) return <NotFound />
   return (
      <div className='my-4 create_blog'>
         <h2>Create Blog</h2>

         <div className="row mt-4">
            <div className="col-md-6">
               <h5>Create</h5>
               <CreateForm blog={blog} setBlog={setBlog} />
            </div>

            <div className="col-md-6">
               <h5 className='mt-3 mb-2'>Preview</h5>
               <CardHoriz blog={blog} />
            </div>
         </div>

         <div className='mt-5'>
            <Quill body={body} setBody={setBody} />
            <small>{text.length}</small>
            <div ref={divRef}  dangerouslySetInnerHTML = {{
               __html: body
            }} style={{ display: 'none'}} />
         </div>

         <button className='btn btn-dark mt-3 d-block mx-auto'
            onClick={handleSubmit}
         >
            { id ? 'Update Post': "Create Post"}
         </button>
      </div>
   )
}

export default CreateBlog