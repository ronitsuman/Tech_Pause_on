import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './PAges/Landing'
import Signup from './PAges/Signup'
import Login from './PAges/Login'
import { ToastContainer } from 'react-toastify'
import ConfirmationMail from './PAges/ConfirmationMail'
import ForgotPassword from './PAges/ForgotPassword'
import Dashboard from './PAges/DashBoard'

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
      path:"/confirmationMail",
      element:<><ConfirmationMail/></>,
    },
    {
      path:"/forgot-password",
      element:<><ForgotPassword/></>,
    },
    {
      path:"/login",
      element:<><Login/></>,
    },
    {
      path:"/dashboard",
      element:<><Dashboard/></>,
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