import React, { useState } from 'react';

const UserContext = React.createContext();

export const UserProvider = (props)=> {
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  return(
    <UserContext.Provider value={{
      token, setToken, user, setUser
    }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContext;