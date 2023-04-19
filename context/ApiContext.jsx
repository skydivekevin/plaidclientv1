import React, { useState } from 'react';

const ApiContext = React.createContext();

export const ApiProvider = (props)=> {
  const [keys, setKeys] = useState([])
  const [places, setPlaces] = useState()
  return(
    <ApiContext.Provider value={{
      keys, setKeys, places, setPlaces
    }}>
      {props.children}
    </ApiContext.Provider>
  )
}
export default ApiContext;