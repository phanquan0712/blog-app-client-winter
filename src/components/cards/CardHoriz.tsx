import React from 'react'
import { IBlog } from '../../utils/TypeScript'
import { Link } from 'react-router-dom'
import { IParams, RootStore, IUser } from '../../utils/TypeScript'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog } from '../../redux/action/blogAction'
interface IProps {
   blog: IBlog
}

const CardHoriz = ({ blog }: IProps) => {
   const { slug } = useParams<IParams>()
   const { auth } = useSelector((state: RootStore) => state)
   console.log(slug);
   const dispatch = useDispatch()
   const handleDelete = (blog: IBlog) => {
      if(!auth.user || !auth.access_token) return;

      if(window.confirm('Do you want to delete this post?')) {
         dispatch(deleteBlog(blog, auth.access_token))
      }
   }
   return (
      <div className="card mb-3 rounded w-100">
         <div className="row g-0 p-2">
            <div className="col-md-4" style={{
               minHeight: '150px', maxHeight: '170px', overflow: 'hidden'
            }}>
               {
                  blog.thumbnail &&
                  <>
                     {
                        typeof (blog.thumbnail) === 'string' ?
                           <Link to={`/blog/${blog._id}`}>
                              <img src={blog.thumbnail}
                                 className="img-fluid rounded-start"
                                 alt="thumb"
                                 style={{
                                    width: '100%',
                                    objectFit: 'cover',
                                 }}
                              />
                           </Link>
                           :
                           <img src={URL.createObjectURL(blog.thumbnail)}
                              className="img-fluid rounded-start" alt="thumbnail" />
                     }
                  </>
               }
            </div>
            <div className="col-md-8">
               <div className="card-body">
                  <h5 className="card-title">
                     <Link to={`/blog/${blog._id}`} className='text-capitalize text-decoration-none'>
                        {blog.title}
                     </Link>
                  </h5>
                  <p className="card-text">{blog.description}</p>
                  {
                     blog.title &&
                     <p className="card-text d-flex justify-content-between">
                        {
                           auth.user && slug && auth.user?._id === (blog.user as IUser)._id ?
                           <small>
                              <Link to={`/update_blog/${blog._id}`}>
                                 <i className='fas fa-edit' title='edit blog'></i>
                              </Link>

                              <i className='fas fa-trash-alt'
                                 style={{ marginLeft: '10px', color: 'crimson', cursor: 'pointer' }}
                                 title='delete blog' 
                                 onClick={() => handleDelete(blog)}
                                 />
                           </small>
                           :
                           auth.user?.role === 'admin' &&
                           <i className='fas fa-trash-alt'
                                 style={{ marginLeft: '10px', color: 'crimson', cursor: 'pointer' }}
                                 title='delete blog' 
                                 onClick={() => handleDelete(blog)}
                           />
                        }

                        <small className="text-muted d-flex" style={{ justifyContent: 'flex-end' }}>{
                           new Date(blog.createdAt).toLocaleString()
                        }</small></p>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default CardHoriz


