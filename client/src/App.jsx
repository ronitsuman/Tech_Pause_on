import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './PAges/Landing'
import Signup from './PAges/Signup'
import Login from './PAges/Login'
import { ToastContainer } from 'react-toastify'
import ConfirmationMail from './PAges/ConfirmationMail'
import ForgotPassword from './PAges/ForgotPassword'
import Dashboard from './PAges/DashBoard'
import CreatePost from './PAges/CreatePost'
import AboutUs from './PAges/AboutUs'
import HelpSupport from './PAges/HelpSupport'
import Homepage from './PAges/Homepage'
import ContactUs from './PAges/ContactUs'
import MyPosts from './Components/MyPosts'
import ReadMore from './PAges/ReadMore'
import Profile from './Components/Profile'

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
    {
      path:"/myPosts",
      element:<><MyPosts/></>,
    },
    {
      path:"/createpost",
      element:<><CreatePost/></>,
    },
    {
      path:"/post",
      element:<><Homepage/></>,
    },
    {
      path:"/contactUs",
      element:<><ContactUs/></>,
    },
    {
      path:"/post/:id",
      element:<><ReadMore/></>,
    },
    
    {
      path:"/aboutUs",
      element:<><AboutUs/></>,
    },
    {
      path:"/help",
      element:<><HelpSupport/></>,
    },
    {
      path:"/profile",
      element:<><Profile/></>,
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