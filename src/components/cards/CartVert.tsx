import React, { useState, useEffect} from 'react'
import { IBlog } from '../../utils/TypeScript'
import { Link } from 'react-router-dom'
import  Loading  from '../Global/Loading'
interface IProps {
   blog: IBlog
}
const CartVert = ({ blog }: IProps) => {
   return (
      <div className="card">
         {
            typeof(blog.thumbnail) === 'string' &&
            <img src={blog.thumbnail} className="card-img-top" alt="..." 
               style={{ height: '180px', objectFit: 'cover'}}
            />
         }
            <div className="card-body">
               <h5 className="card-title">
                  <Link to={`/blog/${blog._id}`}>
                     {blog.title.slice(0, 40) +  '...'}
                  </Link>
               </h5>
               <p className="card-text">
                  {blog.description.slice(0, 100) + '...'} 
               </p>
               <p className='card-text d-flex justify-content-between'>
                  <small text-muted text-capitalize>
                     {
                        typeof(blog.user) !== 'string' && 
                        <Link to={`/profile/${blog.user._id}`}>
                           By: {blog.user.name}
                        </Link>
                     }
                  </small>

                  <small text-muted>
                     {
                        new Date(blog.createdAt).toLocaleString()
                     }
                  </small>
               </p>
            </div>
      </div>
   )
}

export default CartVert