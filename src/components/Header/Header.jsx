import React from 'react'
import authSlice from '../../store/authSlice'
import {NavLink, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Logo, LogoutBtn} from '../index'

function Header() {

  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    }

  ]
  
  return (
    <header className='bg-[#2F3136] text-white py-3 px-20 md:px-44 shadow '>
        <nav className='flex '>
          <div className='mr-4'>
                <Logo width='70px'/>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=> 
              item.active ? (
                <li key={item.name}>
                  <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `block mx-4 mt-2 duration-200 text-white ${
                      isActive ? " text-pink-200  border-b-4 border-pink-300" : "text-white"
                    }  hover:text-pink-200 lg:p-0`
                  }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Header