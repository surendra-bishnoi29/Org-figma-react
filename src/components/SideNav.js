import React, { useContext, useEffect, useState } from 'react'
import appRoutes from '../routes/appRoutes'
import SideBarItem from './SideBarItem'
import UserDropdown from './profileDropdown'
import { ContextApp } from '../ContextAPI'
import { getItem } from '../login/storageService'
import { getCurrentUser } from '../Actions/userAction'
import Notification from '../Notification'
import WarningPage from './utilities/WarningPage'
import blank_img from '../components/utilities/blank.jpg'



function SideNav() {
  const [currentUser, setCurrentUser] = useState({});
  const { loading, setLoading, role, appState } = useContext(ContextApp);
  const [routes, setRoutes] = useState(appRoutes)
  const [warning, setWarning] = useState(false)
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    setLoading(true);
    const response = await getCurrentUser();
    console.log("current user from side nav", response)
    if (response?.user) {
      setCurrentUser(response.user);
    }
    if (response?.error) {
      // localStorage.clear();
      // window.location.reload();
    }
    setLoading(false);

  }

  const logout = (permitted = false, getWarning = true) => {
    if (getWarning) {
      setWarning(true)
      return
    }
    if (permitted) {
      localStorage.clear();
      window.location.reload();
    }
    setWarning(false)
  }



  const getPermissionToLogout = (c) => {
    logout(c, false)
  }

  useEffect(() => {
    const n_appRoutes = appRoutes.filter((route) => {
      if (!route.role || !route.role.includes(role)) {
        return null; // Skip routes that don't match the user's role
      }
      return route;
    });
    console.log("n_appRoutes in side nav", n_appRoutes)
    setRoutes(n_appRoutes);
    console.log("role in side nav", role)
  }, [role])

  return (
    <>
      <Notification />
      {warning ? <WarningPage targetFunction={getPermissionToLogout} warningMsg={'Are you sure you want to logout ?'} /> : ''}
      <nav className="bg-white sm:min-w-20  justify-between flex sm:flex-col h-full   ">
        <div className=" flex sm:flex-col w-full justify-end  sm:gap-0 mt-4 space-y-6">
          {/* <a href="#" className=' hidden sm:block'>
            <img
              src={"s+.png"}
              className="rounded-full  mb-3 mx-auto"
            />
          </a> */}
          <div className=' font-sans font-semibold text-xl leading-[24px] w-[141px] h-[21px] pl-[24px] space-y-[10px] '>SECURE+</div>
          <div className="space-y-2">
            <div className='font-[Public_Sans] text-[12px] font-medium text-[#959FA3] leading-[12px] text-left px-[25px]'>{appState}</div>
            <ul className='flex  sm:flex-col w-full space-y-[4px]'>
              {routes.map((route, index) => (
                <li key={index}>
                  <SideBarItem item={route} key={index} />
                </li>
              )
              )}
            </ul>
          </div>
          <div className=' sm:hidden'>
            <UserDropdown logout={() => logout(true)} currentUser={currentUser} />
          </div>
        </div>

       
      </nav>
    </>
  )
}

export default SideNav