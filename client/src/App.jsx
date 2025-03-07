import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './PAges/Landing'
import Signup from './PAges/Signup'
import Login from './PAges/Login'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Landing/></>,
    },
    {
      path:"/signup",
      element:<><Signup/></>,
    },
    {
      path:"/login",
      element:<><Login/></>,
    },
  ])
  return( 
    <>
    <ToastContainer 
    position='top-right'
    autoClose={3000}
    pauseOnHover
    draggable
    theme='dark'/>
  <RouterProvider router={router}/>
  </>
  )
}

export default App