import React,  { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { IParams, RootStore } from '../../utils/TypeScript'
import { getBlogsByUser } from '../../redux/action/blogAction'
import { IBlog } from '../../utils/TypeScript'
import Loading from '../Global/Loading'
import CardHoriz from '../cards/CardHoriz'
import Pagination from '../Global/Pagination' 
import { showErrMsg } from '../alert/Alert'
const Userblog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { blogUser } = useSelector((state: RootStore) => state);
  const user_id = useParams<IParams>().slug;
    
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [total, setTotal] = useState(0);


  useEffect(() => {
    if(!user_id) return;
    
    if(blogUser.every(item => item.id !== user_id)) {
      if(history.location.search) {        
        dispatch(getBlogsByUser(user_id, history.location.search));
      }   else {
        dispatch(getBlogsByUser(user_id));
      }   
    } else {       
      const data = blogUser.find(item => item.id === user_id);
      if(!data) return;      
      setBlogs(data.blogs);
      setTotal(data.total);

      if(data.search) history.push(data.search);
      return () => {
        setBlogs([]);
        setTotal(0);
      }
    }
  }, [user_id, dispatch, blogUser])

  const handlePagination = (page: number) => {
    const search = `?page=${page}`;
    dispatch(getBlogsByUser(user_id, search));
  }

  if(!blogs) return <Loading />;

  if(blogs.length === 0) return <h3 className='text-center'>No Blogs</h3>
  return (
    <div>
      <div>
        {
          blogs.length > 0 && 
          blogs.map(blog => (
            <CardHoriz key={blog._id} blog={blog} />
          ))
        }
      </div>
      {
        total > 1 &&
      <Pagination 
        total={total}
        callback={handlePagination}
      />
      }
    </div>
  )
}

export default Userblog