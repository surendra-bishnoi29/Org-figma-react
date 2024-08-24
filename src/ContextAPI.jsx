import React, { createContext, useRef, useState, useEffect } from 'react'
import { getItem } from './login/storageService'




export const ContextApp = createContext()




const ContextAppProvider = props => {
  // const navigate = useNavigate()
  const r = getItem('role');
  const l = getItem('loggedIn');
  const [appState, setAppState] = useState("")
  const notifisystem = useRef()
  const [keyword, setKeyword] = useState('')
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(l);
  const [role, setRole] = useState(r);

  useEffect(()=>{
    setRole(r);
  },[loggedIn])

  const login = () =>{
    console.log("login true")
    setLoggedIn(true);
    // setItem('loggedIn', true);
    
    // navigate('/')
  }



  return <ContextApp.Provider
    value={{
      appState, setAppState,
      notifisystem,
      keyword, setKeyword,
      currentUser, setCurrentUser,
      loggedIn, login, setLoggedIn,
      loading, setLoading,
      role, setRole
    }}>
    {props.children}
  </ContextApp.Provider>
}
export default ContextAppProvider;