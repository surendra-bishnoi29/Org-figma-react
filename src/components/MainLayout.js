import React, {useContext, useEffect} from 'react'
import SideNav from './SideNav'
import { Outlet, useNavigate } from 'react-router-dom'
import { getItem } from '../login/storageService';
import {Navigate, useLocation} from "react-router-dom"
import { ContextApp } from '../ContextAPI';
import Header from './utilities/Header';

function MainLayout(props) {

  const logged_in = getItem('loggedIn');
  const navigate = useNavigate();
  const {loggedIn, role} = useContext(ContextApp);
  // console.log("currwnt user from main layout", getItem('currentUser'))
  // const {role} = useContext(ContextApp);
  useEffect(() =>{
    if(role =='Admin'){
      console.log("not logged in", role)
    }
    else{
      navigate('/files')
      console.log("logged in", loggedIn)
    }
    if(!loggedIn){
      navigate('/login')
    }
    
  },[loggedIn, role])

  return (
    (loggedIn?
      <div className=' w-full h-screen bg-gray-200 flex '>
        <div className=' w-[20%] h-full  '>
      <SideNav />
      </div>
      <div className='w-[80%] overflow-auto'>
      <div className='bg-white border-l  w-[80%] fixed h-[72px] px-[40px] py-[16px]  '>
        <Header />
      </div>
      <div className=' text-sm' >
      <Outlet />
      </div>
      </div>
  </div>:
  <Navigate to="/login"  replace />
    )
   
  )
}

export default MainLayout