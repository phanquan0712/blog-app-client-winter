import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, IParams } from '../../utils/TypeScript'
import { getBlogsByCategoryId } from '../../redux/action/blogAction'
import { IBlog } from '../../utils/TypeScript'
import NotFound from '../../components/Global/NotFound'
import CartVert from '../../components/cards/CartVert'
import Pagination from '../../components/Global/Pagination'
import { useHistory } from 'react-router-dom'
const BlogByCategory = () => {
   const { category, blogCategory } = useSelector((state: RootStore) => state)
   const dispatch = useDispatch()
   const { slug } = useParams<IParams>()
   const history = useHistory()
   const { search } =  history.location;
   const [categoryId, setCategoryId] = useState('')
   const [blogs, setBlogs] = useState<IBlog[]>([])
   const [total, setTotal] = useState(0)
   useEffect(() => {
      const cate = category.find(item => item.name === slug)
      if(!cate) return;
      setCategoryId(cate._id)
   }, [category, slug])

   useEffect(() => {
      if(!categoryId) return;
      if(blogCategory.every(item => item.id !== categoryId)) {
         dispatch(getBlogsByCategoryId(categoryId, search))
      } else {
         const data = blogCategory.find(item => item.id === categoryId)
         if(!data) return;
         
         setBlogs(data.blogs)
         setTotal(data.total)

         if(data.search) history.push(data.search)
      }
   }, [categoryId, blogCategory, dispatch, search])


   const handlePagination = (page: number) => {
      const newSearch = `?page=${page}`
      dispatch(getBlogsByCategoryId(categoryId, newSearch))
   }

   if(!blogs) return <NotFound />
   return ( 
      <div className="blogs_category">
         <div className="show_blogs">
            {
               blogs && blogs.length > 0 &&
               blogs.map(blog => (
                  <CartVert key={blog._id} blog={blog} />
               ))
            }
         </div>

         {  total > 1 &&
               <Pagination
            total={total}
            callback={handlePagination}
         />}
      </div>
   )
}

export default BlogByCategory