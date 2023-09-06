import React, {createContext, useState} from 'react'

export const authContext = createContext()

export const AuthContextProvider = ({children}) => {
  
  const [userData, setUserData] = useState({});
  
  return (
    <authContext.Provider value={{userData, setUserData}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthContextProvider