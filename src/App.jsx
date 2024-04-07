import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components'
import {Outlet} from 'react-router-dom'
// import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserData()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
        console.log("userData", userData)
      } else {
        dispatch(logout())
        console.log("userData", userData)
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
    <Header/>
    <main>
    <Outlet/>
    </main>
    <Footer/>

    </div>
    </div>
  ) : null

}

export default App
