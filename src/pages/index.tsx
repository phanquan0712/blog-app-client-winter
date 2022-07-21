import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import CartVert from '../components/cards/CartVert'
import Loading from '../components/Global/Loading'
const Home = () => {
   const { homeBLogs } = useSelector((state: RootStore) => state)

   if(homeBLogs.length == 0) return <Loading />
   return (
      <div className='home_page'>
         {
            homeBLogs && homeBLogs.length > 0 &&
            homeBLogs.map((homeBlog) => (
               <div key={homeBlog._id}>
                  {
                     homeBlog.count > 0 &&
                     <>
                        <h3>
                           <Link to={`/blogs/${homeBlog.name}`}>
                              {homeBlog.name}
                           </Link>
                        </h3>
                        <hr className='mt-1' />

                        <div className="home_blogs">
                           {
                              homeBlog.blogs.map((blog) => (
                                 <CartVert key={blog._id} blog={blog} />
                              ))
                           }
                        </div>
                     </>
                  }


                  {
                     homeBlog.count > 4 &&
                     <Link className='text-end d-block mt-2 mb-3' to={`/blogs/${homeBlog.name}`}>
                        Read more &gt;&gt;
                     </Link>
                  }
               </div>
            ))
         }
      </div>
   )
}

export default Home