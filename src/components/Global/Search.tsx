import React, { useState, useEffect } from 'react'
import { getApi } from '../../utils/FetchData'
import { IBlog } from '../../utils/TypeScript'
import CardHoriz from '../cards/CardHoriz'
const Search = () => {
   const [search, setSearch] = useState('')
   const [blogs, setBlogs] = useState<IBlog[]>([])
   useEffect(() => {
      const delayDebounce = setTimeout(async () => {
         if (search.length < 2) return;
         try {
            const res = await getApi(`/search/blogs?title=${search}`)
            if (res.data.length > 0) {
               setBlogs(res.data)
            }
         } catch (error) {
            console.log(error);
         }
      }, 400)


      // Unmount
      return () => {
         clearTimeout(delayDebounce)
         setBlogs([])
      }

   }, [search])

   return (
      <div className='search w-100 position-relative me-4'>
         <input type="text" className='form-control me-2 w-100 my-2'
            value={search}
            placeholder='Enter your search...'
            onChange={(e) => setSearch(e.target.value)}
         />

         {
            search.length >= 2 &&
            <div className={`position-absolute ${window.innerWidth > 1024 ? 'px-4 py-2': 'px-2'} w-100 rounded`} style={{
               backgroundColor: '#f5f5f5', zIndex: 100,
               borderRadius: '0 0 10px 10px', 
               maxHeight: 'calc(100vh - 100px',
               overflow: 'auto'
            }}>
               {
                  blogs && blogs.length > 0 ?
                     blogs.map(blog => (
                        <CardHoriz key={blog._id} blog={blog} />
                     ))
                     :
                     <h3 className='w-100 text-center p-4'>No blog</h3>
               }
            </div>
         }
      </div>
   )
}

export default Search