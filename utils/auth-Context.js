import React, {createContext, useState} from 'react'

export const authContext = createContext()

export const AuthContextProvider = ({children}) => {
  
  const [userData, setUserData] = useState({});
  const [imgURI, setImgURI] = useState("")
  const [triggerRefresh, setTriggerRefresh] = useState(1)
  
  return (
    <authContext.Provider value={{userData, setUserData, imgURI, setImgURI, triggerRefresh, setTriggerRefresh}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider