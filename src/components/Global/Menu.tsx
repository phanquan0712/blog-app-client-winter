import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/action/authAction'
const Menu = () => {
   const dispatch = useDispatch()
   const { auth } = useSelector((state: RootStore) => state)
   const bfLoginLinks = [
      { label: 'Login', path: '/login' },
      { label: 'Register', path: '/register' },
   ]
   const afLoginLinks = [
      { label: 'Home', path: '/' },
      { label: 'CreateBlog', path: '/create_blog' },
   ]

   const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks

   const location = useLocation();
   const { pathname } = location;
   const isActive = (pn: string) => {
      if (pathname === pn) {
         return 'active'
      }
   }
   const handleLogout = () => {
      if(!auth.access_token || !auth.user) return;

      dispatch(logout(auth.access_token))
   }

   return (
      <ul className="navbar-nav ms-auto">
         {
            navLinks.map((link, index) => (
               <li className={`nav-item ${isActive(link.path)}`} key={index}>
                  <Link className="nav-link" to={link.path}>{link.label}</Link>
               </li>
            ))
         }
         {
            auth.user?.role === 'admin' &&
            <li className={`nav-item ${isActive('/category')}`}>
               <Link className='nav-link' to='/category'>
                  Category
               </Link>
            </li>
         }
         {
            auth.user &&
            <li className="nav-item dropdown">
               <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={auth.user.avatar} alt="avatar" title={auth.user.name} className='avatar' />
               </span>
               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link></li>
                  <li><hr className="dropdown-divider"></hr></li>
                  <li><Link 
                  onClick={handleLogout}
                  className="dropdown-item" to={'#'}>Logout</Link></li>
               </ul>
            </li>
         }
      </ul>
   )
}

export default Menu