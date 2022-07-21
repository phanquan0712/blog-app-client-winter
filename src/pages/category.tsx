import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormSubmit, RootStore } from '../utils/TypeScript'
import NotFound from '../components/Global/NotFound'
import { createCategory, updateCategory, deleteCategory } from '../redux/action/categoryAction'
import { ICategory } from '../utils/TypeScript'
const Category = () => {
   const [name, setName] = useState('')
   const { auth, category } = useSelector((state: RootStore) => state)
   const [edit, setEdit] = useState<ICategory | null>(null)

   const dispatch = useDispatch();

   useEffect(() => {
      if(edit) setName(edit.name)
   }, [edit])

   const handleSubmit = (e: FormSubmit) => {
      e.preventDefault();
      if (!auth.access_token || !name) return;

      if(edit) {
         if(edit.name === name) return;
         const data = { ...edit, name }
         dispatch(updateCategory(data, auth.access_token))
      } else {
         dispatch(createCategory(name, auth.access_token))
      }
      setName('')
      setEdit(null)
   }

   const handleDelete = (id: string) => {
      if(!auth.access_token) return;
      if(window.confirm('Are you sure want to delete this category?'))
      dispatch(deleteCategory(id, auth.access_token))
   }

   if (auth.user?.role !== 'admin') return <NotFound />;
   return (
      <div className='category'>
         <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category</label>

            <div className="d-flex align-items-center">

               {
                  edit &&
                  <i className="fas fa-times mx-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     setEdit(null)
                     setName('')
                  }}
               ></i>}

               <input type="text" name='category' id='category'
                  value={name} onChange={(e) => setName(e.target.value)}
               />

               <button type='submit'>
                  {
                     edit ? 'Update' : 'Create'
                  }
               </button>
            </div>
         </form>

         <div>

            {
               category && category.length > 0 &&
               category.map((item) =>
               (
                  <div className="category_row" key={item._id}>
                     <p className='m-0 text-capitalize'>{item.name}</p>

                     <div>
                        <i className="fas fa-edit mx-2"
                           onClick={() => setEdit(item)}
                        ></i>
                        <i className="fas fa-trash-alt"
                           onClick={() => handleDelete(item._id)}
                        ></i>
                     </div>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default Category