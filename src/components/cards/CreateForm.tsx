import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IBlog, InputChange } from '../../utils/TypeScript'

interface IProps {
   blog: IBlog,
   setBlog: (blog : IBlog) => void
}

const CreateForm = ({blog, setBlog}: IProps) => {
   const { category } = useSelector((state: RootStore) => state)
   console.log(window.innerWidth);
   
   const handleChangeInput = (e: InputChange) => {
      const { name, value } = e.target;
      setBlog({...blog, [name]: value})
   }

   const handleChangeFile = (e: InputChange) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if(files) {
         setBlog({...blog, thumbnail: files[0]})
      }
   }
   return (
      <form>
         <div className="form-group position-relative my-3">
            <input type="text" className='form-control' 
            value={blog.title}
            name='title'
            onChange={handleChangeInput}
            />
            {
               window.innerWidth > 415 &&
            <small className='text-muted position-absolute'
               style={{
                  top: '50%', right: '10px',
                  transform: 'translateY(-50%)'
               }}
            >
               {blog.title.length}/50
            </small>
            }
         </div>

         <div className="form-group my-3">
            <input type="file" className='form-control'
               accept='image/*'
               onChange={handleChangeFile}
            />
         </div>

         <div className="form-group position-relative my-3">
            <textarea className='form-control' rows={4} 
               style={{ resize: 'none' }}
               name='description'
               value={blog.description}
               onChange={handleChangeInput}
            />
            {
               window.innerWidth > 415 && 
            <small className='text-muted position-absolute'
               style={{
                  bottom: 0, right: '5px',
               }}
            >
               {blog.description.length}/200
            </small>
            }
         </div>

         <div className="form-group">
            <select className='form-control text-capitalize'
               name='category'
               value={blog.category}
               onChange={handleChangeInput}
            >
               <option value="">Choose a category</option>
               {
                  category && category.length > 0 &&
                  category.map((item) => (
                     <option key={item._id} value={item._id}>{item.name}</option>
                  ))
               }
            </select>
         </div>
      </form>
   )
}

export default CreateForm