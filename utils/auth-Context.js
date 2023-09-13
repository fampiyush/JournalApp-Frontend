import React, {createContext, useState} from 'react'

export const authContext = createContext()

export const AuthContextProvider = ({children}) => {
  
  const [userData, setUserData] = useState({});
  const [imgURI, setImgURI] = useState("")
  
  return (
    <authContext.Provider value={{userData, setUserData, imgURI, setImgURI}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider